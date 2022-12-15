export default [
    {
        path: '/customer-relation/sales-assignment',
        name: 'SalesAssignment',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/sales-assignment/create',
        name: 'CreateSalesAssignment',
        component: () => import("./Create.vue"),
    },
    {
        path: '/customer-relation/sales-assignment/detail/:id',
        name: 'DetailSalesAssignment',
        component: () => import("./Detail.vue"),
    },
]
