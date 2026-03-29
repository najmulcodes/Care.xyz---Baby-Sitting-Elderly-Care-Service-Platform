import Link from "next/link";

const team = [
  { name: "Dr. Aisha Rahman", role: "Chief Medical Officer", icon: "👩‍⚕️", bio: "15 years in geriatric care, previously at DMCH" },
  { name: "Kamrul Hassan", role: "Head of Operations", icon: "👨‍💼", bio: "Built caregiver networks across 3 countries" },
  { name: "Nasrin Sultana", role: "Training Director", icon: "👩‍🏫", bio: "Certified trainer with 1000+ caregivers trained" },
  { name: "Rafiq Ahmed", role: "Technology Lead", icon: "👨‍💻", bio: "10 years in healthcare tech across Bangladesh" },
];

const milestones = [
  { year: "2020", event: "Care.xyz founded in Dhaka" },
  { year: "2021", event: "First 100 caregivers onboarded" },
  { year: "2022", event: "Expanded to all 8 divisions" },
  { year: "2023", event: "Reached 1,000 families served" },
  { year: "2024", event: "Launched home nursing & therapy" },
  { year: "2026", event: "5,000+ families nationwide" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300 bg-teal-400/10 border border-teal-400/20 px-3 py-1 rounded-full mb-5">
            About Us
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Caring for Bangladesh,<br />
            <span className="text-teal-400 italic">One Family at a Time</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Care.xyz was born from a simple idea: every family in Bangladesh deserves access to safe, professional care for their loved ones — children, elderly parents, and anyone who needs support at home.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="section-tag">Our Mission</div>
              <h2 className="section-title mb-5">Making Quality Care Accessible to All</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We believe that every family — regardless of income, location, or circumstance — deserves access to safe, professional care. In Bangladesh, finding trustworthy help for a child, an aging parent, or a recovering patient has traditionally relied on word-of-mouth and luck.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Care.xyz changes that. We created a platform that thoroughly vets, trains, and connects caregivers with families who need them — with transparent pricing, real reviews, and a support team that&apos;s always available.
              </p>
              <Link href="/services" className="btn-primary">
                Explore Our Services
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: "Our Vision", desc: "To become Bangladesh's most trusted care platform by 2030, serving every district." },
                { icon: "💡", title: "Our Approach", desc: "Technology-enabled matching with human-first values at every step of the process." },
                { icon: "🌱", title: "Our Impact", desc: "Meaningful employment for caregivers and peace of mind for thousands of families." },
                { icon: "🤝", title: "Our Promise", desc: "If you're ever unsatisfied, we'll make it right — guaranteed." },
              ].map((item) => (
                <div key={item.title} className="card p-5">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">From Idea to Impact</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === milestones.length - 1 ? "bg-teal-600 text-white" : "bg-teal-50 text-teal-700 border-2 border-teal-200"}`}>
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && <div className="w-0.5 h-10 bg-teal-100 my-1" />}
                </div>
                <div className="pb-8">
                  <p className="text-xs font-semibold text-teal-500 mb-0.5">{m.year}</p>
                  <p className="text-sm font-medium text-slate-700">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-tag">The Team</div>
            <h2 className="section-title">The People Behind Care.xyz</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card p-6 text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-4xl mx-auto mb-4 group-hover:bg-teal-100 transition-colors">
                  {member.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-xs font-semibold text-teal-600 mb-2">{member.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Experience Care.xyz?
          </h2>
          <p className="text-slate-500 mb-8">
            Join thousands of families who trust us with the people they love most.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register" className="btn-primary">
              Get Started Free
            </Link>
            <Link href="/services" className="btn-outline">
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
