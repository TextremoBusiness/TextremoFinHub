# 财跃光年
管理日常消费、银行转账、利息、投资等金融账户的综合平台。

## 项目结构
### 前端
前端是基于ReactJS and Webpack。
请运行如下脚本来部署开发环境
```sh
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
npm install --save-dev html-webpack-plugin copy-webpack-plugin style-loader css-loader
npm install --save react react-dom
npm install --save antd
npm install --save less
```
如果你在中国，请使用`cnpm`并使用如下的替代脚本来部署开发环境
```sh
cnpm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
cnpm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
cnpm install --save-dev html-webpack-plugin copy-webpack-plugin style-loader css-loader
cnpm install --save react react-dom
cnpm install --save antd
cnpm install --save less
```