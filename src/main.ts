import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { store, key } from "@/store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'

var app = createApp(App)
app.use(ElementPlus)

for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}
app.use(router)

app.use(store, key)

app.mount('#app')