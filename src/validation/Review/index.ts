import InvariantError from "../../utils/exceptions/InvariantError";
import { createReviewSchema, updateReviewSchema } from "./schema";

interface ReviewPayload {
  id?: number;
  user_id?: number;
  product_id?: number;
  rating?: number;
  review_content?: string;
}

const ReviewValidation = {
  validateReviewPayload(payload: ReviewPayload): void {
    const { error } = createReviewSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
  validateUpdateReview(payload: ReviewPayload): void {
    const { error } = updateReviewSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.details[0].message);
    }
  },
};

export default ReviewValidation;
