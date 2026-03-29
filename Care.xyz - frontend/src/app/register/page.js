"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (!/[A-Z]/.test(form.password)) e.password = "Must contain at least 1 uppercase letter";
    if (!/[a-z]/.test(form.password)) e.password = "Must contain at least 1 lowercase letter";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    // Since we use credentials provider with demo users, just sign in
    const result = await signIn("credentials", {
      email: "demo@care.xyz",
      password: "Demo@123",
      redirect: false,
    });
    setLoading(false);
    if (!result?.error) {
      router.push("/");
      router.refresh();
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="min-h-screen flex bg-cream-50">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />

        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold">C</div>
          <span className="text-xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Care<span className="text-teal-400">.xyz</span>
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Start Your Journey<br />
            <span className="text-teal-400 italic">With Us Today</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Create a free account and gain access to the most trusted network of caregivers in Bangladesh.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { v: "Free", l: "to register" },
              { v: "Instant", l: "booking" },
              { v: "Verified", l: "caregivers" },
              { v: "24/7", l: "support" },
            ].map((item) => (
              <div key={item.l} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-teal-400 font-bold text-lg">{item.v}</div>
                <div className="text-slate-500 text-xs mt-0.5">{item.l}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-xs relative z-10">© 2026 Care.xyz</p>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
              <span className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>Care.xyz</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create Account
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 font-semibold hover:underline">
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
              { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
              { name: "password", label: "Password", type: "password", placeholder: "Min 6 chars, 1 upper, 1 lower" },
              { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Re-enter password" },
            ].map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label className="label">{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  className={`input-field ${errors[name] ? "border-red-300 bg-red-50 focus:ring-red-500" : ""}`}
                  required
                />
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-60 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
