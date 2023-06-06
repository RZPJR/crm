<template>
    <v-container fill-height class="main-container">
        <div class="box-title fs16 bold">
            Basic Info
        </div>
        <div class="box-body">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectCustomer
                            @selected="setCodeComponentSelected($event, 'customer_code')"
                            name="customer"
                            :dense="true"
                            :error="error.customer_code"
                            :data-unq="`prospectCustomer-select-customer`"
                            customer_type="personal"
                            :customer="detail_customer.customer"
                            :not_call_api="true"
                        ></SelectCustomer>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'business_type_id')"
                            name="business_type"
                            label="Business Type"
                            table="customer"
                            attribute="business_type"
                            :dense="true"
                            :glossary="detail_customer.business_type"
                            :error="error.business_type_id"
                            :data-unq="`prospectCustomer-select-businessType`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectBusinessType
                            @selected="customerTypeSelected"
                            name="customer_type"
                            :dense="true"
                            :error="error.customer_type_id"
                            :data-unq="`prospectCustomer-select-customerType`"
                            :customer_type="detail_customer.customer_type"
                        ></SelectBusinessType>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-businessName"
                            name="business_name"
                            v-model="form.business_name"
                            required
                            outlined
                            dense
                            :error-messages="error.business_name"
                            maxlength="64"
                        >
                            <template v-slot:label>
                                Business/Company Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectArchetype
                            @selected="setIdComponentSelected($event, 'archetype_id')"
                            label="Archetype"
                            name="archetype"
                            :dense="true"
                            :customer_type_id="form.customer_type_id"
                            :error="error.archetype_id"
                            :data-unq="`prospectCustomer-select-archetype`"
                            :disabled="disabled.archetype"
                            :archetype="detail_customer.archetype"
                        ></SelectArchetype>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id !== 2">
                        <v-text-field
                            data-unq="prospectCustomer-input-brandName"
                            name="brand_name"
                            v-model="form.brand_name"
                            required
                            outlined
                            dense
                            :error-messages="error.brand_name"
                            maxlength="64"
                        >
                            <template v-slot:label>
                                Brand Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectCustomerClass
                            @selected="setIdComponentSelected($event, 'customer_class_id')"
                            name="customer_class"
                            :dense="true"
                            :error="error.customer_class_id"
                            :data-unq="`prospectCustomer-select-customerClass`"
                            label="Customer Class"
                            :customer_class="detail_customer.customer_class"
                        ></SelectCustomerClass>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-referrerCode"
                            name="referrer_code"
                            v-model="form.referrer_code"
                            required
                            outlined
                            dense
                            :error-messages="error.referrer_code"
                            maxlength="30"
                        >
                            <template v-slot:label>Referrer Code</template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'time_consent')"
                            name="time_consent"
                            label="Best Time To Call"
                            table="prospect_customer"
                            attribute="time_consent"
                            :dense="true"
                            :error="error.time_consent"
                            :data-unq="`prospectCustomer-select-timeConsent`"
                            :glossary="detail_customer.time_consent"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'reference_info')"
                            name="reference_info"
                            label="Reference Info"
                            table="all"
                            attribute="reference_info"
                            :dense="true"
                            :error="error.reference_info"
                            :data-unq="`prospectCustomer-select-referenceInfo`"
                            :glossary="detail_customer.reference_info"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'registration_channel')"
                            name="registration_channel"
                            label="Registration Channel"
                            table="prospect_customer"
                            attribute="reg_channel"
                            :dense="true"
                            :glossary="detail_customer.selected_channel"
                            :error="error.registration_channel_value"
                            :data-unq="`prospectCustomer-select-registrationChannel`"
                            :disabled="true"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-row>
                            <UploadImageMultiple
                                name="Prospect Customer"
                                :error="error.outlet_image"
                                class="ma-3"
                                data-unq="prospectCustomer-upload-multiImage"
                                max_img="7"
                                label="Shipping Goods Place/Outlet Image"
                                :data="detail_customer.outlet_image"
                            />
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold" v-if="form.business_type_id !== 2">
            Company Address
        </div>
        <div class="box-body" v-if="form.business_type_id !== 2">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressName"
                            name="company_address_name"
                            v-model="form.company_address_name"
                            required
                            outlined
                            dense
                            :error-messages="error.company_address_name"
                            maxlength="30"
                        >
                            <template v-slot:label>Address Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address_', 'company_address_region', 'company_address_province')"
                            name="company_address_region"
                            :dense="true"
                            label="Region"
                            :error="error.company_address_region"
                            :data-unq="`prospectCustomer-select-companyAddressRegion`"
                            :adm_division="form.company_address_region"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24 mb24">
                        <v-card outlined class="pa20">
                            <div class="fs16 bold mb20">
                                Address Detail
                            </div>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-companyAddress1"
                                        name="company_address_detail_1"
                                        v-model="form.company_address_detail_1"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.company_address_detail_1"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Address Detail<span class="text-red">*</span></template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-companyAddress2"
                                        name="address_1"
                                        v-model="form.company_address_detail_2"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.company_address_detail_2"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24 -mb24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-companyAddress3"
                                        name="address_1"
                                        v-model="form.company_address_detail_3"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.company_address_detail_3"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address_', 'company_address_province', 'company_address_city')"
                            name="company_address_province"
                            :dense="true"
                            label="Province"
                            :error="error.company_address_province"
                            :data-unq="`prospectCustomer-select-companyAddressProvince`"
                            :region="form.company_address_region"
                            :disabled="disabled.company_address_province"
                            :adm_division="form.company_address_province"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address_', 'company_address_city', 'company_address_district')"
                            name="company_address_city"
                            :dense="true"
                            label="City"
                            :error="error.company_address_city"
                            :data-unq="`prospectCustomer-select-companyAddressCity`"
                            :region="form.company_address_region"
                            :province="form.company_address_province"
                            :disabled="disabled.company_address_city"
                            :adm_division="form.company_address_city"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address_', 'company_address_district', 'company_address_sub_district')"
                            name="company_address_district"
                            :dense="true"
                            label="District"
                            :error="error.company_address_district"
                            :data-unq="`prospectCustomer-select-companyAddressDistrict`"
                            :region="form.company_address_region"
                            :province="form.company_address_province"
                            :city="form.company_address_city"
                            :disabled="disabled.company_address_district"
                            :adm_division="form.company_address_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address_', 'company_address_sub_district', 'company_address_postal_code')"
                            name="company_address_sub_district"
                            :dense="true"
                            label="Subdistrict"
                            :error="error.company_address_sub_district"
                            :data-unq="`prospectCustomer-select-companyAddressSubdistrict`"
                            :region="form.company_address_region"
                            :province="form.company_address_province"
                            :city="form.company_address_city"
                            :district="form.company_address_district"
                            :disabled="disabled.company_address_sub_district"
                            :adm_division="form.company_address_sub_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressPostalCode"
                            name="company_address_postal_code"
                            v-model="form.company_address_postal_code"
                            required
                            outlined
                            dense
                            :error-messages="error.company_address_postal_code"
                            maxlength="10"
                            :disabled="true"
                        >
                            <template v-slot:label>Postal Code<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressLatitude"
                            name="company_address_latitude"
                            v-model="form.company_address_latitude"
                            required
                            outlined
                            dense
                            :error-messages="error.company_address_latitude"
                            maxlength="17"
                        >
                            <template v-slot:label>Latitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressLongitude"
                            name="company_address_longitude"
                            v-model="form.company_address_longitude"
                            required
                            outlined
                            dense
                            :error-messages="error.company_address_longitude"
                            maxlength="16"
                        >
                            <template v-slot:label>Longitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24">
                        <v-textarea
                            name="company_address_note"
                            v-model="form.company_address_note"
                            :counter="1000"
                            maxlength="1000"
                            outlined
                            dense
                            rows="5"
                            :data-unq="`prospectCustomer-input-companyAddressAddressNote`"
                            :error-messages="error.company_address_note"
                        >
                            <template v-slot:label>Address Note</template>
                        </v-textarea>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold">
            Sales and Shipping Info
        </div>
        <div class="box-body">
            <div class="-mt24" v-if="form.business_type_id !== 2">
                <v-checkbox
                    data-unq="prospectCustomer-input-shippingInfoCheckBox"
                    label="Same as Company Address"
                    v-model="flagging.shipping_info"
                    @click="clickedShippingInfo(flagging.shipping_info)"
                ></v-checkbox>
            </div>
            <div class="mt24">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoAddressName"
                            name="shipping_address_name"
                            v-model="form.shipping_address_name"
                            required
                            outlined
                            dense
                            :error-messages="error.shipping_address_name"
                            maxlength="30"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Address Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'shipping_address_', 'shipping_address_region', 'shipping_address_province')"
                            name="shipping_address_region"
                            :dense="true"
                            label="Region"
                            :error="error.shipping_address_region"
                            :data-unq="`prospectCustomer-select-shippingInfoRegion`"
                            :disabled="flagging.shipping_info"
                            :adm_division="form.shipping_address_region"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24 mb24">
                        <v-card outlined class="pa20">
                            <div class="fs16 bold mb20">
                                Address Detail
                            </div>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-shippingInfoAddress_1"
                                        name="shipping_address_detail_1"
                                        v-model="form.shipping_address_detail_1"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.shipping_address_detail_1"
                                        :counter="60"
                                        maxlength="60"
                                        :disabled="flagging.shipping_info"
                                    >
                                        <template v-slot:label>Address Detail<span class="text-red">*</span></template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-shippingInfoAddress2"
                                        name="shipping_address_detail_2"
                                        v-model="form.shipping_address_detail_2"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.shipping_address_detail_2"
                                        :counter="60"
                                        maxlength="60"
                                        :disabled="flagging.shipping_info"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24 -mb24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-shippingInfoAddress3"
                                        name="shipping_address_detail_3"
                                        v-model="form.shipping_address_detail_3"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.shipping_address_detail_3"
                                        :counter="60"
                                        maxlength="60"
                                        :disabled="flagging.shipping_info"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'shipping_address_', 'shipping_address_province', 'shipping_address_city')"
                            name="shipping_address_province"
                            :dense="true"
                            label="Province"
                            :error="error.shipping_address_province"
                            :data-unq="`prospectCustomer-select-shippingInfoProvince`"
                            :region="form.shipping_address_region"
                            :disabled="disabled.shipping_address_province || flagging.shipping_info"
                            :adm_division="form.shipping_address_province"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'shipping_address_', 'shipping_address_city', 'shipping_address_district')"
                            name="shipping_address_city"
                            :dense="true"
                            label="City"
                            :error="error.shipping_address_city"
                            :data-unq="`prospectCustomer-select-shippingInfoCity`"
                            :region="form.shipping_address_region"
                            :province="form.shipping_address_province"
                            :disabled="disabled.shipping_address_city || flagging.shipping_info"
                            :adm_division="form.shipping_address_city"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'shipping_address_', 'shipping_address_district', 'shipping_address_sub_district')"
                            name="shipping_address_district"
                            :dense="true"
                            label="District"
                            :error="error.shipping_address_district"
                            :data-unq="`prospectCustomer-select-shippingInfoDistrict`"
                            :region="form.shipping_address_region"
                            :province="form.shipping_address_province"
                            :city="form.shipping_address_city"
                            :disabled="disabled.shipping_address_district || flagging.shipping_info"
                            :adm_division="form.shipping_address_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'shipping_address_', 'shipping_address_sub_district', 'shipping_address_postal_code')"
                            name="shipping_address_sub_district"
                            :dense="true"
                            label="Subdistrict"
                            :error="error.shipping_address_sub_district"
                            :data-unq="`prospectCustomer-select-shippingInfoSubdistrict`"
                            :region="form.shipping_address_region"
                            :province="form.shipping_address_province"
                            :city="form.shipping_address_city"
                            :district="form.shipping_address_district"
                            :disabled="disabled.shipping_address_sub_district || flagging.shipping_info"
                            :adm_division="form.shipping_address_sub_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoPostalCode"
                            name="shipping_address_postal_code"
                            v-model="form.shipping_address_postal_code"
                            required
                            outlined
                            dense
                            :error-messages="error.shipping_address_postal_code"
                            maxlength="10"
                            :disabled="true"
                        >
                            <template v-slot:label>Postal Code<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoLatitude"
                            name="shipping_address_latitude"
                            v-model="form.shipping_address_latitude"
                            required
                            outlined
                            dense
                            :error-messages="error.shipping_address_latitude"
                            maxlength="17"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Latitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoLongitude"
                            name="shipping_address_longitude"
                            v-model="form.shipping_address_longitude"
                            required
                            outlined
                            dense
                            :error-messages="error.shipping_address_longitude"
                            maxlength="16"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Longitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24">
                        <v-textarea
                            name="shipping_address_note"
                            v-model="form.shipping_address_note"
                            :counter="1000"
                            maxlength="1000"
                            outlined
                            dense
                            rows="5"
                            :data-unq="`prospectCustomer-input-shippingInfoAddressNote`"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Address Note</template>
                        </v-textarea>
                    </v-col>
                </v-row>
            </div>
            <div class="mt24">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectShippingMethod
                            @selected="setIdComponentSelected($event, 'shipping_method_id')"
                            name="shipping_method"
                            :dense="true"
                            :error="error.shipping_method_id"
                            label="Shipping Method"
                            :data-unq="`prospectCustomer-select-shippingMethod`"
                            :shipping_method="detail_customer.shipping_method"
                        ></SelectShippingMethod>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoPicOrderName"
                            name="pic_order_name"
                            v-model="form.pic_order_name"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_order_name"
                            maxlength="50"
                        >
                            <template v-slot:label>PIC Order Recepient Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoPicOrderContact"
                            name="pic_order_contact"
                            v-model="form.pic_order_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_order_contact"
                            maxlength="20"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        >
                            <template v-slot:label>PIC Order Recepient Contact<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectSalesTerritory
                            @selected="setIdComponentSelected($event, 'sales_territory_id')"
                            name="sales_territory_id"
                            :dense="true"
                            :error="error.sales_territory_id"
                            label="Territory"
                            :data-unq="`prospectCustomer-select-territory`"
                            :territory="detail_customer.sales_territory"
                            v-model="detail_customer.sales_territory"
                        ></SelectSalesTerritory>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectSalesPerson
                            @selected="setIdComponentSelected($event, 'salesperson_id')"
                            name="salesperson_id"
                            :dense="true"
                            :error="error.salesperson_id"
                            label="Salesperson"
                            :data-unq="`prospectCustomer-select-salesPerson`"
                            :sales_person="detail_customer.salesperson"
                        ></SelectSalesPerson>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectPriceLevel
                            @selected="setIdComponentSelected($event, 'price_level_id')"
                            name="price_level_id"
                            :dense="true"
                            :error="error.price_level_id"
                            label="Price Level"
                            :data-unq="`prospectCustomer-select-priceLevel`"
                            :price_level="detail_customer.price_level"
                            :disabled="true"
                        ></SelectPriceLevel>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold">
            Business Info
        </div>
        <div class="box-body">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-contractSigningName"
                            name="owner_name"
                            v-model="form.owner_name"
                            required
                            outlined
                            dense
                            :error-messages="error.owner_name"
                            maxlength="50"
                        >
                            <template v-slot:label v-if="form.business_type_id !== 2">
                                Contract Signing Name<span class="text-red">*</span>
                            </template>
                            <template v-slot:label v-else>
                                Business Owner Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            v-if="form.business_type_id !== 2"
                            data-unq="prospectCustomer-input-contractSigningPosition"
                            name="owner_role"
                            v-model="form.owner_role"
                            required
                            outlined
                            dense
                            :error-messages="error.owner_role"
                            maxlength="20"
                        >
                            <template v-slot:label>
                                Contract Signing Position<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                        <v-text-field
                            v-else
                            data-unq="prospectCustomer-input-contractSigningPosition"
                            name="owner_contact"
                            v-model="form.owner_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.owner_contact"
                            maxlength="20"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        >
                            <template v-slot:label>
                                Business Owner Contact<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-emailBusinessInfo"
                            name="email_business_info"
                            v-model="form.email"
                            required
                            outlined
                            dense
                            :error-messages="error.email"
                            maxlength="100"
                            :rules="form.email? email_rules : []"
                        >
                            <template v-slot:label>
                                Email<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-idCardNumber"
                            name="id_card_doc_number"
                            v-model="form.id_card_doc_number"
                            required
                            outlined
                            dense
                            :error-messages="error.id_card_doc_number"
                            maxlength="30"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        >
                            <template v-slot:label>
                                ID Card Number<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-taxpayerNumber"
                            name="taxpayer_doc_number"
                            v-model="form.taxpayer_doc_number"
                            required
                            outlined
                            dense
                            :error-messages="error.taxpayer_doc_number"
                            maxlength="50"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        >
                            <template v-slot:label>
                                Taxpayer Number<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-picOperationName"
                            name="pic_operation_name"
                            v-model="form.pic_operation_name"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_operation_name"
                            maxlength="50"
                        >
                            <template v-slot:label>
                                PIC Operation/Purchasing Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-picOperationContact"
                            name="pic_operation_contact"
                            v-model="form.pic_operation_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_operation_contact"
                            maxlength="20"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        >
                            <template v-slot:label>
                                PIC Operation/Purchasing Contact<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <div class="mt36">
                    <v-row>
                        <v-col cols="12" md="6" class="-mt24">
                            <UploadPDF
                                label="ID Card"
                                @onSelect="onSelectFile($event, 'id_card_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="id_card_doc_url"
                                :error="error.id_card_doc_url"
                                :idx="0"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-idCard`"
                                :name="'Previous ID Card'" 
                                :value="detail_customer.id_card_doc_url ? detail_customer.id_card_doc_name : '-'" 
                                :crossURL="detail_customer.id_card_doc_url"
                                :align="true"
                            />
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id !== 2">
                            <UploadPDF
                                label="Contract Signing Power of Attorney"
                                @onSelect="onSelectFile($event, 'company_contract_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="company_contract_doc_url"
                                :error="error.company_contract_doc_url"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-contractSigningPowerofAttorney`"
                                :name="'Previous Contract Signing Power of Attorney'" 
                                :value="detail_customer.company_contract_doc_url ? detail_customer.company_contract_doc_name : '-'" 
                                :crossURL="detail_customer.company_contract_doc_url"
                                :align="true"
                            />
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id !== 2">
                            <UploadPDF
                                label="Deed of Establishment/Last Amendment"
                                @onSelect="onSelectFile($event, 'notarial_deed_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="notarial_deed_doc_url"
                                :error="error.notarial_deed_doc_url"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-previousDeedofEstablishmentLastAmendment`"
                                :name="'Previous Deed of Establishment/Last Amendment'" 
                                :value="detail_customer.notarial_deed_doc_url ? detail_customer.notarial_deed_doc_name : '-'" 
                                :crossURL="detail_customer.notarial_deed_doc_url"
                                :align="true"
                            />
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <UploadPDF
                                label="Taxpayer"
                                @onSelect="onSelectFile($event, 'taxpayer_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="taxpayer_doc_url"
                                :error="error.taxpayer_doc_url"
                                :idx="3"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-taxpayer`"
                                :name="'Previous Taxpayer'" 
                                :value="detail_customer.taxpayer_doc_url ? detail_customer.taxpayer_doc_name : '-'" 
                                :crossURL="detail_customer.taxpayer_doc_url"
                                :align="true"
                            />
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id !== 2">
                            <UploadPDF
                                label="Taxable Entrepreneur Confirmation Number"
                                @onSelect="onSelectFile($event, 'taxable_entrepeneur_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="taxable_entrepeneur_doc_url"
                                :error="error.taxable_entrepeneur_doc_url"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-taxableEntrepreneurConfirmationNumber`"
                                :name="'Previous Taxable Entrepreneur Confirmation Number'" 
                                :value="detail_customer.taxable_entrepeneur_doc_url ? detail_customer.taxable_entrepeneur_doc_name : '-'" 
                                :crossURL="detail_customer.taxable_entrepeneur_doc_url"
                                :align="true"
                            />
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id !== 2">
                            <UploadPDF
                                label="Business License"
                                @onSelect="onSelectFile($event, 'business_license_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="business_license_doc_url"
                                :error="error.business_license_doc_url"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-businessLicense`"
                                :name="'Previous Business License'" 
                                :value="detail_customer.business_license_doc_url ? detail_customer.business_license_doc_name : '-'" 
                                :crossURL="detail_customer.business_license_doc_url"
                                :align="true"
                            />
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id !== 2">
                            <UploadPDF
                                label="Certificate of Company Registration/Business Identification Number"
                                @onSelect="onSelectFile($event, 'company_certificate_reg_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="company_certificate_reg_url"
                                :error="error.company_certificate_reg_url"
                            ></UploadPDF>
                            <DetailRowNew 
                                :data-unq="`proscus-link-certificateofCompanyRegistrationBusinessIdentificationNumber`"
                                :name="'Previous Certificate of Company Registration/Business Identification Number'" 
                                :value="detail_customer.company_certificate_reg_url ? detail_customer.company_certificate_reg_name : '-'" 
                                :crossURL="detail_customer.company_certificate_reg_url"
                                :align="true"
                            />
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
        <div class="box-title fs16 bold">
            Finance Info
        </div>
        <div class="box-body">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-picFinanceName"
                            name="pic_finance_name"
                            v-model="form.pic_finance_name"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_finance_name"
                            maxlength="50"
                        >
                            <template v-slot:label>
                                PIC Finance Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-picFinanceContact"
                            name="pic_finance_contact"
                            v-model="form.pic_finance_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_finance_contact"
                            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                            maxlength="20"
                        >
                            <template v-slot:label>
                                PIC Finance Contact<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectPaymentTerm
                            @selected="setIdComponentSelected($event, 'payment_term_id')"
                            name="payment_term_id"
                            :dense="true"
                            :error="error.payment_term_id"
                            label="Payment Terms"
                            :data-unq="`prospectCustomer-select-paymentTerm`"
                            :payment_term="detail_customer.payment_term"
                            v-model="detail_customer.payment_term"
                        ></SelectPaymentTerm>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt36">
                        <div class="d-flex fs14">
                            <div class="mt20 mr20">Exchange Invoice</div>
                            <div>
                                <v-switch
                                    data-unq="prospectCustomer-button-exchangeInvoice"
                                    message
                                    v-model="form.exchange_invoice"
                                    inset
                                    :true-value="1"
                                    :false-value="2"
                                    color="#50ABA3"
                                    @click="exchangeInvoice"
                                >
                                </v-switch>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'invoice_term')"
                            name="invoice_term"
                            label="Invoice Term"
                            table="prospect_customer"
                            attribute="invoice_term"
                            :dense="true"
                            :error="error.invoice_term"
                            :data-unq="`prospectCustomer-select-invoiceTerm`"
                            :disabled="flagging.invoice_term"
                            :glossary="detail_customer.invoice_term"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="form.exchange_invoice === 1">
                        <v-text-field
                            data-unq="prospectCustomer-input-exchangeInvoiceTime"
                            name="exchange_invoice_time"
                            v-model="form.exchange_invoice_time"
                            required
                            outlined
                            dense
                            :error-messages="error.exchange_invoice_time"
                            maxlength="30"
                        >
                            <template v-slot:label>
                                Exchange Invoice Time<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="form.exchange_invoice === 1">
                        <v-text-field
                            data-unq="prospectCustomer-input-emailFinanceInfo"
                            name="finance_email"
                            v-model="form.email"
                            required
                            outlined
                            dense
                            :error-messages="error.finance_email"
                            maxlength="100"
                            :rules="form.finance_email? email_rules : []"
                            :disabled="true"
                        >
                            <template v-slot:label>
                                Email<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold">
            Billing Address
        </div>
        <div class="box-body">
            <div v-if="form.business_type_id !== 2">
                <div v-if="flagging.shipping_info === true || form.billing_address_refer_to === 3" class="-mt24">
                    <v-checkbox
                        data-unq="prospectCustomer-input-billAddressCheckBox"
                        label="Same as Company & Sales and Shipping Address"
                        v-model="flagging.billing_address.check_box_all"
                    ></v-checkbox>
                </div>
                <div v-else>
                    <div class="fs16 -mb10">
                        <v-checkbox
                            data-unq="prospectCustomer-input-billAddressCheckBox"
                            label="Billing Address Same as Company / Sales and Shipping Address"
                            v-model="flagging.billing_address.check_box_or"
                        ></v-checkbox>
                    </div>
                    <v-radio-group v-if="flagging.billing_address.check_box_or" v-model="flagging.billing_address.radio_group" row 
                            :value="1" v-on:change="$emit('input', $event)">
                        <v-radio label="Company Address" value="1"></v-radio>
                        <v-radio label="Sales and Shipping Address" value="2"></v-radio>
                    </v-radio-group>
                </div>
            </div>
            <div v-else-if="form.business_type_id !== 1" class="-mt24">
                <v-checkbox
                    data-unq="prospectCustomer-input-billAddressCheckBox"
                    label="Same as Sales and Shipping Address"
                    v-model="flagging.billing_address.check_box_all" 
                ></v-checkbox>
            </div>
            <div class="mt24">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressName"
                            name="billing_address_name"
                            v-model="form.billing_address_name"
                            required
                            outlined
                            dense
                            :error-messages="error.billing_address_name"
                            maxlength="30"
                            :disabled="flagging.billing_address.disabled"
                        >
                            <template v-slot:label>Address Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'billing_address_', 'billing_address_region', 'billing_address_province')"
                            name="billing_address_region"
                            :dense="true"
                            label="Region"
                            :error="error.billing_address_region"
                            :data-unq="`prospectCustomer-select-billAddressRegion`"
                            :adm_division="form.billing_address_region"
                            :disabled="flagging.billing_address.disabled"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24 mb24">
                        <v-card outlined class="pa20">
                            <div class="fs16 bold mb20">
                                Address Detail
                            </div>
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-billAddress1"
                                        name="billing_address_detail_1"
                                        v-model="form.billing_address_detail_1"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.billing_address_detail_1"
                                        :counter="60"
                                        maxlength="60"
                                        :disabled="flagging.billing_address.disabled"
                                    >
                                        <template v-slot:label>Address Detail<span class="text-red">*</span></template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-billAddress2"
                                        name="billing_address_detail_2"
                                        v-model="form.billing_address_detail_2"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.billing_address_detail_2"
                                        :counter="60"
                                        maxlength="60"
                                        :disabled="flagging.billing_address.disabled"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24 -mb24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-billAddress3"
                                        name="billing_address_detail_3"
                                        v-model="form.billing_address_detail_3"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.billing_address_detail_3"
                                        :counter="60"
                                        maxlength="60"
                                        :disabled="flagging.billing_address.disabled"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'billing_address_', 'billing_address_province', 'billing_address_city')"
                            name="billing_address_province"
                            :dense="true"
                            label="Province"
                            :error="error.billing_address_province"
                            :data-unq="`prospectCustomer-select-billAddressProvince`"
                            :region="form.billing_address_region"
                            :disabled="disabled.billing_address_province || flagging.billing_address.disabled"
                            :adm_division="form.billing_address_province"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'billing_address_', 'billing_address_city', 'billing_address_district')"
                            name="billing_address_city"
                            :dense="true"
                            label="City"
                            :error="error.billing_address_city"
                            :data-unq="`prospectCustomer-select-billAddressCity`"
                            :region="form.billing_address_region"
                            :province="form.billing_address_province"
                            :disabled="disabled.billing_address_city || flagging.billing_address.disabled"
                            :adm_division="form.billing_address_city"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'billing_address_', 'billing_address_district', 'billing_address_sub_district')"
                            name="billing_address_district"
                            :dense="true"
                            label="District"
                            :error="error.billing_address_district"
                            :data-unq="`prospectCustomer-select-billAddressDistrict`"
                            :region="form.billing_address_region"
                            :province="form.billing_address_province"
                            :city="form.billing_address_city"
                            :disabled="disabled.billing_address_district || flagging.billing_address.disabled"
                            :adm_division="form.billing_address_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'billing_address_', 'billing_address_sub_district', 'billing_address_postal_code')"
                            name="billing_address_sub_district"
                            :dense="true"
                            label="Subdistrict"
                            :error="error.billing_address_sub_district"
                            :data-unq="`prospectCustomer-select-billAddressSubdistrict`"
                            :region="form.billing_address_region"
                            :province="form.billing_address_province"
                            :city="form.billing_address_city"
                            :district="form.billing_address_district"
                            :disabled="disabled.billing_address_sub_district || flagging.billing_address.disabled"
                            :adm_division="form.billing_address_sub_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressPostalCode"
                            name="billing_address_postal_code"
                            v-model="form.billing_address_postal_code"
                            required
                            outlined
                            dense
                            :error-messages="error.billing_address_postal_code"
                            maxlength="10"
                            :disabled="true"
                        >
                            <template v-slot:label>Postal Code<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressLatitude"
                            name="billing_address_latitude"
                            v-model="form.billing_address_latitude"
                            required
                            outlined
                            dense
                            :error-messages="error.billing_address_latitude"
                            maxlength="17"
                            :disabled="flagging.billing_address.disabled"
                        >
                            <template v-slot:label>Latitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressLongitude"
                            name="billing_address_longitude"
                            v-model="form.billing_address_longitude"
                            required
                            outlined
                            dense
                            :error-messages="error.billing_address_longitude"
                            maxlength="16"
                            :disabled="flagging.billing_address.disabled"
                        >
                            <template v-slot:label>Longitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24">
                        <v-textarea
                            name="billing_address_note"
                            v-model="form.billing_address_note"
                            :counter="1000"
                            maxlength="1000"
                            outlined
                            dense
                            rows="5"
                            :data-unq="`prospectCustomer-input-billAddressAddressNote`"
                            :disabled="flagging.billing_address.disabled"
                        >
                            <template v-slot:label>Address Note</template>
                        </v-textarea>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold">
            Additional Info
        </div>
        <div class="box-body">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-commentSatu"
                            name="comment_1"
                            v-model="form.comment_1"
                            required
                            outlined
                            dense
                            :error-messages="error.comment_1"
                            :counter="30"
                            maxlength="30"
                        >
                            <template v-slot:label>Comment 1</template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-commentDua"
                            name="comment_2"
                            v-model="form.comment_2"
                            required
                            outlined
                            dense
                            :error-messages="error.comment_2"
                            :counter="30"
                            maxlength="30"
                        >
                            <template v-slot:label>Comment 2</template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box">
            <v-row>
                <v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="$router.go(-1)"
                            depressed
                            outlined
                            color="#EBEBEB"
                            class="main-btn"
                            data-unq="prospectCustomer-button-cancel"
                        >
                            <span class="text-black80 bold">Cancel</span>
                        </v-btn>
                        <div class="ml10">
                            <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                    <v-btn
                                        depressed
                                        outlined
                                        color="#EBEBEB"
                                        class="main-btn"
                                        @click="draft()"
                                        data-unq="prospectCustomer-button-save"
                                        v-on="{ ...tooltip }"
                                    >
                                        <span class="text-secondary bold">Save</span>
                                    </v-btn>
                                </template>
                                <span>Can save the data even if it is incomplete</span>
                            </v-tooltip>
                        </div>
                        <div class="ml10">
                            <v-tooltip top>
                                <template v-slot:activator="{ on: tooltip }">
                                    <v-btn
                                        depressed
                                        color="#50ABA3"
                                        class="main-btn white--text"
                                        @click="upgrade()"
                                        data-unq="prospectCustomer-button-create"
                                        v-on="{ ...tooltip }"
                                    >
                                        <span class="bold">Upgrade</span>
                                    </v-btn>
                                </template>
                                <span>Must complete the required fields to Upgrade</span>
                            </v-tooltip>
                        </div>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <LoadingBar :value="isLoading"/>
        <ConfirmationDialogNew :data-unq="`prospectCustomer-input-confirmDialog`" :sendData="confirm_data"/>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ProspectCustomerCreate",
        data() {
            return {
                email_rules: [ v => /.+@.+/.test(v) || 'Invalid Email address' ],
                flagging:{
                    shipping_info: false,
                    billing_address: {
                        disabled: false,
                        check_box_all: false,
                        radio_group: 0,
                        check_box_or: false,
                    },
                },
                confirm_data: {},
            }
        },
        computed: {
            ...mapState({
                detail_customer: state => state.prospectCustomer.create_prospect_customer.detail_customer,
                form: state => state.prospectCustomer.create_prospect_customer.form,
                disabled: state => state.prospectCustomer.create_prospect_customer.disabled,
                error: state => state.prospectCustomer.create_prospect_customer.error,
                isLoading: state => state.prospectCustomer.create_prospect_customer.isLoading,
            }),
        },
        mounted () {
            let that = this
            this.fetchProspectCustomerUpgrade({id: this.$route.params.id})
            this.$root.$on("event_multipleImage", function (url) {
                let arr = []
                this.$store.commit('setFormProspectCustomerCreate', { ...that.form, outlet_image: [] })
                if (url) {
                    url.forEach(e => {
                        arr.push(e.image_url)
                    });
                    this.$store.commit('setFormProspectCustomerCreate', {  ...that.form, outlet_image: arr })
                }
            });
            this.$root.$on('event_error', function(err){
                this.$store.commit('setError', {})
                if(err){
                    this.$store.commit('setError', err)
                }
            });
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomerUpgrade","fetchCustomerDetail","fetchPriceLevel"
            ]),
            upgrade() {
                this.confirm_data = {
                    model: true,
                    title: "Create Prospective Customer",
                    text: "Are you sure want to upgrade this Customer?",
                    urlApi: '/crm/v1/prospective_customer/upgrade',
                    nextPage: '/customer-relation/prospective-customer',
                    post: true,
                    data: this.form
                }
            },
            draft() {
                this.confirm_data = {
                    model: true,
                    title: "Create Prospective Customer",
                    text: "Are you sure want to save as draft this Prospective Customer?",
                    urlApi: '/crm/v1/prospective_customer',
                    nextPage: '/customer-relation/prospective-customer',
                    post: true,
                    data: this.form
                }
            },
            clickedShippingInfo(d){
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, shipping_address_refer_to: 0 })
                if(d === true){
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, shipping_address_refer_to: 1 })
                }
            },
            exchangeInvoice(){
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, exchange_invoice: this.form.exchange_invoice})
                if(this.form.exchange_invoice === 2){
                    this.flagging.invoice_term = true
                    this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, invoice_term: true })
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, 
                        exchange_invoice_time: '',
                        invoice_term: 0,
                        finance_email: '',
                        invoice_term: 1
                    })
                    this.$store.commit('setSelectedDetailCustomer', { ...this.detail_customer, 
                        invoice_term: {
                            id: 575,
                            value: 1,
                            value_name: 'direct'
                        }
                    })
                }else{
                    this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, invoice_term: false })
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, 
                        finance_email: this.form.email,
                    })
                }
            },
            customerTypeSelected(d) {// For Selected Customer Type
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_type_id: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_type_id: d.id})
                    this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, archetype: false})
                    if(this.form.shipping_address_region !== '' && this.form.customer_type_id !== ''){
                        this.fetchPriceLevel({customer_type_id: this.form.customer_type_id, region_id: this.form.shipping_address_region})
                    }
                }else{
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, archetype_id: null})
                    this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, archetype: true})
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, price_level_id: '' })
                    this.$store.commit('setSelectedDetailCustomer', { ...this.detail_customer, price_level: {} })
                }
            },
            setIdComponentSelected(d, comp){// For Selected then set Id
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d.id})
                }
            },
            setCodeComponentSelected(d, comp){
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d.code})
                    if (comp === 'customer_code') {
                        this.fetchCustomerDetail(d.id)
                    }
                }
                else if (d === null && comp === 'customer_code') {
                    this.fetchProspectCustomerCreate()
                    this.$store.commit('setSelectedDetailCustomer', { ...this.detail_customer, 
                        customer_id: null,
                        customer_type: {},
                        archetype: {},
                        business_type: {},
                        customer_class: {},
                        payment_term: {},
                        sales_territory: {},
                        salesperson: {},
                    })
                }
            },
            setValueComponentSelected(d, comp) {// For Selected then set Value
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d.value})
                    if (comp === "business_type_id" && d.value === 2) {
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, 
                            company_address_id: 0,
                            company_address_name: '',
                            company_address_detail_1: '',
                            company_address_detail_2: '',
                            company_address_detail_3: '',
                            company_address_region: '',
                            company_address_province: '',
                            company_address_city: '',
                            company_address_district: '',
                            company_address_sub_district: '',
                            company_address_postal_code: '',
                            company_address_note: '',
                            company_address_latitude: '',
                            company_address_longitude: '',
                        })
                    }else if(comp === "business_type_id" && d.value === 1){
                        if(this.detail_customer.customer_id)
                            this.fetchCustomerDetail(this.detail_customer.customer_id)
                    }
                }
            },
            onSelectFile(d, comp){
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: ''})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d})
                }
            },
            admDivisionSelected(d, section, current, next) {// For selected related adm division
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [current]: '' })
                if (d) {
                    if(!current.includes('sub_district')){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [current]: d.description })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, [next]: false })
                    }else{
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [current]: d.description })
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [next]: d.postal_code })
                    }
                }else{
                    if(current.includes('region')){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,
                            [section + 'province']: '',
                            [section + 'city']: '',
                            [section + 'district']: '',
                            [section + 'sub_district']: '',
                            [section + 'postal_code']: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            [section + 'province']: true,
                            [section + 'city']: true,
                            [section + 'district']: true,
                            [section + 'sub_district']: true,
                        })
                    }
                    else if(current.includes('province')){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,
                            [section + 'city']: '',
                            [section + 'district']: '',
                            [section + 'sub_district']: '',
                            [section + 'postal_code']: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            [section + 'city']: true,
                            [section + 'district']: true,
                            [section + 'sub_district']: true,
                        })
                    }
                    else if(current.includes('city')){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,
                            [section + 'district']: '',
                            [section + 'sub_district']: '',
                            [section + 'postal_code']: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            [section + 'district']: true,
                            [section + 'sub_district']: true,
                        })
                    }
                    else if(current.includes('district')){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,
                            [section + 'sub_district']: '',
                            [section + 'postal_code']: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            [section + 'sub_district']: true,
                        })
                    }
                    else if(current.includes('sub_district')){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [next]: '' })
                    }
                }
                if(current === 'shipping_address_region'){
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, price_level_id: '' })
                    if(this.form.shipping_address_region !== '' && this.form.customer_type_id !== ''){
                        this.fetchPriceLevel({customer_type_id: this.form.customer_type_id, region_id: this.form.shipping_address_region})
                    }else{
                        this.$store.commit('setSelectedDetailCustomer', { ...this.detail_customer, price_level: {} })
                    }
                }
            },
        },
        watch: {
            'form.shipping_address_refer_to': {
                handler: function (val) {
                    if(val){
                        this.flagging.shipping_info = val === 1? true : false
                    }
                },
                deep: true
            },
            'form.billing_address_refer_to': {
                handler: function (val) {
                    if(val === 1){
                        this.flagging.billing_address.check_box_or = true
                        this.flagging.billing_address.radio_group = "1"
                    }
                    else if(val === 2){
                        this.flagging.billing_address.check_box_or = true
                        this.flagging.billing_address.radio_group = "2"
                    }
                    else if(val === 3){
                        this.flagging.billing_address.check_box_all = true
                    }
                },
                deep: true
            },
            'flagging.shipping_info': {
                handler: function (val) {
                    if(val === true){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, 
                            shipping_address_name: this.form.company_address_name,
                            shipping_address_detail_1: this.form.company_address_detail_1,
                            shipping_address_detail_2: this.form.company_address_detail_2,
                            shipping_address_detail_3: this.form.company_address_detail_3,
                            shipping_address_region: this.form.company_address_region,
                            shipping_address_province: this.form.company_address_province,
                            shipping_address_city: this.form.company_address_city,
                            shipping_address_district: this.form.company_address_district,
                            shipping_address_sub_district: this.form.company_address_sub_district,
                            shipping_address_postal_code: this.form.company_address_postal_code,
                            shipping_address_note: this.form.company_address_note,
                            shipping_address_latitude: this.form.company_address_latitude,
                            shipping_address_longitude: this.form.company_address_longitude,
                        })
                    }else{
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,
                            shipping_address_name: '',
                            shipping_address_detail_1: '',
                            shipping_address_detail_2: '',
                            shipping_address_detail_3: '',
                            shipping_address_region: '',
                            shipping_address_province: '',
                            shipping_address_city: '',
                            shipping_address_district: '',
                            shipping_address_sub_district: '',
                            shipping_address_postal_code: '',
                            shipping_address_note: '',
                            shipping_address_latitude: '',
                            shipping_address_longitude: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            shipping_address_province: true,
                            shipping_address_city: true,
                            shipping_address_district: true,
                            shipping_address_sub_district: true,
                        })
                    }
                },
                deep: true
            },
            'flagging.billing_address.check_box_all': {
                handler: function (val) {
                    if (val === true && this.flagging.shipping_info === true) {
                        this.flagging.billing_address.disabled = true
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, billing_address_refer_to: 3,
                            billing_address_name: this.form.company_address_name,
                            billing_address_detail_1: this.form.company_address_detail_1,
                            billing_address_detail_2: this.form.company_address_detail_2,
                            billing_address_detail_3: this.form.company_address_detail_3,
                            billing_address_region: this.form.company_address_region,
                            billing_address_province: this.form.company_address_province,
                            billing_address_city: this.form.company_address_city,
                            billing_address_district: this.form.company_address_district,
                            billing_address_sub_district: this.form.company_address_sub_district,
                            billing_address_postal_code: this.form.company_address_postal_code,
                            billing_address_note: this.form.company_address_note,
                            billing_address_latitude: this.form.company_address_latitude,
                            billing_address_longitude: this.form.company_address_longitude,
                        })
                    }
                    else if(val === true){
                        this.flagging.billing_address.disabled = true
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, billing_address_refer_to: 2,
                            billing_address_name: this.form.shipping_address_name,
                            billing_address_detail_1: this.form.shipping_address_detail_1,
                            billing_address_detail_2: this.form.shipping_address_detail_2,
                            billing_address_detail_3: this.form.shipping_address_detail_3,
                            billing_address_region: this.form.shipping_address_region,
                            billing_address_province: this.form.shipping_address_province,
                            billing_address_city: this.form.shipping_address_city,
                            billing_address_district: this.form.shipping_address_district,
                            billing_address_sub_district: this.form.shipping_address_sub_district,
                            billing_address_postal_code: this.form.shipping_address_postal_code,
                            billing_address_note: this.form.shipping_address_note,
                            billing_address_latitude: this.form.shipping_address_latitude,
                            billing_address_longitude: this.form.shipping_address_longitude,
                        })
                    }else if (val === false){
                        this.flagging.billing_address.disabled = false
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,  billing_address_refer_to: 0,
                            billing_address_name: '',
                            billing_address_detail_1: '',
                            billing_address_detail_2: '',
                            billing_address_detail_3: '',
                            billing_address_region: '',
                            billing_address_province: '',
                            billing_address_city: '',
                            billing_address_district: '',
                            billing_address_sub_district: '',
                            billing_address_postal_code: '',
                            billing_address_note: '',
                            billing_address_latitude: '',
                            billing_address_longitude: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            billing_address_province: true,
                            billing_address_city: true,
                            billing_address_district: true,
                            billing_address_sub_district: true,
                        })
                    }
                },
                deep: true
            },
            'flagging.billing_address.radio_group': {
                handler: function (val) {
                    if (val) {
                        this.flagging.billing_address.disabled = true
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, billing_address_refer_to: parseInt(val) })
                        if (val === '1') {
                            this.$store.commit('setFormProspectCustomerCreate', { ...this.form, billing_address_refer_to: 1,
                                billing_address_name: this.form.company_address_name,
                                billing_address_detail_1: this.form.company_address_detail_1,
                                billing_address_detail_2: this.form.company_address_detail_2,
                                billing_address_detail_3: this.form.company_address_detail_3,
                                billing_address_region: this.form.company_address_region,
                                billing_address_province: this.form.company_address_province,
                                billing_address_city: this.form.company_address_city,
                                billing_address_district: this.form.company_address_district,
                                billing_address_sub_district: this.form.company_address_sub_district,
                                billing_address_postal_code: this.form.company_address_postal_code,
                                billing_address_note: this.form.company_address_note,
                                billing_address_latitude: this.form.company_address_latitude,
                                billing_address_longitude: this.form.company_address_longitude,
                            })
                        }else if (val === '2'){
                            this.$store.commit('setFormProspectCustomerCreate', { ...this.form, billing_address_refer_to: 2,
                                billing_address_name: this.form.shipping_address_name,
                                billing_address_detail_1: this.form.shipping_address_detail_1,
                                billing_address_detail_2: this.form.shipping_address_detail_2,
                                billing_address_detail_3: this.form.shipping_address_detail_3,
                                billing_address_region: this.form.shipping_address_region,
                                billing_address_province: this.form.shipping_address_province,
                                billing_address_city: this.form.shipping_address_city,
                                billing_address_district: this.form.shipping_address_district,
                                billing_address_sub_district: this.form.shipping_address_sub_district,
                                billing_address_postal_code: this.form.shipping_address_postal_code,
                                billing_address_note: this.form.shipping_address_note,
                                billing_address_latitude: this.form.shipping_address_latitude,
                                billing_address_longitude: this.form.shipping_address_longitude,
                            })
                        }
                    }
                },
                deep: true
            },
            'flagging.billing_address.check_box_or': {
                handler: function (val) {
                    if (val === false) {
                        this.flagging.billing_address.radio_group = 0
                        this.flagging.billing_address.disabled = false
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form,  billing_address_refer_to: 0,
                            billing_address_name: '',
                            billing_address_detail_1: '',
                            billing_address_detail_2: '',
                            billing_address_detail_3: '',
                            billing_address_region: '',
                            billing_address_province: '',
                            billing_address_city: '',
                            billing_address_district: '',
                            billing_address_sub_district: '',
                            billing_address_postal_code: '',
                            billing_address_note: '',
                            billing_address_latitude: '',
                            billing_address_longitude: '',
                        })
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled,
                            billing_address_province: true,
                            billing_address_city: true,
                            billing_address_district: true,
                            billing_address_sub_district: true,
                        })
                    }
                },
                deep: true
            },
        }
    }
</script>
