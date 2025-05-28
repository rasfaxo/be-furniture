import { CheckoutModels } from "../../../models/Models";
import prisma from "../../../models/prismaClient";
import * as Prisma from "@prisma/client";
type Checkout = Prisma.Checkout;

class CheckoutService {
    #checkoutModel: typeof CheckoutModels;

    constructor(checkoutModel: typeof CheckoutModels) {
        this.#checkoutModel = checkoutModel;
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

    async createCheckout({
        user_id,
        cart_id,
        address,      // data address baru (optional)
        address_id,   // id address lama (optional)
        orderData,
        paymentData,
        shippingData,
        checkoutData
    }: {
        user_id: number,
        cart_id: number,
        address?: any,
        address_id?: number,
        orderData: {
            total_price: any,
            status?: Prisma.OrderStatus,
            created_at?: Date,
            updated_at?: Date
        },
        paymentData: {
            payment_method: Prisma.PaymentMethod,
            payment_status?: Prisma.PaymentStatus,
            payment_date: Date,
            amount: any,
            created_at?: Date,
            updated_at?: Date
        },
        shippingData: {
            shipping_cost: any,
            shipping_date?: Date,
            status?: Prisma.ShippingStatus,
            created_at?: Date,
            updated_at?: Date
        },
        checkoutData: {
            status?: Prisma.CheckoutStatus,
            total_price: any,
            created_at?: Date,
            updated_at?: Date
        }
    }): Promise<Checkout> {
        if (!address_id && !address) {
            throw new Error("address_id atau address harus diisi");
        }

        return await prisma.$transaction(async (tx) => {
            let usedAddressId = address_id;

            // address baru
            if (address) {
                const newAddress = await tx.address.create({ data: { ...address, user_id } });
                usedAddressId = newAddress.id;
            } else if (address_id) {
                // address_id milik user
                const addr = await tx.address.findUnique({ where: { id: address_id } });
                if (!addr || addr.user_id !== user_id) {
                    throw new Error("address_id tidak valid untuk user ini");
                }
            }

            // Create order
            const order = await tx.order.create({
                data: {
                    user_id,
                    cart_id,
                    total_price: orderData.total_price,
                    status: orderData.status || "Pending",
                    created_at: orderData.created_at || new Date(),
                    updated_at: orderData.updated_at || new Date()
                }
            });

            // Get cart items
            const cartItems = await tx.cartItem.findMany({ where: { cart_id } });

            // Create order items
            for (const item of cartItems) {
                await tx.orderItem.create({
                    data: {
                        order_id: order.id,
                        product_id: item.product_id,
                        quantity: item.quantity,
                        price: item.subtotal_price,
                        created_at: new Date(),
                        updated_at: new Date()
                    }
                });
            }

            // Create payment
            const payment = await tx.payment.create({
                data: {
                    order_id: order.id,
                    payment_method: paymentData.payment_method,
                    payment_status: paymentData.payment_status || "Pending",
                    payment_date: paymentData.payment_date,
                    amount: paymentData.amount,
                    created_at: paymentData.created_at || new Date(),
                    updated_at: paymentData.updated_at || new Date()
                }
            });

            // Create shipping
            const shipping = await tx.shipping.create({
                data: {
                    order_id: order.id,
                    address_id: usedAddressId!,
                    shipping_cost: shippingData.shipping_cost,
                    shipping_date: shippingData.shipping_date,
                    status: shippingData.status || "Pending",
                    created_at: shippingData.created_at || new Date(),
                    updated_at: shippingData.updated_at || new Date()
                }
            });

            // Create checkout
            const checkout = await tx.checkout.create({
                data: {
                    user_id,
                    cart_id,
                    payment_id: payment.id,
                    shipping_id: shipping.id,
                    address_id: usedAddressId!,
                    status: checkoutData.status || "Pending",
                    total_price: checkoutData.total_price,
                    created_at: checkoutData.created_at || new Date(),
                    updated_at: checkoutData.updated_at || new Date()
                }
            });

            return checkout;
        });
    }
}

export default new CheckoutService(CheckoutModels);
