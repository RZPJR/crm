<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mb2">
                <v-col class="fs24 bold">
                    {{ detail_prospect_customer.code }}
                </v-col>
                <v-col>
                    <pre>
                        {{detail_prospect_customer}}
                    </pre>
                </v-col>
            </v-row>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Archetype'" :value="detail_prospect_customer.archetype != null ? detail_prospect_customer.archetype.name : '-'" />
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Name'" :value="detail_prospect_customer.pic_name != null ? detail_prospect_customer.pic_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Phone Number'" :value="detail_prospect_customer.phone_number != null ? detail_prospect_customer.phone_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew
                        :name="'Best Time To Call'" :value="
                            detail_prospect_customer.time_consent === 1
                            ? 'Morning'
                            : detail_prospect_customer.time_consent === 2
                            ? 'Afternoon'
                            : 'Night'
                        "
                    />
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address'" :value="detail_prospect_customer.street_address != null ? detail_prospect_customer.street_address : '-'" :align="true"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="detail_prospect_customer.sub_district != null ? detail_prospect_customer.sub_district.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="detail_prospect_customer.sub_district != null ? detail_prospect_customer.sub_district.district.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="detail_prospect_customer.sub_district != null ? detail_prospect_customer.sub_district.district.city.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="detail_prospect_customer.sub_district != null ? detail_prospect_customer.sub_district.district.city.province.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Area'" :value="detail_prospect_customer.sub_district != null ? detail_prospect_customer.sub_district.area.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="detail_prospect_customer.sub_district != null ? detail_prospect_customer.sub_district.postal_code : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Reference Info'" :value="detail_prospect_customer.reference_info != null ? detail_prospect_customer.reference_info : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Referrer Code'" :value="detail_prospect_customer.referrer_code != null ? detail_prospect_customer.referrer_code : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Salesperson'" :value="detail_prospect_customer.salesperson != null ? detail_prospect_customer.salesperson : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Previous Merchant'" :value="detail_prospect_customer.merchant != null ? detail_prospect_customer.merchant.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Registration Channel'" :value="detail_prospect_customer.reg_channel_name != null ? detail_prospect_customer.reg_channel_name : '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24" v-if="detail_prospect_customer.outlet_photo_list != null && detail_prospect_customer.outlet_photo_list.length > 0">
                    <span class="text-black60">Photo Outlet :</span>
                    <div class="flex-display py8">
                        <div v-for="(item, idx) in detail_prospect_customer.outlet_photo_list" :key="idx" class="mr8">
                            <DisplayPhotoOverlay :title="'Photo Outlet'" :src="detail_prospect_customer"/>
                        </div>
                    </div>
                </v-col>
                <v-col cols="6" class="pr-13" v-if="detail_prospect_customer.decline_type">
                    <DetailRowNew :name="'Decline Type'" :value="detail_prospect_customer.decline_type"/>
                </v-col>
                <v-col cols="6" class="pl-13" v-if="detail_prospect_customer.decline_note">
                    <DetailRowNew :name="'Decline Note'" :value="detail_prospect_customer.decline_note"/>
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
                    <DetailRowNew :name="'PIC Business Name'" :value="detail_prospect_customer.pic_business_name != null ? detail_prospect_customer.pic_business_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Business Contact'" :value="detail_prospect_customer.pic_business_contact != null ? detail_prospect_customer.pic_business_contact : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Business ID Number'" :value="detail_prospect_customer.id_card_number != null ? detail_prospect_customer.id_card_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Tax Number'" :value="detail_prospect_customer.taxpayer_number != null ? detail_prospect_customer.taxpayer_number : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24" v-if="detail_prospect_customer.id_card_image || detail_prospect_customer.selfie_image || detail_prospect_customer.taxpayer_image">
                    <span class="text-black60">Photo Identity :</span>
                    <div class="flex-display py8">
                        <div class="mr8">
                            <DisplayPhotoOverlay :title="'Photo Identity'" :src="detail_prospect_customer.id_card_image"/>
                        </div>
                        <div class="mr8">
                            <DisplayPhotoOverlay :title="'Photo Identity'" :src="detail_prospect_customer.selfie_image"/>
                        </div>
                        <div class="mr8">
                            <DisplayPhotoOverlay :title="'Photo Identity'" :src="detail_prospect_customer.taxpayer_image"/>
                        </div>
                    </div>
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
                    <DetailRowNew :name="'Payment Term'" :value="detail_prospect_customer.payment_term != null ? detail_prospect_customer.payment_term.name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Invoice Term'" :value="detail_prospect_customer.invoice_term != null ? detail_prospect_customer.invoice_term.name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Billing Address'" :value="detail_prospect_customer.billing_address != null ? detail_prospect_customer.billing_address : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Note'" :value="detail_prospect_customer.note != null ? detail_prospect_customer.note : '-'"/>
                </v-col>
            </v-row>
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
