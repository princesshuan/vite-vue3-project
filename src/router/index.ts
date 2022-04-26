import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Layout from '@/layout/index.vue'
import { getMenuList } from "@/http/api"
const modules = import.meta.glob('../views/**/*.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/layout/dashboard/index.vue'),
                name: 'dashboard',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/components/Login.vue'),
        name: 'login',
        meta: {
            title: '登录'
        }
    }

]

//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})


//路由拦截
router.beforeEach(async (to) => {
    /* must call `next` */
    //如果没登陆只能进入登录
    const token: string | null = sessionStorage.getItem('token')
    if (!token && to.path !== '/login') {
        return '/login'
    } else if (to.path !== '/login' && token) {
        // console.log(router.getRoutes(), 'route')
        if (router.getRoutes().length == 3) {
            //动态添加路由
            let routerData: any = await getMenuList()
            routerData = filterAsyncRoutes(routerData.data, router)
            // console.log(routerData, "routerData")
            // userStore.commit('setMenuList', routerData)
            router.replace(to.path)
        }
    } else if (to.path === '/login' && token) {
        return '/'
    }
});

export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = []
    //循环每一个路由
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../views${component}.vue`]
            }
        }
        //判断是否有下级
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res
}

export default router
