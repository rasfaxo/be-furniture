import { OrderStatus } from "@prisma/client";
import { OrdersModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Order = Prisma.Order;

class orderService {
  #orderModel: typeof OrdersModels;

  constructor(orderModel: typeof OrdersModels) {
    this.#orderModel = orderModel;
  }

  async getOrderById(id: number): Promise<Order | null> {
    return await this.#orderModel.findUnique({
      where: { id },
      include: {
        OrderItem: {
          select: {
            id: true,
            product_id: true,
            quantity: true,
            price: true,
          },
        },
        Payment: {
          select: {
            id: true,
            payment_method: true,
            payment_status: true,
            payment_date: true,
          },
        },
        Shipping: {
          select: {
            id: true,
            address_id: true,
            shipping_cost: true,
            shipping_date: true,
            status: true,
          },
        },
      },
    });
  }

  async getAllOrders(skip: number, limit: number): Promise<Order[]> {
    return await this.#orderModel.findMany({
      skip,
      take: limit,
      include: {
        OrderItem: {
          select: {
            id: true,
            product_id: true,
            quantity: true,
            price: true,
          },
        },
        Payment: {
          select: {
            id: true,
            payment_method: true,
            payment_status: true,
            payment_date: true,
          },
        },
        Shipping: {
          select: {
            id: true,
            address_id: true,
            shipping_cost: true,
            shipping_date: true,
            status: true,
          },
        },
      },
    });
  }

  async createOrder(
    user_id: number,
    cart_id: number,
    total_price: number,
    status: OrderStatus
  ): Promise<Order> {
    return await this.#orderModel.create({
      data: {
        user_id,
        cart_id,
        total_price,
        status,
      },
    });
  }

  async updateOrder(id: number, data: Partial<Order>): Promise<Order> {
    return await this.#orderModel.update({
      where: { id },
      data,
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

export default new orderService(OrdersModels);
