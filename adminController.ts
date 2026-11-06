import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { productSchema, storeSettingsSchema } from '../validators';
import { formatProduct } from './productController';

export const getDashboardStats = async (req: Request, res: Response) => {
  const [
    totalOrders,
    pendingOrders,
    confirmedOrders,
    deliveredOrders,
    totalProducts,
    lowStockProducts,
    recentOrders,
    allDeliveredOrConfirmed,
    inquiriesCount,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { orderStatus: 'PENDING' } }),
    prisma.order.count({ where: { orderStatus: 'CONFIRMED' } }),
    prisma.order.count({ where: { orderStatus: 'DELIVERED' } }),
    prisma.product.count(),
    prisma.product.findMany({
      where: { stock: { lte: 5 } },
      select: { id: true, name: true, sku: true, stock: true },
      take: 10,
    }),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    }),
    prisma.order.findMany({
      where: {
        orderStatus: { in: ['CONFIRMED', 'PROCESSING', 'PACKED', 'DISPATCHED', 'DELIVERED'] },
      },
      select: { finalTotal: true },
    }),
    prisma.contactInquiry.count({ where: { status: 'NEW' } }),
  ]);

  const totalSales = allDeliveredOrConfirmed.reduce((sum, o) => sum + o.finalTotal, 0);

  res.json({
    success: true,
    stats: {
      totalOrders,
      pendingOrders,
      confirmedOrders,
      deliveredOrders,
      totalSales,
      totalProducts,
      lowStockCount: lowStockProducts.length,
      newInquiriesCount: inquiriesCount,
    },
    recentOrders,
    lowStockProducts,
  });
};

export const getAdminProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true, variants: true },
  });

  res.json({
    success: true,
    products: products.map(formatProduct),
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const parsed = productSchema.parse(req.body);

  const slug =
    parsed.slug ||
    parsed.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const existingSlug = await prisma.product.findUnique({ where: { slug } });
  const finalSlug = existingSlug ? `${slug}-${Date.now().toString().slice(-4)}` : slug;

  const product = await prisma.product.create({
    data: {
      name: parsed.name,
      slug: finalSlug,
      sku: parsed.sku,
      description: parsed.description,
      price: parsed.price,
      originalPrice: parsed.originalPrice,
      categoryId: parsed.categoryId,
      collection: parsed.collection,
      stock: parsed.stock,
      inStock: parsed.stock > 0 && parsed.inStock,
      isNew: parsed.isNew,
      isFeatured: parsed.isFeatured,
      discountBadge: parsed.discountBadge,
      imagesJson: JSON.stringify(parsed.images),
      colorsJson: JSON.stringify(parsed.colors),
      sizesJson: JSON.stringify(parsed.sizes),
      detailsJson: JSON.stringify(parsed.details),
      specsJson: JSON.stringify(parsed.specs),
    },
    include: { category: true },
  });

  // Record audit log
  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'CREATE_PRODUCT',
      resource: `Product:${product.id}`,
      details: `Created product ${product.name} (SKU: ${product.sku})`,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: formatProduct(product),
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = productSchema.partial().parse(req.body);

  const updateData: any = {};
  if (parsed.name) updateData.name = parsed.name;
  if (parsed.sku) updateData.sku = parsed.sku;
  if (parsed.description) updateData.description = parsed.description;
  if (parsed.price !== undefined) updateData.price = parsed.price;
  if (parsed.originalPrice !== undefined) updateData.originalPrice = parsed.originalPrice;
  if (parsed.categoryId) updateData.categoryId = parsed.categoryId;
  if (parsed.collection !== undefined) updateData.collection = parsed.collection;
  if (parsed.stock !== undefined) {
    updateData.stock = parsed.stock;
    updateData.inStock = parsed.stock > 0;
  }
  if (parsed.isNew !== undefined) updateData.isNew = parsed.isNew;
  if (parsed.isFeatured !== undefined) updateData.isFeatured = parsed.isFeatured;
  if (parsed.discountBadge !== undefined) updateData.discountBadge = parsed.discountBadge;

  if (parsed.images) updateData.imagesJson = JSON.stringify(parsed.images);
  if (parsed.colors) updateData.colorsJson = JSON.stringify(parsed.colors);
  if (parsed.sizes) updateData.sizesJson = JSON.stringify(parsed.sizes);
  if (parsed.details) updateData.detailsJson = JSON.stringify(parsed.details);
  if (parsed.specs) updateData.specsJson = JSON.stringify(parsed.specs);

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: { category: true, variants: true },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'UPDATE_PRODUCT',
      resource: `Product:${id}`,
      details: `Updated product properties for ${product.name}`,
    },
  });

  res.json({
    success: true,
    message: 'Product updated successfully',
    product: formatProduct(product),
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Safe soft archive or delete
  const product = await prisma.product.delete({
    where: { id },
  });

  await prisma.auditLog.create({
    data: {
      userId: req.user?.id,
      action: 'DELETE_PRODUCT',
      resource: `Product:${id}`,
      details: `Deleted product ${product.name}`,
    },
  });

  res.json({ success: true, message: 'Product removed from catalog' });
};

export const getAdminOrders = async (req: Request, res: Response) => {
  const { status, search } = req.query;

  const where: any = {};
  if (status && status !== 'ALL') {
    where.orderStatus = String(status);
  }

  if (search) {
    const term = String(search).trim();
    where.OR = [
      { orderNumber: { contains: term } },
      { customerName: { contains: term } },
      { customerPhone: { contains: term } },
      { city: { contains: term } },
    ];
  }

  const orders = await prisma.order.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: 'desc' } },
    },
  });

  res.json({ success: true, orders });
};

