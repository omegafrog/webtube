import express from "express";
import logger from "morgan";
import globalRouter from "./src/routes/globalRouter";
import userRouter from "./src/routes/userRouter";
const app = expess();

const port = 4000;

app.use(logger("dev"));
app.use("/", globalRouter);
app.use("/users/", userRouter);

const handleListener = () => console.log("success");

app.listen(port, handleListener);
