export default [
    {
        path: '/customer-relation/sales-assignment-objective',
        name: 'SalesAssignmentObjective',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Sales Assignment Objective List'
        }
        
    },
    {
        path: '/customer-relation/sales-assignment-objective/create',
        name: 'SalesAssignmentObjectiveCreate',
        component: () => import("./Create.vue"),
        meta: {
            auth: true,
            title: 'Sales Assignment Objective Create',
            breadcrumbs : [
                {
                    text: 'Sales Assignment Objective List',
                    to : '/customer-relation/sales-assignment-objective'
                },
                {
                    text: 'Sales Assignment Objective Create',
                },
            ],
        }
    },
    {
        path: '/customer-relation/sales-assignment-objective/update/:id',
        name: 'SalesAssignmentObjectiveUpdate',
        component: () => import("./Update.vue"),
        meta: {
            auth: true,
            title: 'Sales Assignment Objective Update',
            breadcrumbs : [
                {
                    text: 'Sales Assignment Objective List',
                    to : '/customer-relation/sales-assignment-objective'
                },
                {
                    text: 'Sales Assignment Objective Update',
                },
            ],
        }
    },
]
