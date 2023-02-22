<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                name="search"
                                v-model="filter.search"
                                prepend-inner-icon="search"
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                outlined
                                data-unq="search-filter"
                                dense
                                filled
                                v-privilege="'filter_rdl'"
                            ></v-text-field>
                        </template>
                        <span>Search by name, phone number</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row>
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="prospect_customer.showFilter = !prospect_customer.showFilter"
                        v-if="prospect_customer.showFilter"
                        data-unq="switch-filter-hide"
                        class="no-caps fs12"
                    >
                        Hide
                        <v-icon right>
                            mdi-chevron-up
                        </v-icon>
                    </v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="prospect_customer.showFilter = !prospect_customer.showFilter"
                        v-else
                        data-unq="switch-filter-show"
                        class="no-caps fs12"
                    >
                        Show
                        <v-icon right>
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="prospect_customer.showFilter">
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.statuses"
                        :items="regStatus"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        data-unq="proscus-filter-status"
                        dense
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                     <SelectArchetype
                        :aux_data="2"
                        :norequired="true"
                        :dense="true"
                        data-unq="proscus-filter-archetype"
                        @selected="archetypeSelected"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectBusinessType
                        :aux_data="2"
                        :label="'Customer Type'"
                        :norequired="true"
                        :dense="true"
                        data-unq="proscus-filter-customerType"
                        @selected="typeSelected"
                    ></SelectBusinessType>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        :aux_data="2"
                        :dense="true"
                        :label="'Region'"
                        data-unq="proscus-filter-area"
                        @selected="areaSelected"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <v-autocomplete
                        v-model="filter.request_by"
                        :items="requestBy"
                        item-text="text"
                        item-value="value"
                        label="Requested By"
                        dense
                        data-unq="proscus-filter-requestby"
                        outlined
                        clearable
                    ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <SelectSalesPerson
                        :norequired="true"
                        :clear="prospect_customer.clearSalesperson"
                        :disabled="prospect_customer.disableSalesperson"
                        :dense="true"
                        data-unq="proscus-filter-salesperson"
                        @selected="salespersonSelected"
                    ></SelectSalesPerson>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col cols="12" md="9" class="h1"/>
                <v-col cols="12" md="3" class="d-flex justify-end h70"></v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="table.fields"
                :items="items"
                :loading="isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`proscus-value-name-${props.item.id}`">{{ props.item.name }}</td>
                        <td :data-unq="`proscus-value-phonenumber-${props.item.id}`">{{ props.item.phone_1 }}</td>
                        <td :data-unq="`proscus-value-archetype-${props.item.id}`">{{ props.item.archetype.description }}</td>
                        <td :data-unq="`proscus-value-customer_type-${props.item.id}`">{{ props.item.customer_type.description }}</td>
                        <td :data-unq="`proscus-value-region-${props.item.id}`">{{ props.item.region.description }}</td>
                        <td :data-unq="`proscus-value-sub_district-${props.item.id}`">
                            {{ props.item.sub_district.district.city.province ?  props.item.sub_district.district.city.province.description : '-'}} - 
                            {{ props.item.sub_district.district.city.description }}<br>
                            <span class="second-color">
                                {{ props.item.sub_district.district.description }} -
                                {{ props.item.sub_district.description }}
                            </span>
                        </td>
                        <td :data-unq="`proscus-value-customer_upgrade-${props.item.id}`">
                            <div v-if="props.item.customer_upgrade == 1">
                                Yes
                            </div>
                            <div v-else>
                                No
                            </div>
                        </td>
                        <td :data-unq="`proscus-value-salesperson-${props.item.id}`">
                            <div v-if="props.item.salesperson">
                                Salesperson<br>
                                <span class="second-color">
                                {{ props.item.salesperson.name }}
                                </span>
                            </div>
                            <div v-else>
                                Customer
                            </div>
                        </td>
                        <td>
                            <v-chip
                                class="ma-2"
                                :data-unq="`proscus-button-status-${props.item.reg_status === 6 ? 'new' : props.item.reg_status === 11 ? 'registered' : 'decline'}-${props.item.id}`"
                                :color="statusMaster(props.item.reg_status === 6 ? 'new' : props.item.reg_status === 11 ? 'registered' : 'decline')"
                                :text-color="statusMasterText(props.item.reg_status === 6 ? 'new' : props.item.reg_status === 11 ? 'registered' : 'decline')"
                                small
                            >
                                {{props.item.reg_status === 6 ? 'New' : props.item.reg_status === 11 ? 'Registered' :
                                'Decline'}}
                            </v-chip>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template>
                                        <v-btn :data-unq="`proscus-button-actionButton-${props.item.id}`" icon v-on="{ ...menu }">
                                            <v-icon dark>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'pro_cst_rdl'" :to="'/customer-relation/prospective-customer/'+ props.item.id ">
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item v-privilege="'pro_cst_reg'" @click="regis(props.item.id)"
                                        v-if="props.item.reg_status == 1 && !(props.item.merchant)"
                                    >
                                        <v-list-item-title>Register</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item v-privilege="'pro_cst_upg'" @click="upgrade(props.item.id)"
                                        v-if="props.item.reg_status == 1 && props.item.merchant"
                                    >
                                        <v-list-item-title>Upgrade</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <div v-privilege="'pro_cst_dec'" v-if="props.item.reg_status == 1">
                                        <hr>
                                    </div>
                                    <v-list-item data-unq="proscus-button-decline" v-privilege="'pro_cst_dec'" v-if="props.item.reg_status == 6"
                                        @click="openDeclineDialog(props.item.id)"
                                    >
                                        <v-list-item-title>Decline</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <v-dialog
            v-model="prospect_customer.declineDialog"
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
                        :clear="prospect_customer.clearDeclineType"
                        :error="error.decline_type"
                        :dense="true"
                        data-unq="proscus-select-declinetype"
                        class="mt-6"
                    />
                    <v-textarea
                        name="note"
                        v-model="prospect_customer.decline_note"
                        :counter="250"
                        maxlength="250"
                        outlined
                        dense
                        :error-messages="error.decline_note"
                        required
                        data-unq="proscus-input-note"
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
                        data-unq="proscus-button-cancel"
                        @click="prospect_customer.declineDialog = false,prospect_customer.clearDeclineType = true"
                    ><span class="text-black80">Cancel</span></v-btn>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold px-7"
                        @click="decline(prospect_customer.decline_id)"
                        elevation="0"
                        data-unq="proscus-button-save"
                    ><span class="text-white">Save</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <LoadingBar :value="prospect_customer.overlay"/>
    </v-container>
