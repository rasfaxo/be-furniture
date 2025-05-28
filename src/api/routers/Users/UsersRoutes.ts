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
import { changePasswordUsers } from "../../controllers/Users/ChangePasswordUsers";
import checkRole from "../../middlewares/checkRole";

const usersRoutes = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too much pressing the screen, please wait a while longer !!",
});

usersRoutes.post("/register", catchAsync(createUsers));
usersRoutes.post("/login", limiter, catchAsync(loginUsers));

usersRoutes.get(
  "/users",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(getUsers)
);
usersRoutes.get(
  "/users/:id",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(getUserById)
);
usersRoutes.put(
  "/users",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(updateUsers)
);
usersRoutes.delete(
  "/users/:id",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(deleteUsers)
);

usersRoutes.put(
  "/users/change-password",
  authCheck,
  checkRole(["Admin", "User"]),
  catchAsync(changePasswordUsers)
);

export default usersRoutes;
