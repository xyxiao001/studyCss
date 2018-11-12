const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/index.ts",
  output: {
    filename: "./dist/build.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.js$/, loader: "source-map-loader" }
    ],
  },
  devServer: {
    compress: true,
    port: 9000
  }
};