# Care.xyz — Baby Sitting & Elderly Care Service Platform

![Care.xyz](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-blue?style=for-the-badge&logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5.5-purple?style=for-the-badge)

> A reliable and trusted care service platform for children, elderly, and family members across Bangladesh.

## 🌐 Live Demo

🔗 https://care-xyz-baby-sitting-elderly-care.vercel.app/

---

## 📌 Project Overview

**Care.xyz** is a full-stack web application that allows users to find and hire professional caregivers for different purposes such as babysitting, elderly care, or special care at home. Users can easily book services through the platform, selecting their preferred duration and location — with the total cost calculated automatically.

---

## ✨ Features

- 🔐 **User Authentication** — Email & Password login + Google Social Login
- 📝 **Registration** — NID, Name, Email, Contact, with password validation (6+ chars, 1 uppercase, 1 lowercase)
- 📅 **Dynamic Booking** — Select duration (days/hours), location (Division → District → City → Area), and address
- 💰 **Total Cost Calculation** — Automatically calculated: `duration × service charge`
- 📋 **My Bookings Page** — Private route to track all bookings with status
- 🔒 **Private Routes** — Protected pages that redirect to login if not authenticated
- 📍 **Location Selector** — Cascading dropdowns for all 8 divisions of Bangladesh
- 📦 **Booking Status** — Pending / Confirmed / Completed / Cancelled
- 📱 **Responsive Design** — Mobile, tablet, and desktop supported

---

## 🗂️ Pages & Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Homepage with hero, services, testimonials | Public |
| `/services` | All services overview | Public |
| `/services/:id` | Individual service detail page | Public |
| `/booking/:id` | Book a service with full form | 🔒 Private |
| `/my-bookings` | View all your bookings | 🔒 Private |
| `/login` | Email/Password + Google login | Public |
| `/register` | Create a new account | Public |

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **Next.js 14** (App Router) | Frontend framework |
| **React 18** | UI library |
| **Firebase Auth** | Authentication |
| **Tailwind CSS** | Styling |
| **DaisyUI** | UI components |
| **localStorage** | Booking data storage |
| **Vercel** | Deployment |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.js               # Homepage
│   ├── layout.js             # Root layout
│   ├── login/page.js         # Login page
│   ├── register/page.js      # Register page
│   ├── services/
│   │   ├── page.js           # Services listing
│   │   └── [id]/page.js      # Service detail page
│   ├── booking/
│   │   └── [id]/page.js      # Booking form (private)
│   └── my-bookings/page.js   # My bookings (private)
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   ├── ServicesSection.js
│   └── PrivateRoute.js
├── context/
│   └── AuthContext.js
├── data/
│   ├── services.js
│   └── locations.js
└── lib/
    ├── firebase.js
    └── bookingStorage.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/najmulcodes/Care.xyz---Baby-Sitting-Elderly-Care-Service-Platform.git
cd Care.xyz---Baby-Sitting-Elderly-Care-Service-Platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Email/Password and Google providers
4. Copy your config values into `.env.local`

---

## ☁️ Deploy on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in **Settings → Environment Variables**
4. Click **Deploy** — Vercel auto-detects Next.js

---

## 📸 Screenshots

| Homepage | Services | Booking |
|----------|----------|---------|
| Hero banner with CTA | Service cards with pricing | Multi-step booking form |

---

## 👨‍💻 Author

**Najmul Islam**
- GitHub: [@najmulcodes](https://github.com/najmulcodes)

---

## 📄 License

This project is for educational purposes as part of a Next.js final assignment.

---

> Made with ❤️ using Next.js & Firebase
