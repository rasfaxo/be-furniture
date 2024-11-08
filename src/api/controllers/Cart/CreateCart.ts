import { Request, Response } from "express";
import CartValidation from "../../../validation/Cart";
import cartService from "../../../libs/services/Cart";
import NotFoundError from "../../../utils/exceptions/NotFoundError";



interface CreateCartRequest extends Request {
    body: {
        user_id: number;
        total_price: number;
    };
}


export const createCart = async (
    req:CreateCartRequest,
    res:Response
): Promise<Response> => {
    const { user_id, total_price } = req.body;
    CartValidation.validatePayloadCart({
        user_id, 
        total_price 
    });

    const checkUniqueId = await cartService.getCartById(user_id);
    if (!checkUniqueId) {
        throw new NotFoundError("User id not found");
    }
    const cart = await cartService.createCart(user_id, total_price);
    return res.status(200).json({
        success: true,
        message: "Cart created successfully",
        data: cart,
    });


}