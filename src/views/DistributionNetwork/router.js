export default [
    {
        path: '/customer-relation/distribution-network',
        name: 'DistributionNetwork',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/distribution-network/detail/:id',
        name: 'DistributionNetworkDetail',
        component: () => import("./Detail"),
    },
]