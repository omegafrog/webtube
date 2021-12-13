// TODO: #23 change globalRouter to rootRouter @omegafrog

import express from "express";
import {
  getLogin,
  postLogin,
  getJoin,
  postJoin,
  logout,
} from "../controllers/userController";
import { recommended, searchVideo } from "../controllers/videoController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";
const globalRouter = express.Router();

globalRouter.get("/", recommended);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get("/search", searchVideo);
globalRouter.route("/join").get(getJoin).post(postJoin);

export default globalRouter;
