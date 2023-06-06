<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mb24">
                <v-col data-unq="proscus-label-name" class="fs24 bold">
                    {{ data.business_name }}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <v-chip
                        :data-unq="`proscus-button-status`"
                        :color="statusMaster(data.reg_status_convert?.toLowerCase())"
                        :text-color="statusMasterText(data.reg_status_convert?.toLowerCase())"
                        small
                        class="mb6"
                    >
                        {{ data.reg_status_convert }}
                    </v-chip>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn :data-unq="`notification-button-actionButton`" icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item 
                                v-privilege="'pro_cst_upg'" 
                                :to="'/customer-relation/prospective-customer/'+ data.id "
                                v-if="data.reg_status === 6"
                                :data-unq="`proscus-button-upgrade-${data.id}`" 
                            >
                                <v-list-item-title>Upgrade</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                            <v-list-item
                                :data-unq="`prospectCustomer-button-decline`"
                                v-privilege="'pro_cst_dec'"
                                v-if="data.reg_status === 6 || data.reg_status === 11"
                                @click="openDeclineDialog()"
                            >
                                <v-list-item-title>Decline</v-list-item-title>
                            </v-list-item>
                            <v-list-item 
                                @click="seeHistory()"
                                :data-unq="`prospectCustomer-button-history`"
                            >
                                <v-list-item-title>History</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="px-5 mt-8">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`proscus-link-customerType`" :name="'Customer Type'" :value="data.customer_type?.description ? data.customer_type.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Business Type'" :value="data.business_type?.note ? data.business_type.note : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Archetype'" :value="data.archetype?.description ? data.archetype.description : '-'" />
                </v-col> 
                <v-col v-if="data.business_type?.value_int === 1" cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Brand Name'" :value="data.brand_name ? data.brand_name : '-'" />
                </v-col>
                <v-col v-if="data.business_type?.value_int === 1" cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Customer Class'" :value="data.customer_class?.description? data.customer_class.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Previous Customer'" :value="data.customer ? data.customer.code + ' - ' + data.customer.name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Best Time To Call'" :value="data.time_consent ? data.time_consent.note : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Referrer Code'" :value="data.referrer_code ? data.referrer_code : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Reference Info'" :value="data.reference_info ? data.reference_info.note : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Registration Channel'" :value="data.application?.note ? data.application.note : '-'" />
                </v-col>
                <v-col cols="12" class="-mt24" v-if="data.outlet_image && data.outlet_image.length > 0">
                    <v-card outlined class="pt15 pr15 pl15">
                        <span class="text-black60">Shipping Goods Place/Outlet Image :</span>
                        <v-card
                            class="d-flex align-content-start flex-wrap my-2"
                            flat
                            tile
                        >
                            <v-card
                                v-for="(item, idx) in data.outlet_image" 
                                :key="idx" 
                                class="pr-2 mb-2"
                                flat
                                tile
                            >
                                <DisplayPhotoOverlay :title="'Photo Outlet'" :src="item"/>
                            </v-card>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <div class="box" v-if="data.business_type?.value_int === 1">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Company Address</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Name'" :value="data.company_address_name ? data.company_address_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Region'" :value="data.company_address_region ? data.company_address_region : '-' "/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address Detail'" :value="address_detail.company_address ? address_detail.company_address : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="data.company_address_province ? data.company_address_province : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="data.company_address_city ? data.company_address_city : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="data.company_address_district ? data.company_address_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="data.company_address_sub_district ? data.company_address_sub_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="data.company_address_postal_code ? data.company_address_postal_code : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Latitude'" :value="data.company_address_latitude ? data.company_address_latitude : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Longitude'" :value="data.company_address_longitude ? data.company_address_longitude : '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address Note'" :value="data.company_address_note ? data.company_address_note : '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Sales and Shipping Info</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Name'" :value="data.shipping_address_name? data.shipping_address_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Region'" :value="data.shipping_address_region? data.shipping_address_region : '-' "/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address Detail'" :value="address_detail.shipping_address ? address_detail.shipping_address : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="data.shipping_address_province? data.shipping_address_province : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="data.shipping_address_city? data.shipping_address_city : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="data.shipping_address_district? data.shipping_address_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="data.shipping_address_sub_district? data.shipping_address_sub_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="data.shipping_address_postal_code? data.shipping_address_postal_code : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Latitude'" :value="data.shipping_address_latitude? data.shipping_address_latitude : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Longitude'" :value="data.shipping_address_longitude? data.shipping_address_longitude : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :name="'Address Note'" :value="data.shipping_address_note? data.shipping_address_note : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Site'" :value="data.site?.description? data.site.description : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Shipping Method'" :value="data.shipping_method?.description? data.shipping_method.description : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Order Recipient Name'" :value="data.pic_order_name? data.pic_order_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Order Recipient Contact'" :value="data.pic_order_contact? data.pic_order_contact : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Territory'" :value="data.sales_territory?.id? data.sales_territory.id + '-' + data.sales_territory.description : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Salesperson'" :value="data.salesperson?.name? data.salesperson.name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Price Level'" :value="data.price_level?.description? data.price_level.description : '-' "/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Business Info</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="data.business_type?.value_int === 1? 'Contract Signing Name' : 'Business Owner Name'" :value="data.owner_name? data.owner_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="data.business_type?.value_int === 1? 'Contract Signing Position' : 'Business Owner Contact'" :value="data.owner_role? data.owner_role : data.owner_contact? data.owner_contact : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Email'" :value="data.email? data.email : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'ID Card Number'" :value="data.id_card_doc_number? data.id_card_doc_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Taxpayer Number'" :value="data.taxpayer_doc_number? data.taxpayer_doc_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                    <DetailRowNew :name="'PIC Operation/Purchasing Name'" :value="data.pic_operation_name? data.pic_operation_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                    <DetailRowNew :name="'PIC Operation/Purchasing Contact'" :value="data.pic_operation_contact? data.pic_operation_contact : '-' "/>
                </v-col>
            </v-row>
            <div class="mt60">
                <v-row class="px-5">
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew 
                            :data-unq="`proscus-link-idCard`"
                            :name="'ID Card'" 
                            :value="data.id_card_doc_url ? data.id_card_doc_name : '-'" 
                            :crossURL="data.id_card_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Contract Signing Power of Attorney'" 
                            :value="data.company_contract_doc_url ? data.company_contract_doc_name : '-'" 
                            :crossURL="data.company_contract_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Deed of Establishment/Last Amendment'" 
                            :value="data.notarial_deed_doc_url ? data.notarial_deed_doc_name : '-'" 
                            :crossURL="data.notarial_deed_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Taxpayer'" 
                            :value="data.taxpayer_doc_url ? data.taxpayer_doc_name : '-'" 
                            :crossURL="data.taxpayer_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Taxable Entrepreneur Confirmation Number'" 
                            :value="data.taxable_entrepeneur_doc_url ? data.taxable_entrepeneur_doc_name : '-'" 
                            :crossURL="data.taxable_entrepeneur_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Business License'" 
                            :value="data.business_license_doc_url ? data.business_license_doc_name : '-'" 
                            :crossURL="data.business_license_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Certificate of Company Registration/Business Identification Number'" 
                            :value="data.company_certificate_reg_url ? data.company_certificate_reg_name : '-'" 
                            :crossURL="data.company_certificate_reg_url"
                            :align="true"
                        />
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Finance Info</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Finance Name'" :value="data.pic_finance_name ? data.pic_finance_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Finance Contact'" :value="data.pic_finance_contact ? data.pic_finance_contact : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Payment Term'" :value="data.payment_term?.description ? data.payment_term.description : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`proscus-link-exchangeInvoice`" :name="'Exchange Invoice'" :value="data.exchange_invoice ? (data.exchange_invoice === 1 ? 'Yes' : 'No') : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="data.exchange_invoice === 1">
                    <DetailRowNew :name="'Exchange Invoice Time'" :value="data.exchange_invoice_time ? data.exchange_invoice_time : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="data.exchange_invoice === 1">
                    <DetailRowNew :name="'Email'" :value="data.finance_email ? data.finance_email : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="data.exchange_invoice === 1">
                    <DetailRowNew :name="'Invoice Term'" :value="data.invoice_term?.note ? data.invoice_term.note : '-'"/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Billing Address</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Name'" :value="data.billing_address_name? data.billing_address_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Region'" :value="data.billing_address_region? data.billing_address_region : '-' "/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address Detail'" :value="address_detail.billing_address ? address_detail.billing_address : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="data.billing_address_province? data.billing_address_province : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="data.billing_address_city? data.billing_address_city : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="data.billing_address_district? data.billing_address_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="data.billing_address_sub_district? data.billing_address_sub_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="data.billing_address_postal_code? data.billing_address_postal_code : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Latitude'" :value="data.billing_address_latitude? data.billing_address_latitude : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Longitude'" :value="data.billing_address_longitude? data.billing_address_longitude : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :name="'Address Note'" :value="data.billing_address_note? data.billing_address_note : '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Additional Info</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Comment 1'" :value="data.comment_1? data.comment_1 : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Comment 2'" :value="data.comment_2? data.comment_2 : '-' "/>
                </v-col>
            </v-row>
        </div>
        <v-dialog
            v-model="detail_decline.declineDialog"
            persistent
            max-width="470px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Decline</span>
                </v-card-title>
                <v-card-text>
                    <span class="fs16 mt-1">Why was this prospective customer declined?</span>
                    <SelectDeclineType
                        @selected="selectedDeclineType"
                        :clear="detail_decline.clearDeclineType"
                        :error="detail_decline.error.decline_type"
                        :dense="true"
                        data-unq="proscus-select-declinetype"
                        class="mt-6"
                    />
                    <v-textarea
                        name="note"
                        v-model="detail_decline.decline_note"  
                        :namecounter="250"
                        maxlength="250"
                        outlined
                        :error-messages="detail_decline.error.decline_note"
                        required
                        dense
                        rows="3"
                    >
                        <template v-slot:label>
                            Note
                        </template>
                    </v-textarea>
                </v-card-text>
                <v-card-actions class="pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                        @click="detail_decline.declineDialog=false, detail_decline.clearDeclineType=true"
                    ><span class="text-black80">Cancel</span></v-btn>
                    <v-btn
                        @click="declineAction(data.id)"
                        class="main-btn white--text"
                        depressed
                        color="#50ABA3"
                    >Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <AuditLogNew :data="data_audit_log"/>
        <LoadingBar :value="isLoading"/>
    </v-container>
