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
                                :data-unq="`prospectCustomer-button-decline`"
                                v-privilege="'pro_cst_dec'"
                                v-if="data.reg_status === 6"
                                @click="openDeclineDialog()"
                            >
                                <v-list-item-title>Decline</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
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
                    <DetailRowNew :name="'Address Name'" :value="data.company_address?.address_name ? data.company_address.address_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Region'" :value="data.company_address?.region ? data.company_address.region : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24 mb24">
                    <v-card outlined class="pa20">
                        <div class="fs16 bold mb20">
                            Address Detail
                        </div>
                        <v-row class="px-5">
                            <v-col cols="12" md="12">
                                <DetailRowNew :name="'Address Detail'" :value="data.company_address?.address_1? data.company_address.address_1 : '-'" :align="true"/>
                            </v-col>
                            <v-col cols="12" md="12" class="-mt24">
                                <DetailRowNew :name="'Continue Address Detail'" :value="data.company_address?.address_2? data.company_address.address_2 : '-'" :align="true"/>
                            </v-col>
                            <v-col cols="12" md="12" class="-mt24 -mb24">
                                <DetailRowNew :name="'Continue Address Detail'" :value="data.company_address?.address_3? data.company_address.address_3 : '-'" :align="true"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="data.company_address?.province ? data.company_address.province : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="data.company_address?.city ? data.company_address.city : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="data.company_address?.district ? data.company_address.district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="data.company_address?.sub_district ? data.company_address.sub_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="data.company_address?.postal_code ? data.company_address.postal_code : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Latitude'" :value="data.company_address?.latitude ? data.company_address.latitude : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Longitude'" :value="data.company_address?.longitude ? data.company_address.longitude : '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Address Note'" :value="data.company_address?.note ? data.company_address.note : '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold" v-if="data.business_type?.value_int === 1">Sales and Shipping Info</v-col>
                <v-col cols="12" class="fs16 bold" v-else>Business/Shipping Info</v-col>
            </v-row>
            <v-row class="px-5 mt-10">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Name'" :value="data.ship_to_address?.address_name? data.ship_to_address.address_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Region'" :value="data.ship_to_address?.region? data.ship_to_address.region : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24 mb24">
                    <v-card outlined class="pa20">
                        <div class="fs16 bold mb20">
                            Address Detail
                        </div>
                        <v-row class="px-5">
                            <v-col cols="12" md="12">
                                <DetailRowNew :name="'Address Detail'" :value="data.ship_to_address?.address_1? data.ship_to_address.address_1 : '-'" :align="true"/>
                            </v-col>
                            <v-col cols="12" md="12" class="-mt24">
                                <DetailRowNew :name="'Continue Address Detail'" :value="data.ship_to_address?.address_2? data.ship_to_address.address_2 : '-'" :align="true"/>
                            </v-col>
                            <v-col cols="12" md="12" class="-mt24 -mb24">
                                <DetailRowNew :name="'Continue Address Detail'" :value="data.ship_to_address?.address_3? data.ship_to_address.address_3 : '-'" :align="true"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="data.ship_to_address?.province? data.ship_to_address.province : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="data.ship_to_address?.city? data.ship_to_address.city : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="data.ship_to_address?.district? data.ship_to_address.district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="data.ship_to_address?.sub_district? data.ship_to_address.sub_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="data.ship_to_address?.postal_code? data.ship_to_address.postal_code : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Latitude'" :value="data.ship_to_address?.latitude? data.ship_to_address.latitude : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Longitude'" :value="data.ship_to_address?.longitude? data.ship_to_address.longitude : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :name="'Address Note'" :value="data.ship_to_address?.note? data.ship_to_address.note : '-'" :align="true"/>
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
                    <DetailRowNew :name="data.business_type?.value_int === 1? 'Contract Signing Position' : 'Business Owner Contact'" :value="data.owner_contact? data.owner_contact : '-' "/>
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
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Operation/Purchasing Name'" :value="data.pic_operation_name? data.pic_operation_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Operation/Purchasing Contact'" :value="data.pic_operation_contact? data.pic_operation_contact : '-' "/>
                </v-col>
            </v-row>
            <div class="mt60">
                <v-row class="px-5">
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew 
                            :data-unq="`proscus-link-idCard`"
                            :name="'ID Card'" 
                            :value="data.id_card_doc_name ? data.id_card_doc_name : '-'" 
                            :crossURL="data.id_card_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Contract Signing Power of Attorney'" 
                            :value="data.company_contract_doc_name ? data.company_contract_doc_name : '-'" 
                            :crossURL="data.company_contract_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Deed of Establishment/Last Amendment'" 
                            :value="data.notarial_deed_doc_name ? data.notarial_deed_doc_name : '-'" 
                            :crossURL="data.notarial_deed_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Taxpayer'" 
                            :value="data.taxpayer_doc_name ? data.taxpayer_doc_name : '-'" 
                            :crossURL="data.taxpayer_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Taxable Entrepreneur Confirmation Number'" 
                            :value="data.taxable_entrepeneur_doc_name ? data.taxable_entrepeneur_doc_name : '-'" 
                            :crossURL="data.taxable_entrepeneur_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Business License'" 
                            :value="data.business_license_doc_name ? data.business_license_doc_name : '-'" 
                            :crossURL="data.business_license_doc_url"
                            :align="true"
                        />
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="data.business_type?.value_int === 1">
                        <DetailRowNew 
                            :data-unq="`proscus-link-taxpayer`"
                            :name="'Certificate of Company Registration/Business Identification Number'" 
                            :value="data.company_certificate_reg_name ? data.company_certificate_reg_name : '-'" 
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
                    <DetailRowNew :name="'Address Name'" :value="data.bill_to_address?.address_name? data.bill_to_address.address_name : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Region'" :value="data.bill_to_address?.region? data.bill_to_address.region : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24 mb24">
                    <v-card outlined class="pa20">
                        <div class="fs16 bold mb20">
                            Address Detail
                        </div>
                        <v-row class="px-5">
                            <v-col cols="12" md="12">
                                <DetailRowNew :name="'Address Detail'" :value="data.bill_to_address?.address_1? data.bill_to_address.address_1 : '-'" :align="true"/>
                            </v-col>
                            <v-col cols="12" md="12" class="-mt24">
                                <DetailRowNew :name="'Continue Address Detail'" :value="data.bill_to_address?.address_2? data.bill_to_address.address_2 : '-'" :align="true"/>
                            </v-col>
                            <v-col cols="12" md="12" class="-mt24 -mb24">
                                <DetailRowNew :name="'Continue Address Detail'" :value="data.bill_to_address?.address_3? data.bill_to_address.address_3 : '-'" :align="true"/>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="data.bill_to_address?.province? data.bill_to_address.province : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="data.bill_to_address?.city? data.bill_to_address.city : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="data.bill_to_address?.district? data.bill_to_address.district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Subdistrict'" :value="data.bill_to_address?.sub_district? data.bill_to_address.sub_district : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="data.bill_to_address?.postal_code? data.bill_to_address.postal_code : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Latitude'" :value="data.bill_to_address?.latitude? data.bill_to_address.latitude : '-' "/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Longitude'" :value="data.bill_to_address?.longitude? data.bill_to_address.longitude : '-' "/>
                </v-col>
                <v-col cols="12" md="12" class="-mt24">
                    <DetailRowNew :name="'Address Note'" :value="data.bill_to_address?.note? data.ship_to_address.note : '-'" :align="true"/>
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
