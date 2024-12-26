import express from "express";
import { authCheck } from "../../middlewares/AuthGuard";
import { catchAsync } from "../../../utils";
import { createMitra } from "../../controllers/Mitra/CreateMitra";
import { getMitraById } from "../../controllers/Mitra/GetMitraById";
import { UpdateMitra } from "../../controllers/Mitra/UpdateMitra";
import { deleteMitra } from "../../controllers/Mitra/DeleteMitra";
import { getMitras } from "../../controllers/Mitra/GetAllMitra";
import checkRole from "../../middlewares/checkRole";

const mitraRoutes = express.Router();

mitraRoutes.post("/mitra", catchAsync(createMitra));

mitraRoutes.get(
  "/mitras",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(getMitras)
);

mitraRoutes.get(
  "/mitras/:id",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(getMitraById)
);

mitraRoutes.put(
  "/mitra",
  authCheck,
  checkRole(["Mitra"]),
  catchAsync(UpdateMitra)
);

mitraRoutes.delete(
  "/mitra/:id",
  authCheck,
  checkRole(["Admin", "Mitra"]),
  catchAsync(deleteMitra)
);

export default mitraRoutes;
