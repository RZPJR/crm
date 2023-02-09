const state = {
    // Readlist Distribution Network
    distribution_network_list: {
        isLoading: false,
        items: [],
        filter: {
            search: '',
        },
        table_header: [
            {
                text:'Mitra',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Phone Number',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Finance Region',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Payment Term',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width:'10%',
                text:'Remaining Outstanding',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width:'2%',
                sortable: false
            },
        ],
    },

    // Detail Distribution Network
    distribution_network_detail: {
        detail: {
            isLoading: false,
            items: [],
        },
        order_performance: {
            isLoading: false,
            items: [],
            filter: {
                input : '',
                model : '',
                date : [],
            },
            top_product: {},
        },
        payment_performance: {
            isLoading: false,
            items: [],
        },
        order_payment: {
            isLoading: false,
            items: [],
            filter: {
                search: '',
                invoice_date: {
                    input : '',
                    model : '',
                    date : [],
                },
                status: 999,
                overdue_date: {
                    input : '',
                    model : '',
                    date : [],
                },
                sortBy: '-due_date',
            },
            sort_options: [
                {
                    text: 'Overdue Date (A-Z)',
                    value: 'due_date'
                },
                {
                    text: 'Overdue Date (Z-A)',
                    value: '-due_date'
                }
            ],
            status_options: [
                {
                    text:'All Status',
                    value:999
                },
                {
                    text:'Active',
                    value:1
                },
                {
                    text:'Archived',
                    value:2
                }
            ],
            table_header: [
                {
                    text:'Sales Order Code',
                    sortable: false,
                    width: "20%",
                    class: 'grey--text text--darken-4',
                },
                {
                    text:'Sales Invoice Code',
                    sortable: false,
                    width: "20%",
                    class: 'grey--text text--darken-4',
                },
                {
                    text:'Overdue Date',
                    sortable: false,
                    width: "10%",
                    class: 'grey--text text--darken-4',
                },
                {
                    text:'Sales Invoice Value',
                    sortable: false,
                    width: "15%",
                    class: 'grey--text text--darken-4',
                },
                {
                    text:'Total Cash Receipt',
                    sortable: false,
                    width: "15%",
                    class: 'grey--text text--darken-4',
                },
                {
                    text:'Percentage Payment',
                    sortable: false,
                    width: "15%",
                    class: 'grey--text text--darken-4',
                },
                {
                    text:'Status',
                    sortable: false,
                    width: "5%",
                    class: 'grey--text text--darken-4',
                },
            ],
        },
    },

};

export default state;
