import { Request, Response } from "express";
import ReviewService from "../../../libs/services/Review";
import NotFoundError from "../../../utils/exceptions/NotFoundError";

export const getReviewById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const review = await ReviewService.getReviewsById(Number(id));
  if (!review) {
    throw new NotFoundError("Review id not found!");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully get review by id!",
    data: review,
  });
};
