import express from "express";
import { addView } from "../controllers/videoController";
const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-z]{24})/view", addView);

export default apiRouter;
