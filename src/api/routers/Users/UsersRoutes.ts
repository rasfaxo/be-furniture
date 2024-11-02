import express from "express";
import rateLimit from "express-rate-limit";
import { authCheck } from "../../middlewares/AuthGuard";
import { catchAsync } from "../../../utils";
import { createUsers } from "../../controllers/Users/CreateUsers";
import { loginUsers } from "../../controllers/Users/LoginUsers";
import { getUsers } from "../../controllers/Users/GetAllUsers";
import { updateUsers } from "../../controllers/Users/UpdateUsers";
import { deleteUsers } from "../../controllers/Users/DeleteUsers";
import { getUserById } from "../../controllers/Users/GetUsersById";

const usersRoutes = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too much pressing the screen, please wait a while longer !!",
});

usersRoutes.post("/register", catchAsync(createUsers));
usersRoutes.post("/login", limiter, catchAsync(loginUsers));
usersRoutes.get("/users", authCheck, catchAsync(getUsers));
usersRoutes.get("/users/:id", authCheck, catchAsync(getUserById));
usersRoutes.put("/users", authCheck, catchAsync(updateUsers));
usersRoutes.delete("/users/:id", authCheck, catchAsync(deleteUsers));

export default usersRoutes;
