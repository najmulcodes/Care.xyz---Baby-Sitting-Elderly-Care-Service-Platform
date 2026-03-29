import Link from "next/link";
import services from "@/data/services";

export default function ServicesSection() {
  return (
    <section>
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        <p className="text-gray-500 mt-2 sm:mt-3 max-w-xl mx-auto text-sm sm:text-base px-4">
          Professional caregivers tailored to your family's needs — vetted, trained, and ready.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6">{service.description}</p>

            <div className="flex items-center justify-between mt-auto">
              <span className="text-blue-700 font-bold text-base sm:text-lg">
                ৳{service.price}<span className="text-xs sm:text-sm font-normal text-gray-400">/day</span>
              </span>
              <Link
                href={`/services/${service.id}`}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:underline"
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
