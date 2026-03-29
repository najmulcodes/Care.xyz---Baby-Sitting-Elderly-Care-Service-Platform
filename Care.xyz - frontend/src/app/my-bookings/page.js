"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";

const statusConfig = {
  Pending:   { classes: "bg-amber-50 text-amber-700 border-amber-200",  dot: "bg-amber-400" },
  Confirmed: { classes: "bg-blue-50 text-blue-700 border-blue-200",    dot: "bg-blue-400" },
  Completed: { classes: "bg-teal-50 text-teal-700 border-teal-200",    dot: "bg-teal-400" },
  Cancelled: { classes: "bg-red-50 text-red-700 border-red-200",       dot: "bg-red-400" },
};

function MyBookingsContent() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (session?.user?.email) {
      const all = JSON.parse(localStorage.getItem("bookings") || "[]");
      const mine = all.filter((b) => b.userEmail === session.user.email);
      setBookings(mine.reverse());
    }
    setLoading(false);
  }, [session]);

  const handleCancel = (id) => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updated = all.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "Cancelled" } : b));
    toast.success("Booking cancelled.");
  };

  const filtered = filterStatus === "All"
    ? bookings
    : bookings.filter((b) => b.status === filterStatus);

  const statusCounts = ["Pending", "Confirmed", "Completed", "Cancelled"].reduce((acc, s) => {
    acc[s] = bookings.filter((b) => b.status === s).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-teal-200 border-t-teal-600 animate-spin" style={{ borderWidth: "3px" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Bookings
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {bookings.length} booking{bookings.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Link href="/services" className="btn-primary self-start sm:self-auto">
            + New Booking
          </Link>
        </div>

        {/* Stats row */}
        {bookings.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {Object.entries(statusCounts).map(([status, count]) => {
              const conf = statusConfig[status] || statusConfig.Pending;
              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(filterStatus === status ? "All" : status)}
                  className={`card p-4 text-left transition-all duration-200 ${filterStatus === status ? "ring-2 ring-teal-500" : ""}`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${conf.dot}`} />
                    <span className="text-xs text-slate-500">{status}</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Filter pills */}
        {bookings.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  filterStatus === s
                    ? "bg-teal-600 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-teal-200"
                }`}
              >
                {s} {s !== "All" && `(${statusCounts[s] || 0})`}
              </button>
            ))}
          </div>
        )}

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="card text-center py-20 px-6">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No bookings yet</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
              Browse our services and make your first booking today.
            </p>
            <Link href="/services" className="btn-primary inline-flex">
              Browse Services
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-slate-500 text-sm">No {filterStatus.toLowerCase()} bookings.</p>
            <button onClick={() => setFilterStatus("All")} className="text-teal-600 text-sm font-medium mt-2 hover:underline">
              Show all
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => {
              const conf = statusConfig[b.status] || statusConfig.Pending;
              return (
                <div key={b.id} className="card p-5 sm:p-6 hover:shadow-card-hover transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 text-base sm:text-lg">{b.service}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${conf.classes}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500 mt-3">
                        <div>
                          <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">Duration</span>
                          {b.duration} {b.durationType}
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">Location</span>
                          {b.district}, {b.division}
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">Booked On</span>
                          {new Date(b.createdAt).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </div>

                      <p className="text-[10px] font-mono text-slate-300 mt-3">{b.id}</p>
                    </div>

                    {/* Price + action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3">
                      <div className="text-2xl font-bold text-teal-600">৳{b.total?.toLocaleString()}</div>
                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(b.id)}
                          className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-full hover:bg-red-50 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  return (
    <ProtectedPage>
      <MyBookingsContent />
    </ProtectedPage>
  );
}
