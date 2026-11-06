import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  const formatted = categories.map((c) => ({
    id: c.id,
    name: c.name,
    subtitle: c.subtitle,
    description: c.description,
    image: c.image,
    itemCount: c._count.products,
  }));

  res.json({ success: true, categories: formatted });
};

export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        take: 20,
      },
    },
  });

  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }

  res.json({ success: true, category });
};
