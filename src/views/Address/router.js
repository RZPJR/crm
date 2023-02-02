export default [
    {
        path: '/customer-relation/address',
        name: 'Address',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/address/:id',
        name: 'AddressDetail',
        component: () => import("./Detail.vue"),
    },
]