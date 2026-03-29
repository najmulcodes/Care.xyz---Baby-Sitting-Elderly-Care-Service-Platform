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
      setBookings(mine.reverse());
    }
  }, [user]);

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Link
            href="/services"
            className="self-start sm:self-auto bg-blue-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            + New Booking
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-xl sm:rounded-2xl border">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📋</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-5 sm:mb-6 text-sm sm:text-base">Browse our services and make your first booking.</p>
            <Link
              href="/services"
              className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-white border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{b.service}</h3>
                      <span
                        className={`text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border ${statusColors[b.status] || statusColors.Pending}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-gray-600">
                      <div>
                        <span className="font-medium text-gray-500 block text-[10px] sm:text-xs uppercase tracking-wide">Duration</span>
                        {b.duration} {b.durationType}
                      </div>
                      <div>
                        <span className="font-medium text-gray-500 block text-[10px] sm:text-xs uppercase tracking-wide">Location</span>
                        <span className="break-words">{[b.area, b.city, b.district, b.division].filter(Boolean).join(", ")}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-500 block text-[10px] sm:text-xs uppercase tracking-wide">Booked On</span>
                        {new Date(b.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-0">
                    <div className="text-xl sm:text-2xl font-bold text-blue-700">৳{b.total?.toLocaleString()}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 font-mono">{b.id}</div>
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
