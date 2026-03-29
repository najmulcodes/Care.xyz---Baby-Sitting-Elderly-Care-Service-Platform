"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-0 py-0 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8">
      <div
        className="relative isolate overflow-hidden rounded-none sm:rounded-[20px] md:rounded-[24px] px-5 py-10 shadow-none sm:shadow-[0_30px_80px_rgba(79,125,243,0.20)] sm:px-8 md:px-10 md:py-12 lg:px-14 lg:py-14"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #4F7DF3 0%, #6C63FF 24%, #A78BFA 45%, rgba(232, 173, 214, 0.82) 58%, rgba(255,255,255,0) 68%), url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Radial overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 36%), radial-gradient(circle at 72% 26%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 26%)",
          }}
        />

        {/* Left gradient overlay */}
        <div
          className="absolute inset-y-0 left-0 w-full md:w-[64%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,55,125,0.18) 0%, rgba(37,55,125,0.10) 60%, rgba(37,55,125,0) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[484px] items-center">
          <div className="w-full max-w-full sm:max-w-[520px] md:max-w-[560px]">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center rounded-full border border-white/30 bg-white/16 px-3 py-1.5 text-xs sm:text-sm font-medium text-white backdrop-blur-md">
              Trusted Care Platform in Bangladesh
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white max-w-[16ch] sm:max-w-[14ch] md:max-w-[12ch]">
              Reliable Care for Your Loved Ones
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-5 max-w-full sm:max-w-[420px] md:max-w-[460px] text-sm sm:text-base leading-6 sm:leading-7 text-white/90">
              Find verified caregivers for babysitting, elderly care, and home nursing —
              সহজ, নিরাপদ, এবং আপনার সময় অনুযায়ী।
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(37,99,235,0.38)] transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Book a Service
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/16 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/22"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Floating badges — hidden on very small screens */}
        <div className="hidden sm:block absolute right-4 top-5 z-20 rounded-2xl bg-white px-4 py-3 text-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.16)] sm:right-6 sm:top-6">
          <p className="text-sm font-semibold">📍 Dhaka</p>
        </div>

        <div className="hidden sm:block absolute bottom-20 right-4 z-20 rounded-[20px] bg-white px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:bottom-24 sm:right-6 sm:px-5 md:bottom-28">
          <p className="text-sm font-semibold text-slate-900">Booking Confirmed</p>
          <p className="mt-1 text-xs text-slate-500">Tuesday, 3:00 PM</p>
        </div>

        <div className="hidden sm:block absolute bottom-4 right-4 z-20 rounded-[20px] bg-white px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.16)] sm:right-6 sm:px-5 sm:bottom-6">
          <p className="text-sm font-semibold text-slate-900">★★★★★ Excellent Service</p>
        </div>
      </div>
    </section>
  );
}
