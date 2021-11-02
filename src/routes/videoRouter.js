import express from "express";
import {
  seeVideo,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  getUploadVideo,
  postUploadVideo,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-z]{24})", seeVideo);
videoRouter
  .route("/:id([0-9a-z]{24})/edit")
  .all(protectorMiddleware)
  .get(getEditVideo)
  .post(postEditVideo);
videoRouter.get("/:id([0-9a-z]{24})/delete", protectorMiddleware, deleteVideo);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUploadVideo)
  .post(postUploadVideo);

export default videoRouter;
