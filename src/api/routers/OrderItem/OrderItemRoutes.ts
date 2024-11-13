import { Router } from "express";
import { catchAsync } from "../../../utils";
import { createOrderItem } from "../../controllers/OrderItem/CreateOrderItem";
import { updateOrderItem } from "../../controllers/OrderItem/UpdateOrderItem";
import { deleteOrderItem } from "../../controllers/OrderItem/DeleteOrderItem";
import { GetOrderItemById } from "../../controllers/OrderItem/GetOrderItemById";
import { getAllOrderItem } from "../../controllers/OrderItem/GetAllOrderItem";

const router = Router();

router.post("/order-item", catchAsync(createOrderItem));
router.put("/order-item", catchAsync(updateOrderItem));
router.delete("/order-item/:id", catchAsync(deleteOrderItem));
router.get("/order-item/:id", catchAsync(GetOrderItemById));
router.get("/order-item", catchAsync(getAllOrderItem));

export default router;
