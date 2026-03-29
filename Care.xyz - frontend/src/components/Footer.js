import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <Link href="/" className="text-xl font-bold text-blue-600">Care<span className="text-gray-900">.xyz</span></Link>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">Making caregiving easy, safe, and accessible for every family in Bangladesh.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/services" className="hover:text-blue-600">Services</Link></li>
              <li><Link href="/my-bookings" className="hover:text-blue-600">My Bookings</Link></li>
              <li><Link href="/login" className="hover:text-blue-600">Login</Link></li>
              <li><Link href="/register" className="hover:text-blue-600">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/services/babysitting" className="hover:text-blue-600">Baby Sitting</Link></li>
              <li><Link href="/services/elderly" className="hover:text-blue-600">Elderly Care</Link></li>
              <li><Link href="/services/sickcare" className="hover:text-blue-600">Sick Care</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-2 text-center sm:text-left">
          <span>© 2026 Care.xyz. All rights reserved.</span>
          <span>Baby Sitting & Elderly Care Platform</span>
        </div>
      </div>
    </footer>
  );
}
