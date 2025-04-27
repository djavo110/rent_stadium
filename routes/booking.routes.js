const { Router } = require("express");
const {
  getBookingAll,
  getOneBookingById,
  createBooking,
  updateBookingById,
  removeBookingById,
} = require("../controllers/booking.controller");

let bookingRouter = Router();

bookingRouter.get("/all", getBookingAll);
bookingRouter.get("/:id", getOneBookingById);
bookingRouter.post("/create", createBooking);
bookingRouter.patch("/:id", updateBookingById);
bookingRouter.delete("/:id", removeBookingById);

module.exports = bookingRouter;
