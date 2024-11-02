import { Express } from "express";
import usersRoutes from "./Users/UsersRoutes";
import categoryRoutes from "./Category/CategoryRoutes";

const routes = [usersRoutes, categoryRoutes];

const router = (app: Express) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
