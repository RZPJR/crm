const state = {
    // Readlist Sales Assignment
    assignment_list: {
        isLoading: false,
        data: [],
        filter: {
            status: 999,
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
        sales_group_id: '',
        clear: false,
    }
};

export default state;
