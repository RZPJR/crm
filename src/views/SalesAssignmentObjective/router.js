export default [
    {
        path: '/customer-relation/sales-assignment-objective',
        name: 'SalesAssignmentObjective',
        component: () => import("./Index.vue"),
    },
    {
        path: '/customer-relation/sales-assignment-objective/create',
        name: 'SalesAssignmentObjectiveCreate',
        component: () => import("./Create.vue"),
    },
]
