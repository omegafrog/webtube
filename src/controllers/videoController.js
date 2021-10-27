import Video from "../models/video";

const fakeUser = {
  name: "faker",
  loggedIn: true,
};

// export const recommended = (req, res) => {
//   // {} --> find all
//   Video.find({}, (err, videos) => {
//     console.log(err, videos);
//     return res.render("home", { pageTitle: "Home", fakeUser, videos });
//   });
// };

// pormise
export const recommended = async (req, res) => {
  try {
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", { pageTitle: "Home", fakeUser, videos });
  } catch {
    console.log("error");
    return res.send("error");
  }
};
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("edit", {
      pageTitle: video.title + " | edit",
      fakeUser,
      video,
    });
  } else {
    return res.render("404", { pageTitle: "video not found" });
  }
};
export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.findById(id);
  video.title = title;
  video.description = description;
  video.hashtags = hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
  console.log(video.hashtags);
  await video.save();
  return res.redirect("/videos/" + req.params.id);
};
export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "upload Video", fakeUser });
};
export const postUploadVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    // await Video.create()
    const video = new Video({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word.trim()}`),
    });
    await video.save();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMsg: error._message,
      fakeUser,
    });
  }
};
export const deleteVideo = (req, res) => res.send("delete video");

export const searchVideo = (req, res) => res.send("search video");
export const seeVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    res.render("watch", { pageTitle: video.title, fakeUser, video });
  } else {
    res.render("404", { pageTitle: "video not found", fakeUser });
  }
};
