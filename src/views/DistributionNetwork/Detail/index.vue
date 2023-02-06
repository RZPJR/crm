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
                    <span class="ml10">Address</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="fs24 bold">{{detail.code}}</v-col>
                <v-col class="d-flex justify-end -mt5">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" class="-mt3" data-unq="distributionNetworkDetail-button-actionButton">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item
                                v-privilege="'dis_net_rst_psw'"
                                @click="merchantId = detail.id, modelDialog = true"
                                data-unq="distributionNetworkDetail-button-resetPassword"
                            >
                                <v-list-item-title>
                                    Reset Password
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item 
                                @click="seeHistory()"
                                data-unq="distributionNetworkDetail-button-history"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <div class="mb30"/>
            <v-row class="mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Customer Name'" :value="detail.code && detail.name ? detail.code+' - '+detail.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Phone Number'" :value="detail.phone_number ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Customer Type'" :value="detail.business_type?.name ?? '-'"/>
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
        <Performance />
        <OrderPayment />
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    import Performance from './components/Performance.vue';
    import OrderPayment from './components/OrderPayment.vue';

    export default {
        name: 'DistributionNetworkDetail',
        components: {
            Performance,
            OrderPayment,
        },
        data() {
            return {
                // 
            }
        },
        computed: {
            ...mapState({
                // Detail Distribution Network
                detail: state => state.distributionNetwork.distribution_network_detail.detail.items,
                loading_detail: state => state.distributionNetwork.distribution_network_detail.detail.isLoading,
            }),
        },
        mounted() {
            this.renderData()
        },
        methods: {
            ...mapActions ([
                'fetchDistributionNetworkDetail',
            ]),
            renderData(){
                this.fetchDistributionNetworkDetail({id: this.$route.params.id})
            },
            // Handling image size by class
            imageSizeHandler(item){ 
                return item.ktp_photos_url === null && item.merchant_photos_url === null ? ' image-box' : ' image-box-big'
            },
        },
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