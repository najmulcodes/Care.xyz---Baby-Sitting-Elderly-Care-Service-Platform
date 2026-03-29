"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import services from "@/data/services";

const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {"★★★★★".split("").map((_, i) => (
        <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-amber-400" : "text-slate-200"}`}>
          ★
        </span>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating}</span>
    </div>
  );
}

function ServiceCard({ service }) {
  return (
    <div className="card group hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image area */}
      <div className="h-44 bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center text-6xl relative overflow-hidden">
        <span className="group-hover:scale-110 transition-transform duration-500">{service.icon}</span>
        {service.badge && (
          <span className="absolute top-3 right-3 badge bg-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {service.badge}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Category */}
        <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-500 mb-2">
          {service.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>

        {/* Desc */}
        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1 line-clamp-2">
          {service.shortDesc}
        </p>

        {/* Rating */}
        <StarRating rating={service.rating} />
        <p className="text-xs text-slate-400 mt-0.5 mb-4">{service.reviews} reviews</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-xl font-bold text-teal-600">৳{service.price}</span>
            <span className="text-xs text-slate-400">/{service.unit}</span>
          </div>
          <Link
            href={`/services/${service.id}`}
            className="bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-teal-700 transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || s.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-950 to-teal-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-teal-300 bg-teal-400/10 border border-teal-400/20 px-3 py-1 rounded-full mb-5">
            Our Services
          </div>
          <h1
            className="text-3xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Professional Care Services
          </h1>
          <p className="text-slate-300 text-base max-w-xl mx-auto mb-8">
            Verified, trained caregivers for every need — available across Bangladesh.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-400 rounded-full pl-11 pr-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-teal-600 text-white shadow-teal"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-teal-200 hover:text-teal-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> service{filtered.length !== 1 ? "s" : ""}
          {search && ` for "${search}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No services found</h3>
            <p className="text-slate-500 text-sm">Try a different search term or category.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
