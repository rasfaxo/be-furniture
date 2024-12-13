import { Request, Response } from "express";
import ReviewValidation from "../../../validation/Review";
import ReviewService from "../../../libs/services/Review";
import NotFoundError from "../../../utils/exceptions/NotFoundError";
import UserService from "../../../libs/services/Users";
import ProductService from "../../../libs/services/Product";
interface CreateReviewRequest extends Request {
  body: {
    user_id: number;
    product_id: number;
    rating: number;
    review_content: string;
  };
}

export const createReview = async (
  req: CreateReviewRequest,
  res: Response
): Promise<Response> => {
  const { user_id, product_id, rating, review_content } = req.body;

  const checkUniqueUserId = await UserService.getUserById(user_id);
  if (!checkUniqueUserId) {
    throw new NotFoundError("User id not found!");
  }

  const checkUniqueProductId = await ProductService.getProductById(product_id);
  if (!checkUniqueProductId) {
    throw new NotFoundError("Product id not found!");
  }

  ReviewValidation.validateReviewPayload({
    user_id,
    product_id,
    rating,
    review_content,
  });

  await ReviewService.createReview(user_id, product_id, rating, review_content);

  return res.status(200).json({
    success: true,
    message: "Review created successfully",
  });
};
