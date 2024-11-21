import { Request, Response } from "express";
import ShippingService from "../../../libs/services/Shipping";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getShippingById = async (req:Request, res:Response) => {
    const {id} = req.params;
    const shipping = await ShippingService.getShippingById(Number(id));
    if (!shipping) {
        throw new NotFoundError("Shipping id not found!");
    }   

    return res.status(200).json({
        status: true,
        message: "Successfully get shipping by id!",
        data: shipping
    })
}