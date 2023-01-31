<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mb24">
                <v-col data-unq="proscus-label-name" class="fs24 bold">
                    {{ detail_prospect_customer.name }}
                </v-col>
                <v-col class="d-flex justify-end align-end">
                    <v-chip
                        :data-unq="`proscus-button-status`"
                        :color="statusMaster( detail_prospect_customer.reg_status === 6 ? 'new' :  detail_prospect_customer.reg_status === 11 ? 'registered' : 'decline')"
                        :text-color="statusMasterText( detail_prospect_customer.reg_status === 6 ? 'new' :  detail_prospect_customer.reg_status === 11 ? 'registered' : 'decline')"
                        small
                        class="mb6"
                    >
                        {{ detail_prospect_customer.reg_status === 6 ? 'New' :  detail_prospect_customer.reg_status === 11 ? 'Registered' : 'Decline'}}
                    </v-chip>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn :data-unq="`notification-button-actionButton`" icon v-on="on">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <v-list-item
                                :data-unq="`prospectCustomer-button-decline`"
                                v-privilege="'pro_cst_dec'"
                                v-if="detail_prospect_customer.reg_status === 6"
                                @click="openDeclineDialog()"
                            >
                                <v-list-item-title>Decline</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row class="px-5 mt-8">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`proscus-link-businessType`" :name="'Business Type'" :value="detail_prospect_customer.business_type_name ? detail_prospect_customer.business_type_name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Archetype'" :value="detail_prospect_customer.archetype ? detail_prospect_customer.archetype.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.business_type_name=='Business Entity'">
                    <DetailRowNew :name="'Brand Name'" :value="detail_prospect_customer.brand_name ? detail_prospect_customer.brand_name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.customer_upgrade == 1">
                    <DetailRowNew :name="'Previous Customer'" :value="detail_prospect_customer.customer ? detail_prospect_customer.customer.name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Region'" :value="detail_prospect_customer.region ? detail_prospect_customer.region.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="detail_prospect_customer.zip_code ? detail_prospect_customer.zip_code : '-'" />
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew v-if="detail_prospect_customer.business_type_name=='Business Entity'" :name="'Company Address'" :value="detail_prospect_customer.company_address.description ? detail_prospect_customer.company_address.description : '-'" :align="true"/>
                    <DetailRowNew v-else :name="'Business Address'" :value="detail_prospect_customer.company_address.description ? detail_prospect_customer.company_address.description : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" class="-mt24" v-if="detail_prospect_customer.business_type_name=='Business Entity'">
                    <DetailRowNew :name="'Shipping Address'" :value="detail_prospect_customer.ship_to_address.description ? detail_prospect_customer.ship_to_address.description : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" class="-mt24" v-if="detail_prospect_customer.outlet_image && detail_prospect_customer.outlet_image.length > 0">
                    <span class="text-black60">Shipping Goods Place/Outlet Image :</span>
                    <v-card
                        class="d-flex align-content-start flex-wrap my-2"
                        flat
                        tile
                    >
                        <v-card
                            v-for="(item, idx) in detail_prospect_customer.outlet_image" 
                            :key="idx" 
                            class="pr-2 mb-2"
                            flat
                            tile
                        >
                            <DisplayPhotoOverlay :title="'Photo Outlet'" :src="item"/>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew
                        :name="'Best Time To Call'" :value="
                            detail_prospect_customer.time_consent === 1
                            ? 'Morning'
                            : detail_prospect_customer.time_consent === 2
                            ? 'Afternoon'
                            : detail_prospect_customer.time_consent === 3
                            ? 'Night'
                            : '-'
                        "
                    />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Reference Info'" :value="detail_prospect_customer.reference_info_convert ? detail_prospect_customer.reference_info_convert : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Referrer Code'" :value="detail_prospect_customer.referrer_code ? detail_prospect_customer.referrer_code : '-'"/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Business Info</v-col>
            </v-row>
            <div class="hr-title mx-1 mb30"/>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew v-if="detail_prospect_customer.business_type_name=='Business Entity'" :name="'Contract Signing Name'" :value="detail_prospect_customer.owner_name ? detail_prospect_customer.owner_name : '-' "/>
                    <DetailRowNew :name="'Business Owner Name'" :value="detail_prospect_customer.owner_name ? detail_prospect_customer.owner_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew v-if="detail_prospect_customer.business_type_name=='Business Entity'" :name="'Contract Signing Position'" :value="detail_prospect_customer.owner_role ? detail_prospect_customer.owner_role : '-' "/>
                    <DetailRowNew v-else :name="'Business Owner Contact'" :value="detail_prospect_customer.phone_1 ? detail_prospect_customer.phone_1 : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Email'" :value="detail_prospect_customer.email ? detail_prospect_customer.email : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew v-if="detail_prospect_customer.business_type_name=='Business Entity'" :name="'Recipient of Orders Name'" :value="detail_prospect_customer.pic_order_name ? detail_prospect_customer.pic_order_name : '-' "/>
                    <DetailRowNew v-else :name="'PIC Order Name'" :value="detail_prospect_customer.pic_order_name ? detail_prospect_customer.pic_order_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew v-if="detail_prospect_customer.business_type_name=='Business Entity'" :name="'Recipient of Orders Contact'" :value="detail_prospect_customer.phone_1 ? detail_prospect_customer.phone_1 : '-' "/>
                    <DetailRowNew v-else :name="'PIC Orders Contact'" :value="detail_prospect_customer.phone_1 ? detail_prospect_customer.phone_1 : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'ID Card Number'" :value="detail_prospect_customer.id_card_doc_number ? detail_prospect_customer.id_card_doc_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Taxpayer Number'" :value="detail_prospect_customer.taxpayer_doc_number ? detail_prospect_customer.taxpayer_doc_number : '-' "/>
                </v-col>
            </v-row>
            <v-row class="px-5 mt-15">
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.business_type_name=='Business Entity'">
                    <DetailRowNew 
                        :data-unq="`proscus-link-companyContract`"
                        :name="'Contract Signing Power of Attorney'" 
                        :value="detail_prospect_customer.company_contract_doc_name ? detail_prospect_customer.company_contract_doc_name : '-'" 
                        :crossURL="detail_prospect_customer.company_contract_doc_url" 
                    />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew 
                        :data-unq="`proscus-link-idCard`"
                        :name="'ID Card'" 
                        :value="detail_prospect_customer.id_card_doc_name ? detail_prospect_customer.id_card_doc_name : '-'" 
                        :crossURL="detail_prospect_customer.id_card_doc_url"
                    />
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.business_type_name=='Business Entity'">
                    <DetailRowNew 
                        :data-unq="`proscus-link-notarialDeed`"
                        :name="'Notary Deed of Establishment'" 
                        :value="detail_prospect_customer.notarial_deed_doc_name ? detail_prospect_customer.notarial_deed_doc_name : '-'" 
                        :crossURL="detail_prospect_customer.notarial_deed_doc_url"
                    />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew 
                        :data-unq="`proscus-link-taxpayer`"
                        :name="'Taxpayer'" 
                        :value="detail_prospect_customer.taxpayer_doc_name ? detail_prospect_customer.taxpayer_doc_name : '-'"
                        :crossURL="detail_prospect_customer.taxpayer_doc_url"
                    />
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.business_type_name=='Business Entity'">
                    <DetailRowNew 
                        :data-unq="`proscus-link-taxableEntrepeneur`"
                        :name="'Taxable Entrepreneur Confirmation Number'" 
                        :value="detail_prospect_customer.taxable_entrepeneur_doc_name ? detail_prospect_customer.taxable_entrepeneur_doc_name : '-'" 
                        :crossURL="detail_prospect_customer.taxable_entrepeneur_doc_url"
                    />
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.business_type_name=='Business Entity'">
                    <DetailRowNew
                        :data-unq="`proscus-link-companyCertificate`"
                        :name="'Certificate of Company Registration'" 
                        :value="detail_prospect_customer.company_certificate_reg_name ? detail_prospect_customer.company_certificate_reg_name : '-'" 
                        :crossURL="detail_prospect_customer.company_certificate_reg_url"
                    />
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Finance Info</v-col>
            </v-row>
            <div class="hr-title mx-1 mb30"/>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Finance Name'" :value="detail_prospect_customer.pic_finance_name ? detail_prospect_customer.pic_finance_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Finance Contact'" :value="detail_prospect_customer.phone_2 ? detail_prospect_customer.phone_2 : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Payment Term'" :value="detail_prospect_customer.payment_term.description ? detail_prospect_customer.payment_term.description : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :data-unq="`proscus-link-exchangeInvoice`" :name="'Exchange Invoice'" :value="detail_prospect_customer.exchange_invoice ? (detail_prospect_customer.exchange_invoice == '1' ? 'Yes' : 'No') : '-'"/>
                </v-col>
            </v-row>
            <v-row class="px-5" v-if="detail_prospect_customer.exchange_invoice == '1'">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Exchange Invoice Time'" :value="detail_prospect_customer.exchange_invoice_time ? detail_prospect_customer.exchange_invoice_time : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Email'" :value="detail_prospect_customer.finance_email ? detail_prospect_customer.finance_email : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Invoice Term'" :value="detail_prospect_customer.invoice_term_convert ? detail_prospect_customer.invoice_term_convert : '-' "/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Billing Address'" :value="
                        detail_prospect_customer.bill_to_address.description ? detail_prospect_customer.bill_to_address.description : '-'
                    " :align="true"/>
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
                        @click="declineAction(detail_prospect_customer.id)"
                        class="main-btn white--text"
                        depressed
                        color="#50ABA3"
                    >Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                ConfirmData: {},
                dataAuditLog: {},
            };
        },
        async mounted() {
            await this.fetchProspectCustomerDetail({id: this.$route.params.id});
        },
        computed: {
            ...mapState({
                detail_prospect_customer: state => state.prospectCustomer.detail_prospect_customer.data,
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
        }
    }
</script>
