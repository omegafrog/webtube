import { Express } from "express";

const userRouter = Express.Router;

userRouter.get("/:id", seeUser);
userRouter.get("/:id/edit", editUser);
userRouter.get("/:id/delete", deleteUser);
userRouter.get("/logout", logoutUser);

export default userRouter;
