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
    comments: [
      {
        title: "joker",
        comment: "why so serious",
      },
      {
        title: "faker",
        comment: "championship winner is me!",
      },
    ],
    id: 0,
  },
  {
    title: "second video",
    rating: 5,
    views: 2,
    createdAt: "2.5 minutes ago",
    comments: [
      {
        title: "joker",
        comment: "why so serious",
      },
      {
        title: "faker",
        comment: "championship winner is me!",
      },
    ],
    id: 1,
  },
  {
    title: "third video",
    rating: 1,
    views: 3,
    createdAt: "3 minutes ago",
    comments: [
      {
        title: "joker",
        comment: "why so serious",
      },
      {
        title: "faker",
        comment: "championship winner is me!",
      },
    ],
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
export const deleteVideo = (req, res) => res.send("delete video");
export const uploadVideo = (req, res) => res.send("upload video");

export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id].title = title;
  return res.redirect("/videos/" + req.params.id);
};
