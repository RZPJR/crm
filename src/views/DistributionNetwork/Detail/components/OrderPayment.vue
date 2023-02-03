<template>
    <div class="ma-0 pa-0">        
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                name="search"
                                v-model="filter_order_payment.search"
                                prepend-inner-icon="search"
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                outlined
                                dense
                                filled
                                data-unq="distributionNetworkDetail-input-search"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code</span>
                    </v-tooltip>
                </v-col>
                <v-col cols="12" md="5" class="h1"/>
                <v-col cols="12" md="3">                
                    <v-select
                        v-model="filter_order_payment.sortBy"
                        :items="sort_options"
                        item-text="text"
                        item-value="value"
                        label="Sort By"
                                data-unq="distributionNetworkDetail-select-sort"
                        dense
                        outlined
                    ></v-select>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="filter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="filter = !filter"
                        v-if="filter"
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
                        @click="filter = !filter"
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
            <v-row v-if="filter">
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="filter_order_payment.invoice_date.model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <div v-on="{ ...tooltip}">
                                            <v-text-field
                                                prepend-inner-icon="mdi-calendar"
                                                outlined
                                                clearable
                                                maxlength="24"
                                                @click:clear="filter_order_payment.invoice_date.date = [],filter_order_payment.invoice_date.input =''"
                                                v-model="filter_order_payment.invoice_date.input"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    Invoice Date
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                <span>Invoice Date</span>
                                </v-tooltip>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            v-model="filter_order_payment.invoice_date.date"
                            data-unq="distributionNetworkDetail-datePicker-invoiceDate"
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="filter_order_payment.invoice_date.model = false"
                            >OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter_order_payment.status"
                        :items="status_options"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                        data-unq="distributionNetworkDetail-select-status"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="filter_order_payment.overdue_date.model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on: tooltip }">
                                        <div v-on="{ ...tooltip}">
                                            <v-text-field
                                                prepend-inner-icon="mdi-calendar"
                                                outlined
                                                clearable
                                                maxlength="24"
                                                @click:clear="filter_order_payment.overdue_date.date = [],filter_order_payment.overdue_date.input =''"
                                                v-model="filter_order_payment.overdue_date.input"
                                                dense
                                            >
                                                <template v-slot:label>
                                                    Overdue Date
                                                </template>
                                            </v-text-field>
                                        </div>
                                    </template>
                                <span>Overdue Date</span>
                                </v-tooltip>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            v-model="filter_order_payment.overdue_date.date"
                            data-unq="distributionNetworkDetail-datePicker-overdueDate"
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="filter_order_payment.overdue_date.model = false"
                            >OK</v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </div>
        <div class="box-header-table -mt4">
            Order Payment List
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="table_header"
                :items="order_payment"
                :loading="loading_order_payment"
                :items-per-page="5"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>
                            <span v-if="!props.item.sales_order.code">-</span>
                            <router-link v-else :to="{ path: `/sales-order/detail/${props.item.sales_order.id}` }" target="_blank" class="routerLink" v-privilege="'so_rdd'">
                                {{ props.item.sales_order.code}}
                            </router-link>
                        </td>
                        <td>
                            <span v-if="!props.item.code">-</span>
                            <router-link v-else :to="{ path: `/finance/si/detail/${props.item.id}` }" target="_blank" class="routerLink" v-privilege="'si_rdd'">
                                {{ props.item.code}}
                            </router-link>
                            <br>
                            <label style="color: #768F9C; font-size: 12px;">
                                {{ props.item.recognition_date ? formatDate(props.item.recognition_date) : '-' }}
                            </label>
                        </td>
                        <td>
                            {{ props.item.due_date ? formatDate(props.item.due_date) : '-'}}
                            <br>
                            <label style="color: #768F9C; font-size: 12px;">
                                {{ props.item.status_description ? props.item.status_description : '-' }}
                            </label>
                        </td>
                        <td>{{ props.item.total_charge ? ('Rp. '+formatPrice(props.item.total_charge)) : '-'}}</td>
                        <td>{{ props.item.total_paid ? ('Rp. '+formatPrice(props.item.total_paid)) : '-'}}</td>
                        <td>{{ props.item.payment_percentage ? (parseFloat(props.item.payment_percentage).toFixed(2)+' %') : '-'}}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip 
                                    :color="statusMaster('active')"
                                > Active </v-chip>
                            </div>
                            <div v-else-if="props.item.status == 2">
                                <v-chip 
                                    :color="statusMaster('finished')"
                                >Finished</v-chip>
                            </div>
                            <div v-else-if="props.item.status == 3">
                                <v-chip
                                    :color="statusMaster('cancelled')"
                                > Cancelled</v-chip>
                            </div>
                            <div v-else-if="props.item.status == 6">
                                <v-chip
                                    :color="statusMaster('partial')"
                                > Partial </v-chip>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'OrderPayment',
        data() {
            return {
                filter: false,
            }
        },
        computed: {
            ...mapState({
                // Order Payment
                order_payment: state => state.distributionNetwork.distribution_network_detail.order_payment.items,
                loading_order_payment: state => state.distributionNetwork.distribution_network_detail.order_payment.isLoading,
                filter_order_payment: state => state.distributionNetwork.distribution_network_detail.order_payment.filter,
                sort_options: state => state.distributionNetwork.distribution_network_detail.order_payment.sort_options,
                status_options: state => state.distributionNetwork.distribution_network_detail.order_payment.status_options,
                table_header: state => state.distributionNetwork.distribution_network_detail.order_payment.table_header,
            }),
        },
        mounted() {
            this.renderData()
        },
        methods: {
            ...mapActions ([
                'fetchOrderPayment',
            ]),
            renderData(){
                this.fetchOrderPayment({id: this.$route.params.id})
            },
        },
        watch: {
            'filter_order_payment.invoice_date.input': { //get invoice date input
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.filter_order_payment.invoice_date.date[0] = this.$moment(val).format('YYYY-MM-DD')
                                Vue.nextTick(() => {
                                    this.fetchOrderPayment()
                                });
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0,10)
                            let date2 = val.substr(14,23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                let date3 = new Date(this.filter_order_payment.invoice_date.date[0])
                                let date4 = new Date(this.filter_order_payment.invoice_date.date[1])
                                if (parseInt((date4-date3)/(24*3600*1000)) > 29 || parseInt((date4-date3)/(24*3600*1000)) < -29) {
                                    if (date4 < date3) {
                                        this.filter_order_payment.invoice_date.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter_order_payment.invoice_date.date.splice(1,1)
                                    } else {
                                        this.filter_order_payment.invoice_date.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter_order_payment.invoice_date.date.splice(1,1)
                                    }
                                }else {
                                    this.fetchOrderPayment()
                                }
                            }
                        }
                    } else {
                        this.fetchOrderPayment()
                    }
                },
                deep: true
            },
            'filter_order_payment.invoice_date.date': { // get invoice date
                handler: function (val) {
                    if (val) {
                        this.filter_order_payment.invoice_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
            'filter_order_payment.overdue_date.input': { //get invoice date input
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.filter_order_payment.overdue_date.date[0] = this.$moment(val).format('YYYY-MM-DD')
                                Vue.nextTick(() => {
                                    this.fetchOrderPayment()
                                });
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0,10)
                            let date2 = val.substr(14,23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                let date3 = new Date(this.filter_order_payment.overdue_date.date[0])
                                let date4 = new Date(this.filter_order_payment.overdue_date.date[1])
                                if (parseInt((date4-date3)/(24*3600*1000)) > 29 || parseInt((date4-date3)/(24*3600*1000)) < -29) {
                                    if (date4 < date3) {
                                        this.filter_order_payment.overdue_date.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter_order_payment.overdue_date.date.splice(1,1)
                                    } else {
                                        this.filter_order_payment.overdue_date.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter_order_payment.overdue_date.date.splice(1,1)
                                    }
                                }else {
                                    this.fetchOrderPayment()
                                }
                            }
                        }
                    } else {
                        this.fetchOrderPayment()
                    }
                },
                deep: true
            },
            'filter_order_payment.overdue_date.date': { // get invoice date
                handler: function (val) {
                    if (val) {
                        this.filter_order_payment.overdue_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
            'filter_order_payment.search': { // get invoice date
                handler: function (val) {
                    if (val) {                        
                        this.fetchOrderPayment({id: this.$route.params.id})
                    }
                },
                deep: true
            },
            'filter_order_payment.status': { // get invoice date
                handler: function (val) {
                    if (val) {                        
                        this.fetchOrderPayment({id: this.$route.params.id})
                    }
                },
                deep: true
            },
            'filter_order_payment.sortBy': { // get invoice date
                handler: function (val) {
                    if (val) {                        
                        this.fetchOrderPayment({id: this.$route.params.id})
                    }
                },
                deep: true
            },
        }
    }
</script>
