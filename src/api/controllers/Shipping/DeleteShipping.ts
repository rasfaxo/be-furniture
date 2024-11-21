import { Request, Response } from "express";
import ShippingService from "../../../libs/services/Shipping";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteShipping = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const { id } = req.params;
    const checkUniqueId = await ShippingService.getShippingById(Number(id));

    if (!checkUniqueId) {
        throw new NotFoundError("Id not found");
    }

    await ShippingService.deleteUpdateById(Number(id));

    return res.status(200).json({
        success: true,
        message: "Shipping deleted successfully",
    });
}
