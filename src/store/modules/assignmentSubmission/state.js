const state = {
    // Readlist Sales Assignment
    assignment_submission: {
        id: '',
        isLoading: false,
        items: [],
        overlay: false,
        filter:{
            submitted_date: {
                model: '',
                input: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
                value1: [new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10)],
                value2: [],
            },
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
                    value: 14
                }
            ],
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
        },
        table_headers: [
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
        sales_group_id: "",
        salesperson: '',
        task_type:1,
        clearGroup:false,
    },
};

export default state;
