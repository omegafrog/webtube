export const recommended = (req, res) => res.render("home");
export const searchVideo = (req, res) => res.send("search video");
export const seeVideo = (req, res) => res.render("watch");
export const editVideo = (req, res) => res.send("edit video");
export const deleteVideo = (req, res) => res.send("delete video");
export const uploadVideo = (req, res) => res.send("upload video");
