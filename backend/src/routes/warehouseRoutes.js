// routes/warehouse.routes.js
import { Router } from "express";
import {
  getWarehouses,
  getWarehouseById,
  bookWarehouseSlot,
  getWarehouseReviews
} from "../controllers/warehouseController.js";

import { verifyJWT as protect } from "../middleware/auth.middleware.js";

const warehouseRouter = Router();

warehouseRouter.get("/", getWarehouses);
warehouseRouter.get("/:id", getWarehouseById);
warehouseRouter.post("/:id/book", protect, bookWarehouseSlot);
warehouseRouter.get("/:id/reviews", getWarehouseReviews);

export default warehouseRouter;


