const state = {
    // Readlist Assignment Submission List
    assignment_submission: {
        id: '',
        showFilter : false,
        loading: false,
        items: [],
        overlay: false,
        statuses: 999,
        status: [
            {
                text: 'All Status',
                value: 999
            },
            {
                text: 'Finished',
                value: 2
            },
            {
                text: 'Failed',
                value: 27
            }
        ],
        table: {
            fields: [
                {
                    text: 'Territory',
                    width: "20%",
                    class: 'grey--text text--darken-4',
                    sortable: false,
                },
                {
                    text: 'Salesperson',
                    width: "30%",
                    class: 'grey--text text--darken-4',
                    sortable: false,
                },
                {
                    text: 'Task',
                    width: "10%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Out of Route',
                    width: "10%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Submitted Date',
                    width: "15%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Finished Date',
                    width: "15%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Status',
                    width: "5%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    width: "2%",
                    sortable: false
                },
            ],
        },
        out_of_route: 999,
        out_of_route_options: [
            {
                text: 'Show All',
                value: 999
            },
            {
                text: 'Yes',
                value: 1
            },
            {
                text: 'No',
                value: 0
            }
        ],
        sales_group_id: "",
        submitted_date_model: '',
        submitted_date: [new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10)],
        submitted_date_input: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
        salesperson: '',
        task_type:1,
        clearGroup:false,
        error: {},
    },
};

export default state;
