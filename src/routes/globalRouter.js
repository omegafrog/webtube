// TODO: #23 change globalRouter to rootRouter @omegafrog

import express from "express";
import { loginUser, getJoin, postJoin } from "../controllers/userController";
import { recommended, searchVideo } from "../controllers/videoController";
const globalRouter = express.Router();

globalRouter.get("/", recommended);
globalRouter.get("/login", loginUser);
globalRouter.get("/search", searchVideo);
globalRouter.route("/join").get(getJoin).post(postJoin);

export default globalRouter;
