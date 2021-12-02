const video = document.querySelector("video");
const play = document.querySelector("#play");
const mute = document.querySelector("#mute");
const currenTime = document.querySelector("#currenTime");
const totalTime = document.querySelector("#totalTime");
const volumeRange = document.querySelector("#volume");
const timeline = document.querySelector("#timeline");
const fullscreenBtn = document.querySelector("#fullscreen");
const videoContainer = document.querySelector("#videoContainer");
const videoPlayer = document.querySelector(".videoPlayer");

let volume = 0.5;
video.volume = 0.5;
volumeRange.value = volume;
let controlsTimeout = null;
let controlsMovingTimeout = null;
let controlsKeydownTimeout = null;

const handlePlayEvent = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  video.paused ? (play.innerText = "Play") : (play.innerText = "Pause");
};
const handlePlay = (e) => (play.innerText = "Pause");
const handlePause = (e) => (play.innerText = "Play");

const handleMute = (e) => {
  if (video.volume > 0) {
    video.volume = 0;
    video.muted = true;
  } else {
    video.volume = volume;
    video.muted = false;
  }
  mute.innerText = video.muted ? "Unmutted" : "Mute";
  volumeRange.value = video.muted ? 0 : volume;
};
const handleVolume = (e) => {
  const {
    target: { value },
  } = e;
  volume = value;
  video.volume = value;
  if (video.volume === 0) {
    video.muted = true;
  }
  if (video.muted === false) {
    mute.innerText = "Mute";
  } else {
    mute.innerText = "Unmute";
  }
};
const handleMetadata = () => {
  const time = new Date(video.duration);
  totalTime.innerText = time.toISOString().substr(14, 5);
  timeline.max = Math.floor(video.duration);
};
const handleTimeUpdate = () => {
  const time = new Date(video.currentTime * 1000);

  currenTime.innerText = time.toISOString().substr(14, 5);
  timeline.value = Math.floor(video.currentTime);
};
const handleVideo = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullscreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreenBtn.innerText = "full";
  } else {
    videoContainer.requestFullscreen();
    fullscreenBtn.innerText = "exit";
  }
};
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  // 이후에 마우스 움직이면 전에 id를 가진 timeout을 취소한다
  // 그리고 타임아웃을 초기화한다
  // 이러면 이동안 계속 컨트롤러가 보인다.
  if (controlsMovingTimeout) {
    clearTimeout(controlsMovingTimeout);
    controlsMovingTimeout = null;
  }
  videoPlayer.classList.add("showing");
  /// 일단 3초 보여주기
  controlsMovingTimeout = setTimeout(() => {
    videoPlayer.classList.remove("showing");
  }, 3000);
};
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(() => {
    videoPlayer.classList.remove("showing");
  }, 3000);
};
function toggleVolumeMuted() {
  if (video.volume === 0) {
    mute.innerText = "Unmute";
    video.muted = true;
  } else {
    mute.innerText = "Mute";
    video.muted = false;
  }
}
const handleKeydown = (e) => {
  const keyCode = e.code;
  if (
    keyCode === "ArrowUp" ||
    keyCode === "ArrowDown" ||
    keyCode === "ArrowLeft" ||
    keyCode === "ArrowRight" ||
    keyCode === "Space"
  ) {
    e.preventDefault();
  }
  // 다음에 다시 키를 누를때 3초이후에 플레이어가 사라지는
  // 이벤트를 없앰
  if (controlsKeydownTimeout) {
    clearTimeout(controlsKeydownTimeout);
    controlsKeydownTimeout = null;
  }
  // 키를 누르면 3초동안 플레이어 보임
  videoPlayer.classList.add("showing");
  controlsKeydownTimeout = setTimeout(() => {
    videoPlayer.classList.remove("showing");
  }, 3000);

  if (keyCode === "ArrowLeft") {
    if (timeline.value > 0) {
      timeline.value = timeline.value - 1;
      video.currentTime = timeline.value;
    }
  } else if (keyCode === "ArrowRight") {
    if (timeline.value < Math.floor(video.duration)) {
      timeline.value = Number(timeline.value) + 1;
      video.currentTime = timeline.value;
    }
  } else if (keyCode === "ArrowUp") {
    if (volumeRange.value < 1) {
      volumeRange.value = Number(volumeRange.value) + 0.1;
      video.volume = volumeRange.value;
      toggleVolumeMuted();
    }
  } else if (keyCode === "ArrowDown") {
    if (volumeRange.value > 0) {
      volumeRange.value = Number(volumeRange.value) - 0.1;
      video.volume = volumeRange.value;
      toggleVolumeMuted();
    }
  } else if (keyCode === "Space") {
    if (video.paused) {
      video.play();
      play.innerText = "Pause";
    } else {
      video.pause();
      play.innerText = "Play";
    }
  }
};

const handleEnded = () => {
  const { videoid } = videoContainer.dataset;
  fetch(`/api/videos/${videoid}/view`, {
    method: "POST",
  });
};
play.addEventListener("click", handlePlayEvent);
mute.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolume);
timeline.addEventListener("input", handleVideo);
video.addEventListener("loadedmetadata", function () {
  if (video.readyState == 4) {
    handleMetadata();
  }
});
video.addEventListener("timeupdate", function () {
  if (video.readyState == 4) {
    handleTimeUpdate();
  }
});
fullscreenBtn.addEventListener("click", handleFullscreen);
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
document.addEventListener("keydown", handleKeydown);
video.addEventListener("ended", handleEnded);
