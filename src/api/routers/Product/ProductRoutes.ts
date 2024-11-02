import express from "express";

import { catchAsync } from "../../../utils";
import { createProduct } from "../../controllers/Product/CreateProduct";
import { deleteProduct } from "../../controllers/Product/DeleteProduct";
import { getProducts } from "../../controllers/Product/GetAllProduct";
import { getProductById } from "../../controllers/Product/GetProductById";
import { updateProductById } from "../../controllers/Product/UpdateProduct";


const productRoutes = express.Router();

  // createProduct

  productRoutes.post("/product", catchAsync(createProduct));

  productRoutes.delete('/product/:id', catchAsync(deleteProduct));

  productRoutes.get('/products', catchAsync(getProducts));
  productRoutes.get("/product/:id", catchAsync(getProductById));

  productRoutes.put("/product", catchAsync(updateProductById));


  export default productRoutes