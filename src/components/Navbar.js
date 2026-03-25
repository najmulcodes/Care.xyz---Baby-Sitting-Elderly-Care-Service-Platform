"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600 tracking-tight flex-shrink-0">
          Care<span className="text-gray-900">.xyz</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>

          {user ? (
            <>
              <Link href="/my-bookings" className="hover:text-blue-600 transition-colors">
                My Bookings
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs truncate max-w-[140px]">
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="hover:text-blue-600 transition-colors">Login</Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-gray-700 transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 flex flex-col gap-3 text-sm font-medium">
          <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/services" onClick={() => setMenuOpen(false)} className="py-2 hover:text-blue-600 transition-colors">Services</Link>

          {user ? (
            <>
              <Link href="/my-bookings" onClick={() => setMenuOpen(false)} className="py-2 hover:text-blue-600 transition-colors">
                My Bookings
              </Link>
              <p className="text-gray-400 text-xs truncate">{user.displayName || user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="py-2 hover:text-blue-600 transition-colors">Login</Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
