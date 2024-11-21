import { query, Request, Response } from "express";
import ShippingService from "../../../libs/services/Shipping";
import { ShippingStatus } from "@prisma/client";


interface Filter{
    id?:number,
    order_id?:number,
    address_id?:number,
    shipping_cost?:number,
    shipping_date?:Date,
    status?:ShippingStatus
}

interface GetShippingsQuery{
    page?:string,
    limit?:string,
}


interface GetShippingBody{
    filter?:Filter,
}


export const getShippings = async(
    req:Request<{},{}, GetShippingBody, GetShippingsQuery>,
    res:Response
): Promise<Response|any> => {
    const {page= "1", limit="10"} = req.query;
    const pageNum = parseInt(page,10);
    const limitNum = parseInt(limit,10);
    const {filter} = req.body;
    const skip = (pageNum -1) * limitNum;

    const result = await ShippingService.getAllShipping(skip,limitNum,filter);
    const conn = await ShippingService.countShippings();

    return res.status(200).json({
        status:true,
        curent_page:pageNum,
        total_page: Math.ceil(conn/limitNum),
        total_data:conn,
        query:result
   })
}
