import express from "express";
import { HomeController } from "../controllers";

const route = express.Router();

route.get("/", HomeController.getAll);

export default route;
