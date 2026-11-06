"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding MS Collection database...');
    // 1. Store Settings
    await prisma.storeSettings.upsert({
        where: { id: 'singleton' },
        update: {},
        create: {
            id: 'singleton',
            brandName: 'MS COLLECTION',
            tagline: 'TIMELESS STYLE. EVERYDAY ESSENTIALS.',
            headline: 'ELEVATE YOUR EVERYDAY.',
            whatsappNumber: '923001234567',
            supportPhone: '+92 300 1234567',
            supportEmail: 'concierge@mscollection.com',
            businessHours: 'Mon - Sat: 10:00 AM - 9:00 PM PKT',
            instagramUrl: 'https://instagram.com/mscollection',
            facebookUrl: 'https://facebook.com/mscollection',
            currency: 'PKR',
            shippingFee: 250,
            freeShippingThreshold: 5000,
            announcementText: 'COMPLIMENTARY NATIONWIDE EXPRESS SHIPPING ON ORDERS OVER PKR 5,000',
            deliveryEstimatedDays: '2-4 Business Days',
            bankAccountDetails: 'Bank: Standard Chartered Bank\nAccount Title: MS Collection Luxury Retail\nAccount Number: 01-2345678-01\nIBAN: PK36SCBL0000001234567801',
            heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
            heroSubtitle: 'Discover timeless style, refined accessories, and everyday essentials curated for your individuality.',
        },
    });
    // 2. Admin User & Test Customer
    const adminPasswordHash = await bcryptjs_1.default.hash('Admin@MS2026', 10);
    await prisma.user.upsert({
        where: { email: 'admin@mscollection.com' },
        update: {},
        create: {
            name: 'MS Collection Executive',
            email: 'admin@mscollection.com',
            passwordHash: adminPasswordHash,
            role: 'ADMIN',
            phone: '+92 300 1234567',
        },
    });
    const customerPasswordHash = await bcryptjs_1.default.hash('Customer@123', 10);
    await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            name: 'Tariq Al-Mansoor',
            email: 'customer@example.com',
            passwordHash: customerPasswordHash,
            role: 'CUSTOMER',
            phone: '+92 321 9876543',
        },
    });
    // 3. Categories
    const categories = [
        {
            id: 'watches',
            name: 'Timepieces & Watches',
            subtitle: 'Precision & Heritage',
            description: 'Mastercrafted wristwatches engineered with surgical steel, sapphire crystal, and timeless silhouettes.',
            image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 1,
        },
        {
            id: 'wallets',
            name: 'Leather Wallets',
            subtitle: 'Refined Utility',
            description: 'Full-grain bifold and minimalist cardholder wallets with RFID protection and hand-stitched borders.',
            image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 2,
        },
        {
            id: 'eyewear',
            name: 'Eyewear & Sunglasses',
            subtitle: 'Iconic Frames',
            description: 'Polarized lenses and Italian acetate frames sculpted for sharp definition and effortless presence.',
            image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 3,
        },
        {
            id: 'clothing',
            name: 'Apparel & Clothing',
            subtitle: 'Sartorial Elegance',
            description: 'Tailored monochromatic essentials, heavyweight tees, structured blazers, and luxury knitwear.',
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 4,
        },
        {
            id: 'shoes',
            name: 'Formal Shoes & Loafers',
            subtitle: 'Distinguished Strides',
            description: 'Hand-burnished leather oxfords, monk straps, and velvet evening slippers made for milestone occasions.',
            image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 5,
        },
        {
            id: 'sneakers',
            name: 'Luxury Sneakers',
            subtitle: 'Modern Minimalism',
            description: 'Low-top Italian nappa leather sneakers with vulcanized soles and subtle metallic branding.',
            image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 6,
        },
        {
            id: 'perfumes',
            name: 'Haute Parfumerie',
            subtitle: 'Signature Scents',
            description: 'Artisanal extrait de parfum featuring smoky oud, ambergris, bergamot, and nocturnal floral notes.',
            image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 7,
        },
        {
            id: 'bags',
            name: 'Bags & Briefcases',
            subtitle: 'Architectural Carry',
            description: 'Sleek weekenders, architectural crossbodies, and pebble-grain briefcases designed for modern journeys.',
            image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 8,
        },
        {
            id: 'belts',
            name: 'Belts & Buckles',
            subtitle: 'Clean Finishes',
            description: 'Reversible calfskin leather belts with brushed palladium and matte black monogram buckles.',
            image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 9,
        },
        {
            id: 'accessories',
            name: 'Fashion Accessories',
            subtitle: 'Subtle Accents',
            description: 'Sterling silver cuff links, braided leather bracelets, tie bars, and key rings that complete the look.',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
            sortOrder: 10,
        },
    ];
    for (const cat of categories) {
        await prisma.category.upsert({
            where: { id: cat.id },
            update: cat,
            create: cat,
        });
    }
    // 4. Products
    const products = [
        {
            name: 'Classic Silver Chronograph',
            slug: 'classic-silver-chronograph',
            sku: 'MSC-WAT-001',
            price: 8500,
            originalPrice: 10500,
            categoryId: 'watches',
            collection: 'signature',
            description: 'An iconic timepiece pairing a brushed 316L stainless steel case with an onyx dial, luminous silver hands, and a sapphire-coated crystal lens. Built for timeless distinction.',
            images: [
                'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Silver / Black Dial', 'Silver / White Dial', 'All Black'],
            sizes: ['Standard 41mm'],
            isNew: true,
            isFeatured: true,
            discountBadge: '20% OFF',
            stock: 14,
            inStock: true,
            details: [
                'Japanese Quartz Movement with 3 functional sub-dials',
                '316L Surgical-Grade Stainless Steel Casing',
                'Anti-reflective scratch-resistant sapphire coating',
                '5 ATM Water Resistance (50 Meters)',
                'Interchangeable stainless steel oyster bracelet',
            ],
            specs: {
                'Case Diameter': '41mm',
                'Case Thickness': '10.5mm',
                'Strap Width': '20mm',
                'Glass': 'Sapphire Crystal Coated',
            },
        },
        {
            name: 'Noir Minimalist Leather Timepiece',
            slug: 'noir-minimalist-leather-timepiece',
            sku: 'MSC-WAT-002',
            price: 6200,
            originalPrice: 7500,
            categoryId: 'watches',
            collection: 'essential',
            description: 'Ultra-slim matte black casing complemented by a soft genuine Italian calfskin leather strap and subtle silver hour markers.',
            images: [
                'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Matte Black', 'Brushed Gunmetal'],
            sizes: ['Standard 39mm'],
            isNew: false,
            isFeatured: true,
            stock: 9,
            inStock: true,
            details: [
                'Ultra-thin 7.8mm profile for effortless cuff sliding',
                'Supple top-grain calfskin band with quick-release pins',
                'Minimalist two-hand analog display',
            ],
            specs: {
                'Case Diameter': '39mm',
                'Strap Width': '18mm',
            },
        },
        {
            name: 'Executive Leather Bifold Wallet',
            slug: 'executive-leather-bifold-wallet',
            sku: 'MSC-WAL-001',
            price: 3500,
            originalPrice: 4200,
            categoryId: 'wallets',
            collection: 'essential',
            description: 'Handcrafted from vegetable-tanned full grain leather with hand-waxed perimeter stitching, RFID blocking lining, and dual currency compartments.',
            images: [
                'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Jet Black', 'Cognac Tan', 'Espresso Brown'],
            sizes: ['Standard Bifold'],
            isNew: false,
            isFeatured: true,
            discountBadge: 'POPULAR',
            stock: 22,
            inStock: true,
            details: [
                'Full-grain vegetable-tanned cowhide leather',
                '8 dedicated card slots + 2 hidden receipt sleeves',
                'Built-in military-grade RFID blocking mesh',
                'Embossed MS Collection crown inside',
            ],
            specs: {
                'Dimensions': '11.2cm × 9.4cm × 1.2cm',
                'Material': 'Full Grain Cowhide',
                'Capacity': 'Up to 12 Cards & Flat Cash',
            },
        },
        {
            name: 'Aero Titanium Polarized Sunglasses',
            slug: 'aero-titanium-polarized-sunglasses',
            sku: 'MSC-EYE-001',
            price: 4800,
            originalPrice: 5800,
            categoryId: 'eyewear',
            collection: 'signature',
            description: 'Sculpted lightweight titanium alloy aviator frame fitted with high-definition polarized TAC lenses that eliminate 99.9% of glare.',
            images: [
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Matte Black / Smoke Grey', 'Silver / Midnight Blue'],
            sizes: ['Universal Fit (58mm)'],
            isNew: true,
            isFeatured: true,
            stock: 12,
            inStock: true,
            details: [
                'UV400 100% UVA/UVB protection category 3 lenses',
                'Featherlight titanium structure weighing under 24g',
                'Reinforced 5-barrel hinges with spring flex',
            ],
            specs: {
                'Frame Width': '142mm',
                'Lens Width': '58mm',
                'Bridge': '15mm',
            },
        },
        {
            name: 'Tailored Heavyweight Oversized Tee',
            slug: 'tailored-heavyweight-oversized-tee',
            sku: 'MSC-CLO-001',
            price: 2900,
            originalPrice: 3500,
            categoryId: 'clothing',
            collection: 'essential',
            description: 'Crafted from 280 GSM combed luxury cotton with a structured boxy silhouette, thick ribbed collar, and minimal embroidered insignia.',
            images: [
                'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Pitch Black', 'Pure Chalk White', 'Slate Charcoal'],
            sizes: ['S', 'M', 'L', 'XL'],
            isNew: false,
            isFeatured: true,
            stock: 35,
            inStock: true,
            details: [
                '100% Combed Compact Cotton 280 GSM',
                'Pre-shrunk fabric to prevent post-wash deformation',
                'Drop shoulder ergonomic cut',
            ],
            specs: {
                'Care': 'Machine wash cold inside out, hang dry',
                'Fit': 'Contemporary Relaxed Fit',
            },
        },
        {
            name: 'Monaco Hand-Stitched Leather Loafers',
            slug: 'monaco-hand-stitched-leather-loafers',
            sku: 'MSC-SHO-001',
            price: 11500,
            originalPrice: 14000,
            categoryId: 'shoes',
            collection: 'signature',
            description: 'Refined Italian leather penny loafers with hand-burnished patination, cushioned leather footbed, and Goodyear-welted rubber-injected sole.',
            images: [
                'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Polished Onyx', 'Deep Mahogany'],
            sizes: ['40 (7)', '41 (8)', '42 (9)', '43 (10)', '44 (11)'],
            isNew: true,
            isFeatured: true,
            discountBadge: 'LUXURY',
            stock: 8,
            inStock: true,
            details: [
                'Imported calfskin upper with natural grain',
                'Breathable sheepskin lining for all-day comfort',
                'Hand-burnished toe finish',
            ],
            specs: {
                'Origin': 'Handcrafted by Master Cordwainers',
                'Sole': 'Stacked leather with anti-slip rubber insert',
            },
        },
        {
            name: 'Urban Luxe Minimalist Sneaker',
            slug: 'urban-luxe-minimalist-sneaker',
            sku: 'MSC-SNK-001',
            price: 8900,
            originalPrice: 11000,
            categoryId: 'sneakers',
            collection: 'essential',
            description: 'Pristine low-profile cupsole sneaker sculpted from butter-soft Italian nappa leather with waxed cotton laces and debossed silver crown logo.',
            images: [
                'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Monochrome White', 'Triple Black', 'White / Black Heel'],
            sizes: ['40', '41', '42', '43', '44'],
            isNew: true,
            isFeatured: true,
            stock: 18,
            inStock: true,
            details: [
                'Premium Nappa calfskin exterior',
                'Removable memory foam insole',
                'Vulcanized margom-style rubber cupsole',
            ],
            specs: {
                'Profile': 'Low-top minimalist',
                'Laces': 'Waxed organic cotton',
            },
        },
        {
            name: 'Midnight Amber Extrait de Parfum (100ml)',
            slug: 'midnight-amber-extrait-de-parfum',
            sku: 'MSC-PRF-001',
            price: 7200,
            originalPrice: 8500,
            categoryId: 'perfumes',
            collection: 'signature',
            description: 'An enigmatic fragrance opening with Calabrian bergamot and pink pepper, unfurling into dark oud wood, bourbon vanilla, and smoky ambergris.',
            images: [
                'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Black Lacquered Bottle with Magnetic Cap'],
            sizes: ['100ml / 3.4 fl. oz.'],
            isNew: true,
            isFeatured: true,
            discountBadge: 'BEST SELLER',
            stock: 25,
            inStock: true,
            details: [
                'Extrait de Parfum 30% oil concentration',
                'Over 14+ hours longevity on skin and fabric',
                'Heavyweight crystal glass with magnetic atomiser',
            ],
            specs: {
                'Top Notes': 'Calabrian Bergamot, Black Pepper, Saffron',
                'Heart Notes': 'Smoky Birch, Iris, Bulgarian Rose',
                'Base Notes': 'Aged Agarwood (Oud), Ambergris, Bourbon Vanilla',
            },
        },
        {
            name: 'Voyager Pebble Leather Weekender Duffle',
            slug: 'voyager-pebble-leather-weekender-duffle',
            sku: 'MSC-BAG-001',
            price: 13500,
            originalPrice: 16500,
            categoryId: 'bags',
            collection: 'signature',
            description: 'Spacious 42-liter travel companion sculpted from heavy pebble-grain leather with waterproof lining, separate shoe compartment, and padded shoulder strap.',
            images: [
                'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Obsidian Black', 'Cognac Tan'],
            sizes: ['42L Travel Size'],
            isNew: false,
            isFeatured: true,
            stock: 7,
            inStock: true,
            details: [
                'Full pebble-grain leather construction',
                'Dedicated ventilated shoe tunnel',
                'TSA-approved carry-on dimensions',
                'Reinforced luggage trolley pass-through sleeve',
            ],
            specs: {
                'Dimensions': '52cm × 28cm × 26cm',
                'Capacity': '42 Liters',
                'Hardware': 'Brushed Gunmetal YKK Zippers',
            },
        },
        {
            name: 'Reversible Palladium Buckle Leather Belt',
            slug: 'reversible-palladium-buckle-leather-belt',
            sku: 'MSC-BLT-001',
            price: 3200,
            originalPrice: 3800,
            categoryId: 'belts',
            collection: 'essential',
            description: 'Dual-sided luxury calfskin belt transitioning smoothly between sleek onyx black and rich chestnut brown, finished with a rotatable brushed palladium buckle.',
            images: [
                'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Reversible Black / Brown'],
            sizes: ['32', '34', '36', '38', '40'],
            isNew: false,
            isFeatured: false,
            stock: 19,
            inStock: true,
            details: [
                'Rotational clasp allows switching between Black and Brown in seconds',
                'Full grain 35mm wide strap',
                'Feathered and burnished edge coat',
            ],
            specs: {
                'Width': '35mm (1.38 inches)',
                'Buckle': 'Brushed Palladium Alloy',
            },
        },
        {
            name: 'Sterling Silver Crown Monogram Cufflinks',
            slug: 'sterling-silver-crown-monogram-cufflinks',
            sku: 'MSC-ACC-001',
            price: 3800,
            originalPrice: 4500,
            categoryId: 'accessories',
            collection: 'gift',
            description: 'Solid 925 sterling silver cufflinks precision-engraved with the MS Collection royal crown insignia, finished with a rhodium anti-tarnish coating.',
            images: [
                'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
            ],
            colors: ['Polished Silver', 'Black Onyx & Silver'],
            sizes: ['Standard Cufflink'],
            isNew: true,
            isFeatured: true,
            discountBadge: 'GIFT BOX INCLUDED',
            stock: 15,
            inStock: true,
            details: [
                'Solid 925 Hallmarked Sterling Silver',
                'Bullet-back swivel toggle closure',
                'Includes lacquered wooden presentation gift box',
            ],
            specs: {
                'Diameter': '16mm',
                'Weight': '14.2g pair',
            },
        },
    ];
    for (const prod of products) {
        const existing = await prisma.product.findUnique({ where: { slug: prod.slug } });
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
                where: { slug: prod.slug },
                data: productData,
            });
        }
        else {
            savedProduct = await prisma.product.create({
                data: productData,
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
    // 6. Seed a sample demonstrated order
    const classicWatch = await prisma.product.findUnique({ where: { slug: 'classic-silver-chronograph' } });
    if (classicWatch) {
        const existingOrder = await prisma.order.findUnique({ where: { orderNumber: 'MSC-20261015-8841' } });
        if (!existingOrder) {
            await prisma.order.create({
                data: {
                    orderNumber: 'MSC-20261015-8841',
                    customerName: 'Hamza Khan',
                    customerEmail: 'hamza.khan@example.com',
                    customerPhone: '03001234567',
                    customerWhatsapp: '923001234567',
                    city: 'Lahore',
                    shippingAddress: JSON.stringify({
                        fullName: 'Hamza Khan',
                        phone: '03001234567',
                        whatsapp: '923001234567',
                        email: 'hamza.khan@example.com',
                        addressLine: 'House 42, Block Y, Phase 3, DHA',
                        city: 'Lahore',
                        postalCode: '54000',
                        notes: 'Leave with reception if not home',
                    }),
                    subtotal: 8500,
                    shippingFee: 0,
                    discountAmount: 0,
                    finalTotal: 8500,
                    paymentMethod: 'CASH_ON_DELIVERY',
                    paymentStatus: 'PENDING',
                    orderStatus: 'CONFIRMED',
                    orderNotes: 'Customer requested gift packaging',
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
                                image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
                                lineTotal: 8500,
                            },
                        ],
                    },
                    statusHistory: {
                        create: [
                            { status: 'PENDING', note: 'Order placed by customer via store' },
                            { status: 'CONFIRMED', note: 'Order verified and confirmed by MS Collection concierge' },
                        ],
                    },
                },
            });
        }
    }
    // 7. Seed sample reviews
    if (classicWatch) {
        const existingReview = await prisma.review.findFirst({ where: { productId: classicWatch.id } });
        if (!existingReview) {
            await prisma.review.create({
                data: {
                    productId: classicWatch.id,
                    customerName: 'Zainab Malik',
                    customerEmail: 'zainab@example.com',
                    rating: 5,
                    title: 'Unbelievable craftsmanship',
                    comment: 'The weight, the brushed finish on the steel, and the sapphire coating are beyond my expectations. Truly rivaling international luxury houses.',
                    isVerifiedPurchase: true,
                    isApproved: true,
                },
            });
        }
    }
    console.log('MS Collection database seeded successfully!');
}
main()
    .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
