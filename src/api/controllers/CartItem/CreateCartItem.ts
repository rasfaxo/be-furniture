import { Request, Response } from "express";
import CartItemValidation from "../../../validation/CartItem";
import cartItemService from "../../../libs/services/CartItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import cartService from "../../../libs/services/Cart";
import productService from "../../../libs/services/Product";


interface CreateCartItemRequest extends Request {
    body: {
        cart_id: number;
        product_id: number;
        quantity: number;
        subtotal_price: number;
    }
}

export const createCartItem = async (
    req:CreateCartItemRequest,
    res: Response
): Promise<Response> => {
    const{ cart_id,product_id, quantity, subtotal_price} = req.body
    CartItemValidation.validatePayloadCartItem({
        cart_id,
        product_id,
        quantity,
        subtotal_price
    });

    const checkCartId = await cartService.getCartById(cart_id)

    if (!checkCartId) {
        throw new NotFoundError("Cart not found");
    }

    const  checkProductId = await productService.getProductById(product_id)
    if (!checkProductId) {
        throw new NotFoundError("Product not found");
    }
    const cartItem = await cartItemService.createCartItem(
        cart_id,
        product_id,
        quantity,
        subtotal_price
    );
    return res.status(200).json({
        succsess: true,
        message: "Successfully created CartItem !",
        data: cartItem
    })
}

