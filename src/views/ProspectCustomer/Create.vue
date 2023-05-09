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
                            @selected="customerSelected"
                            :norequired="true"
                            name="customer"
                            :dense="true"
                            :error="error.customer_id"
                            :data-unq="`prospectCustomer-select-customer`"
                        ></SelectCustomer>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <v-text-field
                            data-unq="prospectCustomer-input-companyName"
                            name="company_name"
                            v-model="form.company_name"
                            required
                            outlined
                            dense
                            :error-messages="error.company_name"
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
                            @selected="businessTypeSelected"
                            name="business_type"
                            label="Business Type"
                            table="customer"
                            attribute="business_type"
                            :dense="true"
                            :error="error.business_type_value"
                            :data-unq="`prospectCustomer-select-voucherType`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectArchetype
                            @selected="archetypeSelected"
                            name="archetype"
                            :disabled="disabled_archetype"
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
                            @selected="customerClassSelected"
                            name="customer_class"
                            :dense="true"
                            :error="error.customer_class_id"
                            :data-unq="`prospectCustomer-select-customerClass`"
                            label="Class ID"
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
                            @selected="timeConsentSelected"
                            name="time_consent"
                            label="Best Time To Call"
                            table="prospect_customer"
                            attribute="time_consent"
                            :dense="true"
                            :error="error.time_consent_value"
                            :data-unq="`prospectCustomer-select-timeConsent`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="referenceInfoSelected"
                            name="reference_info"
                            label="Reference Info"
                            table="all"
                            attribute="reference_info"
                            :dense="true"
                            :error="error.reference_info_value"
                            :data-unq="`prospectCustomer-select-referenceInfo`"
                        ></SelectGlossary>
                    </v-col>
                    <v-col cols="12" md="6" class="-mt24">
                        <SelectGlossary
                            @selected="regChannelSelected"
                            name="reg_channel"
                            label="Registration Channel"
                            table="prospect_customer"
                            attribute="reg_channel"
                            :dense="true"
                            :glossary="selected_channel"
                            :error="error.reg_channel_value"
                            :data-unq="`prospectCustomer-select-registrationChannel`"
                        ></SelectGlossary>
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
                            <span class="text-black80">Cancel</span>
                        </v-btn>
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="main-btn white--text"
                            @click="confirmButton()"
                            data-unq="prospectCustomer-button-create"
                        >
                            Create
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </div>
        <!-- <ConfirmationDialogNew :data-unq="`itemCategory-input-confirmDialog`"/> -->
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ProspectCustomerCreate",
        data() {
            return {
                disabled_archetype: true,
                selected_channel: {
                    id: 249,
                    table: 'prospect_customer',
                    attribute: 'reg_channel',
                    value_int: 2,
                }
            }
        },
        computed: {
            ...mapState({
                form: state => state.prospectCustomer.create_prospect_customer.form,
                error: state => state.prospectCustomer.create_prospect_customer.error,
            }),
        },
        mounted () {
            this.fetchProspectCustomerCreate()
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomerCreate"
            ]),
            confirmButton() {
                console.log(this.form)
            },
            customerSelected(d) { // For Selected Customer
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_id: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_id: d.id})
                }
            },
            customerTypeSelected(d) {// For Selected Customer Type
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_type_id: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_type_id: d.id})
                    this.disabled_archetype = false
                }else{
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, archetype_id: null})
                    this.disabled_archetype = true
                }
            },
            businessTypeSelected(d) {// For Selected Business Type
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, business_type_value: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, business_type_value: d.value})
                }
            },
            archetypeSelected(d) {// For Selected Archetype
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, archetype_id: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, archetype_id: d.id})
                }
            },
            customerClassSelected(d) {// For Selected Class ID
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_class_id: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, customer_class_id: d.id})
                }
            },
            timeConsentSelected(d) {// For Selected Time Consent
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, time_consent: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, time_consent: d.value})
                }
            },
            referenceInfoSelected(d) {// For Selected Reference Info
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, reference_info: null})
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, reference_info: d.value})
                }
            },
            regChannelSelected(d) {// For Selected Registration Channel
                this.$store.commit('setFormProspectCustomerCreate', { ...this.form, reg_channel: null})
                console.log(d)
                if (d) {
                    this.$store.commit('setFormProspectCustomerCreate', { ...this.form, reg_channel: d.value})
                }
            },
        },
    }
</script>
