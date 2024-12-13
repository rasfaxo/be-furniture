import { ShippingModels } from "../../../models/Models";
import { ShippingStatus } from "@prisma/client";
import * as Prisma from "@prisma/client";
import moment from "moment";

type Shipping = Prisma.Shipping;

class shippingService {
  #shippingModel = ShippingModels;

  constructor(shippingModel: typeof ShippingModels) {
    this.#shippingModel = shippingModel;
  }

  async getShippingById(id: number): Promise<Shipping | null> {
    return await this.#shippingModel.findUnique({
      where: { id },
      include: {
        checkouts: {
          select: {
            id: true,
            status: true,
            total_price: true,
          },
        },
      },
    });
  }
  async getAllShipping(
    skip: number,
    limit: number,
    filter: any
  ): Promise<Shipping[]> {
    return await this.#shippingModel.findMany({
      skip,
      take: limit,
      where: filter,
      include: {
        checkouts: {
          select: {
            id: true,
            status: true,
            total_price: true,
          },
        },
      },
    });
  }

  async createShipping(
    order_id: number,
    address_id: number,
    shipping_cost: number,
    shipping_date: Date,
    status: ShippingStatus
  ): Promise<Shipping> {
    const formattedShipping = moment(shipping_date).toDate();
    return await this.#shippingModel.create({
      data: {
        order_id,
        address_id,
        shipping_cost,
        shipping_date: formattedShipping,
        status,
      },
    });
  }

  async updateShipping(
    id: number,
    data: Partial<Shipping>
  ): Promise<Shipping | null> {
    return await this.#shippingModel.update({
      where: { id },
      data,
    });
  }

  async deleteUpdateById(id: number): Promise<Shipping | null> {
    return await this.#shippingModel.delete({
      where: { id },
    });
  }

  async countShippings(): Promise<number> {
    return await this.#shippingModel.count();
  }
}

export default new shippingService(ShippingModels);
