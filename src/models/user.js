import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarURL: { type: String },
  githubLoginOnly: { type: Boolean, required: true, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});
const User = mongoose.model("User", userSchema);

export default User;
