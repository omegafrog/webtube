import "dotenv/config";
import "./db";

import app from "./server";

const port = 4000;

const handleListener = () => console.log("success");

app.listen(port, handleListener);
