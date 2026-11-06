import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding MS Collection database with brand content...');

  // 1. Store Settings
  await prisma.storeSettings.upsert({
    where: { id: 'singleton' },
    update: {
      brandName: 'MS STORE',
      tagline: 'TIMELESS STYLE. EVERYDAY ESSENTIALS.',
      headline: 'ELEVATE YOUR EVERYDAY.',
      heroSubtitle:
        'Discover timeless style with MS STORE. From sophisticated watches and premium wallets to modern eyewear, footwear, fragrances, and everyday essentials, find the perfect details to define your style.',
      heroImageUrl:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
      whatsappNumber: '447423759972',
      supportPhone: '+44 7423 759972',
      supportEmail: 'concierge@msstore.com',
      instagramUrl: 'https://www.instagram.com/mubasherstarstore?rpxt=MWJ6cThzYWY2bnF0ag==',
      tiktokUrl: 'https://www.tiktok.com/@ms.collection9?_r=1&_t=ZS-9AoGpDQ01Ps',
      announcementText: 'COMPLIMENTARY NATIONWIDE EXPRESS SHIPPING ON ORDERS OVER PKR 5,000',
      deliveryEstimatedDays: '2-4 Business Days',
    },
    create: {
      id: 'singleton',
      brandName: 'MS STORE',
      tagline: 'TIMELESS STYLE. EVERYDAY ESSENTIALS.',
      headline: 'ELEVATE YOUR EVERYDAY.',
      whatsappNumber: '447423759972',
      supportPhone: '+44 7423 759972',
      supportEmail: 'concierge@msstore.com',
      businessHours: 'Mon - Sat: 10:00 AM - 9:00 PM',
      instagramUrl: 'https://www.instagram.com/mubasherstarstore?rpxt=MWJ6cThzYWY2bnF0ag==',
      facebookUrl: '',
      tiktokUrl: 'https://www.tiktok.com/@ms.collection9?_r=1&_t=ZS-9AoGpDQ01Ps',
      currency: 'PKR',
      shippingFee: 250,
      freeShippingThreshold: 5000,
      announcementText: 'COMPLIMENTARY NATIONWIDE EXPRESS SHIPPING ON ORDERS OVER PKR 5,000',
      deliveryEstimatedDays: '2-4 Business Days',
      bankAccountDetails:
        'Bank: Standard Chartered Bank\nAccount Title: MS Store Retail\nAccount Number: 01-2345678-01\nIBAN: PK36SCBL0000001234567801',
      heroImageUrl:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
      heroSubtitle:
        'Discover timeless style with MS STORE. From sophisticated watches and premium wallets to modern eyewear, footwear, fragrances, and everyday essentials, find the perfect details to define your style.',
    },
  });

  // 2. Admin User & Test Customer
  const adminPasswordHash = await bcrypt.hash('Admin@MS2026', 10);
  await prisma.user.upsert({
    where: { email: 'admin@msstore.com' },
    update: {},
    create: {
      name: 'MS Store Administrator',
      email: 'admin@msstore.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      phone: '+44 7423 759972',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@mscollection.com' },
    update: {},
    create: {
      name: 'MS Store Executive',
      email: 'admin@mscollection.com',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
      phone: '+44 7423 759972',
    },
  });

  const customerPasswordHash = await bcrypt.hash('Customer@123', 10);
  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Test Customer',
      email: 'customer@example.com',
      passwordHash: customerPasswordHash,
      role: 'CUSTOMER',
      phone: '+92 321 9876543',
    },
  });

  // 3. Categories (9 categories specified by brand guidelines)
  const categories = [
    {
      id: 'watches',
      name: 'Watches',
      subtitle: 'Timeless designs for every moment.',
      description: 'Timeless designs for every moment.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 1,
      isActive: true,
    },
    {
      id: 'wallets',
      name: 'Wallets',
      subtitle: 'Everyday essentials with effortless style.',
      description: 'Everyday essentials with effortless style.',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 2,
      isActive: true,
    },
    {
      id: 'eyewear',
      name: 'Eyewear',
      subtitle: 'Find your look. Frame your style.',
      description: 'Find your look. Frame your style.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 3,
      isActive: true,
    },
    {
      id: 'clothing',
      name: 'Clothing',
      subtitle: 'Everyday fashion, made personal.',
      description: 'Everyday fashion, made personal.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 4,
      isActive: true,
    },
    {
      id: 'shoes',
      name: 'Shoes & Sneakers',
      subtitle: 'Step out with confidence.',
      description: 'Step out with confidence.',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 5,
      isActive: true,
    },
    {
      id: 'bags',
      name: 'Bags',
      subtitle: 'Carry your essentials in style.',
      description: 'Carry your essentials in style.',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 6,
      isActive: true,
    },
    {
      id: 'perfumes',
      name: 'Perfumes',
      subtitle: 'Discover fragrances that leave an impression.',
      description: 'Discover fragrances that leave an impression.',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 7,
      isActive: true,
    },
    {
      id: 'belts',
      name: 'Belts',
      subtitle: 'The finishing touch to your outfit.',
      description: 'The finishing touch to your outfit.',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 8,
      isActive: true,
    },
    {
      id: 'accessories',
      name: 'Accessories',
      subtitle: 'Small details. A big difference.',
      description: 'Small details. A big difference.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      sortOrder: 9,
      isActive: true,
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }

  // Remove legacy sneakers category and products if present
  try {
    await prisma.productVariant.deleteMany({
      where: { product: { categoryId: 'sneakers' } },
    });
    await prisma.product.deleteMany({
      where: { categoryId: 'sneakers' },
    });
    await prisma.category.deleteMany({
      where: { id: 'sneakers' },
    });
  } catch (e) {
    // ignore
  }

  // 4. Sample Products (Demonstration catalog clearly structured across all categories)
  const products = [
    {
      id: 'calligraphy-dial',
      name: 'Calligraphy Dial',
      slug: 'calligraphy-dial',
      sku: 'MSC-CALLIGRAPHY-DIAL',
      price: 3999,
      originalPrice: 4999,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Mastercrafted luxury timepiece with Arabic calligraphy dial, premium gold/steel finishing, and scratch-resistant crystal.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/4568DB88-EB84-4B79-9138-D7637ECD8943.png?v=1791476640&width=900',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Stainless Steel', 'Champagne Gold'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Stainless Steel Bracelet' },
    },
    {
      id: 'two-tone-semi-automatic-1',
      name: 'Two Tone Semi Automatic',
      slug: 'two-tone-semi-automatic-1',
      sku: 'MSC-TWO-TONE-SEMI-AUTOMATIC-1',
      price: 3350,
      originalPrice: 4200,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Luxury two-tone timepiece with semi-automatic sweep, gold accents, fluted bezel, and presidential bracelet.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/IMG-4577.jpg?v=1789504408&width=900',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Gold & Silver', 'Steel Silver'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Semi-Automatic', Strap: 'Stainless Steel Bracelet' },
    },
    {
      id: 'two-tone-semi-automatic-2',
      name: 'Two Tone semi automatic',
      slug: 'two-tone-semi-automatic-2',
      sku: 'MSC-TWO-TONE-SEMI-AUTOMATIC-2',
      price: 3350,
      originalPrice: 4200,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Submariner style two-tone semi automatic luxury watch with cyclops date magnifier and high-grade stainless steel bracelet.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/IMG-4596.jpg?v=1789504530&width=900',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Gold & Silver', 'Steel Silver'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Semi-Automatic', Strap: 'Stainless Steel Bracelet' },
    },
    {
      id: 'rolex-two-tone',
      name: 'Two Tone Classic',
      slug: 'rolex-two-tone',
      sku: 'MSC-ROLEX-TWO-TONE',
      price: 3250,
      originalPrice: 4000,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Iconic two-tone classic timepiece with fluted bezel, champagne gold accents, date window, and jubilee style strap.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/4BB3173A-6792-420A-A92C-E1102EECC8CD.jpg?v=1789504569&width=900',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Champagne Gold', 'Silver & Gold'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Jubilee Style Bracelet' },
    },
    {
      id: 'date-adjust-black',
      name: 'Date adjust Black',
      slug: 'date-adjust-black',
      sku: 'MSC-DATE-ADJUST-BLACK',
      price: 3250,
      originalPrice: 4000,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Onyx black dial Datejust luxury timepiece with fluted steel bezel and high-polish links.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/093C6EC4-05A4-481A-94C5-3FE4C3AB42E1.jpg?v=1789504647&width=900',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Onyx Black', 'Silver'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Stainless Steel Bracelet' },
    },
    {
      id: 'rolex-date-adjust-1',
      name: 'Date Adjust Silver',
      slug: 'rolex-date-adjust-1',
      sku: 'MSC-ROLEX-DATE-ADJUST-1',
      price: 3250,
      originalPrice: 4000,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Silver sunburst dial Datejust timepiece with fluted bezel and luxury presentation packaging.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/08686E44-2A16-4880-A622-3BE88C35DB23.jpg?v=1789504731&width=900',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Silver Sunburst', 'Pure Steel'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Stainless Steel Bracelet' },
    },
    {
      id: 'tissot-prx-1857',
      name: 'PRX 1853 (Ice Blue Dial)',
      slug: 'tissot-prx-1857',
      sku: 'MSC-TISSOT-PRX-1857',
      price: 3250,
      originalPrice: 4500,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Integrated luxury bracelet timepiece with waffle textured ice blue dial and brushed 316L stainless steel case.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/0941AC2D-6AFA-4E11-92A6-9B52DAEB0A9E.jpg?v=1789504816&width=900',
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Ice Blue', 'Silver'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Integrated Stainless Steel' },
    },
    {
      id: 'tissot-prx-1856',
      name: 'PRX 1853 (Onyx Black)',
      slug: 'tissot-prx-1856',
      sku: 'MSC-TISSOT-PRX-1856',
      price: 3250,
      originalPrice: 4500,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Integrated bracelet timepiece with waffle textured onyx black dial and 100m water resistance aesthetic.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/5EB67EB3-9655-4110-93F1-30635C954A0B.jpg?v=1789504888&width=900',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Onyx Black', 'Silver'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Integrated Stainless Steel' },
    },
    {
      id: 'tissot-prx-1855',
      name: 'PRX 1853 (Champagne Gold)',
      slug: 'tissot-prx-1855',
      sku: 'MSC-TISSOT-PRX-1855',
      price: 3250,
      originalPrice: 4500,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Gold PVD integrated bracelet timepiece with matching champagne dial and luminous hands.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/BBDDD274-F2EF-4A62-A1C4-8306CBDE80CB.jpg?v=1789504936&width=900',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Champagne Gold'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Gold Stainless Steel' },
    },
    {
      id: 'tissot-prx-1854',
      name: 'PRX 1853 (Silver White)',
      slug: 'tissot-prx-1854',
      sku: 'MSC-TISSOT-PRX-1854',
      price: 3250,
      originalPrice: 4500,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Silver white dial integrated bracelet luxury watch with rose gold tone accents and sleek profile.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/28FA0C72-4187-4EEF-9D6A-C6E0325AE8D9.jpg?v=1789504990&width=900',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Silver White', 'Rose Accents'],
      sizes: ['Standard 40mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '40mm', Movement: 'Precision Quartz', Strap: 'Integrated Stainless Steel' },
    },
    {
      id: 'hublot-big-bang',
      name: 'Hublot Big Bang Style Black',
      slug: 'hublot-big-bang',
      sku: 'MSC-HUBLOT-BIG-BANG',
      price: 4500,
      originalPrice: 6000,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Bold sportive luxury chronograph timepiece with rubber strap, exposed bezel screws, and multi-layer dial.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/6C5E3737-0E6C-4025-9D93-4C4A057488F8.jpg?v=1789505083&width=1200',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Matte Black', 'Rose Gold & Black'],
      sizes: ['Standard 44mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: '44mm', Movement: 'Chronograph Quartz', Strap: 'Black Ribbed Silicone' },
    },
    {
      id: 'cartier-tank',
      name: 'Cartier Tank Classic',
      slug: 'cartier-tank',
      sku: 'MSC-CARTIER-TANK',
      price: 3500,
      originalPrice: 4800,
      categoryId: 'watches',
      collection: 'signature',
      description: 'Rectangular vintage art-deco luxury dress watch with Roman numeral dial, blue cabochon crown, and black leather strap.',
      images: [
        'https://hkwristwear.store/cdn/shop/files/9C49C863-DE17-4F51-8CE4-16C687B68892.jpg?v=1789505490&width=1200',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=900&auto=format&fit=crop',
      ],
      colors: ['Gold / Black Leather', 'Silver / Black Leather'],
      sizes: ['Standard 34mm x 27mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: '20% OFF',
      stock: 25,
      inStock: true,
      details: ['Scratch-resistant glass lens', 'Luxury presentation case included', 'Open parcel inspection allowed'],
      specs: { Dial: 'Rectangular', Movement: 'Precision Quartz', Strap: 'Genuine Leather' },
    },
    {
      name: 'Classic Silver Chronograph Watch',
      slug: 'classic-silver-chronograph-watch',
      sku: 'MSC-WAT-001',
      price: 8500,
      originalPrice: 8500,
      categoryId: 'watches',
      collection: 'signature',
      description:
        'A sophisticated analog timepiece featuring a brushed stainless steel case, clean indices, and a scratch-resistant mineral crystal lens. Designed for timeless distinction.',
      images: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Silver / Black Dial', 'Silver / White Dial', 'All Black'],
      sizes: ['Standard 41mm'],
      isNew: true,
      isFeatured: true,
      discountBadge: null,
      stock: 14,
      inStock: true,
      details: [
        'Reliable Japanese quartz movement with functional sub-dials',
        'Brushed stainless steel case with polished bezel',
        'Scratch-resistant mineral crystal glass lens',
        'Everyday splash water resistance',
        'Adjustable stainless steel link bracelet with safety clasp',
      ],
      specs: {
        'Case Diameter': '41mm',
        'Case Thickness': '10.5mm',
        'Strap Width': '20mm',
        'Glass': 'Mineral Crystal',
      },
    },
    {
      name: 'Minimalist Matte Black Leather Watch',
      slug: 'minimalist-matte-black-leather-watch',
      sku: 'MSC-WAT-002',
      price: 6200,
      originalPrice: 6200,
      categoryId: 'watches',
      collection: 'essential',
      description:
        'Ultra-slim matte black case paired with a soft genuine leather strap and clean indices for effortless everyday elegance.',
      images: [
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Matte Black', 'Brushed Gunmetal'],
      sizes: ['Standard 39mm'],
      isNew: false,
      isFeatured: true,
      discountBadge: null,
      stock: 18,
      inStock: true,
      details: [
        'Slim profile designed for comfortable all-day wear',
        'Genuine leather band with stainless steel pin buckle',
        'Minimalist two-hand analog display',
        'Quick-release spring bars for easy strap adjustments',
      ],
      specs: {
        'Case Diameter': '39mm',
        'Strap Width': '18mm',
        'Movement': 'Japanese Quartz',
      },
    },
    {
      name: 'Classic Leather Bifold Wallet',
      slug: 'classic-leather-bifold-wallet',
      sku: 'MSC-WAL-001',
      price: 3500,
      originalPrice: 3500,
      categoryId: 'wallets',
      collection: 'essential',
      description:
        'Handcrafted from genuine leather with reinforced perimeter stitching, dual currency compartments, and dedicated card slots.',
      images: [
        'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Jet Black', 'Cognac Tan', 'Espresso Brown'],
      sizes: ['Standard Bifold'],
      isNew: false,
      isFeatured: true,
      discountBadge: null,
      stock: 22,
      inStock: true,
      details: [
        'Durable genuine cowhide leather exterior',
        '8 dedicated card slots + 2 hidden receipt sleeves',
        'Dual full-length billfold currency sections',
        'Slim profile that fits comfortably in trouser pockets',
      ],
      specs: {
        'Dimensions': '11.2cm × 9.4cm × 1.2cm',
        'Material': 'Genuine Cowhide Leather',
        'Capacity': 'Up to 10 Cards & Cash',
      },
    },
    {
      name: 'Slim Leather Cardholder',
      slug: 'slim-leather-cardholder',
      sku: 'MSC-WAL-002',
      price: 2200,
      originalPrice: 2200,
      categoryId: 'wallets',
      collection: 'essential',
      description:
        'An ultra-compact front-pocket cardholder featuring 4 card slots and a central pocket for folded notes.',
      images: [
        'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Black', 'Tan', 'Navy'],
      sizes: ['Compact Pocket Size'],
      isNew: true,
      isFeatured: false,
      discountBadge: null,
      stock: 30,
      inStock: true,
      details: [
        'Ultra-slim design for front-pocket carry',
        '4 external card slots and 1 central folded currency slot',
        'Debossed MS Collection insignia',
      ],
      specs: {
        'Dimensions': '10cm × 7.5cm',
        'Material': 'Top Grain Leather',
      },
    },
    {
      name: 'Polarized Aviator Sunglasses',
      slug: 'polarized-aviator-sunglasses',
      sku: 'MSC-EYE-001',
      price: 4800,
      originalPrice: 4800,
      categoryId: 'eyewear',
      collection: 'signature',
      description:
        'Lightweight alloy metal aviator frames fitted with polarized UV400 lenses for high-definition glare reduction and sharp clarity.',
      images: [
        'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Matte Black / Smoke Grey', 'Silver / Midnight Blue'],
      sizes: ['Universal Fit (58mm)'],
      isNew: true,
      isFeatured: true,
      discountBadge: null,
      stock: 16,
      inStock: true,
      details: [
        'UV400 category 3 polarized lenses',
        'Lightweight alloy metal frame with adjustable silicone nose pads',
        'Reinforced 5-barrel spring hinges',
        'Includes hard storage case and microfiber cloth',
      ],
      specs: {
        'Frame Width': '142mm',
        'Lens Width': '58mm',
        'Bridge': '15mm',
      },
    },
    {
      name: 'Tailored Heavyweight Cotton T-Shirt',
      slug: 'tailored-heavyweight-cotton-tshirt',
      sku: 'MSC-CLO-001',
      price: 2900,
      originalPrice: 2900,
      categoryId: 'clothing',
      collection: 'essential',
      description:
        'Cut from 260 GSM combed cotton with a clean relaxed silhouette, ribbed collar, and minimal detailing for effortless day-to-day style.',
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Pitch Black', 'Chalk White', 'Charcoal'],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: false,
      isFeatured: true,
      discountBadge: null,
      stock: 35,
      inStock: true,
      details: [
        '100% combed cotton (260 GSM) for a structured drape',
        'Pre-shrunk fabric to preserve fit after washing',
        'Dropped shoulder relaxed contemporary cut',
      ],
      specs: {
        'Care': 'Machine wash cold with like colors, air dry',
        'Fit': 'Contemporary Relaxed Fit',
      },
    },
    {
      name: 'Classic Leather Penny Loafers',
      slug: 'classic-leather-penny-loafers',
      sku: 'MSC-SHO-001',
      price: 9800,
      originalPrice: 9800,
      categoryId: 'shoes',
      collection: 'signature',
      description:
        'Refined leather penny loafers with hand-burnished toe finishing, cushioned insole, and a sturdy non-slip dress sole.',
      images: [
        'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Polished Onyx', 'Deep Tan'],
      sizes: ['40 (7)', '41 (8)', '42 (9)', '43 (10)', '44 (11)'],
      isNew: true,
      isFeatured: true,
      discountBadge: null,
      stock: 12,
      inStock: true,
      details: [
        'Genuine leather upper with natural grain texture',
        'Breathable interior lining and padded footbed',
        'Slip-on penny strap design suitable for formal or smart casual wear',
      ],
      specs: {
        'Upper': 'Genuine Leather',
        'Sole': 'Stacked Dress Sole with Rubber Traction Pad',
      },
    },
    {
      name: 'Minimalist Low-Top Leather Sneakers',
      slug: 'minimalist-low-top-leather-sneakers',
      sku: 'MSC-SHO-002',
      price: 8200,
      originalPrice: 8200,
      categoryId: 'shoes',
      collection: 'essential',
      description:
        'Clean low-profile cupsole sneaker crafted from soft smooth leather with tonal stitching and a vulcanized rubber sole.',
      images: [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Monochrome White', 'Triple Black', 'White / Black Heel Tab'],
      sizes: ['40', '41', '42', '43', '44'],
      isNew: true,
      isFeatured: true,
      discountBadge: null,
      stock: 18,
      inStock: true,
      details: [
        'Smooth leather exterior with clean minimal design',
        'Comfortable cushioned foam insole',
        'Durable vulcanized rubber cupsole',
      ],
      specs: {
        'Profile': 'Low-top minimalist',
        'Laces': 'Tonal cotton laces',
      },
    },
    {
      name: 'Midnight Amber Eau de Parfum (100ml)',
      slug: 'midnight-amber-eau-de-parfum',
      sku: 'MSC-PRF-001',
      price: 6800,
      originalPrice: 6800,
      categoryId: 'perfumes',
      collection: 'signature',
      description:
        'A balanced modern fragrance opening with fresh bergamot and pink pepper, unfurling into warm amber, cedarwood, and bourbon vanilla.',
      images: [
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Black Glass Bottle with Magnetic Cap'],
      sizes: ['100ml / 3.4 fl. oz.'],
      isNew: true,
      isFeatured: true,
      discountBadge: null,
      stock: 25,
      inStock: true,
      details: [
        'Eau de Parfum concentration for enduring sillage',
        'Heavyweight tinted glass bottle with magnetic atomiser cap',
        'Presented in signature MS Collection box',
      ],
      specs: {
        'Top Notes': 'Calabrian Bergamot, Black Pepper',
        'Heart Notes': 'Warm Cedar, Subtle Iris',
        'Base Notes': 'Amber Resin, Bourbon Vanilla',
      },
    },
    {
      name: 'Leather Weekender Travel Duffle Bag',
      slug: 'leather-weekender-travel-duffle-bag',
      sku: 'MSC-BAG-001',
      price: 12500,
      originalPrice: 12500,
      categoryId: 'bags',
      collection: 'signature',
      description:
        'Spacious 40-liter travel duffle bag crafted from durable textured leather with water-resistant lining, internal organizers, and an adjustable shoulder strap.',
      images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Midnight Black', 'Dark Brown'],
      sizes: ['40L Travel Size'],
      isNew: false,
      isFeatured: true,
      discountBadge: null,
      stock: 10,
      inStock: true,
      details: [
        'Durable textured leather exterior with water-resistant nylon interior',
        'Spacious main zip compartment with two interior slide pockets',
        'Reinforced dual top handles and detachable shoulder strap',
      ],
      specs: {
        'Dimensions': '50cm × 28cm × 25cm',
        'Capacity': '40 Liters',
        'Hardware': 'Brushed Metal Zippers',
      },
    },
    {
      name: 'Reversible Leather Dress Belt',
      slug: 'reversible-leather-dress-belt',
      sku: 'MSC-BLT-001',
      price: 3200,
      originalPrice: 3200,
      categoryId: 'belts',
      collection: 'essential',
      description:
        'Dual-sided genuine leather belt transitioning smoothly between sleek black and warm brown, finished with a rotatable brushed metal buckle.',
      images: [
        'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Reversible Black / Brown'],
      sizes: ['32', '34', '36', '38', '40'],
      isNew: false,
      isFeatured: false,
      discountBadge: null,
      stock: 22,
      inStock: true,
      details: [
        'Rotational clasp allows quick switching between Black and Brown sides',
        'Genuine 35mm wide leather strap',
        'Burnished edges for a clean modern finish',
      ],
      specs: {
        'Width': '35mm (1.38 inches)',
        'Buckle': 'Brushed Gunmetal Alloy',
      },
    },
    {
      name: 'Silver Cufflinks & Tie Bar Set',
      slug: 'silver-cufflinks-tie-bar-set',
      sku: 'MSC-ACC-001',
      price: 3400,
      originalPrice: 3400,
      categoryId: 'accessories',
      collection: 'gift',
      description:
        'A matching pair of polished silver-tone cufflinks and slim tie bar, engineered to add a refined finishing touch to tailored shirts.',
      images: [
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      ],
      colors: ['Polished Silver', 'Gunmetal Grey'],
      sizes: ['Standard Set'],
      isNew: true,
      isFeatured: true,
      discountBadge: null,
      stock: 18,
      inStock: true,
      details: [
        'Solid alloy construction with high-shine rhodium finish',
        'Bullet-back swivel toggle closures on cufflinks',
        'Includes presentation gift box',
      ],
      specs: {
        'Set Includes': '1 Pair Cufflinks + 1 Matching Tie Bar',
        'Finish': 'Polished Silver-Tone',
      },
    },
  ];

  for (const prod of products as any[]) {
    const existing =
      (prod.id ? await prisma.product.findUnique({ where: { id: prod.id } }) : null) ||
      (await prisma.product.findUnique({ where: { sku: prod.sku } })) ||
      (await prisma.product.findUnique({ where: { slug: prod.slug } }));
    const productData = {
      name: prod.name,
      slug: prod.slug,
      sku: prod.sku,
      price: prod.price,
      originalPrice: prod.originalPrice,
      categoryId: prod.categoryId,
      collection: prod.collection,
      description: prod.description,
      imagesJson: JSON.stringify(prod.images),
      colorsJson: JSON.stringify(prod.colors),
      sizesJson: JSON.stringify(prod.sizes),
      detailsJson: JSON.stringify(prod.details),
      specsJson: JSON.stringify(prod.specs),
      isNew: prod.isNew,
      isFeatured: prod.isFeatured,
      discountBadge: prod.discountBadge,
      stock: prod.stock,
      inStock: prod.inStock,
    };

    let savedProduct;
    if (existing) {
      savedProduct = await prisma.product.update({
        where: { id: existing.id },
        data: productData,
      });
    } else {
      savedProduct = await prisma.product.create({
        data: {
          ...(prod.id ? { id: prod.id } : {}),
          ...productData,
        },
      });
    }

    // Seed variants for color and size combinations
    for (const color of prod.colors) {
      for (const size of prod.sizes) {
        const variantSku = `${prod.sku}-${color.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '')}-${size.replace(/[^A-Z0-9]/g, '')}`;
        await prisma.productVariant.upsert({
          where: { sku: variantSku },
          update: {
            stock: Math.floor(prod.stock / (prod.colors.length * prod.sizes.length)) || 4,
          },
          create: {
            productId: savedProduct.id,
            sku: variantSku,
            color,
            size,
            stock: Math.floor(prod.stock / (prod.colors.length * prod.sizes.length)) || 4,
          },
        });
      }
    }
  }

  // 5. Coupons
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      description: '10% off your inaugural order',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minPurchase: 2000,
      isActive: true,
    },
  });

  await prisma.coupon.upsert({
    where: { code: 'ELEVATE500' },
    update: {},
    create: {
      code: 'ELEVATE500',
      description: 'Flat PKR 500 off on purchases above PKR 4,000',
      discountType: 'FIXED',
      discountValue: 500,
      minPurchase: 4000,
      isActive: true,
    },
  });

  // 6. Clearly distinguished Demonstration Order (Rule 13: Do not present sample orders as real customer orders)
  const classicWatch = await prisma.product.findUnique({
    where: { slug: 'classic-silver-chronograph-watch' },
  });
  if (classicWatch) {
    const existingOrder = await prisma.order.findUnique({
      where: { orderNumber: 'MSC-DEMO-2026-001' },
    });
    if (!existingOrder) {
      await prisma.order.create({
        data: {
          orderNumber: 'MSC-DEMO-2026-001',
          customerName: '[DEMO] Sample Customer',
          customerEmail: 'demo.customer@example.com',
          customerPhone: '03001234567',
          customerWhatsapp: '923001234567',
          city: 'Lahore',
          shippingAddress: JSON.stringify({
            fullName: '[DEMO] Sample Customer',
            phone: '03001234567',
            whatsapp: '923001234567',
            email: 'demo.customer@example.com',
            addressLine: 'Demo Address Line, Phase 5, DHA',
            city: 'Lahore',
            postalCode: '54000',
            notes: 'Sample test order for dashboard demonstration',
          }),
          subtotal: 8500,
          shippingFee: 0,
          discountAmount: 0,
          finalTotal: 8500,
          paymentMethod: 'CASH_ON_DELIVERY',
          paymentStatus: 'PENDING',
          orderStatus: 'CONFIRMED',
          orderNotes: '[SAMPLE DEMO ORDER] Demonstrates admin order fulfillment workflow.',
          items: {
            create: [
              {
                productId: classicWatch.id,
                name: classicWatch.name,
                sku: classicWatch.sku,
                price: 8500,
                quantity: 1,
                color: 'Silver / Black Dial',
                size: 'Standard 41mm',
                image:
                  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
                lineTotal: 8500,
              },
            ],
          },
          statusHistory: {
            create: [
              { status: 'PENDING', note: 'Sample demonstration order initialized' },
              { status: 'CONFIRMED', note: 'Sample order confirmed for workflow testing' },
            ],
          },
        },
      });
    }
  }

  // Clean up legacy fake reviews (Rule 13 compliance)
  await prisma.review.deleteMany({
    where: { customerEmail: { in: ['zainab@example.com', 'farhan@example.com', 'bilal@example.com'] } },
  });

  // Notice: In compliance with Rule 13, ZERO fake reviews are seeded.
  // Reviews are reserved for authentic customer feedback submitted via the store.

  console.log('MS Collection database seeded successfully with accurate brand data!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
