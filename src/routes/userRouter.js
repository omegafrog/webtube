import express from "express";
import {
  seeUser,
  editUser,
  deleteUser,
  logoutUser,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/:id(\\d+)", seeUser);
userRouter.get("/:id(\\d+)/edit", editUser);
userRouter.get("/:id(\\d+)/delete", deleteUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
