export default [
    {
        path: '/customer-relation/sales-assignment',
        name: 'SalesAssignment',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Sales Assignment List'
        },
    },
    {
        path: '/customer-relation/sales-assignment/create',
        name: 'CreateSalesAssignment',
        component: () => import("./Create.vue"),
        meta: {
            auth: true,
            title: 'Sales Assignment Create',
            breadcrumbs : [
                {
                    text: 'Sales Assignment List',
                    to : '/customer-relation/sales-assignment'
                },
                {
                    text: 'Sales Assignment Create',
                },
            ],
        }
    },
    {
        path: '/customer-relation/sales-assignment/detail/:id',
        name: 'DetailSalesAssignment',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Sales Assignment Detail',
            breadcrumbs : [
                {
                    text: 'Sales Assignment List',
                    to : '/customer-relation/sales-assignment'
                },
                {
                    text: 'Sales Assignment Detail',
                },
            ],
        }
    },
]
