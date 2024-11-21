import { Request, Response } from "express";
import ReviewValidation from "../../../validation/Review";
import ReviewService from "../../../libs/services/Review";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

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
    throw new NotFoundError("Review id not found!");
  }

  const updatedReview = await ReviewService.updateReviewById(id, {
    user_id,
    product_id,
    rating,
    review_content,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully updated review!",
    data: updatedReview,
  });
};
