import services from "@/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.id === params.id);
  if (!service) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 flex-wrap">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-blue-600">Services</Link>
        <span>/</span>
        <span className="text-gray-900">{service.title}</span>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-6 sm:p-10 mb-6 sm:mb-10 flex flex-col sm:flex-row gap-5 sm:gap-8 items-center sm:items-start text-center sm:text-left">
        <div className="text-5xl sm:text-7xl">{service.icon}</div>
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h1>
          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-xl">{service.description}</p>
          <div className="mt-3 sm:mt-4 inline-block bg-blue-100 text-blue-800 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
            ৳{service.price} / day
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-6 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">What&apos;s included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 bg-white border rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 shadow-sm">
              <span className="text-green-500 text-lg sm:text-xl flex-shrink-0">✓</span>
              <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm mb-6 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-900">Pricing</h2>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-3xl sm:text-4xl font-bold text-blue-600">৳{service.price}</div>
          <div className="text-gray-500 text-sm sm:text-base">per day</div>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm mt-2">Total cost is automatically calculated based on your selected duration.</p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href={`/booking/${service.id}`}
          className="flex-1 text-center bg-blue-600 text-white py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 transition-colors"
        >
          Book This Service
        </Link>
        <Link
          href="/services"
          className="text-center sm:text-left px-5 sm:px-6 py-3.5 sm:py-4 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
