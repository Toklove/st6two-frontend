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
                target: 'ws://127.0.0.1:3000/', // 这里是后台ws访问地址
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
