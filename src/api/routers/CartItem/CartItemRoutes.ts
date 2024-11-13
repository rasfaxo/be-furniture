import express from "express";
import { catchAsync } from "../../../utils";
import { createCartItem } from "../../controllers/CartItem/CreateCartItem";
import getCartItems from "../../controllers/CartItem/GetAllCartItem";
import getCartById from "../../controllers/CartItem/GetCartItemById";
import { deletCartItem } from "../../controllers/CartItem/DeleteCartItem";
import { updateCartItem } from "../../controllers/CartItem/UpdateCartItem";

const cartItemRoutes = express.Router();

cartItemRoutes.post("/cart-item", catchAsync(createCartItem));
cartItemRoutes.get("/cart-items", catchAsync(getCartItems));
cartItemRoutes.get("/cart-item/:id", catchAsync(getCartById));
cartItemRoutes.delete("/cart-item/:id", catchAsync(deletCartItem));
cartItemRoutes.put("/cart-item", catchAsync(updateCartItem));

export default cartItemRoutes;
