import { Request, Response } from "express";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckoutStatus } from "@prisma/client";
import { createCheckoutSchema } from "../../../validation/CheckOut/schema";
import CheckoutService from "../../../libs/services/CheckOut";
import InvariantError from "../../../utils/exceptions/InvariantError";
import userService from "../../../libs/services/Users";
import cartService from "../../../libs/services/Cart";
import shippingService from "../../../libs/services/Shipping";
import addressService from "../../../libs/services/Address";
// import paymentService from "../../../libs/services/Payment";

interface CreateCheckoutRequest extends Request {
  body: {
    user_id: number;
    cart_id: number;
    payment_id: number;
    shipping_id: number;
    address_id: number;
    status: CheckoutStatus;
    total_price: Decimal;
  };
}

export const createCheckout = async (
  req: CreateCheckoutRequest,
  res: Response
): Promise<Response> => {
  const { user_id, cart_id, payment_id, shipping_id, address_id, status, total_price } = req.body;

  const { error } = createCheckoutSchema.validate(req.body);
  if (error) {
    throw new InvariantError(error.details[0].message);
  }

  const checkUserId = await userService.getUserById(user_id);
  if (!checkUserId) {
    throw new InvariantError("User ID not found!");
  }

  const checkCartId = await cartService.getCartById(cart_id);
  if (!checkCartId) {
    throw new InvariantError("Cart ID not found!");
  }

  // const checkPaymentId = await paymentService.getPaymentById(payment_id);
  // if (!checkPaymentId) {
  //   throw new InvariantError("Payment ID not found!");
  // }

  const checkShippingId = await shippingService.getShippingById(shipping_id);
  if (!checkShippingId) {
    throw new InvariantError("Shipping ID not found!");
  }

  const checkAddressId = await addressService.getAddressById(address_id);
  if (!checkAddressId) {
    throw new InvariantError("Address ID not found!");
  }

  const checkout = await CheckoutService.createCheckout({
    user_id,
    cart_id,
    payment_id,
    shipping_id,
    address_id,
    status,
    total_price,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return res.status(201).json({
    success: true,
    message: "Checkout created successfully",
    data: checkout,
  });
};