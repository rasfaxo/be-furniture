import { Request, Response } from "express";
import { CheckoutStatus } from "@prisma/client";
import { updateCheckoutSchema } from "../../../validation/CheckOut/schema";
import CheckoutService from "../../../libs/services/CheckOut";
import InvariantError from "../../../utils/exceptions/InvariantError";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

interface UpdateCheckoutRequest extends Request {
  body: {
    id?: number;
    status?: CheckoutStatus;
  };
}

export const updateCheckout = async (
  req: UpdateCheckoutRequest,
  res: Response
): Promise<Response> => {
  const { id, status } = req.body;

  const { error } = updateCheckoutSchema.validate(req.body);
  if (error) {
    throw new InvariantError(error.details[0].message);
  }

  const checkUniqueId = await CheckoutService.getCheckoutById(Number(id));
  if (!checkUniqueId) {
    throw new NotFoundError("Checkout not found!");
  }

  await CheckoutService.updateCheckoutById(Number(id), {
    status,
  });

  return res.status(200).json({
    success: true,
    message: "Checkout updated successfully",
  });
};
