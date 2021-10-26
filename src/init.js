import "./db";
import Video from "./models/video";
import app from "./server";

const port = 4000;

const handleListener = () => console.log("success");

app.listen(port, handleListener);
