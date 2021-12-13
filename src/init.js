import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/comment";
import "./models/user";
import "./models/video";

import app from "./server";

const port = process.env.PORT;

const handleListener = () => console.log("success");

app.listen(port, handleListener);
