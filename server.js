import express from "express";
import logger from "morgan";
import globalRouter from "./src/routes/globalRouter";
import userRouter from "./src/routes/userRouter";
import videoRouter from "./src/routes/videoRouter";

const app = express();

const port = 4000;

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListener = () => console.log("success");

app.listen(port, handleListener);
