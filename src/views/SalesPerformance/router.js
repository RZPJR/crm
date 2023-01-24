export default [
    {
        path: '/customer-relation/sales-performance',
        name: 'SalesPerformance',
        component: () => import("./Index.vue")
    },
    // {
    //     path: '/customer-relation/sales-performance/detail/:date/:id',
    //     name: 'SalesPerformanceDetail',
    //     component: () => import("./Detail")
    // },
    {
        path: '/customer-relation/sales-performance/detail/:id',
        name: 'SalesPerformanceDetail',
        component: () => import("./Detail")
    },
]