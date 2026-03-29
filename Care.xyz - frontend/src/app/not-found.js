import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-teal-100 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          404
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Page Not Found
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/services" className="btn-outline">Browse Services</Link>
        </div>
      </div>
    </div>
  );
}
