import ServicesSection from "@/components/ServicesSection";

export default function ServicesPage() {
  return (
    <section className="py-8 sm:py-16">
      <div className="max-w-6xl mx-auto px-0">
        <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-6 text-gray-900">
          Our Healthcare Services
        </h1>
        <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl text-sm sm:text-base">
          We provide trusted, vetted caregivers tailored to your needs.
        </p>
        <ServicesSection />
      </div>
    </section>
  );
}
