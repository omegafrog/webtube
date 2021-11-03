import multer from "multer";
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  if (req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = {};
  }
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const uploadVideo = multer({
  dest: "uploads/Video",
  limits: {
    fileSize: 300000,
  },
});
export const uploadAvatar = multer({
  dest: "uploads/Avatar",
  limits: {
    fileSize: 10000000,
  },
});
