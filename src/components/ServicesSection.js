import Link from "next/link";
import services from "@/data/services";

export default function ServicesSection() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Professional caregivers tailored to your family's needs — vetted, trained, and ready.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="text-5xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-blue-700 font-bold text-lg">৳{service.price}<span className="text-sm font-normal text-gray-400">/day</span></span>
              <Link
                href={`/services/${service.id}`}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}