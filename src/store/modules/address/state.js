const state = {
    // Readlist Address
    address_list: {
        isLoading: false,
        items: [],
        filter: {
            search: '',
            status:1,
            customer:'',
            finance_region:'',
            archetype: '',
            price_level: '',
            sales_person: '',
        },
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
                text:'Code',
                class: 'grey--text text--darken-4',
                sortable: false,
            },
            {
                text:'Name',
                width: "20%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Phone Number',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Archetype',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Sales Person',
                width: "15%",
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Price Level',
                class: 'grey--text text--darken-4',
                sortable: false
            },
            {
                text:'Region',
                width: "7%",
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
                width: "3%",
                sortable: false
            },
        ],
    },

    // Detail Address
    address_detail: {
        isLoading: false,
        items: [],
    },

};

export default state;
