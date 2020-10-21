export default [
    {
        path: '/index',
        meta: {
            auth: true
        },
        component: () => import('@/pages/index'),
        children: [
            {
                path: '/page2',
                name: 'page2',
                meta: {
                    auth: true
                },
                component: () => import('@/pages/page2')
            },
            {
                path: '/page3',
                name: 'page3',
                meta: {
                    auth: true
                },
                component: () => import('@/pages/page3')
            },
            {
                path: '/page4',
                name: 'page4',
                meta: {
                    auth: true
                },
                component: () => import('@/pages/page4')
            },
            {
                path: '/page5',
                name: 'page5',
                meta: {
                    auth: true
                },
                component: () => import('@/pages/page5')
            },
            {
                path: '/page7',
                name: 'page7',
                meta: {
                    auth: true
                },
                component: () => import('@/pages/page7')
            },
            {
                path: '/page8',
                name: 'page8',
                meta: {
                    icon: 'el-icon-menu',
                    auth: true
                },
                component: () => import('@/pages/page8')
            },
            {
                path: '/page9',
                name: 'page9',
                meta: {
                    icon: 'el-icon-document',
                    auth: true
                },
                component: () => import('@/pages/page9')
            },
            {
                path: '/page10',
                name: 'page10',
                meta: {
                    icon: 'el-icon-setting',
                    auth: true
                },
                component: () => import('@/pages/page10')
            }
        ]
    }
];