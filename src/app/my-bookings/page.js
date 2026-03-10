"use client";

import { useEffect, useState } from "react";
import { getBookings } from "@/lib/bookingStorage";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Link from "next/link";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const all = getBookings();
      const mine = all.filter((b) => b.userEmail === user.email);
      setBookings(mine.reverse()); // newest first
    }
  }, [user]);

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-500 mt-1">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/services"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            + New Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-6">Browse our services and make your first booking.</p>
            <Link href="/services" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{b.service}</h3>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[b.status] || statusColors.Pending}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium text-gray-500 block text-xs uppercase tracking-wide">Duration</span>
                        {b.duration} {b.durationType}
                      </div>
                      <div>
                        <span className="font-medium text-gray-500 block text-xs uppercase tracking-wide">Location</span>
                        {[b.area, b.city, b.district, b.division].filter(Boolean).join(", ")}
                      </div>
                      <div>
                        <span className="font-medium text-gray-500 block text-xs uppercase tracking-wide">Booked On</span>
                        {new Date(b.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-700">৳{b.total?.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 font-mono mt-1">{b.id}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}