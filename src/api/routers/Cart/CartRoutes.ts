import express from "express";

import { catchAsync } from "../../../utils";
import { createCart } from "../../controllers/Cart/CreateCart";
import { deleteCart } from "../../controllers/Cart/DeleteCart";
import getCarts from "../../controllers/Cart/GetAllCart";
import { updateCart } from "../../controllers/Cart/UpdateCart";
import { getCartById } from "../../controllers/Cart/GetCartById";

const cartRoutes = express.Router()

// createCart
cartRoutes.post("/cart", catchAsync(createCart))
cartRoutes.delete("/cart/:id", catchAsync(deleteCart))
cartRoutes.get("/carts", catchAsync(getCarts))
cartRoutes.get("/cart/:id", catchAsync(getCartById))
cartRoutes.put("/cart/", catchAsync(updateCart))


export default cartRoutes