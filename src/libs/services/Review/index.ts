import { ReviewsModels } from "../../../models/Models";
import * as Prisma from "@prisma/client";

type Review = Prisma.Review;

class ReviewService {
  #reviewModel: typeof ReviewsModels;

  constructor(reviewModel: typeof ReviewsModels) {
    this.#reviewModel = reviewModel;
  }

  async getReviewsById(id: number): Promise<Review | null> {
    return this.#reviewModel.findUnique({
      where: { id },
    });
  }

  async getAllReviews(skip: number, limit: number): Promise<Review[]> {
    return this.#reviewModel.findMany({
      skip,
      take: limit,
      orderBy: { id: "desc" },
    });
  }

  async createReview(
    user_id: number,
    product_id: number,
    rating: number,
    review_content: string
  ): Promise<Review> {
    return this.#reviewModel.create({
      data: {
        user_id,
        product_id,
        rating,
        review_content,
      },
    });
  }

  async updateReviewById(
    id: number,
    data: Partial<Review>
  ): Promise<Review> {
    return this.#reviewModel.update({
      where: { id },
      data,
    });
  }

  async deleteReviewById(id: number): Promise<Review> {
    return this.#reviewModel.delete({
      where: { id },
    });
  }

  async countTotalReviews(): Promise<number> {
    return this.#reviewModel.count();
  }
}

export default new ReviewService(ReviewsModels);
