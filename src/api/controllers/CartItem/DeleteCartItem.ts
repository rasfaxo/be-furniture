import { Request, Response } from "express";
import cartItemService from "../../../libs/services/CartItem";

import NotFoundError from "../../../utils/exceptions/NotFoundError";




export const deletCartItem = async (req:Request, res:Response): Promise<Response> => {
    const {id} = req.params
    const checkUniqueId = await cartItemService.getCartItemById(Number(id))
    if (!checkUniqueId) {
        throw new NotFoundError("Id not found")
    }
    await cartItemService.deleteCartItemById(Number(id))
    return res.status(200).json({
        success: true,
        message: "Cart item deleted successfully",
    })
}

 