import express from "express";
import { DiscoverController } from "../controllers";

const route = express.Router();

route.get("/", DiscoverController.getAll);
route.get("/filter", DiscoverController.filter);
route.get("/getMore", DiscoverController.getMore);

export default route;
