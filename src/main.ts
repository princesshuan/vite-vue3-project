import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { store, key } from "@/store";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons'
//echarts
import * as echarts from 'echarts'



var app = createApp(App)
app.use(ElementPlus)

app.config.globalProperties.$echarts = echarts;

for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}
app.use(router)

app.use(store, key)

app.mount('#app')

