import express from "express";
import { catchAsync } from "../../../utils";
import { createCategory } from "../../controllers/Category/CreateCategory";
import { getCategoryById } from "../../controllers/Category/GetCategoryById";
import { getAllCategories } from "../../controllers/Category/GetAllCategory";
import { updateCategory } from "../../controllers/Category/UpdateCategory";
import { deleteCategory } from "../../controllers/Category/DeleteCategory";
import { authCheck } from "../../middlewares/AuthGuard";
import checkRole from "../../middlewares/checkRole";

const categoryRoutes = express.Router();

categoryRoutes.post(
  "/category",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(createCategory)
);

categoryRoutes.put(
  "/category",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(updateCategory)
);

categoryRoutes.delete(
  "/category/:id",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(deleteCategory)
);

categoryRoutes.get("/category", catchAsync(getAllCategories));
categoryRoutes.get("/category/:id", catchAsync(getCategoryById));

export default categoryRoutes;
