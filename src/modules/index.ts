import { Router } from "express";
import purchaseRoutes from "../modules/purchase/purchase.routes";
import excelRoutes from "../modules/excel/excel.routes";

const routes = Router();

routes.use("/purchase", purchaseRoutes);

routes.use("/excel", excelRoutes);

export default routes;