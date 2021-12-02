import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const recordBtn = document.querySelector("#record");
const preview = document.querySelector("#preview");

let stream = null;
let recorder = null;
let videoFile = null;
let mp4File = null;

console.log(recordBtn, preview);
const init = async (e) => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 200, height: 100 },
  });
  console.log(stream);
  preview.srcObject = stream;
  preview.play();
};
const handleDownload = async () => {
  let mp4URL = null;
  let thumbnail = null;
  let thumbnailURL = null;
  let ffmepg = null;
  if (mp4File === null) {
    ffmepg = createFFmpeg({
      corePath: "https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js",
      log: true,
    });
    // load ffmepg
    await ffmepg.load();
    // make file in ffmepg FileSystem
    ffmepg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
    await ffmepg.run("-i", "recording.webm", "-r", "60", "output.mp4");
    await ffmepg.run(
      "-i",
      "recording.webm",
      "-ss",
      "00:00:01",
      "-frames:v",
      "1",
      "thumbnail.jpg"
    );

    mp4File = ffmepg.FS("readFile", "output.mp4");
    thumbnail = ffmepg.FS("readFile", "thumbnail.jpg");
    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbnail.buffer], { type: "image/jpg" });
    thumbnailURL = URL.createObjectURL(thumbBlob);
    mp4URL = URL.createObjectURL(mp4Blob);
  }

  const videoA = document.createElement("a");
  videoA.href = mp4URL;
  videoA.download = "Downloaded.mp4";
  document.body.appendChild(videoA);
  videoA.click();
  const thumbnailA = document.createElement("a");
  thumbnailA.href = thumbnailURL;
  thumbnailA.download = "thumbnail.jpg";
  document.body.appendChild(thumbnailA);
  thumbnailA.click();

  ffmepg.FS("unlink", "recording.webm");
  ffmepg.FS("unlink", "thumb.jpg");
  ffmepg.FS("unlink", "output.mp4");
};
const handleStop = () => {
  recordBtn.innerText = "start download";
  recordBtn.removeEventListener("click", handleStop);
  recordBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  recordBtn.innerText = "stop record";
  recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  // 비디오를 데이터로 받을수 있는 상태가 되면 이 이벤트가 실행됨
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data); // blob
    preview.srcObject = null;
    preview.src = videoFile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();

  recordBtn.removeEventListener("click", handleStart);
  recordBtn.addEventListener("click", handleStop);
};
init();
recordBtn.addEventListener("click", handleStart);
