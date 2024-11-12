import express from "express";
import { catchAsync } from "../../../utils";
import { createCartItem } from "../../controllers/CartItem/CreateCartItem";
import getCartItems from "../../controllers/CartItem/GetAllCartItem";
import  getCartById  from "../../controllers/CartItem/GetCartItemById";
import { deletCartItem } from "../../controllers/CartItem/DeleteCartItem";
import {updateCartItem } from "../../controllers/CartItem/UpdateCartItem";


const cartItemRoutes = express.Router()


cartItemRoutes.post("/cartitem", catchAsync(createCartItem))
cartItemRoutes.get("/cartitems", catchAsync(getCartItems))
cartItemRoutes.get("/cartitem/:id", catchAsync(getCartById))
cartItemRoutes.delete("/cartitem/:id", catchAsync(deletCartItem))
cartItemRoutes.put("/cartitem/", catchAsync(updateCartItem))



export default cartItemRoutes