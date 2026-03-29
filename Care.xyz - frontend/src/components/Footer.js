import Link from "next/link";

const footerLinks = {
  Services: [
    { href: "/services/babysitting", label: "Baby Sitting" },
    { href: "/services/elderly", label: "Elderly Care" },
    { href: "/services/sickcare", label: "Sick Care" },
    { href: "/services/nursing", label: "Home Nursing" },
    { href: "/services/therapy", label: "Therapy at Home" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "All Services" },
    { href: "/my-bookings", label: "My Bookings" },
    { href: "/add-service", label: "List a Service" },
  ],
  Account: [
    { href: "/login", label: "Sign In" },
    { href: "/register", label: "Register" },
    { href: "/manage-services", label: "Manage Products" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="text-lg font-bold">
                <span className="text-teal-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Care
                </span>
                <span className="text-white">.xyz</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs mb-6">
              Making caregiving easy, safe, and accessible for every family across Bangladesh.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-teal-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <span>© 2026 Care.xyz. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
