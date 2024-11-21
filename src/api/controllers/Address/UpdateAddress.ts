import { Request, Response } from "express";
import AddressValidator from "../../../validation/Address";
import addressService from "../../../libs/services/Address";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import InvariantError from "../../../utils/exceptions/InvariantError";
export const updateAddress = async (req: Request, res: Response): Promise<Response> => {
    const {id,user_id,street,city,state,postal_code,country} = req.body;


    AddressValidator.validateUpdateAdress({
        id,user_id,street,state,city,postal_code,country
    });
    
    const checkUniqueId = await addressService.getAddressById(id);

    if (!checkUniqueId) {
        throw new NotFoundError("Address id not found!");
    }   
    // check apakah user Id sudah memiliki address
    const checkUserId = await addressService.getAddressByUserId(user_id);
    if (checkUserId && checkUserId.id !== parseInt(id)) {
        throw new InvariantError("User id already address");
    }

    

    //  check apakah user id ada di table address
    if (!checkUserId) {
        throw new NotFoundError("User id not found!");
    }
    
    await  addressService.updateAddressById(parseInt(id),{
        id,
        user_id,
        street,
        state,
        city,
        postal_code,
        country
    })

    return res.status(200).json({
        status: true,
        message: "Successfully update address!"
    });
};