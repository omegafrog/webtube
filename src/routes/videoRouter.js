import express from "express";
import {
  seeVideo,
  getEditVideo,
  postEditVideo,
  deleteVideo,
  getUploadVideo,
  postUploadVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-z]{24})", seeVideo);
videoRouter
  .route("/:id([0-9a-z]{24})/edit")
  .get(getEditVideo)
  .post(postEditVideo);
videoRouter.get("/:id([0-9a-z]{24})/delete", deleteVideo);
videoRouter.route("/upload").get(getUploadVideo).post(postUploadVideo);

export default videoRouter;
