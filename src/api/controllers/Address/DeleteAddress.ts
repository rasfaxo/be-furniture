import { Request, Response } from "express";
import addressService from "../../../libs/services/Address";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const  deleteAddress = async (req: Request, res: Response) : Promise<Response> => {
    const {id} = req.params;
    const checkAddressId = await addressService.getAddressById(Number(id));

    if (!checkAddressId) {
        throw new NotFoundError("Address id not found!");
    }

    await addressService.deleteAddressById(parseInt(id));

    return res.status(200).json({
        success: true,
        message: "Successfully delete address!",
    })
}