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
                            @selected="setIdComponentSelected($event, 'customer_id')"
                            :norequired="true"
                            name="customer"
                            :dense="true"
                            :error="error.customer_id"
                            :data-unq="`prospectCustomer-select-customer`"
                            customer_type="personal"
                        ></SelectCustomer>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-BusinessName"
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
                        <SelectBusinessType
                            @selected="customerTypeSelected"
                            name="customer_type"
                            :dense="true"
                            :error="error.customer_type_id"
                            :data-unq="`prospectCustomer-select-businessType`"
                        ></SelectBusinessType>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'business_type_id')"
                            name="business_type"
                            label="Business Type"
                            table="customer"
                            attribute="business_type"
                            :dense="true"
                            :error="error.business_type_id"
                            :data-unq="`prospectCustomer-select-voucherType`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectArchetype
                            @selected="setIdComponentSelected($event, 'archetype_id')"
                            name="archetype"
                            :disabled="disabled.archetype"
                            :customer_type_id="form.customer_type_id"
                            :dense="true"
                            :error="error.archetype_id"
                            :data-unq="`prospectCustomer-select-archetype`"
                        ></SelectArchetype>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
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
                            :glossary="form.selected_channel"
                            :error="error.registration_channel_value"
                            :data-unq="`prospectCustomer-select-registrationChannel`"
                            :disabled="true"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" class="-mt24">
                        <v-row>
                            <UploadImageMultiple
                                name="Prospect Customer"
                                :error="error.images"
                                class="ma-3"
                                data-unq="prospectCustomer-upload-multiImage"
                                max_img="7"
                            />
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold" v-if="form.business_type_id === 1">
            Company Address
        </div>
        <div class="box-body" v-if="form.business_type_id === 1">
            <div class="mt36">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressAddressName"
                            name="company_address_address_name"
                            v-model="form.company_address.address_name"
                            required
                            outlined
                            dense
                            :error-messages="error.address_name"
                            maxlength="30"
                        >
                            <template v-slot:label>Address Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address', 'region', 'province')"
                            name="company_address_region"
                            :dense="true"
                            label="Region"
                            :error="error.region"
                            :data-unq="`prospectCustomer-select-companyAddressRegion`"
                            :adm_division="form.company_address.region"
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
                                        data-unq="prospectCustomer-input-companyAddressAddress_1"
                                        name="address_1"
                                        v-model="form.company_address.address_1"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_1"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Address Detail<span class="text-red">*</span></template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-companyAddressAddress2"
                                        name="address_1"
                                        v-model="form.company_address.address_2"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_2"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24 -mb24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-companyAddressAddress3"
                                        name="address_1"
                                        v-model="form.company_address.address_3"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_3"
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
                            @selected="admDivisionSelected($event, 'company_address', 'province', 'city')"
                            name="company_address_province"
                            :dense="true"
                            label="Province"
                            :error="error.province"
                            :data-unq="`prospectCustomer-select-companyAddressProvince`"
                            :region="form.company_address.region"
                            :disabled="disabled.company_address.province"
                            :adm_division="form.company_address.province"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address', 'city', 'district')"
                            name="company_address_city"
                            :dense="true"
                            label="City"
                            :error="error.city"
                            :data-unq="`prospectCustomer-select-companyAddressCity`"
                            :region="form.company_address.region"
                            :province="form.company_address.province"
                            :disabled="disabled.company_address.city"
                            :adm_division="form.company_address.city"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address', 'district', 'sub_district')"
                            name="company_address_district"
                            :dense="true"
                            label="District"
                            :error="error.district"
                            :data-unq="`prospectCustomer-select-companyAddressDistrict`"
                            :region="form.company_address.region"
                            :province="form.company_address.province"
                            :city="form.company_address.city"
                            :disabled="disabled.company_address.district"
                            :adm_division="form.company_address.district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'company_address', 'sub_district', 'postal_code')"
                            name="company_address_district"
                            :dense="true"
                            label="Subdistrict"
                            :error="error.sub_district"
                            :data-unq="`prospectCustomer-select-companyAddressSubdistrict`"
                            :region="form.company_address.region"
                            :province="form.company_address.province"
                            :city="form.company_address.city"
                            :district="form.company_address.district"
                            :disabled="disabled.company_address.sub_district"
                            :adm_division="form.company_address.sub_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressPostalCode"
                            name="company_address_postal_code"
                            v-model="form.company_address.postal_code"
                            required
                            outlined
                            dense
                            :error-messages="error.postal_code"
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
                            v-model="form.company_address.latitude"
                            required
                            outlined
                            dense
                            :error-messages="error.latitude"
                            maxlength="17"
                        >
                            <template v-slot:label>Latitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyAddressLongitude"
                            name="company_address_longitude"
                            v-model="form.company_address.longitude"
                            required
                            outlined
                            dense
                            :error-messages="error.longitude"
                            maxlength="16"
                        >
                            <template v-slot:label>Longitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24">
                        <v-textarea
                            name="company_address_address_note"
                            v-model="form.company_address.note"
                            :counter="1000"
                            maxlength="1000"
                            outlined
                            dense
                            rows="5"
                            :data-unq="`prospectCustomer-input-companyAddressAddressNote`"
                        >
                            <template v-slot:label>Address Note</template>
                        </v-textarea>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div class="box-title fs16 bold" v-if="form.business_type_id === 1">
            Sales and Shipping Info
        </div>
        <div class="box-title fs16 bold" v-else>
            Business/Shipping Info
        </div>
        <div class="box-body">
            <div class="-mt24" v-if="form.business_type_id === 1">
                <v-checkbox
                    data-unq="prospectCustomer-input-shippingInfoCheckBox"
                    label="Same as Company Address"
                    v-model="flagging.shipping_info"
                ></v-checkbox>
            </div>
            <div class="mt24">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoAddressName"
                            name="ship_to_address_address_name"
                            v-model="form.ship_to_address.address_name"
                            required
                            outlined
                            dense
                            :error-messages="error.address_name"
                            maxlength="30"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Address Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'ship_to_address', 'region', 'province')"
                            name="ship_to_address_region"
                            :dense="true"
                            label="Region"
                            :error="error.region"
                            :data-unq="`prospectCustomer-select-shippingInfoRegion`"
                            :disabled="flagging.shipping_info"
                            :adm_division="form.ship_to_address.region"
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
                                        name="address_1"
                                        v-model="form.ship_to_address.address_1"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_1"
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
                                        name="address_1"
                                        v-model="form.ship_to_address.address_2"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_2"
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
                                        name="address_1"
                                        v-model="form.ship_to_address.address_3"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_3"
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
                            @selected="admDivisionSelected($event, 'ship_to_address', 'province', 'city')"
                            name="ship_to_address_province"
                            :dense="true"
                            label="Province"
                            :error="error.province"
                            :data-unq="`prospectCustomer-select-shippingInfoProvince`"
                            :region="form.ship_to_address.region"
                            :disabled="disabled.ship_to_address.province || flagging.shipping_info"
                            :adm_division="form.ship_to_address.province"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'ship_to_address', 'city', 'district')"
                            name="ship_to_address_city"
                            :dense="true"
                            label="City"
                            :error="error.city"
                            :data-unq="`prospectCustomer-select-shippingInfoCity`"
                            :region="form.ship_to_address.region"
                            :province="form.ship_to_address.province"
                            :disabled="disabled.ship_to_address.city || flagging.shipping_info"
                            :adm_division="form.ship_to_address.city"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'ship_to_address', 'district', 'sub_district')"
                            name="ship_to_address_district"
                            :dense="true"
                            label="District"
                            :error="error.district"
                            :data-unq="`prospectCustomer-select-shippingInfoDistrict`"
                            :region="form.ship_to_address.region"
                            :province="form.ship_to_address.province"
                            :city="form.ship_to_address.city"
                            :disabled="disabled.ship_to_address.district || flagging.shipping_info"
                            :adm_division="form.ship_to_address.district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'ship_to_address', 'sub_district', 'postal_code')"
                            name="ship_to_address_district"
                            :dense="true"
                            label="Subdistrict"
                            :error="error.sub_district"
                            :data-unq="`prospectCustomer-select-shippingInfoSubdistrict`"
                            :region="form.ship_to_address.region"
                            :province="form.ship_to_address.province"
                            :city="form.ship_to_address.city"
                            :district="form.ship_to_address.district"
                            :disabled="disabled.ship_to_address.sub_district || flagging.shipping_info"
                            :adm_division="form.ship_to_address.sub_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoPostalCode"
                            name="ship_to_address_postal_code"
                            v-model="form.ship_to_address.postal_code"
                            required
                            outlined
                            dense
                            :error-messages="error.postal_code"
                            maxlength="10"
                            :disabled="true"
                        >
                            <template v-slot:label>Postal Code<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoLatitude"
                            name="ship_to_address_latitude"
                            v-model="form.ship_to_address.latitude"
                            required
                            outlined
                            dense
                            :error-messages="error.latitude"
                            maxlength="17"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Latitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoLongitude"
                            name="ship_to_address_longitude"
                            v-model="form.ship_to_address.longitude"
                            required
                            outlined
                            dense
                            :error-messages="error.longitude"
                            maxlength="16"
                            :disabled="flagging.shipping_info"
                        >
                            <template v-slot:label>Longitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24">
                        <v-textarea
                            name="ship_to_address_address_note"
                            v-model="form.ship_to_address.note"
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
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectShippingMethod
                            @selected="setIdComponentSelected($event, 'shipping_method_id')"
                            name="shipping_method"
                            :dense="true"
                            :error="error.shipping_method_id"
                            label="Shipping Method"
                            :data-unq="`prospectCustomer-select-shippingMethod`"
                        ></SelectShippingMethod>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoPicOrderName"
                            name="pic_order_name"
                            v-model="form.ship_to_address.pic_order_name"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_order_name"
                            maxlength="30"
                        >
                            <template v-slot:label>PIC Order Recepient Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-shippingInfoPicOrderContact"
                            name="pic_order_contact"
                            v-model="form.ship_to_address.pic_order_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_order_contact"
                            maxlength="30"
                        >
                            <template v-slot:label>PIC Order Recepient Contact<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectSalesTerritory
                            @selected="setIdComponentSelected($event, 'sales_territory_id')"
                            name="territory"
                            :dense="true"
                            :error="error.sales_territory_id"
                            label="Territory"
                            :data-unq="`prospectCustomer-select-territory`"
                        ></SelectSalesTerritory>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectSalesPerson
                            @selected="setIdComponentSelected($event, 'salesperson_id')"
                            name="sales_person"
                            :dense="true"
                            :error="error.salesperson_id"
                            label="Salesperson"
                            :data-unq="`prospectCustomer-select-salesPerson`"
                        ></SelectSalesPerson>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectPriceLevel
                            @selected="setIdComponentSelected($event, 'price_level_id')"
                            name="price_level"
                            :dense="true"
                            :error="error.price_level_id"
                            label="Price Level"
                            :data-unq="`prospectCustomer-select-priceLevel`"
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
                            <template v-slot:label v-if="form.business_type_id === 1">
                                Contract Signing Name<span class="text-red">*</span>
                            </template>
                            <template v-slot:label v-else>
                                Business Owner Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-contractSigningPosition"
                            name="owner_role"
                            v-model="form.owner_role"
                            required
                            outlined
                            dense
                            :error-messages="error.owner_role"
                            maxlength="20"
                        >
                            <template v-slot:label v-if="form.business_type_id === 1">
                                Contract Signing Position<span class="text-red">*</span>
                            </template>
                            <template v-slot:label v-else>
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
                            name="id_card_number"
                            v-model="form.id_card_number"
                            required
                            outlined
                            dense
                            :error-messages="error.id_card_number"
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
                            name="taxpayer_number"
                            v-model="form.taxpayer_number"
                            required
                            outlined
                            dense
                            :error-messages="error.taxpayer_number"
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
                            data-unq="prospectCustomer-input-purchasingName"
                            name="purchasing_name"
                            v-model="form.purchasing_name"
                            required
                            outlined
                            dense
                            :error-messages="error.purchasing_name"
                            maxlength="20"
                        >
                            <template v-slot:label>
                                PIC Operation/Purchasing Name<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-purchasingContact"
                            name="purchasing_contact"
                            v-model="form.purchasing_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.purchasing_contact"
                            maxlength="50"
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
                            ></UploadPDF>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id === 1">
                            <UploadPDF
                                label="Contract Signing Power of Attorney"
                                @onSelect="onSelectFile($event, 'company_contract_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="company_contract_doc_url"
                            ></UploadPDF>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id === 1">
                            <UploadPDF
                                label="Deed of Establishment/Last Amendment"
                                @onSelect="onSelectFile($event, 'notarial_deed_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="notarial_deed_doc_url"
                            ></UploadPDF>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24">
                            <UploadPDF
                                label="Taxpayer"
                                @onSelect="onSelectFile($event, 'taxpayer_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="taxpayer_doc_url"
                            ></UploadPDF>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id === 1">
                            <UploadPDF
                                label="Taxable Entrepreneur Confirmation Number"
                                @onSelect="onSelectFile($event, 'taxable_entrepeneur_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="taxable_entrepeneur_doc_url"
                            ></UploadPDF>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id === 1">
                            <UploadPDF
                                label="Business License"
                                @onSelect="onSelectFile($event, 'business_license_doc_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="business_license_doc_url"
                            ></UploadPDF>
                        </v-col>
                        <v-col cols="12" md="6" class="-mt24" v-if="form.business_type_id === 1">
                            <UploadPDF
                                label="Certificate of Company Registration/Business Identification Number"
                                @onSelect="onSelectFile($event, 'company_certificate_reg_url')"
                                max_size="2"
                                :type="'prospective_customer'"
                                :extention="'pdf'"
                                name="company_certificate_reg_url"
                            ></UploadPDF>
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
                            data-unq="prospectCustomer-input-picFinanceContact"
                            name="pic_finance_contact"
                            v-model="form.pic_finance_contact"
                            required
                            outlined
                            dense
                            :error-messages="error.pic_finance_contact"
                            maxlength="64"
                        >
                            <template v-slot:label>
                                PIC Finance Contact<span class="text-red">*</span>
                            </template>
                        </v-text-field>
                    </v-col>
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
                        <SelectPaymentTerm
                            @selected="setIdComponentSelected($event, 'payment_term_id')"
                            name="payment_term"
                            :dense="true"
                            :error="error.payment_term_id"
                            label="Payment Terms"
                            :data-unq="`prospectCustomer-select-paymentTerm`"
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
                                    :false-value="0"
                                    color="#50ABA3"
                                    @click="exchangeInvoice"
                                >
                                </v-switch>
                            </div>
                        </div>
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
                        <SelectGlossary
                            @selected="setValueComponentSelected($event, 'invoice_term')"
                            name="invoice_term"
                            label="Invoice Term"
                            table="prospect_customer"
                            attribute="invoice_term"
                            :dense="true"
                            :error="error.invoice_term"
                            :data-unq="`prospectCustomer-select-voucherType`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24" v-if="form.exchange_invoice === 1">
                        <v-text-field
                            data-unq="prospectCustomer-input-emailFinanceInfo"
                            name="finance_email"
                            v-model="form.finance_email"
                            required
                            outlined
                            dense
                            :error-messages="error.finance_email"
                            maxlength="100"
                            :rules="form.finance_email? email_rules : []"
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
            <div v-if="form.business_type_id === 1">
                <div v-if="flagging.shipping_info === true" class="-mt24">
                    <v-checkbox
                        data-unq="prospectCustomer-input-billAddressCheckBox"
                        label="Same as Company and Shipping Address"
                        v-model="flagging.billing_address.check_box"
                    ></v-checkbox>
                </div>
                <div v-else>
                    <div class="fs16 -mb10">Billing Address Same As</div>
                    <v-radio-group v-model="flagging.billing_address.radio_group" row>
                        <v-radio label="Company Address" value="1"></v-radio>
                        <v-radio label="Shipping Address" value="2"></v-radio>
                    </v-radio-group>
                </div>
            </div>
            <div v-else class="-mt24">
                <v-checkbox
                    data-unq="prospectCustomer-input-billAddressCheckBox"
                    label="Same as Business/Shipping Address"
                    v-model="flagging.billing_address.check_box"
                ></v-checkbox>
            </div>
            <div class="mt24">
                <v-row>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressAddressName"
                            name="bill_to_address_address_name"
                            v-model="form.bill_to_address.address_name"
                            required
                            outlined
                            dense
                            :error-messages="error.address_name"
                            maxlength="30"
                        >
                            <template v-slot:label>Address Name<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'bill_to_address', 'region', 'province')"
                            name="bill_to_address_region"
                            :dense="true"
                            label="Region"
                            :error="error.region"
                            :data-unq="`prospectCustomer-select-billAddressRegion`"
                            :adm_division="form.bill_to_address.region"
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
                                        data-unq="prospectCustomer-input-billAddressAddress_1"
                                        name="address_1"
                                        v-model="form.bill_to_address.address_1"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_1"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Address Detail<span class="text-red">*</span></template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-billAddressAddress2"
                                        name="address_1"
                                        v-model="form.bill_to_address.address_2"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_2"
                                        :counter="60"
                                        maxlength="60"
                                    >
                                        <template v-slot:label>Continue Address Detail</template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" class="-mt24 -mb24">
                                    <v-text-field
                                        data-unq="prospectCustomer-input-billAddressAddress3"
                                        name="address_1"
                                        v-model="form.bill_to_address.address_3"
                                        required
                                        outlined
                                        dense
                                        :error-messages="error.address_3"
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
                            @selected="admDivisionSelected($event, 'bill_to_address', 'province', 'city')"
                            name="bill_to_address_province"
                            :dense="true"
                            label="Province"
                            :error="error.province"
                            :data-unq="`prospectCustomer-select-billAddressProvince`"
                            :region="form.bill_to_address.region"
                            :disabled="disabled.bill_to_address.province"
                            :adm_division="form.bill_to_address.province"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'bill_to_address', 'city', 'district')"
                            name="bill_to_address_city"
                            :dense="true"
                            label="City"
                            :error="error.city"
                            :data-unq="`prospectCustomer-select-billAddressCity`"
                            :region="form.bill_to_address.region"
                            :province="form.bill_to_address.province"
                            :disabled="disabled.bill_to_address.city"
                            :adm_division="form.bill_to_address.city"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'bill_to_address', 'district', 'sub_district')"
                            name="bill_to_address_district"
                            :dense="true"
                            label="District"
                            :error="error.district"
                            :data-unq="`prospectCustomer-select-billAddressDistrict`"
                            :region="form.bill_to_address.region"
                            :province="form.bill_to_address.province"
                            :city="form.bill_to_address.city"
                            :disabled="disabled.bill_to_address.district"
                            :adm_division="form.bill_to_address.district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectAdmDivision
                            @selected="admDivisionSelected($event, 'bill_to_address', 'sub_district', 'postal_code')"
                            name="bill_to_address_district"
                            :dense="true"
                            label="Subdistrict"
                            :error="error.sub_district"
                            :data-unq="`prospectCustomer-select-billAddressSubdistrict`"
                            :region="form.bill_to_address.region"
                            :province="form.bill_to_address.province"
                            :city="form.bill_to_address.city"
                            :district="form.bill_to_address.district"
                            :disabled="disabled.bill_to_address.sub_district"
                            :adm_division="form.bill_to_address.sub_district"
                        ></SelectAdmDivision>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressPostalCode"
                            name="bill_to_address_postal_code"
                            v-model="form.bill_to_address.postal_code"
                            required
                            outlined
                            dense
                            :error-messages="error.postal_code"
                            maxlength="10"
                            :disabled="true"
                        >
                            <template v-slot:label>Postal Code<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressLatitude"
                            name="bill_to_address_latitude"
                            v-model="form.bill_to_address.latitude"
                            required
                            outlined
                            dense
                            :error-messages="error.latitude"
                            maxlength="17"
                        >
                            <template v-slot:label>Latitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-billAddressLongitude"
                            name="bill_to_address_longitude"
                            v-model="form.bill_to_address.longitude"
                            required
                            outlined
                            dense
                            :error-messages="error.longitude"
                            maxlength="16"
                        >
                            <template v-slot:label>Longitude<span class="text-red">*</span></template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" md="12" class="-mt24">
                        <v-textarea
                            name="bill_to_address_address_note"
                            v-model="form.bill_to_address.note"
                            :counter="1000"
                            maxlength="1000"
                            outlined
                            dense
                            rows="5"
                            :data-unq="`prospectCustomer-input-billAddressAddressNote`"
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
        <ConfirmationDialogNew :data-unq="`prospectCustomer-input-confirmDialog`" :sendData="send_data.confirm_data"/>
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
                        check_box: false,
                        radio_group: 0,
                    }
                }
            }
        },
        computed: {
            ...mapState({
                form: state => state.prospectCustomer.create_prospect_customer.form,
                disabled: state => state.prospectCustomer.create_prospect_customer.disabled,
                error: state => state.prospectCustomer.create_prospect_customer.error,
                send_data: state => state.prospectCustomer.create_prospect_customer,
            }),
        },
        mounted () {
            this.fetchProspectCustomerCreate()
            this.$root.$on("event_multipleImage", function (url) {
                let arr = []
                this.$store.commit('setOutletImage', [])
                if (url) {
                    url.forEach(e => {
                        arr.push(e.image_url)
                    });
                    this.$store.commit('setOutletImage', arr)
                }
            });
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomerCreate","fetchCustomerDetail"
            ]),
            upgrade() {
                this.send_data.confirm_data = {
                    model: true,
                    title: "Create Prospective Customer",
                    text: "Are you sure want to upgrade this Customer?",
                    urlApi: '/crm/v1/prospective-customer/upgrade',
                    nextPage: '/customer-relation/prospective-customer',
                    post: true,
                    data: this.form
                }
            },
            draft() {
                this.send_data.confirm_data = {
                    model: true,
                    title: "Create Prospective Customer",
                    text: "Are you sure want to save as draft this Prospective Customer?",
                    urlApi: '/crm/v1/prospective-customer',
                    nextPage: '/customer-relation/prospective-customer',
                    post: true,
                    data: this.form
                }
            },
            exchangeInvoice(){
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, exchange_invoice: this.form.exchange_invoice})
                if(this.form.exchange_invoice === 0){
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, 
                        exchange_invoice_time: '',
                        invoice_term: 0,
                        finance_email: '',
                    })
                }
            },
            customerTypeSelected(d) {// For Selected Customer Type
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_type_id: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_type_id: d.id})
                    this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, archetype: false})
                }else{
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, archetype_id: null})
                    this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, archetype: true})
                }
            },
            setIdComponentSelected(d, comp){// For Selected then set Id
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d.id})
                    if (comp === 'customer_id') {
                        this.fetchCustomerDetail(d.id)
                    }
                }
            },
            setValueComponentSelected(d, comp) {// For Selected then set Value
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d.value})
                }
            },
            onSelectFile(d, comp){
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: ''})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [comp]: d})
                }
            },
            admDivisionSelected(d, section, current, next) {// For selected related adm division
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section], [current]: '' }})
                if (d) {
                    if(current !== 'sub_district'){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section], [current]: d.description }})
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, [section]: { ...this.disabled[section], [next]: false }})
                    }else{
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section], [current]: d.description, [next]: d.postal_code }})
                    }
                }else{
                    if(current === 'region'){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section],
                            province: '',
                            city: '',
                            district: '',
                            sub_district: '',
                            postal_code: '',
                        }})
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, [section]: { ...this.disabled[section], 
                            province: true,
                            city: true,
                            district: true,
                            sub_district: true,
                        }})
                    }
                    else if(current === 'province'){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section],
                            city: '',
                            district: '',
                            sub_district: '',
                            postal_code: '',
                        }})
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, [section]: { ...this.disabled[section], 
                            city: true,
                            district: true,
                            sub_district: true,
                        }})
                    }
                    else if(current === 'city'){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section],
                            district: '',
                            sub_district: '',
                            postal_code: '',
                        }})
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, [section]: { ...this.disabled[section], 
                            district: true,
                            sub_district: true,
                        }})
                    }
                    else if(current === 'district'){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section],
                            sub_district: '',
                            postal_code: '',
                        }})
                        this.$store.commit('setDisabledProspectCustomerCreate', { ...this.disabled, [section]: { ...this.disabled[section], 
                            sub_district: true,
                        }})
                    }
                    else if(current === 'sub_district'){
                        this.$store.commit('setFormProspectCustomerCreate', { ...this.form, [section]: { ...this.form[section], [next]: '' }})
                    }
                }
            },
        },
    }
</script>
