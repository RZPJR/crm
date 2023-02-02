export default [
    {
        path: '/customer-relation/sales-assignment-submission',
        name: 'Submission',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/sales-assignment-submission/detail/:id/:task',
        name: 'SubmissionDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Sales Submission Detail',
            breadcrumbs : [
                {
                    text: 'Sales Submission List',
                    to : '/customer-relation/sales-assignment-submission'
                },
                {
                    text: 'Sales Submission Detail',
                },
            ],
        }
    },
]