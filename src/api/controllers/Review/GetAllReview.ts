import { Request, Response } from "express";
import ReviewService from "../../../libs/services/Review";

interface GetReviewsQuery {
  page?: string;
  limit?: string;
}

export const getAllReviews = async (
  req: Request<{}, {}, {}, GetReviewsQuery>,
  res: Response
): Promise<Response> => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const reviews = await ReviewService.getAllReviews(skip, limitNum);
  const totalReviews = await ReviewService.countTotalReviews();

  return res.status(200).json({
    success: true,
    current_page: pageNum,
    total_page: Math.ceil(totalReviews / limitNum),
    total_data: totalReviews,
    data: reviews,
  });
};
