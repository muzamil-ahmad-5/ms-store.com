import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const formatProduct = (p: any) => {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    description: p.description,
    price: p.price,
    originalPrice: p.originalPrice,
    categoryId: p.categoryId,
    categoryName: p.category?.name || p.categoryId,
    collection: p.collection,
    stock: p.stock,
    inStock: p.inStock && p.stock > 0,
    isNew: p.isNew,
    isFeatured: p.isFeatured,
    discountBadge: p.discountBadge,
    images: typeof p.imagesJson === 'string' ? JSON.parse(p.imagesJson || '[]') : p.imagesJson,
    colors: typeof p.colorsJson === 'string' ? JSON.parse(p.colorsJson || '[]') : p.colorsJson,
    sizes: typeof p.sizesJson === 'string' ? JSON.parse(p.sizesJson || '[]') : p.sizesJson,
    details: typeof p.detailsJson === 'string' ? JSON.parse(p.detailsJson || '[]') : p.detailsJson,
    specs: typeof p.specsJson === 'string' ? JSON.parse(p.specsJson || '{}') : p.specsJson,
    variants: p.variants || [],
    reviews: p.reviews || [],
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
};

export const getProducts = async (req: Request, res: Response) => {
  const {
    category,
    collection,
    search,
    minPrice,
    maxPrice,
    inStockOnly,
    sort = 'featured',
    page = '1',
    limit = '50',
  } = req.query;

  const where: any = {};

  if (category && category !== 'all') {
    where.categoryId = String(category).toLowerCase();
  }

  if (collection && collection !== 'all') {
    where.collection = String(collection).toLowerCase();
  }

  if (inStockOnly === 'true') {
    where.inStock = true;
    where.stock = { gt: 0 };
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  if (search) {
    const term = String(search).trim();
    where.OR = [
      { name: { contains: term } },
      { description: { contains: term } },
      { sku: { contains: term } },
      { categoryId: { contains: term } },
      { collection: { contains: term } },
    ];
  }

  let orderBy: any = [{ sortOrder: 'asc' }, { createdAt: 'desc' }];
  switch (sort) {
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'price_asc':
      orderBy = { price: 'asc' };
      break;
    case 'price_desc':
      orderBy = { price: 'desc' };
      break;
    case 'name_asc':
      orderBy = { name: 'asc' };
      break;
    case 'featured':
    default:
      orderBy = [{ isFeatured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }];
      break;
  }

  const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(String(limit), 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const [totalCount, rawProducts] = await Promise.all([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limitNum,
      include: {
        category: true,
        variants: true,
      },
    }),
  ]);

  const products = rawProducts.map(formatProduct);

  res.json({
    success: true,
    total: totalCount,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    products,
  });
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const rawProduct = await prisma.product.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
    },
    include: {
      category: true,
      variants: true,
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!rawProduct) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const product = formatProduct(rawProduct);

  // Fetch related products in same category
  const rawRelated = await prisma.product.findMany({
    where: {
      categoryId: rawProduct.categoryId,
      id: { not: rawProduct.id },
    },
    take: 4,
    include: { category: true },
  });

  const related = rawRelated.map(formatProduct);

  res.json({
    success: true,
    product,
    related,
  });
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  const raw = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { category: true, variants: true },
  });

  res.json({
    success: true,
    products: raw.map(formatProduct),
  });
};

export const getNewArrivals = async (req: Request, res: Response) => {
  const raw = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    include: { category: true, variants: true },
  });

  res.json({
    success: true,
    products: raw.map(formatProduct),
  });
};
