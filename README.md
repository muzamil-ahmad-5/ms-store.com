# MS COLLECTION — Luxury Fashion & Lifestyle E-Commerce Platform

> **"TIMELESS STYLE. EVERYDAY ESSENTIALS."**

MS COLLECTION is a complete, production-grade luxury e-commerce platform featuring an interactive 3D WebGL experience, physics-driven mouse tilt animations, spring-physics sliding tabs, verified catalog management, direct WhatsApp concierge commerce, and a secure administration suite.

---

## 🌟 Visual Identity & 3D Interactive Features

### 👑 Interactive 3D Brand Crest (`Logo3D.tsx`)
- **Three.js WebGL Metallic Emblem**: Embossed coin/crest disc with brushed platinum rim and titanium obsidian core displaying the official **MS Collection Crown & Monogram**.
- **Dynamic Specular Lighting**: Real-time cursor-following point lights and directional illumination providing true metal sheen and reflections.
- **Continuous Physics Turntable Rotation**: Elegant idle turntable rotation with smooth mouse gyro response and inertia damping.
- **Embedded Everywhere**: Active in the sticky Navigation Header, Fullscreen Intro Loader, Hero Centerpiece, and Footer.

### 🎴 Pro 3D Perspective Tilt (`Card3D.tsx`)
- **Physics Card Tilt**: 3D perspective transforms (`rotateX`, `rotateY`, `perspective: 1000px`) following cursor coordinates with spring reset.
- **Dynamic Specular Light Glare**: A realistic sheen layer sweeping across each card based on cursor angle.
- **Applied to**: Product catalog cards, Category tiles, Style Lookbook collections, Brand commitments, and Product Zoom showcases.

### 📑 Spring Animated Tabs System (`AnimatedTabs.tsx`)
- **Framer Motion Sliding Pill Physics**: Active indicator smoothly slides between tabs using spring physics (`stiffness: 500, damping: 38`), preventing abrupt UI shifts.
- **Smooth Content Transitions (`AnimatedTabContent`)**: Directional blur-fade animations when switching between tab panels.
- **Integrated Across**:
  - **Product Details**: *Craft & Features*, *Specifications*, *Delivery & Policy*, *Client Reviews*.
  - **Homepage Curations**: *All Curations*, *Timepieces*, *Haute Parfumerie*, *Fine Leather*, *Eyewear*.
  - **Shop Catalog**: Dynamic category filter pills.
  - **Client Policies**: *Delivery*, *Returns*, *Payment Methods*, *Privacy*, *Terms*.
  - **Admin Orders Suite**: Order lifecycle tabs (*ALL*, *PENDING*, *CONFIRMED*, *PROCESSING*, *PACKED*, *DISPATCHED*, *DELIVERED*).

### 🌌 Ambient 3D Atmosphere (`Background3D.tsx`)
- High-efficiency 3D projection canvas generating drifting silver dust particles and depth parallax reacting to mouse movement.

---

## 🛍️ Core Customer Features

- **Storefront & Catalog**:
  - 10 luxury categories: Watches, Wallets, Eyewear, Clothing, Shoes, Sneakers, Perfumes, Bags, Belts, Accessories.
  - Live search with instant debounce, price sliders (in PKR), availability toggles, and sorting.
  - Magnifying zoom on product gallery images, color/finish and size variant pickers.
- **Shopping & Concierge WhatsApp Commerce**:
  - One-click **Order on WhatsApp** generating formatted `wa.me` links with customer cart, item quantities, SKU numbers, and delivery address.
  - Floating concierge widget for direct size advice and bespoke inquiries.
  - Slide-out Cart Drawer and dedicated Cart Page with free delivery progress meter and coupon validation (`WELCOME10`, `MSLUXURY`).
  - Cash on Delivery (COD) and Direct Bank Transfer checkout with instant server-side order calculation and inventory reservation.
  - Self-service **Order Tracking** via order number and phone/email with live fulfillment stepper.
  - Persistent Wishlist, Product Comparison Matrix, and Gift Curation Gallery.

---

## 🛡️ Admin Suite (`/admin`)

- **Role-Based Access Control (RBAC)**: Protected with JWT and server-side role verification.
- **Operational Dashboard**: Real-time sales metrics, order status breakdown, low-inventory alerts, and recent customer inquiry logs.
- **Order Management**: Search, filter by lifecycle status tabs, update fulfillment status with custom dispatch notes, and record payment clearance.
- **Inventory Control**: Live stock adjustments with inline editing and automatic out-of-stock badges.
- **Review Moderation**: Approve or withhold client reviews and view verified-buyer tags.
- **Store Configuration**: Live editing of WhatsApp concierge number, support phone/email, TikTok / Instagram / Facebook channels, flat shipping rates, complimentary shipping thresholds, and marquee announcement text.

