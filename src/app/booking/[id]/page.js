export default function BookingPage({ params }) {
  return (
    <div className="max-w-xl mx-auto py-8 sm:py-16 px-0">
      <h1 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Book Service: {params.id.replace("-", " ")}
      </h1>

      <form className="space-y-4 bg-white border rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 px-4 py-2.5 sm:py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 px-4 py-2.5 sm:py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
          <textarea
            placeholder="Additional notes"
            rows={4}
            className="w-full border border-gray-300 px-4 py-2.5 sm:py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
