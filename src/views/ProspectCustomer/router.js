export default [
    {
        path: '/customer-relation/prospective-customer',
        name: 'ProspectCustomer',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Prospect Customer List'
        }
    },
    {
        path: '/customer-relation/prospective-customer/:id',
        name: 'ProspectCustomerDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Prospect Customer Detail',
            breadcrumbs : [
                {
                    text: 'Prospect Customer List',
                    to : '/customer-relation/prospective-customer'
                },
                {
                    text: 'Prospect Customer Detail',
                },
            ],
        }
    },
]