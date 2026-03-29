import Link from "next/link";
import { notFound } from "next/navigation";
import services from "@/data/services";

export async function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }) {
  const service = services.find((s) => s.id === params.id);
  if (!service) return {};
  return {
    title: `${service.title} — Care.xyz`,
    description: service.shortDesc,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.id === params.id);
  if (!service) return notFound();

  const related = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 flex-wrap">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-teal-400 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-slate-200">{service.title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center text-5xl sm:text-6xl backdrop-blur-sm flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-400/10 border border-teal-400/20 px-3 py-1 rounded-full">
                  {service.category}
                </span>
                {service.badge && (
                  <span className="text-xs font-semibold bg-amber-400/10 border border-amber-400/20 text-amber-300 px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {service.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  {"★★★★★".split("").map((_, i) => (
                    <span key={i} className={i < Math.floor(service.rating) ? "text-amber-400" : "text-slate-600"}>★</span>
                  ))}
                  <span className="ml-1 text-slate-300">{service.rating}</span>
                </span>
                <span>·</span>
                <span>{service.reviews} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">About This Service</h2>
              <p className="text-slate-600 leading-relaxed text-base">{service.description}</p>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-5">What&apos;s Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-card"
                  >
                    <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works for this service */}
            <section className="bg-teal-50 border border-teal-100 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">How Booking Works</h2>
              <ol className="space-y-4">
                {[
                  "Select your preferred dates and duration",
                  "Choose your location across Bangladesh",
                  "Confirm your booking — we match you with the best caregiver",
                  "Caregiver arrives on time, ready to help",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-slate-600">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="card p-6 sm:p-8 sticky top-24">
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold text-teal-600">৳{service.price}</span>
                <span className="text-slate-400 text-sm pb-1">/ {service.unit}</span>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Total calculated automatically based on duration
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Category", value: service.category },
                  { label: "Rating", value: `${service.rating} ★ (${service.reviews} reviews)` },
                  { label: "Availability", value: "24/7, nationwide" },
                  { label: "Minimum", value: `1 ${service.unit}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-slate-50 pb-2">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-800 text-right max-w-[55%]">{value}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/booking/${service.id}`}
                className="w-full bg-teal-600 text-white py-3.5 rounded-xl font-bold text-sm text-center block hover:bg-teal-700 transition-colors shadow-teal"
              >
                Book This Service
              </Link>
              <Link
                href="/services"
                className="w-full mt-3 border border-slate-200 text-slate-600 py-3 rounded-xl font-medium text-sm text-center block hover:bg-slate-50 transition-colors"
              >
                ← Back to Services
              </Link>
            </div>

            {/* Trust badge */}
            <div className="bg-slate-950 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🔒</span>
                <span className="font-semibold text-sm">Safe & Verified</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                All caregivers are background-checked, NID-verified, and trained before joining our platform.
              </p>
            </div>
          </div>
        </div>

        {/* Related services */}
        {related.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-12 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Other Services You May Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="card p-6 flex items-start gap-4 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <span className="text-3xl">{s.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">{s.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{s.shortDesc}</p>
                    <p className="text-teal-600 font-bold text-sm mt-2">৳{s.price}/{s.unit}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
