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
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
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
                        @click="showFilter = !showFilter"
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
            <v-row v-if="showFilter">
                <v-col cols="12" md="3" class="-mb24">
                    <v-select
                        v-model="filter.status"
                        :items="status_options"
                        item-text="text"
                        item-value="value"
                        label="Status"
                        data-unq="proscus-filter-status"
                        dense
                        outlined
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                     <SelectArchetype
                        :aux_data="2"
                        :norequired="true"
                        :dense="true"
                        data-unq="proscus-filter-archetype"
                        @selected="archetypeSelected"
                    ></SelectArchetype>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectBusinessType
                        :data_unq="`proscus-filter-customerType`"
                        :aux_data="2"
                        :label="'Customer Type'"
                        :norequired="true"
                        :dense="true"
                        @selected="typeSelected"
                    ></SelectBusinessType>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectArea
                        :aux_data="2"
                        :dense="true"
                        :label="'Region'"
                        data-unq="proscus-filter-area"
                        @selected="areaSelected"
                        :norequired="true"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <v-autocomplete
                        v-model="filter.request_by"
                        :items="requestby_options"
                        item-text="text"
                        item-value="value"
                        label="Requested By"
                        dense
                        data-unq="proscus-filter-requestBy"
                        outlined
                        clearable
                    ></v-autocomplete>
                </v-col>
                <v-col cols="12" md="3" class="-mb24">
                    <SelectSalesPerson
                        :norequired="true"
                        :clear="prospect_customer.clear_salesperson"
                        :disabled="prospect_customer.disable_salesperson"
                        :dense="true"
                        data-unq="proscus-filter-salesperson"
                        @selected="salespersonSelected"
                    ></SelectSalesPerson>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                <v-col class="flex-align-end">
                    <router-link :to="{ name: 'ProspectCustomerCreate' }" class="routerLink">
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="no-caps bold white--text"
                            data-unq="prospectCustomer-button-create"
                        >
                            <span class="text-white bold">
                                Create Prospect Customer
                            </span>
                        </v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="table_header"
                :items="prospect_customer.items"
                :loading="prospect_customer.isLoading"
                :items-per-page="pagination.rows_per_page"
                :server-items-length="pagination.total_items"
                @update:items-per-page="getItemPerPage"
                @update:page="getPagination"
                :footer-props="footerProps"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`proscus-value-name-${props.index}`">{{ props.item.brand_name }}</td>
                        <td :data-unq="`proscus-value-phonenumber-${props.index}`">{{ props.item.pic_order_contact }}</td>
                        <td :data-unq="`proscus-value-archetype-${props.index}`">{{ props.item.archetype.description }}</td>
                        <td :data-unq="`proscus-value-customer_type-${props.index}`">{{ props.item.customer_type.description }}</td>
                        <td :data-unq="`proscus-value-region-${props.index}`">{{ props.item.company_address_region }}</td>
                        <td :data-unq="`proscus-value-sub_district-${props.index}`">
                            {{ props.item.company_address_province }} - 
                            {{ props.item.company_address_city }} <br>
                            <span class="second-color">
                                {{ props.item.company_address_district }} -
                                {{ props.item.company_address_sub_district }}
                            </span>
                        </td>
                        <td :data-unq="`proscus-value-customer_upgrade-${props.index}`">
                            <div v-if="props.item.customer">
                                Yes
                            </div>
                            <div v-else>
                                No
                            </div>
                        </td>
                        <td :data-unq="`proscus-value-salesperson-${props.index}`">
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
                                :data-unq="`proscus-button-status-${props.item.reg_status_convert.toLowerCase()}-${props.index}`"
                                :color="statusMaster(props.item.reg_status_convert.toLowerCase())"
                                :text-color="statusMasterText(props.item.reg_status_convert.toLowerCase())"
                                small
                            >
                                {{ props.item.reg_status_convert }}
                            </v-chip>
                        </td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ on: menu }">
                                    <template>
                                        <v-btn 
                                            :data-unq="`proscus-button-actionButton-${props.index}`" 
                                            icon v-on="{ ...menu }"
                                        >
                                            <v-icon dark>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item 
                                        v-privilege="'pro_cst_rdl'" 
                                        :to="'/customer-relation/prospective-customer/detail/'+ props.item.id "
                                        :data-unq="`proscus-button-detail-${props.index}`" 
                                    >
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item 
                                        v-privilege="'pro_cst_reg'" 
                                        @click="regis(props.item.id)"
                                        v-if="props.item.reg_status == 1 && !(props.item.merchant)"
                                        :data-unq="`proscus-button-register-${props.index}`" 
                                    >
                                        <v-list-item-title>Register</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item 
                                        v-privilege="'pro_cst_upg'" 
                                        @click="upgrade(props.item.id)"
                                        v-if="props.item.reg_status == 1 && props.item.merchant"
                                        :data-unq="`proscus-button-upgrade-${props.index}`" 
                                    >
                                        <v-list-item-title>Upgrade</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <div v-privilege="'pro_cst_dec'" v-if="props.item.reg_status == 1">
                                        <hr>
                                    </div>
                                    <v-list-item                                         
                                        :data-unq="`proscus-button-decline-${props.index}`"  
                                        v-privilege="'pro_cst_dec'" 
                                        v-if="props.item.reg_status == 6"
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
            v-model="decline.show_modal"
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
                        @selected="declineTypeSelected"
                        :clear="decline.clear_type"
                        :error="error.decline_type"
                        :dense="true"
                        data-unq="proscus-select-declinetype"
                        class="mt-6"
                    />
                    <v-textarea
                        name="note"
                        v-model="decline.note"
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
                        @click="decline.show_modal = false,decline.clear_type = true"
                    ><span class="text-black80">Cancel</span></v-btn>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold px-7"
                        @click="declineProspectCustomer({id: decline.id})"
                        elevation="0"
                        data-unq="proscus-button-save"
                    ><span class="text-white">Save</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    export default {
        name: "ProspectCustomer",
        data() {
            return {
                showFilter : false,
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
                table_header: state => state.prospectCustomer.prospect_customer.table_header,
                requestby_options: state => state.prospectCustomer.prospect_customer.requestby_options,
                status_options: state => state.prospectCustomer.prospect_customer.status_options,
                error: state => state.prospectCustomer.prospect_customer.error,
                decline: state => state.prospectCustomer.prospect_customer.decline,
                pagination: state => state.pagination.pagination,
            }),
            //For footer table
            footerProps() {
                return {
                    'items-per-page-options':[10,15,20,25],
                    'page-text': `${(this.pagination.page-1)*this.pagination.rows_per_page+1}
                                    - ${Math.min(this.pagination.page*this.pagination.rows_per_page,this.pagination.total_items)} 
                                    of ${this.pagination.total_items}`,
                };
            },
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomer",
                "declineProspectCustomer",
            ]),
            ...mapMutations([
                "setFilterProspectCustomer",
                "sethandlerSelectSalesPerson"
            ]),
            //For Filter Archetype
            archetypeSelected(d) {
                this.$store.commit('setFilterProspectCustomer', {...this.filter, archetype: ''})
                if (d) {
                    this.$store.commit('setFilterProspectCustomer', {...this.filter, archetype: d.id})
                }
                this.getPagination(1)
                this.fetchProspectCustomer()
            },
            //For Filter Type
            typeSelected(d) {
                this.$store.commit('setFilterProspectCustomer', {...this.filter, customer_type: ''})
                if (d) {
                    this.$store.commit('setFilterProspectCustomer', {...this.filter, customer_type: d.id})
                }
                this.getPagination(1)
                this.fetchProspectCustomer()
            },
            //For Filter Area
            areaSelected(d) {
                this.$store.commit('setFilterProspectCustomer', {...this.filter, area: ''})
                if (d) {
                    this.$store.commit('setFilterProspectCustomer', {...this.filter, area: d.id})
                }
                this.getPagination(1)
                this.fetchProspectCustomer()
            },
            //For Filter Salesperson
            salespersonSelected(d) {
                this.$store.commit('setFilterProspectCustomer', {...this.filter, sales_person: ''})
                if (d) {
                    this.$store.commit('setFilterProspectCustomer', {...this.filter, sales_person: d.id})
                }
                this.getPagination(1)
                this.fetchProspectCustomer()
            },
            //For get selected decline type
            declineTypeSelected(d) {
                this.$store.commit('setSelectDeclineTypeProspectCustomer', 0)
                if (d) {
                    this.$store.commit('setSelectDeclineTypeProspectCustomer', d.value_int)
                }
            },
            //For Decline Customer Registration
            openDeclineDialog(recordID){
                this.$store.commit('setOpenDeclineDialogProspectCustomer', recordID)
            },
            // Count all data for paggination
            getItemPerPage(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    rows_per_page: val,
                })
                this.fetchProspectCustomer()
            },
            // For paggination
            getPagination(val) {
                this.$store.commit('setPagination', {
                    ...this.pagination,
                    page: val,
                })
                this.fetchProspectCustomer()
            },
        },
        watch: {
            'filter.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function () {
                        that.fetchProspectCustomer()
                    }, 1000);
                },
                deep: true
            },
            'filter.status': {
                handler: function (val) {
                    let that = this;
                    that.fetchProspectCustomer()
                },
                deep: true
            },
            'filter.request_by': {
                handler: function (val) {
                    if(val == 'salesperson'){
                        this.$store.commit("sethandlerSelectSalesPerson", false)
                    }else{                        
                        this.$store.commit("sethandlerSelectSalesPerson", true)
                    }
                    this.fetchProspectCustomer()
                },
                deep: true
            }
        },
    }
</script>
