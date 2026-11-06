import { Request, Response } from 'express';
import { prisma } from '../config/db';
import { contactSchema, newsletterSchema } from '../validators';

export const getPublicSettings = async (req: Request, res: Response) => {
  let settings = await prisma.storeSettings.findUnique({
    where: { id: 'singleton' },
  });

  if (!settings) {
    settings = await prisma.storeSettings.create({
      data: {
        id: 'singleton',
        brandName: 'MS STORE',
        tagline: 'TIMELESS STYLE. EVERYDAY ESSENTIALS.',
        headline: 'ELEVATE YOUR EVERYDAY.',
        whatsappNumber: process.env.WHATSAPP_NUMBER || '447423759972',
        supportPhone: '+44 7423 759972',
        supportEmail: process.env.SUPPORT_EMAIL || 'concierge@msstore.com',
        businessHours: 'Mon - Sat: 10:00 AM - 9:00 PM',
        instagramUrl: 'https://www.instagram.com/mubasherstarstore?rpxt=MWJ6cThzYWY2bnF0ag==',
        facebookUrl: '',
        tiktokUrl: 'https://www.tiktok.com/@ms.collection9?_r=1&_t=ZS-9AoGpDQ01Ps',
        currency: 'PKR',
        shippingFee: 250,
        freeShippingThreshold: 5000,
        announcementText: 'COMPLIMENTARY NATIONWIDE EXPRESS SHIPPING ON ORDERS OVER PKR 5,000',
        deliveryEstimatedDays: '2-4 Business Days',
        bankAccountDetails: 'Bank: Standard Chartered Bank\nAccount Title: MS Store Luxury Retail\nAccount Number: 01-2345678-01\nIBAN: PK36SCBL0000001234567801',
        heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
        heroSubtitle: 'Discover timeless style with MS STORE. From sophisticated watches and premium wallets to modern eyewear, footwear, fragrances, and everyday essentials, find the perfect details to define your style.',
      },
    });
  }

  res.json({
    success: true,
    settings: {
      brandName: settings.brandName,
      tagline: settings.tagline,
      headline: settings.headline,
      whatsappNumber: settings.whatsappNumber,
      supportPhone: settings.supportPhone,
      supportEmail: settings.supportEmail,
      businessHours: settings.businessHours,
      instagramUrl: settings.instagramUrl,
      facebookUrl: settings.facebookUrl,
      tiktokUrl: (settings as any).tiktokUrl || 'https://tiktok.com/@mscollection',
      currency: settings.currency,
      shippingFee: settings.shippingFee,
      freeShippingThreshold: settings.freeShippingThreshold,
      announcementText: settings.announcementText,
      deliveryEstimatedDays: settings.deliveryEstimatedDays,
      bankAccountDetails: settings.bankAccountDetails,
      heroImageUrl: settings.heroImageUrl,
      heroSubtitle: settings.heroSubtitle,
    },
  });
};

export const submitContactInquiry = async (req: Request, res: Response) => {
  const parsed = contactSchema.parse(req.body);

  const inquiry = await prisma.contactInquiry.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      subject: parsed.subject,
      message: parsed.message,
    },
  });

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out. An MS Collection concierge specialist will contact you within 24 hours.',
    inquiryId: inquiry.id,
  });
};

export const subscribeNewsletter = async (req: Request, res: Response) => {
  const parsed = newsletterSchema.parse(req.body);

  const email = parsed.email.toLowerCase().trim();

  const existing = await prisma.newsletterSubscription.findUnique({
    where: { email },
  });

  if (existing) {
    return res.json({
      success: true,
      message: 'You are already registered to receive MS Collection private previews and invitations.',
    });
  }

  await prisma.newsletterSubscription.create({
    data: { email },
  });

  res.status(201).json({
    success: true,
    message: 'Welcome to the MS Collection circle. Exclusive previews and editorial announcements will be delivered to your inbox.',
  });
};
