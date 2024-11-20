import { Request, Response } from "express";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckoutStatus } from "@prisma/client";
import { createCheckoutSchema } from "../../../validation/CheckOut/schema";
import CheckoutService from "../../../libs/services/CheckOut";
import InvariantError from "../../../utils/exceptions/InvariantError";

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