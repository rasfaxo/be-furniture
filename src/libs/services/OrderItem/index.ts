import { OrderItemsModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type OrderItem = Prisma.OrderItem;

class OrderItemService {
  #orderItemModel: typeof OrderItemsModels;

  constructor(orderItemModel: typeof OrderItemsModels) {
    this.#orderItemModel = orderItemModel;
  }

  async getOrderItemById(id: number): Promise<OrderItem | null> {
    return await this.#orderItemModel.findUnique({
      where: { id },
    });
  }

  async getAllOrderItems(skip: number, limit: number): Promise<OrderItem[]> {
    return await this.#orderItemModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
    });
  }

  async createOrderItem(
    order_id: number,
    product_id: number,
    quantity: number,
    price: number
  ): Promise<OrderItem> {
    return await this.#orderItemModel.create({
      data: {
        order_id,
        product_id,
        quantity,
        price,
      },
    });
  }

  async updateOrderItemById(
    id: number,
    data: Partial<OrderItem>
  ): Promise<OrderItem> {
    return await this.#orderItemModel.update({
      where: { id },
      data,
    });
  }

  async deleteOrderItemById(id: number): Promise<OrderItem | null> {
    return await this.#orderItemModel.delete({
      where: { id },
    });
  }

  async countOrderItems(): Promise<number> {
    return await this.#orderItemModel.count();
  }
}

export default new OrderItemService(OrderItemsModels);
