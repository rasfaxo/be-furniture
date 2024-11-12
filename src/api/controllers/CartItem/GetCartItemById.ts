import { Request, Response } from "express";
import cartItemService from "../../../libs/services/CartItem";
import NotFoundError from "../../../utils/exceptions/NotFoundError"

export const  getCartItemById = async (req:Request, res:Response) => {
    const {id} = req.params
    const cartItem = await cartItemService.getCartItemById(Number(id))

    if(!cartItem) {
        throw new NotFoundError("Id not found")
    }

    return res.status(200).json({
        status: "success",
        data: cartItem
    })
}


export default getCartItemById