"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";

function ManageServicesContent() {
  const { data: session } = useSession();
  const [services, setServices] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [viewItem, setViewItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const stored = JSON.parse(localStorage.getItem("userServices") || "[]");
    // Seed with demo data if empty
    if (stored.length === 0) {
      const demo = [
        {
          id: "user-demo-1",
          title: "Night Watch Care",
          shortDesc: "Overnight monitoring for patients and elderly who need nighttime supervision.",
          description: "Our night watch caregivers stay awake throughout the night to monitor patients.",
          price: 600,
          unit: "night",
          category: "Senior Care",
          priority: "High",
          availableDate: "2026-04-02",
          imageUrl: "",
          addedBy: session?.user?.email || "demo@care.xyz",
          createdAt: new Date("2026-03-01").toISOString(),
        },
        {
          id: "user-demo-2",
          title: "Child Tutoring & Care",
          shortDesc: "Homework help combined with childcare for school-age children.",
          description: "Combines academic support with childcare.",
          price: 450,
          unit: "day",
          category: "Child Care",
          priority: "Medium",
          availableDate: "2026-04-05",
          imageUrl: "",
          addedBy: session?.user?.email || "demo@care.xyz",
          createdAt: new Date("2026-03-05").toISOString(),
        },
      ];
      localStorage.setItem("userServices", JSON.stringify(demo));
      setServices(demo);
    } else {
      setServices(stored);
    }
    setLoading(false);
  }, [session]);

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);

  const handleDelete = () => {
    const updated = services.filter((s) => s.id !== deleteId);
    localStorage.setItem("userServices", JSON.stringify(updated));
    setServices(updated);
    setDeleteId(null);
    toast.success("Product deleted successfully.");
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" });

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" style={{ borderWidth: "3px" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Manage Products
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {services.length} product{services.length !== 1 ? "s" : ""} listed
            </p>
          </div>
          <Link href="/add-service" className="btn-primary self-start sm:self-auto">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>

        {services.length === 0 ? (
          /* Empty state */
          <div className="card text-center py-20 px-6">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No products yet</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
              You haven&apos;t added any products. Click below to add your first one.
            </p>
            <Link href="/add-service" className="btn-primary inline-flex">
              Add Your First Product
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Added
                    </th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 mb-0.5">{svc.title}</div>
                        <div className="text-xs text-slate-400 max-w-xs truncate">{svc.shortDesc}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100">
                          {svc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          {svc.priority || "Medium"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-teal-600">
                        ৳{svc.price}
                        <span className="text-slate-400 font-normal text-xs ml-1">/{svc.unit}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(svc.createdAt)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setViewItem(svc)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </button>
                          <button
                            onClick={() => confirmDelete(svc.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-4">
              {services.map((svc) => (
                <div key={svc.id} className="card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 text-sm">{svc.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{svc.shortDesc}</p>
                    </div>
                    <span className="text-teal-600 font-bold text-sm whitespace-nowrap">
                      ৳{svc.price}/{svc.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="badge bg-teal-50 text-teal-700 border border-teal-100 text-[10px] px-2 py-0.5">
                        {svc.category}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(svc.createdAt)}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewItem(svc)}
                        className="px-3 py-1.5 text-xs text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => confirmDelete(svc.id)}
                        className="px-3 py-1.5 text-xs text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Delete Product?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              This action cannot be undone. The product will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">{viewItem.title}</h3>
              <button
                onClick={() => setViewItem(null)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">Category</p>
                  <p className="font-semibold text-slate-800">{viewItem.category}</p>
                </div>
                <div className="bg-teal-50 rounded-xl p-3">
                  <p className="text-xs text-teal-500 mb-1">Price</p>
                  <p className="font-bold text-teal-700">৳{viewItem.price}/{viewItem.unit}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Short Description</p>
                <p className="text-sm text-slate-600">{viewItem.shortDesc}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Full Description</p>
                <p className="text-sm text-slate-600 leading-relaxed">{viewItem.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
                <span>Added by: {viewItem.addedBy}</span>
                <span>{new Date(viewItem.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageServicesPage() {
  return (
    <ProtectedPage>
      <ManageServicesContent />
    </ProtectedPage>
  );
}
