import { CartsModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Cart = Prisma.Cart;

class CartService {
    #cartModel: typeof CartsModels;
    constructor(cartModel: typeof CartsModels) {
        this.#cartModel = cartModel
    }

    async getCartById(id: number): Promise<Cart | null> {
        return await this.#cartModel.findUnique({
            where: { id },
            include: {
                User:true,
                Cart_Item:true,
                Order:true
                
            }
        })
    }

    async getAllCart(skip:number,limit:number,filter:any):Promise<Cart[]> {
        return await this.#cartModel.findMany({
            skip,
            take:limit,
            orderBy: {id:"desc"},
            where: filter,
            include: {
                User:true,
                Cart_Item:true,
                Order:true
                
            }
        })
    }
    async createCart(
        user_id:number,
        total_price:number
    ): Promise<Cart> {
        return await this.#cartModel.create({
            data: {
                user_id,
                total_price
            },
            include: {
                User:true,
                Cart_Item:true,
                Order:true
                
            }
        })
    }
    async updateCartById(id:number,data:Partial<Cart>):Promise<Cart | null> {
        return await this.#cartModel.update({
            where: {id},
            data
        })
    }
    async deleteCartById(id:number):Promise<void>{
        await this.#cartModel.delete({
            where: {id},
        })
    }
    async countTotalDataCart(): Promise<number> {    
        return await this.#cartModel.count();
    }
}

const cartService = new CartService(CartsModels)

export default cartService