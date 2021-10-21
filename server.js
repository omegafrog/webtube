import express from "express";
import logger from "morgan";
import globalRouter from "./src/routes/globalRouter";

const app = expess();

const port = 4000;

app.use(logger("dev"));
app.use("/", globalRouter);

const handleListener = () => console.log("success");

app.listen(port, handleListener);
