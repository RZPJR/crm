export default [
    {
        path: '/customer-relation/customer-acquisition',
        name: 'CustomerAcquisition',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/customer-acquisition/detail/:id',
        name: 'CustomerAcquisitionDetail',
        component: () => import("./Detail.vue"),
    },
]
