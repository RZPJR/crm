export default [
    {
        path: '/customer-relation/prospective-customer',
        name: 'ProspectCustomer',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/prospective-customer/:id',
        name: 'ProspectCustomerDetail',
        component: () => import("./Detail.vue"),
    },
]