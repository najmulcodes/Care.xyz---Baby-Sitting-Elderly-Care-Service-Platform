"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Try demo@care.xyz / Demo@123");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="min-h-screen flex bg-cream-50">
      {/* Left illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-1/3 -right-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold">C</div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Care<span className="text-teal-400">.xyz</span>
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Welcome Back to<br />
            <span className="text-teal-400 italic">Trusted Care</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Sign in to access your bookings, manage services, and connect with verified caregivers across Bangladesh.
          </p>

          <div className="mt-10 space-y-4">
            {["5,000+ families trust Care.xyz", "200+ verified caregivers", "Available 24/7 nationwide"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 text-xs">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-xs relative z-10">© 2026 Care.xyz</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Care.xyz</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sign in
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-teal-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>

          {/* Demo credentials hint */}
          <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 text-sm text-teal-800">
            <p className="font-semibold mb-1">Demo credentials</p>
            <p className="font-mono text-xs">demo@care.xyz / Demo@123</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700 disabled:opacity-60"
          >
            {googleLoading ? (
              <span className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
