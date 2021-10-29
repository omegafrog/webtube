import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, minlength: 20 },
  createdAt: { type: Date, required: true, default: new Date() },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

videoSchema.pre("save", async function () {
  this.hashtags = this.hashtags[0].split(",").map((word) => `#${word.trim()}`);
});
// export const formatHashtags = (hashtags) =>
//   hashtags
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word.trim()}`));
});
const Video = new mongoose.model("Video", videoSchema);
export default Video;