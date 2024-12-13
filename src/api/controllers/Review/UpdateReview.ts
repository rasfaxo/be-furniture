import { Request, Response } from "express";
import ReviewValidation from "../../../validation/Review";
import ReviewService from "../../../libs/services/Review";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import userService from "../../../libs/services/Users";
import productService from "../../../libs/services/Product";

interface UpdateReviewRequest extends Request {
  body: {
    id: number;
    user_id?: number;
    product_id?: number;
    rating?: number;
    review_content?: string;
  };
}

export const updateReview = async (
  req: UpdateReviewRequest,
  res: Response
): Promise<Response> => {
  const { id, user_id, product_id, rating, review_content } = req.body;

  ReviewValidation.validateUpdateReview({
    id,
    user_id,
    product_id,
    rating,
    review_content,
  });

  const checkUniqueReviewId = await ReviewService.getReviewsById(id);
  if (!checkUniqueReviewId) {
    throw new NotFoundError("review id not found!");
  }

  if (user_id !== undefined) {
    const checkUniqueUserId = await userService.getUserById(user_id);
    if (!checkUniqueUserId) {
      throw new NotFoundError("user id not found!");
    }
  }

  if (product_id !== undefined) {
    const checkUniqueProductId =
      await productService.getProductById(product_id);
    if (!checkUniqueProductId) {
      throw new NotFoundError("product id not found!");
    }
  }

  await ReviewService.updateReviewById(id, {
    user_id,
    product_id,
    rating,
    review_content,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully updated review!",
  });
};
