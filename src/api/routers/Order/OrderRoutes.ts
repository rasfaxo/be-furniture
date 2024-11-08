import { Router } from "express";
import { catchAsync } from "../../../utils";
import { createOrder } from "../../controllers/Order/CreateOrder";
// import { updateOrder } from "../../controllers/Order/UpdateOrder";
import { deleteOrderByid } from "../../controllers/Order/DeleteOrderById";
import { getOrderById } from "../../controllers/Order/GetOrderById";
import { getAllOrders } from "../../controllers/Order/GetAllOrder";

const router = Router();

router.post("/order", catchAsync(createOrder));
// router.put("/order/:id", catchAsync(updateOrder));
router.delete("/order/:id", catchAsync(deleteOrderByid));
router.get("/order/:id", catchAsync(getOrderById));
router.get("/orders", catchAsync(getAllOrders));

export default router;
