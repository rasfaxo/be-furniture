import { Request, Response } from "express";
import cartService from "../../../libs/services/Cart";
import NotFoundError from "../../../utils/exceptions/NotFoundError"

export const getCartById = async (req:Request, res:Response) => {
    const{id} = req.params
    const cart = await cartService.getCartById(Number(id))

    if(!cart){
        throw new NotFoundError("Cart not Found")
    }

    return res.status(200).json({
        status: "succsess",
        data: cart    
    })
}