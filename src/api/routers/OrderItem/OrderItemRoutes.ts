import { Router } from "express";
import { catchAsync }from "../../../utils";
import { createOrderItem } from "../../controllers/OrderItem/CreateOrderItem";
import { updateOrderItem } from "../../controllers/OrderItem/UpdateOrderItem";
import { deleteOrderItem } from "../../controllers/OrderItem/DeleteOrderItem";
import { GetOrderItemById } from "../../controllers/OrderItem/GetOrderItemById";
import { getAllOrderItem } from "../../controllers/OrderItem/GetAllOrderItem";

const router = Router();

router.post("/orderItem", catchAsync(createOrderItem));
router.put("/orderItem/:id", catchAsync(updateOrderItem));
router.delete("/orderItem/:id", catchAsync(deleteOrderItem));
router.get("/orderItem/:id", catchAsync(GetOrderItemById));
router.get("/orderItem", catchAsync(getAllOrderItem));

export default router;
