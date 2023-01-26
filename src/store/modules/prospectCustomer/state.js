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

    // Detail prospect_customer
    // detail_prospect_customer: {
    //     isLoadingDetail: false,
    //     register: false,
    //     archetype: null,
    //     next: "",
    //     customerID: "",
    //     archetype_id: "",
    //     reference_info: "",
    //     data: {
    //         id: 0,
    //         archetype: {
    //             name: "",
    //         },
    //         name: "",
    //         sub_disrict: {
    //             name: "",
    //             district: {
    //                 name: "",
    //                 city: {
    //                     name: "",
    //                     province: {
    //                         name: "",
    //                     }
    //                 }
    //             },
    //             area: {
    //                 name: ""
    //             }
    //         },
    //         merchant: {
    //             customer_group: ""
    //         },
    //         pic_business_name: "",
    //         id_card_number: "",
    //         pic_business_contact: "",
    //         taxpayer_number: "",
    //         pic_finance_name: "",
    //         outlet_pictures: [],
    //         declineDialog: false,
    //         decline_type: "",
    //         decline_note: "",
    //         clearDeclineType:false,
    //         error: {},
    //     }
    // }

    detail_prospect_customer: {
        data: {
            id: 1,
            code: "PCT015915",
            name: "PT Mustofa Jaya",
            email: "Tokomustofaaa25@gmail.com",
            brand_name: "Toko Mustofa",
            business_type: {
                id: 1,
                code: "BT0001",
                description: "Company"
            },
            owner_name: "Mustofa",
            phone_1: "87702555894",
            phone_2: "87702553439",
            phone_3: "",
            region: {
                id: 1,
                code: "BT0001",
                description: "Company"
            },
            company_street_address: "Jalan Pegangsaan Utara No. 97",
            company_address: {
                id: 1,
                sub_district: {
                    id: 1,
                    description: "sub district"
                    },
                district: {
                    id: 1,
                    description: "district"
                    },
                province: {
                    id: 1,
                    description: "province"
                    },
                concat_address: "sub district, district, province"
            },
            ship_to_street_address: "Jalan Pegangsaan Utara No. 97",
            ship_to_address: {
                id: 1,
                sub_district: {
                    id: 1,
                    description: "sub district"
                    },
                district: {
                    id: 1,
                    description: "district"
                    },
                province: {
                    id: 1,
                    description: "province"
                    },
                concat_address: "sub district, district, province"
            },
            zip_code: "238293",
            time_consent: 2,
            time_consent_convert: "siang",
            reference: {
                id: 1,
                code: "0001",
                description: "Social Media"
            },
            referrer_code: "ABCDF811",
            reg_status: 2,
            customer_upgrade: 1,
            customer: {
                id: 1,
                code: "PJ001342",
                referral_code: "PJKTSS1B",
                name: "Michael Edrian",
                email: "michael@edenn.id",
                note: "",
                status: 1,
                referrer_code: "CJKT78IR"
            },
            upgrade_status: 1,
            application: 2,
            created_at: "2022-12-08T11:36:02+07:00",
            processed_at: "2022-12-08T11:40:02+07:00",
            processed_by: {
                id: 1,
                employee_code: "EPI0000000001",
                name: "user 1"
            },
            contract_signing_doc: "contract_signing.pdf",
            notary_deed_doc: "notary_deed.pdf",
            taxable_ent_confirmation_doc: "taxable_ent_confirmation.pdf",
            certificate_company_reg_doc: "certificate_company_reg.pdf",
            business_license_doc: "business_license",
            id_card_image: "https://sgp1.digitaloceanspaces.com/image-dev-eden/ktp/ktp_2973564928.jpg",
            id_card_number: "9839439849383",
            id_card_name: "Nama file.pdf",
            taxpayer_image: "https://sgp1.digitaloceanspaces.com/image-dev-eden/ktp/ktp_2994470912.jpg",
            taxpayer_number: "38784584938493",
            taxpayer_name: "Nama file.pdf",
            outlet_image: [
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/seed/picsum/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/seed/picsum/200/300",
                "https://picsum.photos/id/237/200/300",
                "https://picsum.photos/seed/picsum/200/300",
                "https://picsum.photos/id/237/200/300",
            ],
            pic_order_name: "Maman Abdul Rahman",
            pic_finance_name: "Bambang Pamungkas",
            payment_term: {
                id: 1,
                code: "PY0001",
                description: "14 days"
            },
            exchange_invoice: 1,
            exchange_invoice_time: "Pagi jam 09:00 - 11:00 WIB",
            invoice_term: "1",
            bill_to_street_address: "Jalan Pegangsaan Utara No. 97",
            bill_to_sub_district_id: "Kel. Larangan",
            concat_address: "Kel. Larangan, Kec. Candi, Kab. Sidoarjo, Jawa Timur",
            finance_email: "finance.mustofa@gmail.com",
            note: "",
            salesperson: "Fuad Eka Darmawan",
            archetype: {
                id: 1,
                code: "ARC0001",
                customer_group: 1,
                description: "Cafe",
                customer_type: {
                    id: 1,
                    code: "Horeca",
                    description: "Horeca"
                }
            }       
        }
        
    }

};

export default state;
