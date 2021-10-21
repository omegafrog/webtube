import express from "express";
import {
  seeUser,
  editUser,
  deleteUser,
  logoutUser,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/:id", seeUser);
userRouter.get("/:id/edit", editUser);
userRouter.get("/:id/delete", deleteUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
