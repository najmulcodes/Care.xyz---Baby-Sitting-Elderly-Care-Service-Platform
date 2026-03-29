"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";
import services from "@/data/services";
import { divisions, districts } from "@/data/locations";

function BookingForm({ params }) {
  const service = services.find((s) => s.id === params.id);
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    durationType: "days",
    duration: 1,
    division: "",
    district: "",
    address: "",
    notes: "",
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-slate-700 mb-4">Service not found</h2>
          <Link href="/services" className="btn-primary">Browse Services</Link>
        </div>
      </div>
    );
  }

  const totalCost = form.duration * service.price;
  const availableDistricts = form.division ? (districts[form.division] || []) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => {
      const u = { ...p, [name]: value };
      if (name === "division") u.district = "";
      return u;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.division || !form.district) {
      toast.error("Please select a division and district.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const id = `BK-${Date.now()}`;
    const booking = {
      id,
      serviceId: service.id,
      service: service.title,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      ...form,
      pricePerUnit: service.price,
      total: totalCost,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const prev = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...prev, booking]));

    setBookingId(id);
    setLoading(false);
    setSubmitted(true);
    toast.success("Booking confirmed! 🎉");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full card p-8 sm:p-10 text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl">
            🎉
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Booking Confirmed!
          </h2>
          <p className="text-slate-500 text-sm mb-1">Booking ID:</p>
          <p className="font-mono font-bold text-teal-600 text-sm mb-5 break-all">{bookingId}</p>

          <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 text-left space-y-2 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-slate-500">Service</span>
              <span className="font-semibold text-slate-800">{service.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Duration</span>
              <span className="font-semibold text-slate-800">{form.duration} {form.durationType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location</span>
              <span className="font-semibold text-slate-800">{form.district}, {form.division}</span>
            </div>
            <div className="flex justify-between border-t border-teal-100 pt-2 mt-2">
              <span className="font-bold text-slate-700">Total</span>
              <span className="font-bold text-teal-600 text-lg">৳{totalCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/my-bookings" className="btn-primary flex-1 justify-center">
              My Bookings
            </Link>
            <Link href="/services" className="btn-outline flex-1 justify-center">
              Browse More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-14">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Back */}
        <Link
          href={`/services/${service.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to {service.title}
        </Link>

        {/* Service chip */}
        <div className="flex items-center gap-3 mb-8 card p-4">
          <span className="text-3xl">{service.icon}</span>
          <div>
            <p className="font-bold text-slate-900">{service.title}</p>
            <p className="text-sm text-teal-600 font-semibold">৳{service.price}/{service.unit}</p>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Complete Your Booking
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Duration */}
          <div className="card p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              Duration
            </h2>
            <div className="flex gap-4 mb-4">
              {["days", "hours"].map((type) => (
                <label key={type} className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border-2 transition-all ${form.durationType === type ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  <input
                    type="radio"
                    name="durationType"
                    value={type}
                    checked={form.durationType === type}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="font-medium text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                name="duration"
                min="1"
                max="365"
                value={form.duration}
                onChange={handleChange}
                className="input-field w-24 text-center text-lg font-bold"
              />
              <span className="text-slate-500 text-sm">{form.durationType}</span>
            </div>
          </div>

          {/* Location */}
          <div className="card p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              Location
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="label">Division *</label>
                <select name="division" value={form.division} onChange={handleChange} className="input-field" required>
                  <option value="">Select Division</option>
                  {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="label">District *</label>
                <select name="district" value={form.district} onChange={handleChange} className="input-field" required disabled={!form.division}>
                  <option value="">Select District</option>
                  {availableDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">Full Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} rows={2} placeholder="House/road/area details..." className="input-field resize-none" />
            </div>
          </div>

          {/* Notes */}
          <div className="card p-6">
            <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              Additional Notes (Optional)
            </h2>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any special requirements, preferences, or medical info..." className="input-field resize-none" />
          </div>

          {/* Cost summary */}
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-6 text-white">
            <h2 className="font-bold mb-4">Cost Summary</h2>
            <div className="space-y-2 text-sm text-teal-100">
              <div className="flex justify-between">
                <span>Rate</span>
                <span className="text-white font-medium">৳{service.price}/{service.unit}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="text-white font-medium">{form.duration} {form.durationType}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white border-t border-teal-500/50 pt-2 mt-2">
                <span>Total</span>
                <span>৳{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-base hover:bg-teal-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shadow-teal"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              `Confirm Booking — ৳${totalCost.toLocaleString()}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage({ params }) {
  return (
    <ProtectedPage>
      <BookingForm params={params} />
    </ProtectedPage>
  );
}
