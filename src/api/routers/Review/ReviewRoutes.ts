import express from "express";
import { catchAsync } from "../../../utils";
import { createReview } from "../../controllers/Review/CreateReview";
import { updateReview } from "../../controllers/Review/UpdateReview";
import { deleteReview } from "../../controllers/Review/DeleteReview";
import { getAllReviews } from "../../controllers/Review/GetAllReview";
import { getReviewById } from "../../controllers/Review/GetReviewById";

const reviewRoutes = express.Router();

reviewRoutes.post("/reviews", catchAsync(createReview));
reviewRoutes.put("/reviews", catchAsync(updateReview));
reviewRoutes.delete("/reviews/:id", catchAsync(deleteReview));
reviewRoutes.get("/reviews", catchAsync(getAllReviews));
reviewRoutes.get("/reviews/:id", catchAsync(getReviewById));

export default reviewRoutes;
