import express from "express";
import logger from "morgan";

const app = expess();

const port = 4000;

const handleListener = () => console.log("success");

app.listen(port, handleListener);
