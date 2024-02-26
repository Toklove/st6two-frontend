import type { BuildOptions, ServerOptions } from 'vite'

const config: { server: ServerOptions; build: BuildOptions } = {
    server: {
        port: 6778,
        proxy: {
            '/api': {
                target: 'https://ibkrmarket.com',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
            '/ws': {
                target: 'wss://api.gomarketes.com:8282/', // 这里是后台ws访问地址
                changeOrigin: true, // 允许跨域设置
                ws: true, // websocket代理设置
            },
            '/ws-control': {
                target: 'ws://127.0.0.1:9502/', // 这里是后台ws访问地址
                changeOrigin: true, // 允许跨域设置
                ws: true, // websocket代理设置
            },
        },
    },
    build: {
        target: 'es2018',
        cssTarget: 'chrome79',
        minify: true,
    },
}

export default config
