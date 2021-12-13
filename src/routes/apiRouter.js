import express from "express";
import {
  addView,
  addComment,
  deleteComment,
} from "../controllers/videoController";
const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-z]{24})/view", addView);
apiRouter.post("/videos/:id([0-9a-z]{24})/comment", addComment);
apiRouter.delete("/comment/:id([0-9a-z]{24})/delete", deleteComment);
export default apiRouter;
