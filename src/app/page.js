import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import Link from "next/link";

export const metadata = {
  title: "Care.xyz — Trusted Care Platform in Bangladesh",
  description:
    "Find verified caregivers for babysitting, elderly care, and home nursing across Bangladesh.",
};

const testimonials = [
  {
    name: "Fatima Khanam",
    role: "Mother of 2",
    text: "Care.xyz found us an amazing babysitter within hours. Our kids love her! Highly trustworthy service.",
    rating: 5,
  },
  {
    name: "Rahim Uddin",
    role: "Son of elderly patient",
    text: "The elderly care service is exceptional. The caregiver is gentle, patient, and very professional.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Recovery patient",
    text: "After my surgery, the home care team made my recovery so much easier. Will recommend to everyone.",
    rating: 5,
  },
];

const stats = [
  { value: "5,000+", label: "Happy Families" },
  { value: "200+", label: "Trained Caregivers" },
  { value: "8", label: "Divisions Covered" },
  { value: "4.9★", label: "Average Rating" },
];

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-20 md:space-y-24">
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Services */}
      <ServicesSection />

      {/* About */}
      <section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex items-center justify-center">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="text-5xl sm:text-7xl">🤝</div>
            <p className="text-blue-800 font-semibold text-base sm:text-lg">Making caregiving easy, safe &amp; accessible</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-5 sm:mb-6">
            Why Choose Care.xyz?
          </h2>
          <div className="space-y-4">
            {[
              { icon: "🔒", title: "Verified & Background-Checked", desc: "Every caregiver goes through strict identity and background verification before joining." },
              { icon: "📍", title: "Nationwide Coverage", desc: "Available across all 8 divisions of Bangladesh with local expertise in each area." },
              { icon: "💳", title: "Transparent Pricing", desc: "No hidden fees. Pay exactly what you see — calculated dynamically before you confirm." },
              { icon: "⭐", title: "Rated & Reviewed", desc: "Real reviews from real families help you choose the best caregiver for your needs." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 sm:gap-4 items-start">
                <span className="text-xl sm:text-2xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">What Families Say</h2>
          <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base">Real experiences from real Care.xyz users</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3 sm:mb-4">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{t.name}</p>
                <p className="text-gray-500 text-xs sm:text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to book trusted care?</h2>
        <p className="text-blue-100 mb-6 sm:mb-8 text-base sm:text-lg">Join thousands of families who rely on Care.xyz every day.</p>
        <Link
          href="/register"
          className="bg-white text-blue-700 font-bold px-7 sm:px-10 py-3 sm:py-4 rounded-xl hover:bg-blue-50 transition-colors inline-block text-sm sm:text-base"
        >
          Get Started — It&apos;s Free
        </Link>
      </section>
    </div>
  );
}