---

## 🏗️ Architecture & Technology Stack

```
MS-Collection/
├── assets/logo/             # Official SVG & High-res PNG brand assets
├── backend/                 # Node.js + Express + TypeScript + Prisma ORM
│   ├── prisma/              # Dual schema: SQLite (dev) & PostgreSQL (prod)
│   ├── src/controllers/     # Auth, Products, Orders, Admin, Reviews, Settings
│   ├── src/tests/           # Vitest integration test suite (8/8 passing)
│   └── Dockerfile           # Multi-stage production build
├── frontend/                # React 18 + TypeScript + Vite + Tailwind + Framer Motion
│   ├── src/components/      # 3D Components, Product Cards, Cart, Admin
│   ├── src/pages/           # 17+ Full-featured responsive pages
│   ├── nginx.conf           # Production Nginx reverse proxy with gzip & caching
│   └── Dockerfile           # Frontend production image
├── docs/                    # Architecture, API Spec, Security, Deployment
├── docker-compose.yml       # Production Docker orchestration (Postgres + API + Nginx)
└── Launch-MS-Collection.bat # Windows one-click startup script
```

---

## 🚀 Running Locally

### Option 1: One-Click Windows Launcher
Double-click `Launch-MS-Collection.bat` in the project root to start both servers and automatically open your default browser to `http://localhost:5173`.

### Option 2: Terminal Commands

```bash
# 1. Start Backend API (Port 5000)
cd backend
npm run dev

# 2. In a second terminal, start Frontend (Port 5173)
cd frontend
npm run dev
```

Visit **http://localhost:5173** to explore the storefront.

---

## 🔑 Default Accounts

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@mscollection.com` | `Admin@MS2026` |
| **Verified Customer** | `customer@example.com` | `Customer@123` |

---

## 🧪 Testing

Run the automated integration test suite:
```bash
cd backend
npm test
```
All **8 critical workflow tests** pass 100% (health check, public settings, category queries, live search, RBAC rejection, admin login, order placement with stock reduction, and coupon validation).

---

## 🐳 Production Deployment with Docker

To deploy the complete production stack (PostgreSQL + Express API + Nginx SPA) with a single command:

```bash
docker-compose up -d --build
```
This runs PostgreSQL on port 5432, Backend on port 5000, and Nginx serving the compiled 3D storefront on port 80 with gzip compression and security headers.

---

## ⚡ Instant Vercel Deployment

Deploying MS COLLECTION on Vercel is fully pre-configured with SPA routing rewrites:

### Option 1: One-Click Helper (Windows)
Double-click [Deploy-To-Vercel.bat](file:///c:/Users/Muzamil/Desktop/MS-Collection/Deploy-To-Vercel.bat) and choose `1` to deploy directly to Vercel production using the Vercel CLI.

### Option 2: Deploy from GitHub (Vercel Web Dashboard)
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `MS-Collection`.
3. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` (or leave default `./`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your live link will be `https://<your-project>.vercel.app`.

---

## 🚀 Instant Netlify Hosting (Drag & Drop)

You can host and launch MS COLLECTION on Netlify in 10 seconds:

1. Double-click [Deploy-To-Netlify.bat](file:///c:/Users/Muzamil/Desktop/MS-Collection/Deploy-To-Netlify.bat) or open [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop [MS-Collection-Netlify-Deploy.zip](file:///c:/Users/Muzamil/Desktop/MS-Collection/MS-Collection-Netlify-Deploy.zip) (or the `frontend/dist` directory) into the browser window.
3. Netlify will generate your permanent `https://<site-name>.netlify.app` link with full SPA routing (`_redirects`) and 3D moving animations.

---

## 🌐 Active Public Links (Worldwide Access - Any Wi-Fi / Mobile 4G/5G)

* **Worldwide Live Storefront**: https://ms-collection-luxury.loca.lt
* **Mobile Simulator with QR Code**: https://ms-collection-luxury.loca.lt/mobile
* **Admin Control Center**: https://ms-collection-luxury.loca.lt/admin (`admin@mscollection.com` / `Admin@MS2026`)
* **Tunnel Verification Password** (if prompted on mobile): `110.38.179.10`
* **Local Home/Office Wi-Fi**: http://192.168.100.7:5173

### 📱 Official Brand & Social Channels
* **TikTok**: [https://tiktok.com/@mscollection](https://tiktok.com/@mscollection)
* **Instagram**: [https://instagram.com/mscollection](https://instagram.com/mscollection)
* **WhatsApp Concierge**: [https://wa.me/923001234567](https://wa.me/923001234567)
