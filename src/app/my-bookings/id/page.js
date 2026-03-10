"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import services from "@/data/services";
import { divisions, districts, cities, areas } from "@/data/locations";
import { saveBooking } from "@/lib/bookingStorage";

export default function BookingPage({ params }) {
  const service = services.find((s) => s.id === params.id);
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    durationType: "days",
    duration: 1,
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const totalCost = service ? form.duration * service.price : 0;

  const availableDistricts = form.division ? districts[form.division] || [] : [];
  const availableCities = form.district ? cities[form.district] || [] : [];
  const availableAreas = form.city ? areas[form.city] || [] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      // Reset dependent fields
      if (name === "division") { updated.district = ""; updated.city = ""; updated.area = ""; }
      if (name === "district") { updated.city = ""; updated.area = ""; }
      if (name === "city") { updated.area = ""; }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.division || !form.district) {
      alert("Please select at least a Division and District.");
      return;
    }
    const id = `BK-${Date.now()}`;
    const booking = {
      id,
      serviceId: service.id,
      service: service.title,
      userEmail: user.email,
      userName: user.displayName || user.email,
      ...form,
      pricePerDay: service.price,
      total: totalCost,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    saveBooking(booking);
    setBookingId(id);
    setSubmitted(true);
  };

  if (!service) return <div className="p-10 text-center text-red-500">Service not found.</div>;

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto py-20 px-6 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-2">Your booking ID: <span className="font-mono font-bold text-blue-600">{bookingId}</span></p>
        <p className="text-gray-500 mb-8">Status: <span className="font-semibold text-yellow-600">Pending</span> — we'll confirm shortly.</p>
        <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left space-y-2">
          <p><span className="font-medium">Service:</span> {service.title}</p>
          <p><span className="font-medium">Duration:</span> {form.duration} {form.durationType}</p>
          <p><span className="font-medium">Location:</span> {[form.area, form.city, form.district, form.division].filter(Boolean).join(", ")}</p>
          {form.address && <p><span className="font-medium">Address:</span> {form.address}</p>}
          <p className="text-xl font-bold text-blue-700 pt-2">Total: ৳{totalCost.toLocaleString()}</p>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={() => router.push("/my-bookings")} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            View My Bookings
          </button>
          <button onClick={() => router.push("/services")} className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto py-12 px-6">
        {/* Header */}
        <div className="mb-8">
          <span className="text-4xl">{service.icon}</span>
          <h1 className="text-3xl font-bold mt-2">Book {service.title}</h1>
          <p className="text-gray-500 mt-1">Fill in the details below to confirm your booking.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Duration */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Step 1 — Select Duration</h2>
            <div className="flex gap-4 mb-4">
              {["days", "hours"].map((type) => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="durationType"
                    value={type}
                    checked={form.durationType === type}
                    onChange={handleChange}
                    className="accent-blue-600"
                  />
                  <span className="capitalize font-medium">{type}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                name="duration"
                min="1"
                max="365"
                value={form.duration}
                onChange={handleChange}
                className="w-24 border border-gray-300 rounded-lg px-4 py-3 text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <span className="text-gray-600">{form.durationType}</span>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Step 2 — Select Location</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
                <select
                  name="division"
                  value={form.division}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Division</option>
                  {divisions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                <select
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!form.division}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City / Upazila</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!form.district || availableCities.length === 0}
                >
                  <option value="">Select City</option>
                  {availableCities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                <select
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!form.city || availableAreas.length === 0}
                >
                  <option value="">Select Area</option>
                  {availableAreas.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
              <textarea
                name="address"
                placeholder="House no, road no, building name..."
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Cost Summary */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-4">Step 3 — Cost Summary</h2>
            <div className="space-y-2 text-blue-100">
              <div className="flex justify-between">
                <span>Service</span>
                <span className="font-medium text-white">{service.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Rate</span>
                <span className="font-medium text-white">৳{service.price} / {form.durationType === "days" ? "day" : "hour"}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-medium text-white">{form.duration} {form.durationType}</span>
              </div>
              <div className="border-t border-blue-400 pt-2 mt-2 flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span>৳{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            Confirm Booking — ৳{totalCost.toLocaleString()}
          </button>
        </form>
      </div>
    </PrivateRoute>
  );
}