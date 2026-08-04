/**
 * 测试配置
 */
//导入第三方函数库
const path = require('path');
const { merge } = require('webpack-merge');

// 导入通用配置
let common = require("./webpack.config");

// 配合webpack-dev-server的配置
let beta = {
    //生成sourcemap (调试追踪使用)
    devtool: 'source-map',
    optimization:{
        moduleIds: 'named'  // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
    },
    module: {
        rules: [
            // css
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
              },
            // less
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    devServer: {
        port: 8000,
        open : true,                                // 配置后自动打开
        hot: true,                                  // 实时刷新
        historyApiFallback: true,                   // 不跳转
        static: {
            directory: path.resolve(__dirname, 'src/front'),  // 本地服务器所加载的页面所在的目录。以前是devServer.contentBase.path.resolve(__dirname, '.')
        },
        allowedHosts: 'all',                        // 以前是disableHostCheck: true,
        devMiddleware:{
            stats: {
                colors: true, //命令行中增加颜色
                timings: true, 
                chunks: false   // less verbose, disable chunk information output
            },
        },
        proxy: [
            {
                context: ['/api'], // 指定要代理的路径
                target: 'http://localhost:3000', // 代理目标地址
            }
        ],
    }
}

// 融合配置
beta = merge(common, beta);

//导出新配置
module.exports = beta;