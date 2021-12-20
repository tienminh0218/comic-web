import express from "express";
import { UserController } from "../controllers";

const route = express.Router();

route.get("/:userId", UserController.getBookmark);

export default route;
