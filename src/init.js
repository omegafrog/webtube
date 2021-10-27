import "./db";
import Video from "./models/video";
import app from "./server";

const port = 4000;

const handleListener = () => console.log("success");

app.once("SIGUSR2", function () {
  app.kill(app.pid, "SIGUSR2");
});

app.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  app.kill(app.pid, "SIGINT");
});

app.listen(port, handleListener);
