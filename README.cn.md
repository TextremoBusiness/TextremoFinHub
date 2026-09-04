# 财跃光年
管理日常消费、银行转账、利息、投资等金融账户的综合平台。

## 项目结构
### 前端
前端是基于ReactJS and Webpack。
请运行如下脚本来部署开发环境
```sh
npm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge 
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
npm install --save-dev html-webpack-plugin copy-webpack-plugin style-loader css-loader
npm install --save-dev less less-loader
npm install react react-dom react-router-dom react-device-detect react-intl
npm install antd @ant-design/icons
npm install less
npm install flag-icons
```
如果你在中国，请使用`cnpm`并使用如下的替代脚本来部署开发环境
```sh
cnpm install --save-dev webpack webpack-cli webpack-dev-server webpack-merge
cnpm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
cnpm install --save-dev html-webpack-plugin copy-webpack-plugin style-loader css-loader
cnpm install --save-dev less less-loader
cnpm install react react-dom react-router-dom react-device-detect react-intl
cnpm install antd @ant-design/icons
cnpm install less
cnpm install flag-icons
```

## 使用说明
### 前端
* 调试
```sh
npm run front:beta
```
* 打包
```sh
npm run front:build
```
#### 报错
* WinNAT 端口占用问题
如果运行 `front:beta` 遇到如下问题，你得添加`8000`作为例外端口.
    ```sh
    > webpack-dev-server --config webpack.config.beta.js --hot

    file:///.../node_modules/.store/webpack-dev-server@6.0.0/node_modules/webpack-dev-server/lib/Server.js:2581
            throw error;
            ^
    Error: listen EACCES: permission denied 127.0.0.1:8000
        at Server.setupListenHandle [as _listen2] (node:net:1918:21)
        at listenInCluster (node:net:1997:12)
        at node:net:2206:7
        at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
    code: 'EACCES',
    errno: -4092,
    syscall: 'listen',
    address: '127.0.0.1',
    port: 8000
    }
    ```
    添加例外端口`8000`到WinNAT的脚本如下
    ```sh
    net stop winnat
    netsh int ipv4 add excludedportrange protocol=tcp startport=8000 numberofports=1 persistent
    net start winnat
    ```

## 第三方开源声明
本项目使用了如下的开源项目：
* **[flag-icons](https://github.com/lipis/flag-icons)** 
  * Description: A curated collection of all country flags in SVG — plus the CSS for easier integration.
  * Copyright (c) 2013 Panayiotis Lipiridis
  * License: [MIT](https://github.com/lipis/flag-icons/blob/main/LICENSE)