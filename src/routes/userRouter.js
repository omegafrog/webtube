import express from "express";
import {
  seeUser,
  editUser,
  deleteUser,
  logoutUser,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/:id(\\d+)", seeUser);
userRouter.get("/:id(\\d+)/edit", editUser);
userRouter.get("/:id(\\d+)/delete", deleteUser);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logoutUser);

export default userRouter;
