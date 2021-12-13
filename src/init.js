import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/comment";
import "./models/user";
import "./models/video";

import app from "./server";

const port = 4000;

const handleListener = () => console.log("success");

app.listen(port, handleListener);
