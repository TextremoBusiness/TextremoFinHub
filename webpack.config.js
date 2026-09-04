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
    // module/rules/options 方案二(必须：补全解析后缀)
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.mjs'] // 确保补全 .jsx 和 .mjs
    },
    // tell webpack to transpile javascript files using babel before bundling them
    module: {
        rules: [
          // js compilation
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            type: 'javascript/auto', // module/rules/options 方案二：强制 Webpack 自动识别 ES 模块语法
            use: {
              loader: "babel-loader",
              // @babel/preset-env for transpiling ES2015+ syntax
              // @babel/preset-react for transpiling react code
              // more details see https://babeljs.io/docs/en/presets/
              options: {
                presets: [
                  // 方案一：放弃对import/export优化
                  // 这里添加 { modules: 'commonjs' } 强制 Babel 在 Webpack 拿到代码前，把所有的 import 和 export 提前翻译成了传统的 require() 和 module.exports (如果不添加就报错Module parse failed: 'import' and 'export' may appear only with 'sourceType: module')
                  // Babel 的默认行为：出于性能优化（如 Tree-Shaking），@babel/preset-env 默认设置是 modules: false 或 "auto"。这意味着 Babel 只会帮你转译 const、箭头函数、Class 等 ES6+ 语法，会故意保留 import 和 export 不做处理，准备留给 Webpack 5 去解析。
                  // Webpack 的解析断层：如果在打包规则、上下文路径或扩展名匹配上有微小偏差，Webpack 没有把该文件识别为标准的 ES Module（sourceType: module），但 Babel 却把包含原生 import 的代码直接原封不动地吐交给了 Webpack。Webpack 处理不了这种“半成品”，于是直接爆出了 parser 错误。
                  //['@babel/preset-env', { modules: 'commonjs' }], 
                  //'@babel/preset-react'

                  // 方案二：保留import/export优化
                  ['@babel/preset-env', { modules: false }],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                plugins: [
                  '@babel/plugin-transform-runtime', // 依赖@babel/plugin-transform-runtime
                  //["import", { "libraryName": "antd", "style": "css"}, "antd"],  // 依赖babel-plugin-import (Ant Design 自 v5 版本起全面转向了 CSS-in-JS 方案，天生具备按需加载和 Tree-shaking 能力。官方已明确说明不再需要且不支持 babel-plugin-import)
                ]
              }
            }
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'img/[name].[hash:8][ext]' // img/[name].[ext] 会导致同名文件冲突报错
              // [webpack-dev-middleware] Error: Conflict: Multiple chunks emit assets to the same filename img/ad.svg (chunks main and main)
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