const state = {
    // Readlist prospect_customer
    prospect_customer: {
        isLoading: false,
        items: [],
        filter: {
            type: '',
            area_id: '',
            archetype_id: ''
        },
        search: '',
        status: 6,
        SelectBusinessType: '',
        SelectArea: '',
        SelectArchetype: '',
        SelectSalesPerson: '',
        SelectRequest: '',
        requestBy: [
            {
                text: 'Customer',
                value: 'customer'
            },
            {
                text: 'Salesperson',
                value: 'salesperson'
            }
        ],
        regStatus: [
            {
                text: 'All Status',
                value: ''
            }, 
            {
                text: 'New',
                value: 6
            }, 
            {
                text: 'Registered',
                value: 11
            }, 
            {
                text: 'Decline',
                value: 10
            }
        ],
        table: {
            fields: [
                {
                    text: 'Name',
                    width: "20%",
                    class: 'grey--text text--darken-4',
                    sortable: false,
                },
                {
                    text: 'Phone Number',
                    width: "10%",
                    class: 'grey--text text--darken-4',
                    sortable: false,
                },
                {
                    text: 'Archetype',
                    width: "5%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Business Type',
                    width: "10%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Region',
                    width: "10%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Location',
                    width: "20%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Request Upgrade',
                    class: 'grey--text text--darken-4',
                    width: "3%",
                    sortable: false
                },
                {
                    text: 'Requested By',
                    width: "15%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    text: 'Status',
                    width: "2%",
                    class: 'grey--text text--darken-4',
                    sortable: false
                },
                {
                    width: "2%",
                    sortable: false
                },
            ],
        },
    },
};

export default state;
