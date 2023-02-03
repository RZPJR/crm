export default [
    {
        path: '/customer-relation/sales-assignment-submission',
        name: 'Submission',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Submission List'
        },
    },
    {
        path: '/customer-relation/sales-assignment-submission/detail/:id/:task',
        name: 'SubmissionDetail',
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: 'Submission Detail',
            breadcrumbs : [
                {
                    text: 'Submission List',
                    to : '/customer-relation/sales-assignment-submission'
                },
                {
                    text: 'Submission Detail',
                },
            ],
        }
    },
]