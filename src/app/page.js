import ServicesSection from "@/components/ServicesSection";
import Link from "next/link";

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
    <div className="space-y-24">
      {/* Hero */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white px-8 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_50%,#fff_0%,transparent_60%)]" />
        <div className="relative max-w-3xl">
          <span className="inline-block bg-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Trusted Care Platform in Bangladesh
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Caring Hands for<br />Your Loved Ones
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
            Book verified, background-checked caregivers for baby sitting, elderly support, and home sick care — anytime, anywhere.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/services"
              className="bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Book a Service
            </Link>
            <Link
              href="/register"
              className="border border-white/50 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center bg-white border rounded-2xl p-6 shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Services */}
      <ServicesSection />

      {/* About */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-7xl">🤝</div>
            <p className="text-blue-800 font-semibold text-lg">Making caregiving easy, safe & accessible</p>
          </div>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Care.xyz?
          </h2>
          <div className="space-y-4">
            {[
              { icon: "🔒", title: "Verified & Background-Checked", desc: "Every caregiver goes through strict identity and background verification before joining." },
              { icon: "📍", title: "Nationwide Coverage", desc: "Available across all 8 divisions of Bangladesh with local expertise in each area." },
              { icon: "💳", title: "Transparent Pricing", desc: "No hidden fees. Pay exactly what you see — calculated dynamically before you confirm." },
              { icon: "⭐", title: "Rated & Reviewed", desc: "Real reviews from real families help you choose the best caregiver for your needs." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Families Say</h2>
          <p className="text-gray-500 mt-3">Real experiences from real Care.xyz users</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {"★".repeat(t.rating).split("").map((s, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-gray-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to book trusted care?</h2>
        <p className="text-blue-100 mb-8 text-lg">Join thousands of families who rely on Care.xyz every day.</p>
        <Link
          href="/register"
          className="bg-white text-blue-700 font-bold px-10 py-4 rounded-xl hover:bg-blue-50 transition-colors inline-block"
        >
          Get Started — It's Free
        </Link>
      </section>
    </div>
  );
}