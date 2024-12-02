import { PaymentsModels } from "../../../models/Models";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import Decimal from "decimal.js";
import * as Prisma from "@prisma/client";


type Payment = Prisma.Payment;

class PaymentService {
  #paymentModel: typeof PaymentsModels;

  constructor(paymentModel: typeof PaymentsModels) {
    this.#paymentModel = paymentModel;
  }

  async getPaymentById(id: number): Promise<Payment | null> {
    return await this.#paymentModel.findUnique({
      where: { id },
      include: {
        Order: true,
      },
    });
  }

  async getAllPayment(skip: number, limit: number): Promise<Payment[]> {
    return await this.#paymentModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
      include: {
        Order: true,
      },
    });
  }

  async createPayment(
    order_id: number,
    payment_method: PaymentMethod,
    payment_status: PaymentStatus,
    payment_date: Date,
    amount: number,
  ): Promise<Payment> {
    return await this.#paymentModel.create({
      data: {
        order_id,
        payment_method,
        payment_status,
        payment_date : payment_date.toISOString(),
        amount: new Decimal(amount),
      },
      include: {
        Order: true,
      },
    });
  }

  async updatePaymentById(
    id: number,
    data: Partial<Payment>
  ): Promise<Payment> {
    return await this.#paymentModel.update({
      where: { id },
      data,
      include: {
        Order: true,
      },
    });
  }

  async deletePaymentById(id: number): Promise<Payment | null> {
    return await this.#paymentModel.delete({
      where: { id },
    });
  }

  async countPayments(): Promise<number> {
    return await this.#paymentModel.count();
  }
}

export default new PaymentService(PaymentsModels);
