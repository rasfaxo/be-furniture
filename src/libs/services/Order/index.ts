import { order_status } from "@prisma/client";
import { OrdersModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Order = Prisma.Order;

class OrderService {
    #orderModel: typeof OrdersModels;

    constructor(orderModel: typeof OrdersModels) {
        this.#orderModel = orderModel;
    }

    async getOrderById(id: number): Promise<Order | null> {
        return await this.#orderModel.findUnique({
            where: { id },
            include: {
                User: true,
                Cart: true,
                Order_Item: true,
                Payment: true,
                Shipping: true,
            },
        });
    }

    async getAllOrders(skip: number, limit: number): Promise<Order[]> {
        return await this.#orderModel.findMany({
            skip,
            take: limit,
            include: {
                User: true,
                Cart: true,
                Order_Item: true,
                Payment: true,
                Shipping: true,
            },
        });
    }

    async createOrder(
        user_id: number,
        cart_id: number,
        total_price: number,
        status: order_status
    ): Promise<Order> {
        return await this.#orderModel.create({
            data: {
                user_id,
                cart_id,
                total_price,
                status,
            },
            include: {
                User: true,
                Cart: true,
                Order_Item: true,
                Payment: true,
                Shipping: true,
            },
        });
    }

    async updateCartItem(id: number, cart_id: number): Promise<Order> {
        return await this.#orderModel.update({
            where: { id },
            data: { cart_id },
        });
    }

    async deleteOrderById(id: number): Promise<Order | null> {
        return await this.#orderModel.delete({
            where: { id },
        });
    }

    async countOrders(): Promise<number> {
        return await this.#orderModel.count();
    }
}

export default new OrderService(OrdersModels);
