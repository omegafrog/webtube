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
    console.log("start");
    const videos = await Video.find({});
    console.log(videos);
    console.log("end");
    return res.render("home", { pageTitle: "Home", fakeUser, videos });
  } catch {
    console.log("error");
    return res.send("error");
  }
};
export const getEditVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  return res.render("edit", {
    pageTitle: video.title + " | edit",
    fakeUser,
    video,
  });
};
export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id].title = title;
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
      hashtags: hashtags.split(",").map((word) => `#${word}`),
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
export const seeVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  res.render("watch", { pageTitle: video.title, fakeUser, video });
};
