import User from "../models/user";

const fakeUser = {
  name: "faker",
  loggedIn: true,
};

export const loginUser = (req, res) => res.send("login");
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join", fakeUser });
};
export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  const newUser = await User.create({
    name,
    email,
    username,
    password,
    location,
  });
  return res.redirect("/login");
};

export const seeUser = (req, res) => res.send("seeUser");
export const editUser = (req, res) => res.send("editUser");
export const deleteUser = (req, res) => res.send("deleteUser");
export const logoutUser = (req, rse) => res.send("logout");
