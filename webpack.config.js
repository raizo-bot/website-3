const HTMLWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { join, resolve } = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: join(__dirname, "src", "main.js"),
  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: "build.js"
  },
  devServer: {
    quiet: true,
    port: process.env.PORT || 8080,
    host: process.env.HOST || "localhost",
    hot: true,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "vue-style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      favicon: join(__dirname, "static", "logo.png"),
      filename: "index.html",
      template: "index.html",
      inject: true
    })
  ]
};
