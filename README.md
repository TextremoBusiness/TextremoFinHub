# Textremo Finhub
The hub to manage all of your financial accounts including daily cost, bank transfer, interest, investment, etc..

## Project Structure
### FrontEnd
The front end is based on ReactJS and Webpack.
Run the scripts below to install the environments
```sh
npm install --save-dev webpack webpack-cli
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
npm install --save-dev html-webpack-plugin copy-webpack-plugin style-loader css-loader
npm install --save-dev less less-loader
npm install react react-dom react-router-dom react-device-detect react-intl
npm install antd @ant-design/icons
npm install less
npm install flag-icons
```
If you are in China, please use `cnpm` and run the alternative scripts below
```sh
cnpm install --save-dev webpack webpack-cli
cnpm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/plugin-transform-runtime
cnpm install --save-dev html-webpack-plugin copy-webpack-plugin style-loader css-loader
cnpm install --save-dev less less-loader
cnpm install react react-dom react-router-dom react-device-detect react-intl
cnpm install antd @ant-design/icons
cnpm install less
cnpm install flag-icons
```

## How to run
### FrontEnd
* debug
```sh
npm run front:beta
```
* pack
```sh
npm run front:build
```
#### Issues
* WinNAT Holding problem
If you run the `front:beta` to test and see the error below, you need add `8000` as an exclusive port in WinNAT.
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
    The script to add  `8000` as an exclusive port in WinNAT is given as below
    ```sh
    net stop winnat
    netsh int ipv4 add excludedportrange protocol=tcp startport=8000 numberofports=1 persistent
    net start winnat
    ```

## Third-Party Licenses
This project incorporates components from the following open-source project:
* **[flag-icons](https://github.com/lipis/flag-icons)** 
  * Description: A curated collection of all country flags in SVG — plus the CSS for easier integration.
  * Copyright (c) 2013 Panayiotis Lipiridis
  * License: [MIT](https://github.com/lipis/flag-icons/blob/main/LICENSE)
