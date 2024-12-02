import express from "express"
import { createPayment } from "../../controllers/Payment/CreatePayment"
import { getPaymentById } from "../../controllers/Payment/GetPaymentById"
import { getAllPayment } from "../../controllers/Payment/GetAllPayment"
import { updatePayment } from "../../controllers/Payment/UpdatePayment"
import { deletePayment } from "../../controllers/Payment/DeletePayment"
import { catchAsync } from "../../../utils"

const paymentRoutes = express.Router()

paymentRoutes.post("/payment", catchAsync(createPayment))
paymentRoutes.get("/payment", catchAsync(getAllPayment))
paymentRoutes.get("/payment/:id", catchAsync(getPaymentById))
paymentRoutes.put("/payment/:id", catchAsync(updatePayment))
paymentRoutes.delete("/payment/:id", catchAsync(deletePayment))

export default paymentRoutes