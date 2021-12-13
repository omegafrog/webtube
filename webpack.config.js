const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const JS_PACK = "./src/client/";

module.exports = {
  entry: {
    main: JS_PACK + "main.js",
    videoPlayer: JS_PACK + "videoPlayer.js",
    recorder: JS_PACK + "recorder.js",
    comment: JS_PACK + "comment.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
