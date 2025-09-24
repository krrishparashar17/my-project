const seats = {};

for (let i = 1; i <= 10; i++) {
  seats[i] = {
    status: "available",
    lockTimestamp: null,
    timeoutId: null,
  };
}

function getSeats() {
  return seats;
}

function lockSeat(id) {
  const seat = seats[id];
  if (!seat) return { success: false, message: "Invalid seat ID" };
  if (seat.status !== "available")
    return { success: false, message: "Seat is already locked or booked" };

  seat.status = "locked";
  seat.lockTimestamp = Date.now();

  seat.timeoutId = setTimeout(() => {
    if (seat.status === "locked") {
      seat.status = "available";
      seat.lockTimestamp = null;
    }
  }, 60 * 1000);

  return {
    success: true,
    message: `Seat ${id} locked successfully. Confirm within 1 minute.`,
  };
}

function confirmSeat(id) {
  const seat = seats[id];
  if (!seat) return { success: false, message: "Invalid seat ID" };
  if (seat.status !== "locked")
    return {
      success: false,
      message: "Seat is not locked and cannot be booked",
    };

  clearTimeout(seat.timeoutId);
  seat.status = "booked";
  seat.lockTimestamp = null;

  return { success: true, message: `Seat ${id} booked successfully!` };
}

module.exports = { getSeats, lockSeat, confirmSeat };