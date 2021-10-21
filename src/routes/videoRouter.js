import { Express } from "express";
import {
  seeVideo,
  editVideo,
  deleteVideo,
  uploadVideo,
} from "../controllers/videoController";
const videoRouter = Express.Router();

videoRouter.get("/:id", seeVideo);
videoRouter.get("/:id/edit", editVideo);
videoRouter.get("/:id/delete", deleteVideo);
videoRouter.get("/upload", uploadVideo);

export default videoRouter;
