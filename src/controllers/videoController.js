const fakeUser = {
  name: "faker",
  loggedIn: true,
};

const videos = [
  {
    name: "first video",
    rating: 3,
    createdAt: "2 minutes ago",
    comments: [
      {
        name: "joker",
        comment: "why so serious",
      },
      {
        name: "faker",
        comment: "championship winner is me!",
      },
    ],
  },
  {
    name: "second video",
    rating: 5,
    createdAt: "2.5 minutes ago",
    comments: [
      {
        name: "joker",
        comment: "why so serious",
      },
      {
        name: "faker",
        comment: "championship winner is me!",
      },
    ],
  },
  {
    name: "third video",
    rating: 1,
    createdAt: "3 minutes ago",
    comments: [
      {
        name: "joker",
        comment: "why so serious",
      },
      {
        name: "faker",
        comment: "championship winner is me!",
      },
    ],
  },
];

export const recommended = (req, res) =>
  res.render("home", { pageTitle: "Home", fakeUser: fakeUser, videos });
export const searchVideo = (req, res) => res.send("search video");
export const seeVideo = (req, res) => res.render("watch");
export const editVideo = (req, res) => res.send("edit video");
export const deleteVideo = (req, res) => res.send("delete video");
export const uploadVideo = (req, res) => res.send("upload video");
