import express from "express";
import { loginUser, joinUser } from "../controllers/userController";
import { recommended, searchVideo } from "../controllers/videoController";
const globalRouter = express.Router();

globalRouter.get("/", recommended);
globalRouter.get("/login", loginUser);
globalRouter.get("/search", searchVideo);
globalRouter.get("/join", joinUser);

export default globalRouter;
