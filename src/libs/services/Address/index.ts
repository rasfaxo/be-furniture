import { AddressModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Address = Prisma.Address;

class addressService {
  #addressModel: typeof AddressModels;
  constructor(addressModel: typeof AddressModels) {
    this.#addressModel = addressModel;
  }

  async getAddressById(id: number): Promise<Address | null> {
    return await this.#addressModel.findUnique({
      where: { id },
      include: {
        shipping: {
          select: {
            id: true,
            order_id: true,
            shipping_cost: true,
            shipping_date: true,
            status: true,
          },
        },
        checkout: {
          select: {
            id: true,
            user_id: true,
            cart_id: true,
            payment_id: true,
            shipping_id: true,
            address_id: true,
            status: true,
            total_price: true,
          },
        },
      },
    });
  }
  async getAddressByUserId(user_id: number): Promise<Address | null> {
    return await this.#addressModel.findFirst({
      where: { user_id },
    });
  }

  async getAllAddress(
    skip: number,
    limit: number,
    filter: any
  ): Promise<Address[]> {
    return await this.#addressModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      where: filter,
      include: {
        shipping: {
          select: {
            id: true,
            order_id: true,
            shipping_cost: true,
            shipping_date: true,
            status: true,
          },
        },
        checkout: {
          select: {
            id: true,
            user_id: true,
            cart_id: true,
            payment_id: true,
            shipping_id: true,
            address_id: true,
            status: true,
            total_price: true,
          },
        },
      },
    });
  }

  async createAddress(
    user_id: number,
    street: string,
    city: string,
    state: string,
    postal_code: string,
    country: string
  ): Promise<Address> {
    return await this.#addressModel.create({
      data: {
        user_id,
        street,
        city,
        state,
        postal_code,
        country,
      },
    });
  }

  async updateAddressById(
    id: number,
    data: Partial<Address>
  ): Promise<Address> {
    return await this.#addressModel.update({
      where: { id },
      data,
    });
  }

  async deleteAddressById(id: number): Promise<Address | null> {
    return await this.#addressModel.delete({
      where: { id },
    });
  }

  async countAddress(): Promise<number> {
    return await this.#addressModel.count();
  }
}

export default new addressService(AddressModels);
