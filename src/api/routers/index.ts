import { Express } from "express";
import usersRoutes from "./Users/UsersRoutes";
import productRoutes from "./Product/ProductRoutes";
import categoryRoutes from "./Category/CategoryRoutes";
import orderItemRoutes from "./OrderItem/OrderItemRoutes";
import orderRoutes from "./Order/OrderRoutes";
import cartItemRoutes from "./CartItem/CartItemRoutes";
import cartRoutes from "./Cart/CartRoutes";
import reviewRoutes from "./Review/ReviewRoutes";
import addressRoutes from "./Address/AddressRoutes";
import shippingRoutes from "./Shipping/Shipping";
import checkoutRoutes from "./CheckOut/CheckoutRoutes";

const routes = [usersRoutes, categoryRoutes, productRoutes, orderItemRoutes, orderRoutes ,cartItemRoutes, cartRoutes,reviewRoutes,addressRoutes,shippingRoutes, checkoutRoutes];

const router = (app: Express) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
