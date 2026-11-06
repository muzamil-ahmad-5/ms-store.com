import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/db';
import { registerSchema, loginSchema } from '../validators';
import { signToken } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.parse(req.body);

  const existing = await prisma.user.findUnique({
    where: { email: parsed.email.toLowerCase() },
  });

  if (existing) {
    return res.status(409).json({ success: false, message: 'An account with this email address already exists.' });
  }

  const passwordHash = await bcrypt.hash(parsed.password, 10);

  const user = await prisma.user.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      passwordHash,
      phone: parsed.phone,
      role: 'CUSTOMER',
    },
  });

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: 'Account registered successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.parse(req.body);

  const user = await prisma.user.findUnique({
    where: { email: parsed.email.toLowerCase() },
  });

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const isValid = await bcrypt.compare(parsed.password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: 'Signed in successfully',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Signed out successfully' });
};

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, user });
};
