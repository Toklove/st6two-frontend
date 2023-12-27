import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import 'uno.css'
import i18n from '~/lang'

export function createApp() {
    const app = createSSRApp(App)
    const head = createHead()

    app.use(Pinia.createPinia()).use(i18n).use(head)
    return {
        app,
        Pinia,
    }
}
