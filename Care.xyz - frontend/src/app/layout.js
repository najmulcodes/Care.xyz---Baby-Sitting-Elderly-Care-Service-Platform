import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Care.xyz — Trusted Care Platform in Bangladesh",
  description:
    "Find verified caregivers for babysitting, elderly care, and home nursing across Bangladesh. Book trusted care in minutes.",
  keywords: "babysitting, elderly care, home nursing, Bangladesh, caregivers",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-cream-50 text-slate-900 antialiased overflow-x-hidden">
        <SessionProvider session={session}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                padding: "12px 16px",
                fontSize: "14px",
              },
              success: {
                iconTheme: { primary: "#0d9488", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
