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
export const searchVideo = (req, res) => res.send("search video");
export const seeVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  res.render("watch", { pageTitle: video.title, fakeUser, video });
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
export const deleteVideo = (req, res) => res.send("delete video");
export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "upload Video", fakeUser });
};
export const postUploadVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos.push({
    title: title,
    rating: 0,
    views: 0,
    createdAt: "30 seconds ago",
    comments: {},
    id: videos.length,
  });
  return res.redirect("/");
};
