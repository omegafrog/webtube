import User from "../models/user";
import bcrypt from "bcrypt";

const fakeUser = {
  name: "faker",
  loggedIn: true,
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "login", fakeUser });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.render("login", {
      pageTitle: "login",
      fakeUser,
      errorMessage: "An account with this username does not exist",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", {
      pageTitle: "login",
      fakeUser,
      errorMessage: "Wrong password",
    });
  }
  // request에 sid가 있고, 그 sid를 가진 세션을 선택해라
  // 그래서 req.session인것같다. res.session도아니고
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => {
  if (req.session.loggedIn === true) {
    req.session.loggedIn = false;
  }
  return res.redirect("/");
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join", fakeUser });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;

  const usernameExist = await User.exists({ username });
  const emailExist = await User.exists({ email });
  const passwordmatched = password !== password2;
  if (usernameExist) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This username is already taken",
      fakeUser,
    });
  }
  if (emailExist) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This email is already taken",
      fakeUser,
    });
  }
  if (passwordmatched) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation is not match",
      fakeUser,
    });
  }
  try {
    const newUser = await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.render("join", {
      pageTitle: "Create User",
      errorMsg: error._message,
      fakeUser,
    });
  }
};

export const seeUser = (req, res) => res.send("seeUser");
export const editUser = (req, res) => res.send("editUser");
export const deleteUser = (req, res) => res.send("deleteUser");
export const logoutUser = (req, rse) => res.send("logout");
