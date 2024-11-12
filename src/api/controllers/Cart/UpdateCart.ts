import { Request, Response } from "express"
import cartService from "../../../libs/services/Cart";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CartValidation from "../../../validation/Cart";
import userService from "../../../libs/services/Users";
export const updateCart = async (
    req:Request,
    res:Response
)=> {
    const {id, user_id,total_price} =  req.body

    CartValidation.validationUpdateCart({
        id,
        user_id,
        total_price
    })
    const checkUniqueId = await cartService.getCartById(Number(id))

    if(!checkUniqueId) {
        throw new NotFoundError("Cart Not Found")
    }

    const chekUserId = await userService.getUserById(user_id)
    if (!chekUserId) {
        throw new  NotFoundError ("User Id Not Found")
    }
    await cartService.updateCartById(parseInt(id),{
      id,
      user_id,
      total_price
    })
    

    return res.status(200).json({
        succsess : true,
        message: "Successfully updated Carts!"
    })
}

