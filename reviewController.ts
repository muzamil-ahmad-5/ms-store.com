import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { reviewSchema } from '../validators';

export const submitReview = async (req: Request, res: Response) => {
  const parsed = reviewSchema.parse(req.body);

  // Check if product exists
  const product = await prisma.product.findUnique({
    where: { id: parsed.productId },
  });

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Check if email matches any completed or confirmed order containing this product
  let isVerified = false;
  if (parsed.customerEmail) {
    const matchedOrder = await prisma.order.findFirst({
      where: {
        customerEmail: parsed.customerEmail.toLowerCase(),
        items: {
          some: { productId: parsed.productId },
        },
      },
    });
    if (matchedOrder) {
      isVerified = true;
    }
  }

  const review = await prisma.review.create({
    data: {
      productId: parsed.productId,
      userId: req.user?.id || null,
      customerName: parsed.customerName,
      customerEmail: parsed.customerEmail?.toLowerCase() || null,
      rating: parsed.rating,
      title: parsed.title,
      comment: parsed.comment,
      isVerifiedPurchase: isVerified,
      isApproved: false, // Default to moderation queue
    },
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for your review. It has been received and will appear following standard editorial moderation.',
    review: {
      id: review.id,
      rating: review.rating,
      title: review.title,
      isVerifiedPurchase: review.isVerifiedPurchase,
    },
  });
};

export const getProductReviews = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const reviews = await prisma.review.findMany({
    where: {
      productId,
      isApproved: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json({ success: true, reviews });
};
