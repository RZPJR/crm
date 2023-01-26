const state = {
    // Readlist Customer Acquisition
    customer_acquisition: {
        isLoading: false,
        data: [],
        filter: {
            search: '',
            salesperson : '',
            sales_group_id: '',
            submitted_date: {
                model: '',
                input: '',
                value: []
            },
        },
        table_header: [
            {
                text:'Customer Name',
                width:'20%',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Phone Number',
                width:'10%',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Address',
                width:'25%',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Salesperson',
                width:'15%',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Territory',
                width:'10%',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Submitted Date',
                width:'13%',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width:'2%',
                sortable: false
            },
        ],
    },

    // Detail Customer Acquisition
    detail_customer_acquisition: {
        isLoadingDetail: false,
        form: {},
        table_header: [
            {
                text:'No',
                width:"5%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Product',
                width:"70%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Top Product',
                width:"25%",
                class: 'grey--text text--darken-4',
                sortable: false,
            }
        ],
    },
};

export default state;
