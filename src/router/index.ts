import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// const modules = import.meta.glob('./modules/*.ts', { eager: true })

// // 使用示例
// Object.entries(modules).forEach(([path, module]) => {
//   console.log(path, module.default) // 立即访问模块内容
// })

const routes: Array<RouteRecordRaw> = [
  {
        path: '/login',
        name: 'LoginPage',
        meta: {
            title: '登录',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/',
        name: 'IndexPage',
        meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: false
        },
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/vueUse',
        name: 'VueUse',
        meta: {
            title: 'vueUse demo',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/vueUse.vue')
    },
    {
        path: '/request',
        name: 'RequestPage',
        meta: {
            title: 'request demo',
            keepAlive: true,
            requireAuth: true
        },
        component: () => import('@/pages/request.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;