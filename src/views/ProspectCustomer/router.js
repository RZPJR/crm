export default [
    {
        path: '/customer-relation/prospective-customer',
        name: 'ProspectCustomer',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Prospect Customer List'
        },
    },
    {
        path: '/customer-relation/prospective-customer/detail/:id',
        name: 'ProspectCustomerDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Detail Prospect Customer',
            breadcrumbs : [
                {
                    text: 'Prospect Customer List',
                    to : '/customer-relation/prospective-customer'
                },
                {
                    text: 'Detail Prospect Customer',
                },
            ],
        }
    },
    {
        path: '/customer-relation/prospective-customer/create',
        name: 'ProspectCustomerCreate',
        component: () => import("./Create.vue"),
        meta: {
            auth: true,
            title: 'Create Prospect Customer',
            breadcrumbs: [
                {
                    text: 'Prospect Customer List',
                    to : '/customer-relation/prospective-customer'
                },
                {
                    text: 'Create Prospect Customer',
                },
            ],
        },
        props: true,
    },
]