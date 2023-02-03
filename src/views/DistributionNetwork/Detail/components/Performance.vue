<template>
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
                                data-unq="distributionNetworkDetail-button-topProduct"
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
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'Performance',
        data() {
            return {
                // 
            }
        },
        computed: {
            ...mapState({
                // Top Product and Order Performance
                top_product: state => state.distributionNetwork.distribution_network_detail.order_performance.top_product,
                order_performance: state => state.distributionNetwork.distribution_network_detail.order_performance.items,
                loading_order_performance: state => state.distributionNetwork.distribution_network_detail.order_performance.isLoading,
                filter_order_performance: state => state.distributionNetwork.distribution_network_detail.order_performance.filter,
                // Payment Performance
                payment_performance: state => state.distributionNetwork.distribution_network_detail.payment_performance.items,
                loading_payment_performance: state => state.distributionNetwork.distribution_network_detail.payment_performance.isLoading,
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
        mounted() {
            this.renderData()
        },
        methods: {
            ...mapActions ([
                'fetchTopProduct',
                'fetchPaymentPerformance',
            ]),
            renderData(){
                this.fetchPaymentPerformance({id: this.$route.params.id})
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
        }
    }
</script>
