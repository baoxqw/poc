import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/pages/login/login'
import NotFound from '@/pages/errorPage/404'
import Forbidden from '@/pages/errorPage/403'
import Layout from '@/pages/layout/index'
import Home from '@/pages/home/index'
// 指标管理
const IndicatorLibrary = () => import('@/pages/indicatorLibrary')
const Indicatore = () => import('@/pages/indicatorLibrary/indicatore')

Vue.use(Router)

/* 初始路由 */
export default new Router({
    routes: [
        {
            path: '/login',
            component: Login
        }
    ]
})

/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        name: 'container',
        redirect: 'home',
        meta: {
            requiresAuth: true,
            name: '首页'
        },
        children: [
            {
                id: 1,
                path: 'home',
                component: Home,
                name: 'home',
                meta: {
                    name: '首页',
                    icon: 'tree'
                }
            },
            {
                id: 2,
                path: 'indicatorLibrary',
                component: IndicatorLibrary,
                name: 'indicatorLibrary',
                meta: {
                    name: '指标库管理',
                    icon: 'table'
                },
                children: [
                    {
                        path: 'indicator',
                        name: 'indicatore',
                        component: Indicatore,
                        meta: {
                            name: '指标管理'
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/403',
        component: Forbidden
    },
    {
        path: '*',
        component: NotFound
    }
]
