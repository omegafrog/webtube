import { express } from "express";

const globalRouter = express.Router();

globalRouter.get("/", recommended);
globalRouter.get("/login", loginUser);
globalRouter.get("/search", searchVideo);
globalRouter.get("/join", joinUser);

export default globalRouter;
