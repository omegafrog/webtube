import { Express } from "express";
import { loginUser, joinUser } from "../controllers/userController";

const globalRouter = Express.Router();

globalRouter.get("/", recommended);
globalRouter.get("/login", loginUser);
globalRouter.get("/search", searchVideo);
globalRouter.get("/join", joinUser);

export default globalRouter;
