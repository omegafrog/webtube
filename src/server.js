import express from "express";
import logger from "morgan";
import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import apiRouter from "./routes/apiRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";

const app = express();

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(flash());
app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);
app.use("/uploads/Video", express.static("uploads/Video"));
app.use("/uploads/Avatar", express.static("uploads/Avatar"));
app.use("/assets", express.static("assets"));
app.use("/src/img", express.static("src/img"));
export default app;
