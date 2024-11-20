import { Express } from "express";
import usersRoutes from "./Users/UsersRoutes";
import productRoutes from "./Product/ProductRoutes";
import categoryRoutes from "./Category/CategoryRoutes";
import orderItemRoutes from "./OrderItem/OrderItemRoutes";
import orderRoutes from "./Order/OrderRoutes";
import cartItemRoutes from "./CartItem/CartItemRoutes";
import cartRoutes from "./Cart/CartRoutes";
import shippingRoutes from "./Shipping/Shipping";
import addressRoutes from "./Address/AddressRoutes";

const routes = [usersRoutes, categoryRoutes, productRoutes, orderItemRoutes, orderRoutes ,cartItemRoutes, cartRoutes, shippingRoutes, addressRoutes];

const router = (app: Express) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
