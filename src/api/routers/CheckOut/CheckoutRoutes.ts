import { Router } from "express";
import { catchAsync } from "../../../utils";
import { createCheckout } from "../../controllers/CheckOut/CreateCheckout";
import { getCheckoutById } from "../../controllers/CheckOut/GetCheckoutById";
import { getAllCheckouts } from "../../controllers/CheckOut/GetAllCheckout";
import { updateCheckout } from "../../controllers/CheckOut/UpdateCheckout";
import { deleteCheckoutById } from "../../controllers/CheckOut/DeleteCheckout";
const router = Router();

router.post("/checkout", catchAsync(createCheckout));
router.get("/checkout", catchAsync(getAllCheckouts));
router.get("/checkout/:id", catchAsync(getCheckoutById));
router.put("/checkout", catchAsync(updateCheckout));
router.delete("/checkout/:id", catchAsync(deleteCheckoutById));

export default router;