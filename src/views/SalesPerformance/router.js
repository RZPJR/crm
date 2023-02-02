export default [
    {
        path: '/customer-relation/sales-performance',
        name: 'SalesPerformance',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Sales Performance List'
        }
    },
    {
        path: '/customer-relation/sales-performance/detail/:date/:id',
        name: 'SalesPerformanceDetail',
        component: () => import("./Detail"),
        meta: {
            auth: true,
            title: 'Sales Performance Detail',
            breadcrumbs : [
                {
                    text: 'Sales Performance List',
                    to : '/customer-relation/sales-performance'
                },
                {
                    text: 'Sales Performance Detail',
                },
            ],
        }
    },
]