# Care.xyz — Baby Sitting & Elderly Care Service Platform

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-purple?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal?style=for-the-badge&logo=tailwindcss)

> A full-featured care services platform built with Next.js App Router and NextAuth.js — connecting families with verified caregivers across Bangladesh.

---

## 🌐 Live Demo

🔗 [https://care-xyz-baby-sitting-elderly-care.vercel.app](https://care-xyz-baby-sitting-elderly-care.vercel.app)

**Demo credentials:**
```
Email:    demo@care.xyz
Password: Demo@123
```

---

## 📌 Project Description

**Care.xyz** is a modern, responsive care services platform that allows families to discover and book professional caregivers for babysitting, elderly care, home nursing, sick care, disability support, and therapy. 

Built with Next.js 14 App Router, it features full authentication via NextAuth.js (Google OAuth + credentials), protected routes, service listing with search/filter, booking management, and admin-like service creation/deletion.

---

## ✨ Features

- 🔐 **Authentication** — Google OAuth + email/password via NextAuth.js
- 🛡️ **Protected Routes** — Add Service, Manage Services, My Bookings require login
- 🔍 **Search & Filter** — Real-time search + category filter on services page
- 📋 **Service Listing** — 6+ service cards with image, title, description, price, rating
- 📄 **Service Details** — Full detail page with features list, pricing, back button
- ➕ **Add Service** — Protected form with full validation and live preview
- ⚙️ **Manage Services** — Table/card view with View modal and Delete confirmation
- 📅 **My Bookings** — Booking history with status filter and cancellation
- 🎨 **Polished UI** — Playfair Display + DM Sans fonts, teal design system
- 📱 **Fully Responsive** — Mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Next.js 14** (App Router) | Frontend framework |
| **NextAuth.js v4** | Authentication (Google + Credentials) |
| **React 18** | UI library |
| **Tailwind CSS v3** | Styling |
| **react-hot-toast** | Toast notifications |
| **localStorage** | Client-side data persistence |
| **Vercel** | Deployment |

---

## 🗺️ Route Summary

| Route | Access | Description |
|---|---|---|
| `/` | Public | Landing page with 7 sections (Hero, Services, How It Works, Why Us, Testimonials, FAQ, CTA) |
| `/services` | Public | All services with search bar and category filter |
| `/services/[id]` | Public | Individual service detail page |
| `/about` | Public | About page with team and timeline |
| `/login` | Public | Sign in (Google OAuth + credentials) |
| `/register` | Public | Create account |
| `/booking/[id]` | 🔒 Protected | Book a specific service |
| `/my-bookings` | 🔒 Protected | View and cancel your bookings |
| `/add-service` | 🔒 Protected | Add a new service listing |
| `/manage-services` | 🔒 Protected | View, inspect, and delete your services |

---

## 🚀 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/najmulcodes/care-xyz.git
cd care-xyz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here  # generate with: openssl rand -base64 32

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> **Note:** The app works without Google OAuth — use the demo credentials `demo@care.xyz / Demo@123` with the credentials provider.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploy on Vercel

1. Push code to GitHub
2. Import repository at [vercel.com](https://vercel.com)
3. Add environment variables in **Settings → Environment Variables**
4. Deploy — Vercel auto-detects Next.js

---

## 🔑 Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable Google+ API
3. Credentials → Create OAuth 2.0 Client ID
4. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret to `.env.local`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...nextauth]/route.js   # NextAuth config
│   ├── page.js                           # Homepage (7 sections)
│   ├── layout.js                         # Root layout + providers
│   ├── globals.css                       # Design tokens + Tailwind
│   ├── login/page.js                     # Login page
│   ├── register/page.js                  # Register page
│   ├── about/page.js                     # About page
│   ├── services/
│   │   ├── page.js                       # Services listing
│   │   └── [id]/page.js                  # Service detail
│   ├── booking/[id]/page.js              # Booking form (protected)
│   ├── my-bookings/page.js               # Bookings list (protected)
│   ├── add-service/page.js               # Add service (protected)
│   └── manage-services/page.js           # Manage services (protected)
├── components/
│   ├── Navbar.js                         # Sticky navbar with dropdown
│   ├── Footer.js                         # Footer with links
│   ├── SessionProvider.js                # NextAuth session wrapper
│   └── ProtectedPage.js                  # Auth guard component
└── data/
    ├── services.js                       # Built-in service data
    └── locations.js                      # Bangladesh divisions/districts
```

---

## 👨‍💻 Author

**Najmul Islam (Shuvro)**
- GitHub: [@najmulcodes](https://github.com/najmulcodes)

---

## 📄 License

Educational project — built as part of a Next.js assignment.
