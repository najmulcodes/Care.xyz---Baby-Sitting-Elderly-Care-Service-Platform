export default function AdminPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-16 px-0">
      <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6">Admin Panel</h1>

      <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
        <table className="w-full text-sm sm:text-base min-w-[480px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">User</th>
              <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">Service</th>
              <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">Date</th>
              <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="border-b px-4 py-3">John Doe</td>
              <td className="border-b px-4 py-3">Baby Sitting</td>
              <td className="border-b px-4 py-3">2026-02-05</td>
              <td className="border-b px-4 py-3">
                <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-yellow-200">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
