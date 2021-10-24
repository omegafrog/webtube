const fakeUser = {
  name: "faker",
  loggedIn: true,
};

const videos = [
  {
    title: "first video",
    rating: 3,
    views: 1,
    createdAt: "2 minutes ago",
    comments: {
      data: [
        {
          title: "joker",
          comment: "why so serious",
        },
        {
          title: "faker",
          comment: "championship winner is me!",
        },
      ],
      num: 2,
    },
    id: 0,
  },
  {
    title: "second video",
    rating: 5,
    views: 2,
    createdAt: "2.5 minutes ago",
    comments: {
      data: [
        {
          title: "joker",
          comment: "why so serious",
        },
        {
          title: "faker",
          comment: "championship winner is me!",
        },
      ],
      num: 2,
    },
    id: 1,
  },
  {
    title: "third video",
    rating: 1,
    views: 3,
    createdAt: "3 minutes ago",
    comments: {
      data: [
        {
          title: "joker",
          comment: "why so serious",
        },
        {
          title: "faker",
          comment: "championship winner is me!",
        },
      ],
      num: 2,
    },
    id: 2,
  },
];

export const recommended = (req, res) =>
  res.render("home", { pageTitle: "Home", fakeUser, videos });
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
