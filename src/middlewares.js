export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  if (req.session.user) {
    res.locals.user = req.session.user;
  }
  next();
};
