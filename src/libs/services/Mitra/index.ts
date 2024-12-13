import { MitraModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Mitra = Prisma.Mitra;

class MitraService {
  #mitraModel: typeof MitraModels;

  constructor(mitraModel: typeof MitraModels) {
    this.#mitraModel = mitraModel;
  }

  async getMitraByUserId(userId: number): Promise<Mitra | null> {
    return await this.#mitraModel.findUnique({
      where: { user_id: userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
            role: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        orders: {
          select: {
            id: true,
            total_price: true,
            status: true,
            orderItems: {
              select: {
                id: true,
                product_id: true,
                quantity: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async getMitras(skip: number, limit: number, filter: any): Promise<Mitra[]> {
    return await this.#mitraModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        orders: {
          select: {
            id: true,
            total_price: true,
            status: true,
          },
        },
      },
    });
  }

  async getMitraById(id: number): Promise<Mitra | null> {
    return await this.#mitraModel.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone_number: true,
            role: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
          },
        },
        orders: {
          select: {
            id: true,
            total_price: true,
            status: true,
          },
        },
      },
    });
  }

  async createMitra(
    user_id: number,
    company_name: string,
    business_type: string,
    address: string,
    contact_info: string
  ): Promise<Mitra> {
    return await this.#mitraModel.create({
      data: {
        user_id,
        company_name,
        business_type,
        address,
        contact_info,
      },
    });
  }

  async updateMitraById(id: number, data: Partial<Mitra>): Promise<Mitra> {
    return await this.#mitraModel.update({
      where: { id },
      data,
    });
  }

  async deleteMitraById(id: number): Promise<void> {
    await this.#mitraModel.delete({
      where: { id },
    });
  }

  async countTotalDataMitra(): Promise<number> {
    return await this.#mitraModel.count();
  }
}

const mitraService = new MitraService(MitraModels);

export default mitraService;
