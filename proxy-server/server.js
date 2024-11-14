const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

// 配置代理目标地址
const BASE_URL = 'https://ceshidizhi.com';
const PORT = 3000;

// 使用 express-http-proxy 来代理请求
app.use(
    '/node', // 代理的路径前缀
    proxy(BASE_URL, {
        proxyReqPathResolver: (req) => {
            const newPath = req.url.replace(/^\/node/, '/channel/');
            console.log(`${req.method}: ${BASE_URL}${newPath}`);
            console.log(`----`);

            return newPath;
        },
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            console.log(`参数:${JSON.stringify(srcReq.query)}`)
            // 设置请求超时时间 (毫秒)
            proxyReqOpts.timeout = 5000; // 5秒超时
            return proxyReqOpts;
        },

        timeout: 2000, // 响应超时设置 (7秒)
    })
);

// 启动服务器
app.listen(PORT, () => {
    console.log(`代理服务器已启动，正在监听端口 http://localhost:${PORT}`);
});
