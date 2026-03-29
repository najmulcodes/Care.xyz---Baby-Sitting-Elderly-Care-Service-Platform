import Link from "next/link";
import services from "@/data/services";

// ── Stats ──────────────────────────────────────────────────────────
const stats = [
  { value: "5,000+", label: "Happy Families", icon: "💛" },
  { value: "200+", label: "Trained Caregivers", icon: "🩺" },
  { value: "8", label: "Divisions Covered", icon: "📍" },
  { value: "4.9★", label: "Average Rating", icon: "⭐" },
];

// ── Process steps ──────────────────────────────────────────────────
const steps = [
  { num: "01", title: "Browse Services", desc: "Explore our range of professional care services and find the one that fits your needs.", icon: "🔍" },
  { num: "02", title: "Choose a Caregiver", desc: "View detailed profiles, reviews, and qualifications for each verified caregiver.", icon: "👤" },
  { num: "03", title: "Book Instantly", desc: "Select your dates, location, and confirm your booking in under 2 minutes.", icon: "📅" },
  { num: "04", title: "Care Begins", desc: "Your caregiver arrives on time. Sit back and experience exceptional care.", icon: "🤝" },
];

// ── Testimonials ──────────────────────────────────────────────────
const testimonials = [
  {
    name: "Fatima Khanam",
    role: "Mother of 2 · Dhaka",
    text: "Care.xyz found us an amazing babysitter within hours. Our kids absolutely adore her — she's patient, creative, and so trustworthy. This service has transformed our routine.",
    rating: 5,
    avatar: "FK",
  },
  {
    name: "Rahim Uddin",
    role: "Son of elderly patient · Chittagong",
    text: "The elderly care service exceeded every expectation. The caregiver is gentle, professional, and treats my father with such dignity. We couldn't imagine life without this help.",
    rating: 5,
    avatar: "RU",
  },
  {
    name: "Nusrat Jahan",
    role: "Recovery patient · Sylhet",
    text: "After my surgery, the home care nurse made recovery so much smoother. Her expertise and warmth gave me confidence. I was back on my feet weeks ahead of schedule.",
    rating: 5,
    avatar: "NJ",
  },
];

// ── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  { q: "How are caregivers verified?", a: "Every caregiver undergoes a 7-step verification: NID check, criminal background screening, reference checks, medical fitness test, skills assessment, and in-person interview." },
  { q: "Can I try a caregiver before committing?", a: "Yes. We offer a 1-day trial booking for all new clients. If you're not satisfied, we'll rematch you at no extra charge." },
  { q: "What if my caregiver can't make it?", a: "We have a 24/7 backup system. If your scheduled caregiver can't arrive, we'll have a replacement within 2 hours, guaranteed." },
  { q: "How is pricing calculated?", a: "Prices are per day or per session. You choose the duration during booking and the total is calculated automatically. No hidden fees — ever." },
];

// ── Why us ──────────────────────────────────────────────────────────
const features = [
  { icon: "🔒", title: "Verified & Background-Checked", desc: "Every caregiver is identity-verified, background-screened, and trained before joining the platform." },
  { icon: "📍", title: "Nationwide Coverage", desc: "We operate across all 8 divisions of Bangladesh with deep local expertise in every area." },
  { icon: "💳", title: "Transparent Pricing", desc: "No surprises. The price you see is what you pay — dynamically calculated before you confirm." },
  { icon: "⭐", title: "Rated & Reviewed", desc: "Thousands of real reviews help you choose with confidence. We hold caregivers to the highest standard." },
  { icon: "📞", title: "24/7 Support", desc: "Our team is reachable around the clock via phone, WhatsApp, or live chat whenever you need help." },
  { icon: "🔄", title: "Flexible Scheduling", desc: "Book by the hour, day, or ongoing contract. Reschedule or cancel with 24 hours notice, no penalty." },
];

export default function HomePage() {
  const featuredServices = services.slice(0, 3);

  return (
    <div>
      {/* ── 1. Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 min-h-[92vh] flex items-center">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
              Trusted Care Platform in Bangladesh
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Reliable Care for
              <br />
              <span className="text-teal-400 italic">Your Loved Ones</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
              Find verified caregivers for babysitting, elderly care, and home nursing — right at your doorstep, all across Bangladesh.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-teal hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Browse Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
              >
                Create Account
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 sm:gap-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 text-xs">
          <span>Scroll</span>
          <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── 2. Services preview ──────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-tag">Our Services</div>
            <h2 className="section-title">Care That Fits Every Need</h2>
            <p className="text-slate-500 mt-4 text-base">
              Professional, vetted caregivers for every stage of life — available on your schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredServices.map((service, i) => (
              <div
                key={service.id}
                className="card p-7 group hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-5">{service.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                  {service.badge && (
                    <span className="badge bg-teal-50 text-teal-700 border border-teal-100">
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                  {service.shortDesc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xl font-bold text-teal-600">৳{service.price}</span>
                    <span className="text-sm text-slate-400">/{service.unit}</span>
                  </div>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm font-semibold text-teal-600 hover:text-teal-800 group-hover:gap-2 flex items-center gap-1.5 transition-all"
                  >
                    Details
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. How it works ──────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Book Care in 4 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-[60%] w-full h-px bg-gradient-to-r from-teal-200 to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-3xl mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="text-xs font-mono font-semibold text-teal-400 mb-2">{step.num}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Why choose us ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(20,184,166,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal-400 bg-teal-400/10 border border-teal-400/20 px-3 py-1 rounded-full mb-4">
              Why Care.xyz
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Trusted Choice for Families Across Bangladesh
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-teal-500/30 transition-all duration-300 group">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Testimonials ──────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="section-tag">Testimonials</div>
            <h2 className="section-title">Trusted by Thousands of Families</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-7 hover:-translate-y-1 transition-all duration-300">
                <div className="flex gap-0.5 mb-5">
                  {"★★★★★".split("").map((_, i) => (
                    <span key={i} className="text-amber-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group card overflow-hidden">
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">{faq.q}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA Banner ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Book Trusted Care?
              </h2>
              <p className="text-teal-100 text-base sm:text-lg mb-8 max-w-xl mx-auto">
                Join thousands of families who rely on Care.xyz every day. Set up in minutes.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-white text-teal-700 font-bold px-8 py-3.5 rounded-full hover:bg-teal-50 transition-colors text-sm sm:text-base shadow-lg"
                >
                  Get Started — It&apos;s Free
                </Link>
                <Link
                  href="/services"
                  className="bg-white/15 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-colors text-sm sm:text-base backdrop-blur-sm"
                >
                  Browse Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
