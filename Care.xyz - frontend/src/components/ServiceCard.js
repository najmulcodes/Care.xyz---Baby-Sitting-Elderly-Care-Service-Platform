
import Link from "next/link";

export default function ServiceCard({ service }) {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl font-bold">{service.name}</h3>
      <p>{service.description}</p>
      <p>৳{service.price}/day</p>
      <Link href={`/services/${service.id}`}>View Details</Link>
    </div>
  );
}
