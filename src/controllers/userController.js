import User from "../models/user";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.render("login", {
      pageTitle: "login",

      errorMessage: "An account with this username does not exist",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.render("login", {
      pageTitle: "login",

      errorMessage: "Wrong password",
    });
  }
  // request에 sid가 있고, 그 sid를 가진 세션을 선택해라
  // 그래서 req.session인것같다. res.session도아니고
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logoutUser = (req, res) => {
  if (req.session.loggedIn === true) {
    req.session.destroy();
  }
  return res.redirect("/");
};
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
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
    });
  }
  if (emailExist) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "This email is already taken",
    });
  }
  if (passwordmatched) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation is not match",
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
    });
  }
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "http://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    // access api
    const { access_token } = tokenRequest;
    const emailRequest = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const userRequest = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userRequest);
    console.log(emailRequest);
    const emailObj = emailRequest.find(
      (email) => email.verified === true && email.primary === true
    );
    if (!emailObj) {
      // notification that cannot login this github account.
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });

    if (!user) {
      // not exist user with that email on db
      user = await User.create({
        name: userRequest.name,
        avatarURL: userRequest.avatar_url,
        githubLoginOnly: true,
        email: emailObj.email,
        username: userRequest.name,
        location: userRequest.location,
        password: "",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("login");
  }
};

export const seeUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  if (!user) {
    return res.render("404", { pageTitle: "404 page not found." });
  }
  return res.render("profile", { pageTitle: user.name, user });
};
export const getEditUser = (req, res) => {
  res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEditUser = async (req, res) => {
  const {
    session: {
      user: { _id, avatarURL },
    },
    body: { name, email, username, location },
    file,
  } = req;
  try {
    const usernameOverlapped = await User.exists({ username });
    const emailOverlapped = await User.exists({ email });

    if (usernameOverlapped && req.session.user.username !== username) {
      return res.render("edit-profile", {
        pageTitle: "Edit Users",
        errorMessage: "Same username exists.",
      });
    }
    if (emailOverlapped && req.session.user.email !== email) {
      return res.render("edit-profile", {
        pageTitle: "Edit Users",
        errorMessage: "Same email exists.",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        username,
        avatarURL: file ? file.path : avatarURL,
        location,
      },
      { new: true }
    );
    req.session.user = updatedUser;
    return res.redirect(`/users/${_id}`);
  } catch (err) {
    console.log(err);
    return res.render("edit-profile", {
      pageTitle: "Edit Users",
      errorMessage: err._message,
    });
  }
};
export const getChangePassword = (req, res) => {
  if (req.session.user.githubLoginOnly) {
    return res.redirect("/users/edit");
  }
  return res.render("changePassword", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { old_password, new_password, new_password_confirmation },
  } = req;
  const isOldPasswordCorrect = await bcrypt.compare(old_password, password);
  console.log(isOldPasswordCorrect);
  if (!isOldPasswordCorrect) {
    return res.render("changePassword", {
      pageTitle: "Change Password",
      errorMessage: "Current password is not correct.",
    });
  } else if (new_password !== new_password_confirmation) {
    return res.render("changePassword", {
      pageTitle: "Change Password",
      errorMessage: "Password confirmation is not correct.",
    });
  }
  const changedUser = await User.findByIdAndUpdate(
    _id,
    {
      password: await User.hashPassword(new_password),
    },
    { new: true }
  );
  return res.redirect("/users/logout");
};
export const deleteUser = (req, res) => res.send("deleteUser");
