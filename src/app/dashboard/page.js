export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-16 px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="border p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm">
          <h2 className="font-semibold mb-2 text-sm sm:text-base text-gray-700">Total Bookings</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">12</p>
        </div>
        <div className="border p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm">
          <h2 className="font-semibold mb-2 text-sm sm:text-base text-gray-700">Active Services</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">3</p>
        </div>
        <div className="border p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white shadow-sm">
          <h2 className="font-semibold mb-2 text-sm sm:text-base text-gray-700">Pending Requests</h2>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">2</p>
        </div>
      </div>
    </div>
  );
}
