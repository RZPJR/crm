const state = {
    // Readlist Sales Assignment
    assignment_objective_list: {
        isLoading: false,
        data: [],
        filter: {
            search: '',
            status: 999,
        },
        table_header: [
            {
                text:'Code',
                width: "8%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Assignment Name',
                width: "10%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Objective',
                width: "37%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Survey Link',
                width: "25%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Created By',
                width: "15%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Status',
                width: "3%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'',
                width:'2%',
                sortable: false
            },
        ],
    },
    update_assignment_objective_list: {
        isLoading: false,
        form: {},
    }
};

export default state;
