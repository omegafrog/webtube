const recordBtn = document.querySelector("#record");
const preview = document.querySelector("#preview");

let stream = null;
let recorder = null;
let videoFile = null;

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
const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "Downloaded.webm";
  document.body.appendChild(a);
  a.click();
};
const handleStop = () => {
  recordBtn.innerText = "start download";
  recordBtn.removeEventListener("click", handleStop);
  recordBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  recordBtn.innerText = "stop record";
  recorder = new MediaRecorder(stream);
  // 비디오를 데이터로 받을수 있는 상태가 되면 이 이벤트가 실행됨
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data);
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
