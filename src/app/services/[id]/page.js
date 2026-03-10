import services from "@/data/services";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ServiceDetailPage({ params }) {
  const service = services.find((s) => s.id === params.id);
  if (!service) return notFound();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/services" className="hover:text-blue-600">Services</Link>
        <span>/</span>
        <span className="text-gray-900">{service.title}</span>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 mb-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="text-7xl">{service.icon}</div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{service.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl">{service.description}</p>
          <div className="mt-4 inline-block bg-blue-100 text-blue-800 font-semibold px-4 py-2 rounded-full text-sm">
            ৳{service.price} / day
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">What's included</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 bg-white border rounded-xl px-5 py-4 shadow-sm">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700 font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white border rounded-2xl p-8 shadow-sm mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">Pricing</h2>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-blue-600">৳{service.price}</div>
          <div className="text-gray-500">per day</div>
        </div>
        <p className="text-gray-500 text-sm mt-2">Total cost is automatically calculated based on your selected duration.</p>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Link
          href={`/booking/${service.id}`}
          className="flex-1 text-center bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
        >
          Book This Service
        </Link>
        <Link
          href="/services"
          className="px-6 py-4 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}