import { Request, Response } from "express";
import ShippingService from "../../../libs/services/Shipping";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import ShippingValidator from "../../../validation/Shipping";
import OrderService from "../../../libs/services/Order";
import addressService from "../../../libs/services/Address";
export const updateShipping = async (req:Request, res:Response) => {
    const {id, order_id, address_id, shipping_cost, status} = req.body;
    ShippingValidator.validateUpdateShippingPayLoad({
        id, 
        address_id, 
        shipping_cost, 
        status
    });

    const checkUniqueId = await ShippingService.getShippingById(id);
    
    if (!checkUniqueId) {
        throw new NotFoundError("Id not found!");
    }

    const checkOrderId = await OrderService.getOrderById(order_id);

    if (!checkOrderId) {
        throw new NotFoundError("Order id not found!");
        
    }
    const checkAddressId = await addressService.getAddressById(address_id);

    if (!checkAddressId) {
    
        throw new Error("Address id not found!");
    }

    await ShippingService.updateShipping(id, {
        id, 
        order_id,
        address_id, 
        shipping_cost, 
        status
    });

    return res.status(200).json({
        status: true,
        message: "Successfully update shipping!", 
    })
}