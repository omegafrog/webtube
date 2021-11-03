import express from "express";
import {
  seeVideo,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  getUploadVideo,
  postUploadVideo,
} from "../controllers/videoController";
import { protectorMiddleware, uploadVideo } from "../middlewares";
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
  .post(uploadVideo.single("video"), postUploadVideo);

export default videoRouter;
