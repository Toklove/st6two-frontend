import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import 'uno.css'
import i18n from '~/lang'

export function createApp() {
    const app = createSSRApp(App)

    // #ifdef H5
    // 根据HTTP类型生成ws链接
    const isHttps = document.location.protocol === 'https:'
    if (isHttps)
        app.config.globalProperties.$wsUrl = `wss://${document.location.host}/ws`
    else
        app.config.globalProperties.$wsUrl = `ws://${document.location.host}/ws`
    // #endif

    // #ifdef APP-PLUS
    app.config.globalProperties.$wsUrl = `wss://coinlim.cc/ws`
    // #endif

    const head = createHead()

    app.use(Pinia.createPinia()).use(i18n).use(head)
    return {
        app,
        Pinia,
    }
}
