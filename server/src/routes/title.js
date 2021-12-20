import express from "express";
import { TitleController } from "../controllers";

const route = express.Router();

route.get("/", TitleController.getAll);
route.get("/:id", TitleController.getOne);
route.get("/:id/views/:idChap", TitleController.getChap);

export default route;
