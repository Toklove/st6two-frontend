import type { BuildOptions, ServerOptions } from 'vite'

const config: { server: ServerOptions; build: BuildOptions } = {
    server: {
        port: 6778,
        proxy: {
            '/api': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '/api'),
            },
            '/ws': {
                target: 'wss://api.gomarketes.com:8282/', // 这里是后台ws访问地址
                changeOrigin: true, // 允许跨域设置
                ws: true, // websocket代理设置
                rewrite: (path: string) => path.replace(/^\/api/, ''),
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
