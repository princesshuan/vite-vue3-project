import { InjectionKey } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { TabInt } from './type/index'
export interface State {
    count: number,
    collapse: boolean,
    tabsList: TabInt[],
    menuList: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        count: 0,
        collapse: false,
        tabsList: [],
        menuList: [
            {
                path: '/dashboard',
                component: "Layout",
                meta: {
                    title: "首页",
                    icon: "HomeFilled",
                    roles: ["sys:manage"]
                },
                children: []
            }
        ]
    },
    actions: {
        
    },
    mutations: {
        setCount(state: State, count: number) {
            state.count = count
        },
        setCollapse: (state: State, collapse: boolean) => {
            state.collapse = collapse
        },
        setMenuList: (state: State, routes: Array<RouteRecordRaw>) => {
            console.log(routes,'..');
            
            state.menuList = state.menuList.concat(routes)
        },
        addTab: (state: State, tab: TabInt) => {
            if (state.tabsList.some(item => item.path === tab.path)) {
                return
            }
            state.tabsList.push(tab)
        },
        removeTab: (state: State, path: string) => {
            state.tabsList = state.tabsList.filter(item => item.path !== path)
        },
        
    },
    getters: {
        getCount(state: State) {
            return state.count
        },
        getCollapse(state: State) {
            return state.collapse
        },
        getTabs(state: State) {
            return state.tabsList
        },
        getMenuList: (state: State) => {
            return state.menuList;
        }
    }
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}