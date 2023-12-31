export default [
    {
        path: '/customer-relation/prospective-customer',
        name: 'ProspectCustomer',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Prospective Customer List'
        },
    },
    {
        path: '/customer-relation/prospective-customer/detail/:id',
        name: 'ProspectCustomerDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Detail Prospective Customer',
            breadcrumbs : [
                {
                    text: 'Prospective Customer List',
                    to : '/customer-relation/prospective-customer'
                },
                {
                    text: 'Detail Prospective Customer',
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
            title: 'Create Prospective Customer',
            breadcrumbs: [
                {
                    text: 'Prospective Customer List',
                    to : '/customer-relation/prospective-customer'
                },
                {
                    text: 'Create Prospective Customer',
                },
            ],
        },
        props: true,
    },
    {
        path: '/customer-relation/prospective-customer/:id',
        name: 'ProspectCustomerUpgrade',
        component: () => import("./Upgrade.vue"),
        meta: {
            auth: true,
            title: 'Upgrade Prospective Customer',
            breadcrumbs: [
                {
                    text: 'Prospective Customer List',
                    to : '/customer-relation/prospective-customer'
                },
                {
                    text: 'Upgrade Prospective Customer',
                },
            ],
        },
        props: true,
    },
]