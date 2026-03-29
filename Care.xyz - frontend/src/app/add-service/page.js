"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";

const categories = [
  "Child Care",
  "Senior Care",
  "Medical Care",
  "Disability Care",
  "Nursing",
  "Therapy",
  "Other",
];

const units = ["day", "hour", "session", "night", "week"];
const priorities = ["Low", "Medium", "High", "Urgent"];

function AddServiceForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    price: "",
    unit: "day",
    category: "",
    priority: "Medium",
    availableDate: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (form.title.length > 80) e.title = "Title must be under 80 characters";
    if (!form.shortDesc.trim()) e.shortDesc = "Short description is required";
    if (form.shortDesc.length > 120) e.shortDesc = "Keep it under 120 characters";
    if (!form.description.trim()) e.description = "Full description is required";
    if (form.description.length < 50) e.description = "Please write at least 50 characters";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Enter a valid price";
    if (!form.category) e.category = "Please select a category";
    if (!form.availableDate) e.availableDate = "Please choose an available date";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Please fix the errors below.");
      return;
    }

    setLoading(true);
    // Simulate async save
    await new Promise((r) => setTimeout(r, 800));

    // Save to localStorage for persistence across navigation
    const newService = {
      id: `user-${Date.now()}`,
      ...form,
      price: Number(form.price),
      addedBy: session?.user?.email || "unknown",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("userServices") || "[]");
    localStorage.setItem("userServices", JSON.stringify([...existing, newService]));

    setLoading(false);
    toast.success("Service added successfully! 🎉");

    setTimeout(() => router.push("/manage-services"), 1200);
  };

  const charCount = (val, max) => {
    const left = max - (val?.length || 0);
    return (
      <span className={`text-xs ${left < 20 ? "text-amber-500" : "text-slate-400"}`}>
        {left} chars left
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/manage-services"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-teal-600 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Manage Products
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Add Product
            </h1>
          </div>
          <p className="text-slate-500 text-sm ml-13">
            Fill in the details below to list a new product on the platform.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Basic info card */}
          <div className="card p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              Basic Information
            </h2>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Product Title *</label>
                {charCount(form.title, 80)}
              </div>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Night Watch Elderly Care"
                maxLength={80}
                className={`input-field ${errors.title ? "border-red-300 bg-red-50 focus:ring-red-400" : ""}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1.5">{errors.title}</p>}
            </div>

            {/* Short description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Short Description *</label>
                {charCount(form.shortDesc, 120)}
              </div>
              <input
                type="text"
                name="shortDesc"
                value={form.shortDesc}
                onChange={handleChange}
                placeholder="One sentence that captures the service (shown on cards)"
                maxLength={120}
                className={`input-field ${errors.shortDesc ? "border-red-300 bg-red-50 focus:ring-red-400" : ""}`}
              />
              {errors.shortDesc && <p className="text-red-500 text-xs mt-1.5">{errors.shortDesc}</p>}
            </div>

            {/* Full description */}
            <div>
              <label className="label">Full Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the service in detail — who it's for, what's included, how it helps..."
                className={`input-field resize-none leading-relaxed ${errors.description ? "border-red-300 bg-red-50 focus:ring-red-400" : ""}`}
              />
              {errors.description && <p className="text-red-500 text-xs mt-1.5">{errors.description}</p>}
              <p className="text-xs text-slate-400 mt-1">{form.description.length} characters</p>
            </div>
          </div>

          {/* Pricing & category card */}
          <div className="card p-6 sm:p-8 space-y-5">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
              Pricing & Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Price */}
              <div>
                <label className="label">Price (BDT) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">৳</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="500"
                    min="1"
                    className={`input-field pl-8 ${errors.price ? "border-red-300 bg-red-50 focus:ring-red-400" : ""}`}
                  />
                </div>
                {errors.price && <p className="text-red-500 text-xs mt-1.5">{errors.price}</p>}
              </div>

              {/* Unit */}
              <div>
                <label className="label">Per (Unit) *</label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="input-field"
                >
                  {units.map((u) => (
                    <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category and priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="label">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={`input-field ${errors.category ? "border-red-300 bg-red-50 focus:ring-red-400" : ""}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1.5">{errors.category}</p>}
              </div>

              <div>
                <label className="label">Priority *</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="input-field"
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="label">Available Date *</label>
              <input
                type="date"
                name="availableDate"
                value={form.availableDate}
                onChange={handleChange}
                className={`input-field ${errors.availableDate ? "border-red-300 bg-red-50 focus:ring-red-400" : ""}`}
              />
              {errors.availableDate && <p className="text-red-500 text-xs mt-1.5">{errors.availableDate}</p>}
            </div>
          </div>

          {/* Image card */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">
              Image (Optional)
            </h2>
            <div>
              <label className="label">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="input-field"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Paste a direct image URL. Leave blank to use a default icon.
              </p>
            </div>

            {/* Preview */}
            {form.imageUrl && (
              <div className="mt-4">
                <p className="text-xs font-medium text-slate-500 mb-2">Preview</p>
                <div className="w-32 h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = ""; e.target.style.display = "none"; }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Summary preview */}
          {form.title && (
            <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-3">Card Preview</p>
              <div className="bg-white rounded-xl p-4 shadow-card">
                <div className="text-sm font-semibold text-slate-900">{form.title || "Product Title"}</div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-1">{form.shortDesc || "Short description"}</div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <span className="text-teal-600 font-bold text-sm">
                    {form.price ? `৳${form.price}` : "৳—"}
                    <span className="text-slate-400 font-normal text-xs">/{form.unit}</span>
                  </span>
                  <span className="text-xs bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-full">
                    {form.category || "Category"}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                  <span>Priority: {form.priority}</span>
                  <span>{form.availableDate || "No date selected"}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-teal-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-teal-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </>
              )}
            </button>
            <Link
              href="/manage-services"
              className="sm:w-40 py-3.5 border border-slate-200 text-slate-600 rounded-xl font-medium text-sm text-center hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddServicePage() {
  return (
    <ProtectedPage>
      <AddServiceForm />
    </ProtectedPage>
  );
}
