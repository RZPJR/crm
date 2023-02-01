export default [
    {
        path: '/customer-relation/customer',
        name: 'Customer',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/customer/:id',
        name: 'CustomerDetail',
        component: () => import("./Detail.vue"),
    },
]