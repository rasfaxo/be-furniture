import express from "express";
import { catchAsync } from "../../../utils";
import { createCategory } from "../../controllers/Category/CreateCategory";
import { getCategoryById } from "../../controllers/Category/GetCategoryById";
import { getAllCategories } from "../../controllers/Category/GetAllCategory";
import { updateCategory } from "../../controllers/Category/UpdateCategory";
import { deleteCategory } from "../../controllers/Category/DeleteCategory";

const categoryRoutes = express.Router();

categoryRoutes.post("/category", catchAsync(createCategory));
categoryRoutes.get("/category/all", catchAsync(getAllCategories));
categoryRoutes.get("/category/:id", catchAsync(getCategoryById));
categoryRoutes.put("/category", catchAsync(updateCategory));
categoryRoutes.delete("/category/:id", catchAsync(deleteCategory));

export default categoryRoutes;
