"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="px-4 py-6 md:px-6 lg:px-8">
      <div
        className="relative isolate min-h-[540px] overflow-hidden rounded-[24px] px-6 py-8 shadow-[0_30px_80px_rgba(79,125,243,0.20)] sm:px-8 md:px-10 md:py-10 lg:min-h-[552px] lg:px-14 lg:py-14"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #4F7DF3 0%, #6C63FF 24%, #A78BFA 45%, rgba(232, 173, 214, 0.82) 58%, rgba(255,255,255,0) 68%), url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 36%), radial-gradient(circle at 72% 26%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 26%)",
          }}
        />

        <div
          className="absolute inset-y-0 left-0 w-full md:w-[64%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,55,125,0.14) 0%, rgba(37,55,125,0.06) 48%, rgba(37,55,125,0) 100%)",
          }}
        />

        <div className="relative z-10 flex min-h-[484px] items-center">
          <div className="max-w-[560px]">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/30 bg-white/16 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              Trusted Care Platform in Bangladesh
            </div>

            <h1 className="max-w-[12ch] text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-[52px] lg:text-[60px]">
              Reliable Care for Your Loved Ones
            </h1>

            <p className="mt-5 max-w-[460px] text-base leading-7 text-white/88 sm:text-lg">
              Find verified caregivers for babysitting, elderly care, and home nursing —
              সহজ, নিরাপদ, এবং আপনার সময় অনুযায়ী।
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(37,99,235,0.38)] transition duration-200 hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Book a Service
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/16 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition duration-200 hover:-translate-y-0.5 hover:bg-white/22"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-5 z-20 rounded-2xl bg-white px-4 py-3 text-slate-800 shadow-[0_18px_40px_rgba(15,23,42,0.16)] sm:right-6 sm:top-6">
          <p className="text-sm font-semibold">📍 Dhaka</p>
        </div>

        <div className="absolute bottom-24 right-4 z-20 rounded-[20px] bg-white px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.18)] sm:bottom-28 sm:right-6 sm:px-5">
          <p className="text-sm font-semibold text-slate-900">Booking Confirmed</p>
          <p className="mt-1 text-xs text-slate-500">Tuesday, 3:00 PM</p>
        </div>

        <div className="absolute bottom-6 right-4 z-20 rounded-[20px] bg-white px-4 py-3 shadow-[0_18px_40px_rgba(15,23,42,0.16)] sm:right-6 sm:px-5">
          <p className="text-sm font-semibold text-slate-900">★★★★★ Excellent Service</p>
        </div>
      </div>
    </section>
  );
}
