import express from "express";
import { catchAsync } from "../../../utils";
import { createAddress } from "../../controllers/Address/CreateAddress";
import { getAddressById } from "../../controllers/Address/GetAddressById";
import { getAllAddress } from "../../controllers/Address/GetAllAddress";
import { updateAddress } from "../../controllers/Address/UpdateAddress";
import { deleteAddress } from "../../controllers/Address/DeleteAddress";


const addressRoutes = express.Router()
addressRoutes.post("/address", catchAsync(createAddress))
addressRoutes.get("/address/:id", catchAsync(getAddressById))
addressRoutes.get("/addresses", catchAsync(getAllAddress))
addressRoutes.put("/address", catchAsync(updateAddress))
addressRoutes.delete("/address/:id", catchAsync(deleteAddress))
export default addressRoutes