</template>
<script>
    import Vue from 'vue'
    import http from "../../services/http";
    import { mapState, mapActions } from "vuex";
    export default {
        name: "ProspectCustomer",
        data() {
            return {
            }
        },
        mounted() {
            this.fetchProspectCustomer()
            let self = this
            this.$root.$on('event_success', function (res) {
                if (res) {
                    self.fetchProspectCustomer()
                }
            });
        },
        computed: {
            ...mapState({
                prospect_customer: state => state.prospectCustomer.prospect_customer,
                filter: state => state.prospectCustomer.prospect_customer.filter,
                table: state => state.prospectCustomer.prospect_customer.table,
                requestBy: state => state.prospectCustomer.prospect_customer.requestBy,
                regStatus: state => state.prospectCustomer.prospect_customer.regStatus,
                items: state => state.prospectCustomer.prospect_customer.items,
                isLoading: state => state.prospectCustomer.prospect_customer.isLoading,
                error: state => state.prospectCustomer.prospect_customer.error,
            }),
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomer"
            ]),
            //For Filter Archetype
            archetypeSelected(d) {
                this.$store.commit('setSelectArchetypeProspectCustomer', '')
                if (d) {
                    this.$store.commit('setSelectArchetypeProspectCustomer', d.id)
                }
                this.fetchProspectCustomer()
            },
            //For Filter Type
            typeSelected(d) {
                this.$store.commit('setSelectCustomerTypeProspectCustomer', '')
                if (d) {
                    this.$store.commit('setSelectCustomerTypeProspectCustomer', d.id)
                }
                this.fetchProspectCustomer()
            },
            //For Filter Area
            areaSelected(d) {
                this.$store.commit('setSelectAreaProspectCustomer', '')
                if (d) {
                    this.$store.commit('setSelectAreaProspectCustomer', d.id)
                }
                this.fetchProspectCustomer()
            },
            //For Filter Salesperson
            salespersonSelected(d) {
                this.$store.commit('setSelectSalesPersonProspectCustomer', '')
                if (d) {
                    this.$store.commit('setSelectSalesPersonProspectCustomer', d.id)
                }
                this.fetchProspectCustomer()
            },
            //For Decline Customer Registration
            openDeclineDialog(recordID){
                this.error.decline_type_id = ""
                this.prospect_customer.decline_type = 0
                this.prospect_customer.decline_note = ""
                this.prospect_customer.clearDeclineType = false
                this.prospect_customer.decline_id = recordID
                this.prospect_customer.declineDialog = true
            },
            decline(id) {
                http.put("/prospective_customer/decline/"+id,{
                    decline_type: this.prospect_customer.decline_type,
                    decline_note: this.prospect_customer.decline_note,
                }).then(response => {
                    Vue.$toast.open({
                        position: 'top-right',
                        message: 'Data has been declined successfully',
                        type: 'success',
                    });
                    this.prospect_customer.declineDialog = false
                    this.prospect_customer.clearDeclineType = true
                    this.fetchProspectCustomer()
                }).catch(e => {
                    this.error = e.errors
                })
            },
            //For get selected decline type
            selectedDeclineType(d) {
                this.prospect_customer.decline_type = 0
                if (d) {
                    this.prospect_customer.decline_type = d.value_int
                }
            },
        },
        watch: {
            'filter.search': {
                handler: function (val) {
                    let that = this
                    this.$store.commit('setSearchProspectCustomer', val)
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function () {
                        that.fetchProspectCustomer()
                    }, 1000);
                },
                deep: true
            },
            'filter.statuses': {
                handler: function (val) {
                    this.$store.commit('setStatusProspectCustomer', val)
                    let that = this;
                    that.fetchProspectCustomer()
                },
                deep: true
            },
            'filter.request_by': {
                handler: function (val) {
                    this.$store.commit('setSelectRequestProspectCustomer', val)
                    if(val == 'salesperson'){
                        console.log(val,'salesperson')
                        this.prospect_customer.clearSalesperson = false
                        this.prospect_customer.disableSalesperson = false
                    }else{
                        this.prospect_customer.clearSalesperson = true
                        this.prospect_customer.disableSalesperson = true
                    }
                    this.fetchProspectCustomer()
                },
                deep: true
            }
        },
    }
</script>
