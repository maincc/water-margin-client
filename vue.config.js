const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new NodePolyfillPlugin(), // 可选：自动处理更多 Node.js 核心模块
      new webpack.ProvidePlugin({
        process: "process/browser", // 提供process polyfill
      }),
    ],
    resolve: {
      fallback: {
        process: require.resolve("process/browser"), // 确保process被正确解析
      },
    },
  },
});
