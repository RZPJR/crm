export default [
    {
        path: '/customer-relation/customer-acquisition',
        name: 'CustomerAcquisition',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Customer Acquisition List'
        }
    },
    {
        path: '/customer-relation/customer-acquisition/detail/:id',
        name: 'CustomerAcquisitionDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Customer Acquisition Detail',
            breadcrumbs : [
                {
                    text: 'Customer Acquisition List',
                    to : '/customer-relation/customer-acquisition'
                },
                {
                    text: 'Customer Acquisition Detail',
                },
            ],
        }
    },
]
