import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Layout from '@/layout/index.vue'

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
        path: '/system',
        component: Layout,
        name: 'system',
        meta: {
            title: '系统管理',
            icon: 'menu'
        },
        children: [{
            path: '/department',
            component: () => import('@/views/system/department/department.vue'),
            name: 'department',
            meta: {
                title: '机构管理',
                icon: 'document'
            }
        },
        {
            path: '/userList',
            component: () => import('@/views/system/user/userList.vue'),
            name: 'userList',
            meta: {
                title: '用户管理',
                icon: 'user'
            }
        },
        {
            path: '/roleList',
            component: () => import('@/views/system/role/roleList.vue'),
            name: 'roleList',
            meta: {
                title: '角色管理',
                icon: 'setting',
                roles: ['sys:role'],
                parentId: 17
            }
        },
        {
            path: '/authorityList',
            component: () => import('@/views/system/authority/authorityList.vue'),
            name: 'authorityList',
            meta: {
                title: '权限管理',
                icon: 'document',
                roles: ['sys:authority'],
                parentId: 17
            }
        }
        ]
    },
    {
        path: '/goods',
        component: Layout,
        name: 'goods',
        meta: {
            title: '商品管理',
            icon: 'document',
            roles: ['sys:goods'],
        },
        children: [{
            path: '/order',
            component: () => import('@/views/goods/order/order.vue'),
            name: 'order',
            meta: {
                title: '订单管理',
                icon: 'document',
                roles: ['sys:dept'],
                parentId: 17
            }
        },
            {
                path: '/classfiy',
                component: () => import('@/views/goods/classfiy/classfiy.vue'),
                name: 'classfiy',
                meta: {
                    title: '分类管理',
                    icon: 'user',
                    roles: ['sys:classfiy'],
                    parentId: 17
                }
            }
        ]
    },
    {
        path: '/sysconfig',
        component: Layout,
        name: 'sysconfig',
        meta: {
            title: '系统工具',
            icon: 'setting',
            roles: ['sys:manage'],
            parentId: 0
        },
        children: [{
            path: '/document',
            component: import('@/views/sysconfig/document/document.vue'),
            name: 'document',
            meta: {
                title: '接口文档',
                icon: 'document',
                roles: ['sys:document'],
                parentId: 17
            }
        },
            {
                path: '/logList',
                component: import('@/views/sysconfig/log/logList.vue'),
                name: 'logList',
                meta: {
                    title: '日志管理',
                    icon: 'user',
                    roles: ['sys:logList'],
                    parentId: 17
                }
            }
        ]
    }

]

//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router