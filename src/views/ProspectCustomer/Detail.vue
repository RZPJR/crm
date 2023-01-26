<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mb2">
                <v-col class="fs24 bold">
                    {{ detail_prospect_customer.code }}
                </v-col>
            </v-row>
            <v-row class="px-5 mt-6">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Business Type'" :value="detail_prospect_customer.business_type != null ? detail_prospect_customer.business_type.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Archetype'" :value="detail_prospect_customer.archetype != null ? detail_prospect_customer.archetype.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Brand Name'" :value="detail_prospect_customer.brand_name != null ? detail_prospect_customer.brand_name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Previous Customer'" :value="detail_prospect_customer.customer != null ? detail_prospect_customer.customer.name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Region'" :value="detail_prospect_customer.region != null ? detail_prospect_customer.customer.name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="detail_prospect_customer.zip_code != null ? detail_prospect_customer.zip_code : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Company Address'" :value="detail_prospect_customer.company_street_address != null ? detail_prospect_customer.company_street_address : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew 
                        :name="'Shipping Address'" 
                        :value="
                            detail_prospect_customer.ship_to_street_address != null ? detail_prospect_customer.ship_to_street_address : '-' +
                            detail_prospect_customer.ship_to_street_address != null ? detail_prospect_customer.ship_to_street_address : '-'
                        " 
                        :align="true"
                    />
                </v-col>
                <v-col cols="12" class="-mt24" v-if="detail_prospect_customer.outlet_image != null && detail_prospect_customer.outlet_image.length > 0">
                    <span class="text-black60">Photo Outlet :</span>
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
                    <DetailRowNew :name="'Reference Info'" :value="detail_prospect_customer.reference.description != null ? detail_prospect_customer.reference.description : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Referrer Code'" :value="detail_prospect_customer.referrer_code != null ? detail_prospect_customer.referrer_code : '-'"/>
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
                    <DetailRowNew :name="'Contract Signing Name'" :value="detail_prospect_customer.contract_signing_name != null ? detail_prospect_customer.contract_signing_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Contract Signing Position'" :value="detail_prospect_customer.contract_signing_position != null ? detail_prospect_customer.contract_signing_position : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Email'" :value="detail_prospect_customer.email != null ? detail_prospect_customer.email : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Recipient of Orders Name'" :value="detail_prospect_customer.pic_order_name != null ? detail_prospect_customer.pic_order_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Recipient of Orders Contact'" :value="detail_prospect_customer.pic_order_contact != null ? detail_prospect_customer.pic_order_contact : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'ID Card Number'" :value="detail_prospect_customer.id_card_number != null ? detail_prospect_customer.id_card_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Taxpayer Number'" :value="detail_prospect_customer.taxpayer_number != null ? detail_prospect_customer.taxpayer_number : '-' "/>
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
                    <DetailRowNew :name="'PIC Finance Name'" :value="detail_prospect_customer.pic_finance_name != null ? detail_prospect_customer.pic_finance_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Finance Contact'" :value="detail_prospect_customer.pic_finance_contact ? detail_prospect_customer.pic_finance_contact : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Payment Term'" :value="detail_prospect_customer.payment_term != null ? detail_prospect_customer.payment_term.description : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Exchange Invoice'" :value="detail_prospect_customer.exchange_invoice != null ? (detail_prospect_customer.exchange_invoice == '1' ? 'Yes' : 'No') : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Exchange Invoice Time'" :value="detail_prospect_customer.exchange_invoice_time != null ? detail_prospect_customer.exchange_invoice_time : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Email'" :value="detail_prospect_customer.finance_email != null ? detail_prospect_customer.finance_email : '-'"/>
                </v-col><v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Invoice Term'" :value="detail_prospect_customer.invoice_term != null ? detail_prospect_customer.invoice_term : '-' "/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Billing Address'" :value="
                        detail_prospect_customer.bill_to_street_address != null ? detail_prospect_customer.bill_to_street_address : '-'+
                        detail_prospect_customer.concat_address != null ? detail_prospect_customer.concat_address : '-'
                    " :align="true"/>
                </v-col>
            </v-row>

            <pre>
                {{detail_prospect_customer}}
            </pre>
        </div>
    </v-container>
</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "ProspectCustomerDetail",
        data() {
            return {
                ConfirmData: {},
            };
        },
        async created() {
            await this.fetchProspectCustomerDetail({id: this.$route.params.id});
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchProspectCustomerDetail({id: self.$route.params.id})
                }
            });
        },
        computed: {
            ...mapState({
                detail_prospect_customer: state => state.prospectCustomer.detail_prospect_customer.data
            })
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomerDetail"
            ]),
        }
    }
</script>
