export default [
    {
        name: 'wrapper',
        path: '/',
        component: () => import('@/layout/MainLayout.vue'),
        children: [
            {
                name: 'user-list',
                path: 'user-list',
                component: () => import('@/pages/user-list/index.vue')
            },
            {
                name: 'user-detail',
                path: 'user-detail',
                component: () => import('@/pages/user-detail/index.vue')
            },
            {
                name: 'product-list',
                path: 'product-list',
                component: () => import('@/pages/product-list/index.vue')
            },
            {
                name: 'product-detail',
                path: 'product-detail',
                component: () => import('@/pages/product-detail/index.vue')
            }
        ]
    }
]