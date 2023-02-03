<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row>
                <v-col cols="12" md="3">
                    <!-- <img
                        v-if="detail.ktp_photos_url !== null"
                        class="rounded-form preview-image"
                        :src="detail.ktp_photos_url[0]"
                    />
                    <div v-else :class="'rounded-form text-black60'+imageSizeHandler(detail)"><p>No image</p></div>
                    <br v-if="detail.ktp_photos_url !== null"> -->
                    <div :class="'rounded-form text-black60 image-box'"><p>No image</p></div>
                    <span class="ml10">KTP</span>             
                </v-col>
                <v-col cols="12" md="9">
                    <!-- <div v-if="detail.merchant_photos_url !== null" style="display:flex;">
                        <div v-for="image in detail.merchant_photos_url" :key="image" style="margin-right:20px">
                            <img
                                class="rounded-form preview-image"
                                :src="image"
                            />
                        </div>
                    </div>
                    <div v-else :class="'rounded-form text-black60'+imageSizeHandler(detail)"><p>No image</p></div> -->
                    <div :class="'rounded-form text-black60 image-box'"><p>No image</p></div>
                    <span class="ml10">Outlet</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="fs24 bold">{{detail.code}}</v-col>
                <v-col class="d-flex justify-end -mt5">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" class="-mt3">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <!-- <v-list-item
                                v-privilege="'dis_net_rst_psw'"
                                @click="merchantId = detail.id, modelDialog = true"
                            >
                                <v-list-item-title>
                                    Reset Password
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="seeHistory()">
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item> -->
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <div class="mb30"/>
            <v-row class="mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Merchant Name'" :value="detail.code && detail.name ? detail.code+' - '+detail.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Phone Number'" :value="detail.phone_number ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Business Type'" :value="detail.business_type?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Payment Term'" :value="detail.payment_term?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Invoice Term'" :value="detail.invoice_term?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address'" :value="detail.billing_address ?? '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="mt10 mr12 ml12 wp100">
            <v-row>
                <v-col cols="12" md="6">
                    <div class="box-col fill-height">
                        <v-row><v-col cols="12" class="fs16 bold">Order Performance</v-col></v-row>
                        <div class="hr-title mx-1 mb12 mt12 mb30"/>
                        <v-progress-linear
                            v-if="loading_order_performance"
                            indeterminate
                            color="green"
                        ></v-progress-linear>
                        <v-row v-else>
                            <v-col cols="12" class="-mt24">Filter</v-col>
                            <v-col cols="12" md="9" class="-mt24">
                                <v-row>
                                    <v-col cols="12" md="6">
                                        <v-menu
                                            ref="menu"
                                            v-model="filter_order_performance.model"
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
                                                                    @click:clear="filter_order_performance.date = [],filter_order_performance.input =''"
                                                                    v-model="filter_order_performance.input"
                                                                    dense
                                                                >
                                                                    <template v-slot:label>
                                                                        Invoice Date
                                                                    </template>
                                                                </v-text-field>
                                                            </div>
                                                        </template>
                                                    <span>Order Date</span>
                                                    </v-tooltip>
                                                </div>
                                            </template>
                                            <v-date-picker
                                                range
                                                v-model="filter_order_performance.date"
                                            >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    text
                                                    color="primary"
                                                    @click="filter_order_performance.model = false"
                                                >OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="3" class="flex-align-end -mt24">
                                <v-btn
                                    class="only-btn white--text px-10 py-5"
                                    depressed
                                    color="#50ABA3"
                                    elevation="0"
                                    @click="fetchTopProduct({id: this.$route.params.id})"
                                    :disabled="disableButton"
                                >Use Filter</v-btn>
                            </v-col>
                            <v-col cols="12" class="-mt24">
                                <DetailRowNew :name="'Product Name'" :value="top_product.name ?? '-'"/>
                            </v-col>
                            <v-col cols="12" class="-mt24">
                                <DetailRowNew :name="'Quantity Sell/Product'" :value="order_performance.qty_sell !== undefined ? (order_performance.qty_sell+' KG') : '-'"/>
                            </v-col>
                            <v-col cols="12" class="-mt24">
                                <DetailRowNew :name="'Average Revenue'" :value="order_performance.avg_sales !== undefined ? 'Rp. '+formatPrice(order_performance.avg_sales) : '-'"/>
                            </v-col>
                            <v-col cols="12" class="-mt24">
                                <DetailRowNew :name="'Total Number of Order'" :value="order_performance.order_total !== undefined ? order_performance.order_total : '-'"/>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="box-col fill-height">
                        <v-row><v-col cols="12" class="fs16 bold">Payment Performance</v-col></v-row>
                        <div class="hr-title mx-1 mb12 mt12"/>
                        <v-progress-linear
                            v-if="loading_payment_performance"
                            indeterminate
                            color="green"
                        ></v-progress-linear>
                        <v-row v-else>
                            <v-col cols="12">
                                <v-row class="gray-row-container">
                                    <v-col cols="12" class="-mt12">
                                        <span class="text-black60">Jumlah Kredit :</span>
                                        <span class="font-weight-bold">{{ ' Rp. '+(payment_performance.credit_limit_amount!==undefined?formatPrice(payment_performance.credit_limit_amount):'-')}}</span>
                                    </v-col>
                                    <v-col cols="12" class="-mt12">
                                        <v-progress-linear
                                            :value="payment_performance.credit_limit_usage_remaining_percentage"
                                            height="25"
                                            :rounded="true"
                                            color="#C6EB93"
                                        >
                                            <strong>{{ parseFloat(payment_performance.credit_limit_usage_remaining_percentage).toFixed(2) }} %</strong>
                                        </v-progress-linear>
                                    </v-col>
                                    <v-col cols="12" class="-mt12">
                                        <v-row>
                                            <v-col cols="12" md="6">                                                
                                                <span class="text-black60">Jumlah Terpakai :</span>
                                                <span class="font-weight-bold">{{ ' Rp. '+(payment_performance.remaining_outstanding!==undefined?formatPrice(payment_performance.remaining_outstanding):'-')}}</span>
                                            </v-col>
                                            <v-col cols="12" md="6" class="text-right">                                                
                                                <span class="text-black60">Sisa Kredit :</span>
                                                <span class="font-weight-bold">{{ ' Rp. '+(payment_performance.credit_limit_remaining!==undefined?formatPrice(payment_performance.credit_limit_remaining):'-')}}</span>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row class="row-container">
                                    <v-col cols="12" md="6" class="grandchild-container">
                                        <div class="child-container mr5">
                                            <span class="text-black60">Total Hutang :</span>
                                            <div class="big-value">{{' Rp. '+(payment_performance.remaining_outstanding!==undefined?formatPrice(payment_performance.remaining_outstanding):'-')}}</div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6" class="grandchild-container">
                                        <div class="child-container ml5">
                                            <span class="text-black60">Total Hutang Jatuh Tempo:</span>
                                            <div class="big-value text-red">{{' Rp. '+(payment_performance.overdue_debt_amount!==undefined?formatPrice(payment_performance.overdue_debt_amount):'-')}}</div>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row class="row-container">
                                    <v-col cols="12" md="6" class="grandchild-container">
                                        <div class="child-container mr5">
                                            <span class="text-black60">Rata-Rata Pembayaran :</span>
                                            <div class="big-value">{{' Rp. '+(payment_performance.average_payment_amount!==undefined?formatPrice(payment_performance.average_payment_amount):'-')}}</div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="6" class="grandchild-container">
                                        <div class="child-container ml5">
                                            <span class="text-black60">Periode Rata-Rata Pembayaran:</span>
                                            <div class="big-value">{{payment_performance.average_payment_period!==undefined?(payment_performance.average_payment_period+' Days'):'-'}}</div>
                                        </div>
                                    </v-col>
                                </v-row>                      
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </div>
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
                        data-unq="distributionnetwork-filter-status"
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
            <v-row :class="filter? '':'hidden'">
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
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'DistributionNetworkDetail',
        data() {
            return {
                filter: false,
            }
        },
        mounted() {
            this.renderData()
        },
        computed: {
            ...mapState({
                // Detail Distribution Network
                detail: state => state.distributionNetwork.distribution_network_detail.detail.items,
                loading_detail: state => state.distributionNetwork.distribution_network_detail.detail.isLoading,
                // Top Product and Order Performance
                top_product: state => state.distributionNetwork.distribution_network_detail.order_performance.top_product,
                order_performance: state => state.distributionNetwork.distribution_network_detail.order_performance.items,
                loading_order_performance: state => state.distributionNetwork.distribution_network_detail.order_performance.isLoading,
                filter_order_performance: state => state.distributionNetwork.distribution_network_detail.order_performance.filter,
                // Payment Performance
                payment_performance: state => state.distributionNetwork.distribution_network_detail.payment_performance.items,
                loading_payment_performance: state => state.distributionNetwork.distribution_network_detail.payment_performance.isLoading,
                // Order Payment
                order_payment: state => state.distributionNetwork.distribution_network_detail.order_payment.items,
                loading_order_payment: state => state.distributionNetwork.distribution_network_detail.order_payment.isLoading,
                filter_order_payment: state => state.distributionNetwork.distribution_network_detail.order_payment.filter,
                sort_options: state => state.distributionNetwork.distribution_network_detail.order_payment.sort_options,
                status_options: state => state.distributionNetwork.distribution_network_detail.order_payment.status_options,
                table_header: state => state.distributionNetwork.distribution_network_detail.order_payment.table_header,
            }),
            //For watch disable calculate
            disableButton() {
                if (this.filter_order_performance.input) {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            ...mapActions ([
                'fetchDistributionNetworkDetail',
                'fetchTopProduct',
                'fetchPaymentPerformance',
                'fetchOrderPayment',
            ]),
            renderData(){
                this.fetchDistributionNetworkDetail({id: this.$route.params.id})
                this.fetchPaymentPerformance({id: this.$route.params.id})
                this.fetchOrderPayment({id: this.$route.params.id})
            },
            // Handling image size by class
            imageSizeHandler(item){ 
                return item.ktp_photos_url === null && item.merchant_photos_url === null ? ' image-box' : ' image-box-big'
            },
        },
        watch: {
            'filter_order_performance.input': { //get order date input
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.filter_order_performance.date[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0,10)
                            let date2 = val.substr(14,23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                let date3 = new Date(this.filter_order_performance.date[0])
                                let date4 = new Date(this.filter_order_performance.date[1])
                                if (parseInt((date4-date3)/(24*3600*1000)) > 31 || parseInt((date4-date3)/(24*3600*1000)) < -31) {
                                    if (date4 < date3) {
                                        this.filter_order_performance.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter_order_performance.date.splice(1,1)
                                    } else {
                                        this.filter_order_performance.date[0] = this.$moment(date3).format('YYYY-MM-DD')
                                        this.filter_order_performance.date.splice(1,1)
                                    }
                                }
                            }
                        }
                    }
                },
                deep: true
            },
            'filter_order_performance.date': { // get order date
                handler: function (val) {
                    if (val) {
                        this.filter_order_performance.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
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


<style scoped>
    .preview-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }
    
    .image-box {
        width:250px;
        height:50px;
        background: #EBEBEB;
        border-style:dashed;
        border-color:gray;
        border-width:1px;
        text-align: center;
        padding-top: 10px;
        margin: 10px;
    }
    
    .image-box-big {
        width:250px;
        height:250px;
        background: #EBEBEB;
        border-style:dashed;
        border-color:gray;
        border-width:1px;
        text-align: center;
        padding-top: 110px;
        margin: 0px 0px 10px 10px;
    }

    .row-container {
        margin: 5px;
    }

    .gray-row-container {
        margin: 5px;
        background-color:#F5F5F5;
        border-radius: 8px;
        padding: 15px;
    }

    .child-container {
        background-color:#F5F5F5;
        border-radius: 8px;
        padding: 15px;
    }

    .grandchild-container {
        padding: 0px !important
    }

    .big-value {
        font-size: 18px;
        text-align: center;
        font-weight: bold;
    }
</style>