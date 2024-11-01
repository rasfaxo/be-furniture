import { Express } from "express";
import usersRoutes from "./Users/UsersRoutes";

const routes = [usersRoutes];

const router = (app: Express) => {
  routes.forEach((route) => {
    app.use("/api_v1", route);
  });
};

export default router;
