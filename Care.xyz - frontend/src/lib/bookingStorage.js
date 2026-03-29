
export const saveBooking = (booking) => {
  const prev = JSON.parse(localStorage.getItem("bookings")) || [];
  localStorage.setItem("bookings", JSON.stringify([...prev, booking]));
};

export const getBookings = () => {
  return JSON.parse(localStorage.getItem("bookings")) || [];
};
