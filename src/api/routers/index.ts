import { Express } from "express";
import usersRoutes from "./Users/UsersRoutes";
import productRoutes from "./Product/ProductRoutes";
import categoryRoutes from "./Category/CategoryRoutes";
import cartRoutes from "./Cart/CartRoutes";
import cartItemRoutes from "./CartItem/CartItemRoutes";

const routes = [usersRoutes, categoryRoutes, productRoutes, cartRoutes, cartItemRoutes];

const router = (app: Express) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
