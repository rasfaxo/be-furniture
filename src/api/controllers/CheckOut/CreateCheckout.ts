import { Request, Response } from "express";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckoutStatus } from "@prisma/client";
import { createCheckoutSchema } from "../../../validation/CheckOut/schema";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import CheckoutService from "../../../libs/services/CheckOut";
import userService from "../../../libs/services/Users";
import cartService from "../../../libs/services/Cart";
import shippingService from "../../../libs/services/Shipping";
import addressService from "../../../libs/services/Address";
import paymentService from "../../../libs/services/Payment";

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
  req: Request,
  res: Response
): Promise<Response> => {
  const { error } = createCheckoutSchema.validate(req.body);
  if (error) {
    throw new InvariantError(error.details[0].message);
  }

  const { user_id, cart_id } = req.body;
  const checkUserId = await userService.getUserById(user_id);
  if (!checkUserId) {
    throw new NotFoundError("User ID not found!");
  }
  const checkCartId = await cartService.getCartById(cart_id);
  if (!checkCartId) {
    throw new NotFoundError("Cart ID not found!");
  }

  const result = await CheckoutService.createCheckout(req.body);

  return res.status(201).json({
    success: true,
    message: "Checkout created successfully",
    data: result,
  });
};
