"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    setDropOpen(false);
    setMenuOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-b border-slate-100"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              C
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-teal-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                Care
              </span>
              <span className="text-slate-900">.xyz</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative" ref={dropRef}>
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="avatar"
                        width={28}
                        height={28}
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-teal-700 font-bold text-xs">
                        {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0] || "User"}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{session.user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link href="/add-service" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                        <span>➕</span> Add Service
                      </Link>
                      <Link href="/manage-services" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                        <span>⚙️</span> Manage Services
                      </Link>
                      <Link href="/my-bookings" onClick={() => setDropOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                        <span>📋</span> My Bookings
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 py-1">
                      <button onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <span>🚪</span> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/register"
                  className="px-5 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full hover:bg-teal-700 transition-colors shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile right side — avatar chip + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {session && (
              <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700 font-bold text-xs">
                  {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}

            {/* Hamburger button — always visible on mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl border border-slate-200 bg-white active:bg-slate-50 transition-colors"
            >
              <span className={`block w-[18px] h-[2px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block h-[2px] bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-[18px]"}`} />
              <span className={`block w-[18px] h-[2px] bg-slate-700 rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 shadow-lg">
          {/* Nav links */}
          <nav className="px-4 pt-3 pb-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-teal-50 text-teal-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth section */}
          <div className="border-t border-slate-100 px-4 py-4">
            {session ? (
              <div className="space-y-1">
                {/* User info */}
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl mb-3">
                  <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-700 font-bold text-sm">
                      {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{session.user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                  </div>
                </div>
                <Link href="/add-service" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-colors">
                  <span>➕</span> Add Service
                </Link>
                <Link href="/manage-services" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-xl transition-colors">
                  <span>⚙️</span> Manage Services
                </Link>
                <button onClick={handleSignOut}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <span>🚪</span> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link href="/login" onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)}
                  className="w-full text-center py-3 text-sm font-semibold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}