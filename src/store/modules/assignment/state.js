const state = {
    // Readlist Sales Assignment
    assignment_list: {
        isLoading: false,
        data: [],
        filter: {
            status: 999,
            statuses: [
                {
                    text: 'All Status',
                    value: 999
                },
                {
                    text: 'Active',
                    value: 1
                },
                {
                    text: 'Finished',
                    value: 2
                },
                {
                    text: 'Cancelled',
                    value: 3
                },
            ],
            sales_group_id: '',
            start_date: {
                model: '',
                input: '',
                value: [],
            },
            end_date: {
                model: '',
                input: '',
                value: [],
            },
        },
        table_header: [
            {
                text:'Batch',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Sales Group',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Sales Manager',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Start Date',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'End Date',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                width: "5%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'',
                width:'3%',
                sortable: false
            },
        ],
    },

    // Create Sales Assignment 
    create_assignment: {
        isLoading: false,
        data: [],
        error: {},
        error_detail: [],
        sales_group_id: 1,
        clear: false,
    },

    // Detail Sales Assignment
    detail_assignment: {
        isLoading: false,
        data: [],
        filter: {
            status: 999,
            task_type: '',
            finish_date: {
                model: '',
                input: '',
                value: [],
            },
        },
        table_header: [
            {
                text:'Salesperson',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Task',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Customer',
                width: "25%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Start Date',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'End Date',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Finish Date',
                width: "12%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                width: "5%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'',
                width:'3%',
                sortable: false
            },
        ],
        task_type_list: [
            {
                text: 'All Type',
                value: ''
            },
            {
                text: 'Visit',
                value: 1
            },
            {
                text: 'Follow Up',
                value: 2
            }
        ],
    }
};

export default state;
