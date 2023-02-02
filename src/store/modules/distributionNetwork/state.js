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
                text:'Finance Area',
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
        isLoading: false,
        items: [],
        merchant_acc_num: [],
        table_header: [
            {
                text:'No',
                sortable: false,
                width:"5"
            },
            {
                text:'Payment Channel',
                sortable: false,
            },
            {
                text:'Account Name',
                sortable: false,
            },
            {
                text:'Account Number',
                sortable: false
            },
        ],
    },

};

export default state;
