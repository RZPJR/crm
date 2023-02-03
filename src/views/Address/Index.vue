<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                name="search"
                                v-model="filter.search"
                                prepend-inner-icon="search"
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                outlined
                                dense
                                filled
                                data-unq="address-input-search"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code, name, phone number</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                        data-unq="address-button-filterExpandLess"
                    >
                        Hide
                        <v-icon
                            right
                        >
                            mdi-chevron-up
                        </v-icon>
                    </v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                        data-unq="address-button-filterExpandMore"
                    >
                        Show
                        <v-icon
                            right
                        >
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="showFilter">
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.status"
                        :items="status_options"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        data-unq="address-select-status"
                        dense
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectCustomer
                        @selected="customerSelected"
                        :norequired="true"
                        :dense="true"
                        data-unq="address-select-customer"
                    ></SelectCustomer>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        v-model="filter.finance_area"
                        :aux_data="2"
                        :label="'Finance Area'"
                        :dense="true"
                        @selected="financeAreaSelected"
                        data-unq="address-select-financeArea"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArchetype
                        @selected="archetypeSelected"
                        :norequired="true"
                        :aux_data="2"
                        :dense="true"
                        data-unq="address-select-archetype"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectPriceSet
                        @selected="priceSetSelected"
                        :norequired="true"
                        :dense="true"
                        data-unq="address-select-priceSet"
                    ></SelectPriceSet>
                </v-col>
                <v-col cols="6" md="3" class="-mt24">
                    <SelectSalesPerson
                        @selected="salesPersonSelected"
                        :norequired="true"
                        :dense="true"
                        data-unq="address-select-salesPerson"
                    ></SelectSalesPerson>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end"></v-col>
                <v-col cols="4" md="3" class="d-flex justify-end h70">
                    <v-tooltip left>
                        <template v-slot:activator="{ on: tooltip }">
                        <v-icon
                            v-on="{ ...tooltip }"
                            class="-mt7 mr-1"
                        >
                            info
                        </v-icon>
                        </template>
                        <span><strong>Export Button</strong><br>You have to choose filter area before export the data</span>
                    </v-tooltip>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold"
                        @click="exportData()"
                        :disabled="disableButton"
                        data-unq="address-button-export"
                    ><span class="text-white">Export</span></v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="address.table_header"
                :items="address.items"
                :loading="address.isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.code }}</td>
                        <td>{{ props.item.name }}<br>
                        <span class="second-color">{{ props.item.merchant.code }} - {{ props.item.merchant.name }}</span></td>
                        <td>{{ props.item.phone_number }}</td>
                        <td>{{ props.item.archetype.name }}</td>
                        <td v-if="props.item.salesperson">{{ props.item.salesperson.name }}</td>
                            <td v-else>-</td>
                        <td>{{ props.item.price_set.name }}</td>
                        <td>{{ props.item.area.name }}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    small
                                ><span class="pa-md-2">Active </span></v-chip>
                            </div>
                            <div v-else>
                                <v-chip
                                    :color="statusMaster('archived')"
                                    small
                                >Archived </v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        :data-unq="`address-button-actionButton-${props.item.id}`"
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        :to="{ name: 'AddressDetail', params: { id: props.item.id } }" 
                                        v-privilege="'olt_rdd'"
                                        :data-unq="`address-button-detailAddress-${props.item.id}`"
                                    >
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <!-- <v-list-item 
                                        :to="{ name: 'AddressUpdate', params: { id: props.item.id } }" 
                                        v-privilege="'olt_upd'"
                                        :data-unq="`address-button-updateAddress-${props.item.id}`"
                                    >
                                        <v-list-item-title>Update</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item> -->
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {
        name: 'Customer',
        data() {
            return {
                showFilter : false,
            }
        },
        mounted() {
            this.fetchAddress()
        },
        computed: {
            ...mapState({
                address: state => state.address.address_list,
                filter: state => state.address.address_list.filter,
                status_options: state => state.address.address_list.status_options,
            }),
            //For disable export button if required filter is empty
            disableButton() {
                if (this.filter.finance_area) {
                    return false
                } else {
                    return true
                }
            },
        },
        methods: { 
            ...mapActions([
                'fetchAddress'
            ]),
            ...mapMutations([
                'setAddressFilter'
            ]),
            //For Filter Customer
            customerSelected(d) {
                this.filter.customer = ""
                if (d) {
                    this.$store.commit('setAddressFilter', {
                        ...this.filter,
                        customer: val.id
                    })
                }
            },
            //For Filter Finance Area
            financeAreaSelected(val) {
                this.filter.finance_area = '';
                if (val !== ''  && val !== undefined && val !== null) {
                    this.$store.commit('setAddressFilter', {
                        ...this.filter,
                        finance_area: val.id
                    })
                }
            },
            //For Filter Archetype
            archetypeSelected(val) {
                this.filter.archetype = '';
                if(val !== '' && val !== undefined && val !== null){
                    this.$store.commit('setAddressFilter', {
                        ...this.filter,
                        archetype: val.id
                    })
                }
            },
            //For Filter Price Set
            priceSetSelected(val) {
                this.filter.price_set = '';
                if(val !== '' && val !== undefined && val !== null){
                    this.$store.commit('setAddressFilter', {
                        ...this.filter,
                        price_set: val.id
                    })
                }
            },
            //For Filter Sales Person
            salesPersonSelected(val) {
                this.filter.sales_person = '';
                if(val !== '' && val !== undefined && val !== null){
                    this.$store.commit('setAddressFilter', {
                        ...this.filter,
                        sales_person: val.id
                    })
                }
            },
        },
        watch: {
            'filter': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchAddress()
                    }, 1000);
                },
                deep: true
            },
        },
    } 
</script>
