export default [
    {
        path: '/customer-relation/main-outlet',
        name: 'MainOutlet',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/main-outlet/:id',
        name: 'MainOutletDetail',
        component: () => import("./Detail.vue"),
    },
]