export const getAdminOrderDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findFirst({
    where: { OR: [{ id }, { orderNumber: id }] },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: 'asc' } },
      paymentRecords: true,
    },
  });

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, order });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const validStatuses = [
    'PENDING',
    'CONFIRMED',
    'PROCESSING',
    'PACKED',
    'DISPATCHED',
    'DELIVERED',
    'CANCELLED',
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid order status transition.' });
  }

  const order = await prisma.$transaction(async (tx) => {
    const updated = await tx.order.update({
      where: { id },
      data: { orderStatus: status },
    });

    await tx.orderStatusHistory.create({
      data: {
        orderId: id,
        status,
        note: note || `Order status updated to ${status}`,
        changedBy: req.user?.name || 'ADMIN',
      },
    });

    // If order is cancelled, optionally replenish inventory
    if (status === 'CANCELLED') {
      const items = await tx.orderItem.findMany({ where: { orderId: id } });
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity }, inStock: true },
        });
      }
    }

    return updated;
  });

  res.json({
    success: true,
    message: `Order status transitioned to ${status}`,
    order,
  });
};

export const updatePaymentStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { paymentStatus, transactionRef } = req.body;

  const updated = await prisma.order.update({
    where: { id },
    data: { paymentStatus },
  });

  if (transactionRef) {
    await prisma.paymentRecord.create({
      data: {
        orderId: id,
        amount: updated.finalTotal,
        paymentMethod: updated.paymentMethod,
        paymentStatus,
        transactionRef,
      },
    });
  }

  res.json({
    success: true,
    message: `Payment status updated to ${paymentStatus}`,
    order: updated,
  });
};

export const updateStock = async (req: Request, res: Response) => {
  const { productId, stock } = req.body;

  const numStock = parseInt(String(stock), 10);
  if (isNaN(numStock) || numStock < 0) {
    return res.status(400).json({ success: false, message: 'Stock must be a non-negative integer' });
  }

  const updated = await prisma.product.update({
    where: { id: productId },
    data: {
      stock: numStock,
      inStock: numStock > 0,
    },
  });

  res.json({
    success: true,
    message: `Stock for ${updated.name} updated to ${numStock}`,
    product: formatProduct(updated),
  });
};

export const getAdminReviews = async (req: Request, res: Response) => {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    include: { product: { select: { id: true, name: true, slug: true } } },
  });

  res.json({ success: true, reviews });
};

export const moderateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isApproved } = req.body;

  const review = await prisma.review.update({
    where: { id },
    data: { isApproved: Boolean(isApproved) },
  });

  res.json({
    success: true,
    message: isApproved ? 'Review approved for public display' : 'Review unapproved/hidden',
    review,
  });
};

export const getAdminInquiries = async (req: Request, res: Response) => {
  const inquiries = await prisma.contactInquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, inquiries });
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const inquiry = await prisma.contactInquiry.update({
    where: { id },
    data: { status, notes },
  });

  res.json({ success: true, inquiry });
};

export const getAdminSubscribers = async (req: Request, res: Response) => {
  const subscribers = await prisma.newsletterSubscription.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, subscribers });
};

export const updateSettings = async (req: Request, res: Response) => {
  const parsed = storeSettingsSchema.parse(req.body);

  const settings = await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: parsed,
    create: { id: 'singleton', ...parsed },
  });

  res.json({
    success: true,
    message: 'Store settings updated successfully',
    settings,
  });
};

export const getAdminCoupons = async (req: Request, res: Response) => {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, coupons });
};

export const createCoupon = async (req: Request, res: Response) => {
  const { code, description, discountType, discountValue, minPurchase, maxUses, endDate } = req.body;

  const coupon = await prisma.coupon.create({
    data: {
      code: String(code).trim().toUpperCase(),
      description,
      discountType: discountType || 'PERCENTAGE',
      discountValue: Number(discountValue),
      minPurchase: Number(minPurchase) || 0,
      maxUses: maxUses ? Number(maxUses) : null,
      endDate: endDate ? new Date(endDate) : null,
      isActive: true,
    },
  });

  res.status(201).json({ success: true, message: 'Coupon created successfully', coupon });
};

export const deleteCoupon = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.coupon.delete({ where: { id } });
  res.json({ success: true, message: 'Coupon deleted successfully' });
};
