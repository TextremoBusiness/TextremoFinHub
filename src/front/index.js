import React from 'react';
import { createRoot } from 'react-dom/client'; // 1. 从 /client 路径导入 createRoot

import { App } from "./app";


const container = document.getElementById('root');
const root = createRoot(container); // 2. 创建 root 节点

root.render(<App />); // 3. 调用 render 方法


// ReactDOM.render(
// <div />,
// document.getElementById('root')
// );

