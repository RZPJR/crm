const state = {
    // Readlist Sales Performance
    performance_readlist: {
        id: '',
        loading: false,
        items: [],
        filter:{
            sales_group_id: "",
            salesperson: '',
            submitted_date: {
                model: '',
                input: new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10),
                value1: [new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10)],
                value2: [new Date(Date.now() + (3600 * 1000 * 7)).toISOString().substr(0, 10)],
                mergedVal: []
            }
        },
        overlay: false,
        table_headers: [
            {
                text: 'Salesperson',
                width: "18%",
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text: 'Visit',
                width: "14%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Follow Up',
                width: "14%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Customer Acquisition',
                width: "14%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Revenue Effective Call',
                width: "16%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Revenue Total',
                width: "16%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text: 'Effective Call',
                width: "8%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                width: "2%",
                sortable: false
            },
        ],
        convert_date: '',
        error: {},
    },

    performance_detail: {
        
    }
};

export default state;
