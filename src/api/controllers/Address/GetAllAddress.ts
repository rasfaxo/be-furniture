import { Request, Response } from "express";
import addressService from "../../../libs/services/Address";


interface Fillter {
    id?:number,
    user_id?:number,
    street?:string,
    city?:string,
    state?:string,
    postal_code:string,
    country:string
}

interface GetAddressQuery {
    page?:string,
    limit?:string
}

interface GetAddressBody{
    filter?:Fillter
}

export const getAllAddress  = async (
    req:Request<{},{},GetAddressBody,GetAddressQuery>,
    res:Response
):Promise<Response | any> =>{
    const {page="1", limit = "10"} = req.query;
    const pageNum = parseInt(page,10);
    const limitNum = parseInt(limit,10);
    const {filter} = req.body;
    const skip = (pageNum - 1) * limitNum
    const result = await addressService.getAllAddress(skip,limitNum,filter);
    const conn = await addressService.countAddress();

    return res.status(200).json({
        succsess: true,
        current_page: pageNum,
        total_page: Math.ceil(conn / limitNum),
        total_data: conn,
        query: result,
      });
    };
    
