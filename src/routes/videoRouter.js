import express from "express";
import {
  seeVideo,
  editVideo,
  deleteVideo,
  uploadVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id", seeVideo);
videoRouter.get("/:id/edit", editVideo);
videoRouter.get("/:id/delete", deleteVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;
