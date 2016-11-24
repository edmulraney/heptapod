var webpack = require("webpack")
var path = require("path")
var sourcePath = __dirname + "/src"

module.exports = {
  devtool: "eval",
  context: sourcePath,
  entry: "./app.js",
  output: {
    path: __dirname + "/build", // should be path.resolve for windows compat
    filename: "bundle.js",
    publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: "file-loader",
        query: {
          name: "[name].[ext]"
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ],
      },
    ],
  },
  resolve: {
    extensions: [".webpack-loader.js", ".web-loader.js", ".loader.js", ".js", ".jsx"],
    modules: [
      path.resolve(__dirname, "node_modules"),
      sourcePath
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: __dirname + "/src",
    historyApiFallback: true,
    inline: true,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: "\u001b[32m",
      }
    },
  },
}
