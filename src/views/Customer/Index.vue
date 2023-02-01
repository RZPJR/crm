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
                                data-unq="search-filter"
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
            <v-row :class="showFilter? '':'hidden'">
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.status"
                        :items="status_option"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        data-unq="customer-filter-status"
                        dense
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectInvoiceTerm
                        :norequired="true"
                        :dense="true"
                        v-model="filter.invoice_term"
                        @selected="invoicetermSelected"
                        data-unq="customer-filter-invoiceterm"
                    ></SelectInvoiceTerm>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectSalesTerm
                        :norequired="true"
                        :dense="true"
                        v-model="filter.payment_term"
                        :label="'Payment Term'"
                        @selected="salestermSelected"
                        data-unq="customer-filter-salesterm"
                    ></SelectSalesTerm>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        v-model="filter.finance_area"
                        :aux_data="2"
                        :label="'Finance Area'"
                        :dense="true"
                        @selected="financeAreaSelected"
                        data-unq="customer-filter-financearea"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectBusinessType
                        :norequired="true"
                        :dense="true"
                        v-model="filter.business_type"
                        @selected="businessTypeSelected"
                    ></SelectBusinessType>
                </v-col>
                <v-col cols="6" md="3" class="-mt24">
                    <v-select
                        v-model="filter.suspend"
                        :items="suspend_option"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        data-unq="customer-filter-suspend"
                        dense
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end"></v-col>
                <v-col cols="4" md="3" class="d-flex justify-end h70">
                    <v-tooltip left> <!-- TODO privillege -->
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
                    <!-- TODO privillege --> 
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold"
                        @click="exportData()"
                        :disabled="disableButton"
                    ><span class="text-white">Export</span></v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="customer.table_header"
                :items="customer.items"
                :loading="customer.isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>
                            {{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name ?  props.item.name : '-' }}</span>
                        </td>
                        <td>{{ props.item.phone_number ?  props.item.phone_number : '-'}}</td>
                        <td>{{ props.item.business_type.name ? props.item.business_type.name : '-'}}</td>
                        <td>{{ props.item.invoice_term.name ? props.item.invoice_term.name : '-'}}</td>
                        <td>{{ props.item.payment_term.name ? props.item.payment_term.name : '-'}}</td>
                        <td>{{ props.item.finance_area.name ? props.item.finance_area.name : '-'}}</td>
                        <td>{{ props.item.payment_group.name ? props.item.payment_group.name : '-'}}</td>
                        <td>
                            <div v-if="props.item.suspended == 1">
                                <span style="color: red">Yes </span>
                            </div>
                            <div v-else>
                                <span>No</span>
                            </div>
                        </td>
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
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'main_olt_rdd'" :to="{ name: 'MerchantDetail', params: { id: props.item.id } }">
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item  v-privilege="'main_olt_upd'" v-if="props.item.status === 1" :to="{ name: 'MerchantUpdate', params: { id: props.item.id } }">
                                        <v-list-item-title>Update</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <div v-privilege="'main_olt_sus'">
                                        <hr>
                                    </div>
                                    <v-list-item v-privilege="'main_olt_sus'" @click="changeStatus(props.item.code)">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <span v-if="props.item.suspended === 1">Unsuspend</span>
                                                <span v-else>Suspend</span>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
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
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'Customer',
        data() {
            return {
                showFilter : false,
            }
        },
        mounted() {
            this.fetchCustomer()
        },
        computed: {
            ...mapState({
                customer: state => state.customer.customer_list,
                filter: state => state.customer.customer_list.filter,
                status_option: state => state.customer.customer_list.status_option,
                suspend_option: state => state.customer.customer_list.suspend_option,
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
                'fetchCustomer'
            ]),
            //For Filter Invoice Term
            invoicetermSelected(val) {
                this.filter.invoice_term = null;
                if (val !== ''  && val !== undefined) {
                    this.filter.invoice_term = val.id;
                }
            },
            //For Filter Sales Term
            salestermSelected(val) {
                this.filter.payment_term = null;
                if (val !== ''  && val !== undefined) {
                    this.filter.payment_term = val.id;
                }
            },
            //For Filter Finance Area
            financeAreaSelected(val) {
                this.filter.finance_area = null;
                if (val !== ''  && val !== undefined) {
                    this.filter.finance_area = val.id;
                }
            },
            //For Filter Business Type
            businessTypeSelected(val) {
                this.filter.business_type = null;
                if(val !== '' && val !== undefined){
                    this.filter.business_type = val.id
                }
            },
        },
        watch: {
            'filter': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchCustomer()
                    }, 1000);
                },
                deep: true
            },
        },
    } 
</script>
