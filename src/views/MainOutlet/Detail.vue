<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="3">
                    <!-- <img
                        v-if="main_outlet_detail.ktp_photos_url !== null"
                        class="rounded-form preview-image"
                        :src="main_outlet_detail.ktp_photos_url[0]"
                    />
                    <div v-else :class="'rounded-form text-black60'+imageSizeHandler(main_outlet_detail)"><p>No image</p></div>   
                    <br v-if="main_outlet_detail.ktp_photos_url !== null"> -->
                    <div :class="'rounded-form text-black60 image-box'"><p>No image</p></div>
                    <span class="ml10">KTP</span>             
                </v-col>
                <v-col cols="12" md="9">
                    <!-- <div v-if="main_outlet_detail.merchant_photos_url !== null" class="d-flex">
                        <div v-for="image in main_outlet_detail.merchant_photos_url" :key="image" class="mr2">
                            <img
                                class="rounded-form preview-image"
                                :src="image"
                            />
                        </div>
                    </div>
                    <div v-else :class="'rounded-form text-black60'+imageSizeHandler(main_outlet_detail)"><p>No image</p></div> -->
                    <div :class="'rounded-form text-black60 image-box'"><p>No image</p></div>
                    <span class="ml10">Outlet</span>
                </v-col>
            </v-row>
            <v-row class="mb24">
                <v-col class="fs24 bold">
                    {{main_outlet_detail.name ?? '-'}}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <v-btn
                        v-if="main_outlet_detail.status == 1"
                        elevation="0"
                        rounded
                        small
                        class="no-caps mb4"
                        :color="statusMaster('active')"
                        >
                        Active
                    </v-btn>
                    <v-btn
                        v-if="main_outlet_detail.status == 2"
                        elevation="0"
                        rounded
                        small
                        class="no-caps mb4"
                        :color="statusMaster('archived')"
                        >
                        Archived
                    </v-btn>
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <!-- <v-list-item v-privilege="'main_olt_upd'" v-if="main_outlet_detail.status === 1" :to="{ name: 'MerchantUpdate', params: { id: main_outlet_detail.id } }">
                                <v-list-item-title>Update</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                            <v-list-item v-privilege="'main_olt_upd_cust_tag'" v-if="main_outlet_detail.status === 1" :to="{ name: 'MerchantUpdateTag', params: { id: main_outlet_detail.id } }">
                                <v-list-item-title>Update Tag</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                            <v-list-item v-privilege="'main_olt_upd_pho_num'" v-if="main_outlet_detail.status === 1" :to="{ name: 'MerchantUpdatePhone', params: { id: main_outlet_detail.id } }">
                                <v-list-item-title>Update Phone</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item> -->
                            <div>
                                <hr>
                            </div>
                            <v-list-item @click="changeStatus(main_outlet_detail.code)" v-privilege="'main_olt_sus'">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span v-if="main_outlet_detail.suspended === 1">Unsuspend</span>
                                        <span v-else>Suspend</span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-privilege="'main_olt_urc'" v-if="main_outlet_detail.status === 2" @click="unarchive(main_outlet_detail.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Unarchive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-privilege="'main_olt_arc'" v-if="main_outlet_detail.status === 1" @click="archive(main_outlet_detail.id)">
                                <v-list-item-content>
                                    <v-list-item-title>Archive</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="seeHistory()" v-privilege="'filter_rdl'">
                                <v-list-item-content>
                                    <v-list-item-title>History</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Business Type'" :value="main_outlet_detail.business_type?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Code'" :value="main_outlet_detail.code ?? '-'"/>
                </v-col><v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Name'" :value="main_outlet_detail.pic_name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Phone Number'" :value="main_outlet_detail.phone_number ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Alternative Phone Number'" :value="main_outlet_detail.alt_phone_number ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Email'" :value="main_outlet_detail.email ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Reference Info'" :value="reference_info ?? '-'"/>
                </v-col>
                 <v-col cols="12" md="6" class="-mt24">
                     <!-- <DetailRowNew :name="'Customer Tag'" :value="main_outlet_detail.tag_customer_name ?? '-'" :align="true"/> -->
                     <DetailRowNew :name="'Customer Tag'" :value="main_outlet_detail.tag_customer_name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <div v-if="this.main_outlet_detail.referrer">
                        <DetailRowNew v-if="this.main_outlet_detail.customer_group == 1" :name="'Referrer Name'" :value="main_outlet_detail.referrer.name" :routePath="'/customer/merchant/detail/'+main_outlet_detail.referrer.id"/>
                        <DetailRowNew v-if="this.main_outlet_detail.customer_group == 2" :name="'Referrer Name'" :value="main_outlet_detail.referrer.name" :routePath="'/customer/agent/detail/'+main_outlet_detail.referrer.id"/>
                    </div>
                    <div v-else>
                        <DetailRowNew :name="'Referrer Name'" :value="'-'"/>
                    </div>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Suspend'" :value="main_outlet_detail.suspended === 1 ? 'Yes' : 'No'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Referral Code'" :value="main_outlet_detail.referral_code ?? '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Note'" :value="main_outlet_detail.note ?? '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box-start">
            <v-row class="mb24">
                <v-col class="fs16 bold">Finance Info</v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Finance Area'" :value="main_outlet_detail.finance_area?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Default Payment Term'" :value="main_outlet_detail.payment_term?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Default Invoice Term'" :value="main_outlet_detail.invoice_term?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Credit Limit'" :value="main_outlet_detail.credit_limit_amount > 0 ? formatPrice(main_outlet_detail.credit_limit_amount) : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Business Type Credit Limit'" :value="main_outlet_detail.business_type_credit_limit === 1 ? 'Badan Usaha' : 'Personal'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Remaining Credit Limit'" :value="handleRemainingCreditLimitAmount() ? formatPrice(main_outlet_detail.remaining_credit_limit_amount??0) : '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Billing Address'" :value="main_outlet_detail.billing_address ?? '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box-header-table -mt4">
            Payment Info
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="main_outlet_detail.table_header"
                :items="main_outlet_detail.merchant_acc_num"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr>
                        <td>{{ props.index + 1 }}</td>
                        <td>{{ props.item.payment_channel.name }}</td>
                        <td>{{ props.item.account_name }}</td>
                        <td>{{ props.item.account_number }}</td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <div style="padding: 20px;" class="row d-flex align-end justify-end">
            <v-btn
                rounded
                elevation="0"
                class="no-caps px-7"
                :to="'/customer/prospect-customer'"
                style="background: #E6E9ED; color: #768F9C; height: 45px;"
            >
                Back
            </v-btn>
        </div>
        <!-- <ConfirmationDialogNew :sendData="ConfirmData"/> -->
        <LoadingBar :value="main_outlet_detail.isLoading"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'MainOutletDetail',
        data() {
            return {
                reference_info: '',
            }
        },
        mounted() {
            this.fetchMainOutletDetail()
        },
        computed: {
            ...mapState({
                main_outlet_detail: state => state.mainOutlet.main_outlet_detail,
            })
        },
        methods: {
            ...mapActions ([
                'fetchMainOutletDetail',
            ]),
            // Handling image size by class
            imageSizeHandler(item){ 
                return item.ktp_photos_url === null && item.merchant_photos_url === null ? ' image-box' : ' image-box-big'
            },
            // Hide show remaining credit limit
            handleRemainingCreditLimitAmount() { 
                if (this.main_outlet_detail.remaining_credit_limit_amount === 0) {
                    if (this.main_outlet_detail.credit_limit_amount === 0) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
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

</style>