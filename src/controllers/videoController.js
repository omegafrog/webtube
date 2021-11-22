import Video from "../models/video";
import User from "../models/user";

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
    const videos = await Video.find({}).populate("owner");
    return res.render("home", { pageTitle: "Webtube", videos });
  } catch {
    return res.send("error");
  }
};
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  if (String(video.owner._id) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", {
    pageTitle: video.title + " | edit",
    video,
  });
};
export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (video) {
    if (String(video.owner._id) !== String(req.session.user._id)) {
      return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    await video.save();
    return res.redirect("/videos/" + req.params.id);
  } else {
    return res.status(404).send("404", { pageTitle: "video not found" });
  }
};
export const getUploadVideo = (req, res) => {
  return res.render("upload", { pageTitle: "upload Video" });
};
export const postUploadVideo = async (req, res) => {
  try {
    const {
      body: { title, description, hashtags },
      session: {
        user: { _id },
      },
      files: { video, thumb },
    } = req;
    const newVideo = await Video.create({
      title,
      videoUrl: video[0].path,
      thumbnailUrl: thumb[0].path,
      description,
      hashtags,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMsg: error._message,
    });
  }
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "video not found" });
  }
  if (String(video.owner._id) !== String(req.session.user._id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  if (!keyword) {
    return res.render("search", { pageTitle: "Search", videos: [] });
  }
  if (keyword.startsWith("#")) {
    const videos = await Video.find({
      hashtags: keyword,
    }).populate("owner");
    return res.render("search", { pageTitle: "Search", videos });
  } else if (keyword) {
    const videos = await Video.find({
      title: keyword,
    }).populate("owner");
    return res.render("search", { pageTitle: "Search", videos });
  } else {
    return res.render("search", { pageTitle: "Search", videos: [] });
  }
};
export const seeVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (video) {
    res.render("watch", { pageTitle: video.title, video });
  } else {
    res.render("404", { pageTitle: "video not found" });
  }
};

export const addView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  console.log(video);
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};
