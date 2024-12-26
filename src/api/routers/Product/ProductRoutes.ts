import express from "express";
import { catchAsync } from "../../../utils";
import { createProduct } from "../../controllers/Product/CreateProduct";
import { deleteProduct } from "../../controllers/Product/DeleteProduct";
import { getProducts } from "../../controllers/Product/GetAllProduct";
import { getProductById } from "../../controllers/Product/GetProductById";
import { updateProductById } from "../../controllers/Product/UpdateProduct";
import { authCheck } from "../../middlewares/AuthGuard";
import checkRole from "../../middlewares/checkRole";

const productRoutes = express.Router();

productRoutes.post(
  "/product",
  authCheck,
  checkRole(["Admin", "Mitra"]),
  catchAsync(createProduct)
);

productRoutes.get(
  "/products",
  authCheck,
  checkRole(["Admin", "Mitra", "User"]),
  catchAsync(getProducts)
);

productRoutes.get(
  "/product/:id",
  authCheck,
  checkRole(["Admin", "Mitra", "User"]),
  catchAsync(getProductById)
);

productRoutes.put(
  "/product",
  authCheck,
  checkRole(["Admin", "Mitra"]),
  catchAsync(updateProductById)
);

productRoutes.delete(
  "/product/:id",
  authCheck,
  checkRole(["Admin", "Mitra"]),
  catchAsync(deleteProduct)
);

export default productRoutes;
