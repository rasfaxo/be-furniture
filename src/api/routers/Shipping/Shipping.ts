import { Router } from "express";
import { catchAsync } from "../../../utils";
import { createShipping } from "../../controllers/Shipping/CreateShipping";
import { getShippings } from "../../controllers/Shipping/GetAllShipping";
import { getShippingById } from "../../controllers/Shipping/GetShippingById";
import { deleteShipping } from "../../controllers/Shipping/DeleteShipping";
import { updateShipping } from "../../controllers/Shipping/UpdateShipping";

const shippingRoutes = Router();

shippingRoutes.post("/shipping", catchAsync(createShipping));
shippingRoutes.get("/shippings", catchAsync(getShippings));
shippingRoutes.get("/shipping/:id", catchAsync(getShippingById));
shippingRoutes.delete("/shipping/:id", catchAsync(deleteShipping));
shippingRoutes.put("/shipping", catchAsync(updateShipping));

export default shippingRoutes;