</template>
<script>
    import http from "../../services/http";
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex';
    export default {
        name: "ProspectCustomerDetail",
        data() {
            return {
                data_audit_log: {},
            };
        },
        async mounted() {
            await this.fetchProspectCustomerDetail({id: this.$route.params.id});
        },
        computed: {
            ...mapState({
                data: state => state.prospectCustomer.detail_prospect_customer.data,
                isLoading: state => state.prospectCustomer.detail_prospect_customer.isLoadingDetail,
                address_detail: state => state.prospectCustomer.detail_prospect_customer.address_detail,
                detail_decline: state => state.prospectCustomer.detail_prospect_customer,
            })
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomerDetail"
            ]),
            selectedDeclineType(d) {
                this.detail_decline.decline_type = ""
                if (d) {
                    this.detail_decline.decline_type = d.value_int
                }
            },
            openDeclineDialog(){
                this.detail_decline.decline_type = 0
                this.detail_decline.decline_note = ""
                this.detail_decline.clearDeclineType = false
                this.detail_decline.declineDialog = true
            },
            declineAction(id) {
                http.put("/prospective_customer/decline/"+id,{
                    decline_type: this.detail_decline.decline_type,
                    decline_note: this.detail_decline.decline_note,
                }).then(responseDec => {
                    this.detail_decline.declineDialog = false
                    Vue.$toast.open({
                        position: 'top-right',
                        message: 'Data has been declined successfully',
                        type: 'success',
                    });
                    this.detail_decline.clearDeclineType = true
                    this.fetchProspectCustomerDetail({id: this.$route.params.id});
                }).catch(e => {
                    this.detail_decline.error = e.errors
                });
            },
            seeHistory() {
                this.data_audit_log = {
                    model: true,
                    id: this.$route.params.id,
                    type: "prospect_customer",
                };
            },
        }
    }
</script>
