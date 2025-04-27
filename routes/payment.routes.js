const { Router } = require("express");
const {
  getPaymentAll,
  getOnePaymentById,
  createPayment,
  updatePaymentById,
  removePaymentById,
} = require("../controllers/payment.controller");

let paymentRouter = Router();

paymentRouter.get("/all", getPaymentAll);
paymentRouter.get("/:id", getOnePaymentById);
paymentRouter.post("/create", createPayment);
paymentRouter.patch("/:id", updatePaymentById);
paymentRouter.delete("/:id", removePaymentById);

module.exports = paymentRouter;
