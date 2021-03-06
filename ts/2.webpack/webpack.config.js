const path = require('path');

module.exports = {
  mode: 'development',
  entry: "./src/index.ts",
  output: {
    filename: "./dist/index.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
         test: /\.tsx?$/,
         loader: "ts-loader",
      },
      { test: /\.js$/, loader: "source-map-loader" }
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts']
  },
  devServer: {
    compress: true,
    port: 9000
  }
};