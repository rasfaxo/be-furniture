import { Request, Response } from "express";
import addressService from "../../../libs/services/Address";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getAddressById = async (
    req: Request,
    res: Response
):Promise<Response> => {
    const { id } = req.params;
    const address = await addressService.getAddressById(Number(id));

    if (!address) {
        throw new NotFoundError("Address id not found!");
    }

    return res.status(200).json({
        success: true,
        message: "Successfully get address by id!",
        data: address,
    });

}
