/**
 * 生产
 */
//导入第三方函数库
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");                        // 单独提取css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");                     // 压缩css
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');                         // 用于预先清理dist文件夹
const TerserPlugin = require("terser-webpack-plugin");                                  // 压缩js代码
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   // Webpack Bundle Analyzer

//导入配置
let common = require("./webpack.config");

//  webpack 生产模式
let prod = {
    mode: 'production',
    output: {
        filename: 'bundle.[hash:5].min.js'
    },
    optimization:{
        moduleIds: 'deterministic',         // webpack优化-更新组件时在控制台输出组件的数字ID
        minimize: true,
        minimizer: [
            // 手动调用，压缩js代码，这个原因是因为我们设置minimizer为一个数组，覆盖了默认配置
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    sourceMap: false,
                    toplevel: true,     // toplevel 变量和函数可以破坏
                    ie8: true,          // support IE8.
                    safari10: true,     // work around Safari 10/11 bugs in loop scoping and await
                }
            }),                                         
            // 压缩css代码
            new CssMinimizerPlugin()
        ],
        splitChunks: {
            chunks: 'async',                            // chunk只为异步加载
            minSize: 150000,                            // Minimum size, in bytes
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 500000,               // Size threshold at which splitting is enforced and other restrictions (minRemainingSize, maxAsyncRequests, maxInitialRequests) are ignored
            // 额外个性化配置来继承(negative priority)或覆盖(positive priority)
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            // css 独立打包
            {
                test: /\.(css|less)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
        ]
    },
    plugins:[
        //new CleanWebpackPlugin(),       // 预先清理dist文件夹
        // 单独打包css文件
        new MiniCssExtractPlugin({
            filename: '[name].[hash:5].min.css',
            chunkFilename: '[name].[id].[hash:5].min.css',
        }),
        new BundleAnalyzerPlugin(),     // 分析打包情况
    ],
};

// 融合配置 (merge中后面覆盖前者)
prod = merge(common, prod)

//导出新配置
module.exports = prod;