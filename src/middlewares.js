import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Webtube";
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
    req.flash("error", "Not autorized");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Not autorized");
    return res.redirect("/");
  }
};

const multerUploader = multerS3({
  s3: s3,
  bucket: "jiwoomyvideo",
  acl: "public-read",
});

export const uploadVideo = multer({
  dest: "uploads/Video",
  limits: {
    fileSize: 1000000000,
  },
  storage: multerUploader,
});
export const uploadAvatar = multer({
  dest: "uploads/Avatar",
  limits: {
    fileSize: 3000000,
  },
  storage: multerUploader,
});
