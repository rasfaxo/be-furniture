import { Request, Response } from "express";
import ReviewService from "../../../libs/services/Review";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const deleteReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const checkUniqueReviewId = await ReviewService.getReviewsById(Number(id));
  if (!checkUniqueReviewId) {
    throw new NotFoundError("Review id not found!");
  }

  await ReviewService.deleteReviewById(Number(id));

  return res.status(200).json({
    success: true,
    message: "Successfully deleted review!",
  });
};
