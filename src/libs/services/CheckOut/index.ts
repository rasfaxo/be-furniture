import { CheckoutModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Checkout = Prisma.Checkout;

class CheckoutService {
    #checkoutModel: typeof CheckoutModels;

    constructor(checkoutModel: typeof CheckoutModels) {
        this.#checkoutModel = checkoutModel;
    }

    async createCheckout(data: Omit<Checkout, "id">): Promise<Checkout> {
        return await this.#checkoutModel.create({
            data,
        });
    }

    async getCheckoutById(id: number): Promise<Checkout | null> {
        return await this.#checkoutModel.findUnique({
            where: { id },
        });
    }

    async getAllCheckouts(skip: number, limit: number): Promise<Checkout[]> {
        return await this.#checkoutModel.findMany({
            skip,
            take: limit,
            orderBy: { id: "desc" },
        });
    }

    async updateCheckoutById(id: number, data: Partial<Checkout>): Promise<Checkout | null> {
        return await this.#checkoutModel.update({
            where: { id },
            data,
        });
    }

    async deleteCheckoutById(id: number): Promise<void> {
        await this.#checkoutModel.delete({
            where: { id },
        });
    }

    async countTotalCheckouts(): Promise<number> {
        return await this.#checkoutModel.count();
    }
}

export default new CheckoutService(CheckoutModels);
