export default [
    {
        path: '/customer-relation/address',
        name: 'Address',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/address/detail/:id',
        name: 'AddressDetail',
        component: () => import("./Detail.vue"),
    },
]