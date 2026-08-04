/**
 * 基础配置
 */
//第三方函数库
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');     // 编译 Webpack 项目中的 html 类型的文件，如果直接将 html 文件置于 ./src 目录中，用 Webpack 打包时是不会编译到生产环境中的
const CopyPlugin = require("copy-webpack-plugin");            // 复制一些额外文件
// 弃用，此模块被mini-css-extract-plugin取代 //const ExtractTextPlugin = require('extract-text-webpack-plugin');   // 抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象。 

//环境变量
const pkg = require('./package.json'); // 这个路径视当前的路径进行对于修改
//配置主题
let theme = {};
if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
        cfgPath = resolve(args.cwd, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}
module.exports = {
    // 默认开发模式，不压缩JS代码
    mode: 'development',
    entry: path.join(__dirname, "src/front", "index.js"),
    //entry: ['./src/index.js'],
    output: {
        //path: path.resolve(__dirname, 'dist'),
        path: __dirname,
        //filename: 'bundle.[hash:5].js'
        filename: 'bundle.js'
    },
    optimization:{
        moduleIds: 'named'  // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
        //moduleIds: 'hashed'
    },
    // tell webpack to transpile javascript files using babel before bundling them
    module: {
        rules: [
          // js compilation
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              // @babel/preset-env for transpiling ES2015+ syntax
              // @babel/preset-react for transpiling react code
              // more details see https://babeljs.io/docs/en/presets/
              options: {
                presets: [
                  ['@babel/preset-env', { modules: 'commonjs' }], 
                  '@babel/preset-react'
                ],
                plugins: [
                  "@babel/plugin-transform-runtime", // 依赖@babel/plugin-transform-runtime
                  //["import", { "libraryName": "antd", "style": "css"}, "antd"],  // 依赖babel-plugin-import (Ant Design 自 v5 版本起全面转向了 CSS-in-JS 方案，天生具备按需加载和 Tree-shaking 能力。官方已明确说明不再需要且不支持 babel-plugin-import)
                ]
              }
            }
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'img/[name][ext]'
            }
          }
        ]
    },
    plugins: [
      // 把html自动加入（需要的javascript文件会自动引入）
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src/front", "index.html"),
        inject: 'body', // all javascript resources will be placed at the bottom of the body element.
        favicon: "./src/front/favicon.ico"
        //minify: true //压缩html，这个在设置production-mode时自动启用，不用配置
      }),

      // 复制额外文件，打包robot.txt, sitemap.xml
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: path.posix.join(path.resolve(__dirname, "src").replace(/\\/g, "/"), "robot.txt")
      //     },
      //   ],
      // }),

      // Ant Design v5 已使用体积更小、天生支持 immutable 的 dayjs 替代了 moment.js。项目本身不需要再额外用 IgnorePlugin 去打包排除 moment 的多语言包。
      // 忽略 moment.js的语言文件 (https://webpack.js.org/plugins/ignore-plugin/)
      // new webpack.IgnorePlugin({
      //   resourceRegExp: /^\.\/locale$/,
      //   contextRegExp: /moment$/,
      // }),
    ]
};