import express from "express";
import {
  seeUser,
  getEditUser,
  postEditUser,
  logoutUser,
  getChangePassword,
  postChangePassword,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import {
  uploadAvatar,
  protectorMiddleware,
  publicOnlyMiddleware,
} from "../middlewares";
const userRouter = express.Router();

userRouter.get("/:id([0-9a-z]{24})", seeUser);
userRouter.get("/logout", protectorMiddleware, logoutUser);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEditUser)
  .post(uploadAvatar.single("avatar"), postEditUser);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter
  .route("/changePassword")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);

export default userRouter;
