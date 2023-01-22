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
    },
]