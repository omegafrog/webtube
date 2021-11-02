import express from "express";
import {
  seeUser,
  getEditUser,
  postEditUser,
  deleteUser,
  logoutUser,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";
const userRouter = express.Router();

userRouter.get("/:id([0-9a-z]{24})", protectorMiddleware, seeUser);
userRouter.get("/logout", protectorMiddleware, logoutUser);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditUser)
  .post(postEditUser);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/:id(\\d+)/delete", deleteUser);

export default userRouter;
