import express from "express";
import { authCheck } from "../../middlewares/AuthGuard";
import { catchAsync } from "../../../utils";
import { createMitra } from "../../controllers/Mitra/CreateMitra";
// import { getMitraById } from "../../controllers/Mitra/GetMitraById";
// import { getMitras } from "../../controllers/Mitra/GetAllMitras";
// import { updateMitra } from "../../controllers/Mitra/UpdateMitra";
// import { deleteMitra } from "../../controllers/Mitra/DeleteMitra";
import checkRole from "../../middlewares/checkRole";
import getMitras from "../../controllers/Mitra/GetAllMitra";

const mitraRoutes = express.Router();

mitraRoutes.post("/mitra", catchAsync(createMitra));

mitraRoutes.get(
  "/mitras",
  authCheck,
  checkRole(["Admin"]),
  catchAsync(getMitras)
);

// mitraRoutes.get(
//   "/mitras/:id",
//   authCheck,
//   checkRole(["Admin"]),
//   catchAsync(getMitraById)
// );

// mitraRoutes.put(
//   "/mitras",
//   authCheck,
//   checkRole(["Admin"]),
//   catchAsync(updateMitra)
// );

// mitraRoutes.delete(
//   "/mitras/:id",
//   authCheck,
//   checkRole(["Admin"]),
//   catchAsync(deleteMitra)
// );

export default mitraRoutes;
