<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row>
                <v-col cols="12" md="4" class="h70">
                    <v-tooltip top>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                name="search"
                                v-model="search"
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
                <v-col cols="12" md="3">
                    <v-select
                        v-model="statuses"
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
                        :label="'Type'"
                        :norequired="true"
                        :dense="true"
                        data-unq="proscus-filter-businesstype"
                        @selected="typeSelected"
                    ></SelectBusinessType>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectArea
                        :aux_data="2"
                        :dense="true"
                        data-unq="proscus-filter-area"
                        @selected="areaSelected"
                    ></SelectArea>
                </v-col>
                <v-col cols="12" md="3">
                    <v-autocomplete
                        v-model="selectRequest"
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
                <v-col cols="12" md="3">
                    <SelectSalesPerson
                        :norequired="true"
                        :clear="clearSalesperson"
                        :disabled="disableSalesperson"
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
                <v-col cols="12" md="3" class="d-flex justify-end h70">
                    <!-- <v-tooltip left v-privilege="'pro_cst_exp'">
                        <template v-slot:activator="{ on: tooltip }">
                            <v-icon
                                v-on="{ ...tooltip }"
                                dark
                                color="gray"
                                class="-mt7 mr-1"
                            >mdi-information-outline</v-icon>
                        </template>
                        <span><strong>Export Button</strong><br>You have to choose filter area before export the data</span>
                    </v-tooltip>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold white--text"
                        @click="exportData()"
                        :disabled="disableButton"
                        v-privilege="'pro_cst_exp'"
                    >Export</v-btn> -->
                </v-col>
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
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.phone_1 }}</td>
                        <td>{{ props.item.archetype.description }}</td>
                        <td>{{ props.item.business_type.description }}</td>
                        <td>{{ props.item.region.description }}</td>
                        <td>
                            <!-- {{ props.item.sub_district.district.city.province.name }} - {{
                            props.item.sub_district.district.city.name }}<br>
                            <span class="second-color">
                                {{ props.item.sub_district.district.name }} - {{ props.item.sub_district.name }}
                            </span> -->
                            {{ props.item.sub_district.description }}
                        </td>
                        <td>
                            <div v-if="props.item.customer_upgrade == 1">
                                Yes
                            </div>
                            <div v-else>
                                No
                            </div>
                        </td>
                        <td>
                            <div v-if="props.item.salesperson">
                                Salesperson<br>
                                <span class="second-color">
                                {{ props.item.salesperson.firstname }}
                                {{ props.item.salesperson.namemiddle }}
                                {{ props.item.salesperson.lastname }}
                                </span>
                            </div>
                            <div v-else>
                                Customer
                            </div>
                        </td>
                        <td>
                            <v-chip
                                class="ma-2"
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
                                        <v-btn icon v-on="{ ...menu }">
                                            <v-icon dark>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                </template>
                                <v-list class="bg-white">
                                    <!-- <v-list-item v-privilege="'pro_cst_rdl'" :to="'/customer/prospect-customer/'+props.item.id ">
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
                                    </div> -->
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
        <!-- <v-dialog
            v-model="register"
            persistent
            max-width="402px"
        >
            <v-card class="OpenSans">
                <v-card-title>
                    <span class="text-title-modal">Register Prospective Customer</span>
                </v-card-title>
                <v-card-text>
                    <div class="flex-align-center">
                        <v-img
                            width="235"
                            src="/img/register-customer.png"
                        />
                    </div>
                    <SelectArchetype
                        name="archetype_name"
                        @selected="archetypeRegister"
                        :aux_data="2"
                        :dense="true"
                        class="pt-6"
                    ></SelectArchetype>
                </v-card-text>
                <v-card-actions class="d-flex justify-end pb-4">
                    <v-btn
                        depressed
                        outlined
                        color="#EBEBEB"
                        class="main-btn"
                        @click="register = false"
                    ><span class="text-black80">Cancel</span></v-btn>
                    <v-btn
                        @click="nextMethod()"
                        class="main-btn white--text"
                        depressed
                        color="#50ABA3"
                        :disabled="this.archetype ? false : true"
                    >Next</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <v-dialog
            v-model="declineDialog"
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
                        :clear="clearDeclineType"
                        :error="error.decline_type"
                        :dense="true"
                        data-unq="proscus-select-declinetype"
                        class="mt-6"
                    />
                    <v-textarea
                        name="note"
                        v-model="decline_note"
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
                        @click="declineDialog = false,clearDeclineType = true"
                    ><span class="text-black80">Cancel</span></v-btn>
                    <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold px-7"
                        @click="decline(decline_id)"
                        elevation="0"
                        data-unq="proscus-button-save"
                    ><span class="text-white">Save</span></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <LoadingBar :value="overlay"/>
    </v-container>
</template>
<script>
    import axios from "axios";
    import { mapState, mapActions } from "vuex";
    import Vue from 'vue'
    export default {
        name: "ProspectCustomer",
        data() {
            return {
                id: '',
                showFilter : false,
                search: '',
                openDialog: false,
                overlay: false,
                type: null,
                archetype: '',
                next: '',
                customerID: '',
                register: false,
                statuses: 6,
                selectRequest: '',
                clearSalesperson: true,
                disableSalesperson: true,
                declineDialog: false,
                decline_id: "",
                decline_type: 0,
                decline_note: "",
                clearDeclineType:false,
                error: {},
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
            }),
            //For disable export button if required filter is empty
            // disableButton() {
            //     if (this.SelectArea) {
            //         return false
            //     } else {
            //         return true
            //     }
            // },
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomer"
            ]),
            // For Export Data with Filter Selected
            // exportData() {
            //     this.overlay = true
            //     let statuses
            //     if (this.statuses === 999) {
            //         statuses = ''
            //     } else {
            //         statuses = this.statuses
            //     }
            //     let areaID = ''
            //     if (this.SelectArea) {
            //         areaID = this.SelectArea
            //     }
            //     let archetypeID = ''
            //     if (this.SelectArchetype) {
            //         archetypeID = this.SelectArchetype
            //     }
            //     let salespersonID = ''
            //     if (this.salesperson) {
            //         salespersonID = this.salesperson
            //     }
            //     this.$http.get("/report/cms/prospective-customer?export=1", {
            //         params: {
            //             area: areaID,
            //             status: statuses,
            //             archetype: archetypeID,
            //             salesperson: salespersonID,
            //         }
            //     }).then(response => {
            //         this.overlay = false
            //         window.location.href = response.data.file
            //     }).catch(e => {
            //         this.overlay = false
            //         Vue.$toast.open({
            //             position: 'top-right',
            //             message: 'Something Wrong',
            //             type: 'error',
            //         });
            //     });
            // },
            //Select Archetype for Register Customer
            archetypeRegister(d) {
                this.archetype = '';
                this.next = '';
                if (d) {
                    this.archetype = d
                    if (d.customer_group == 1) {
                        this.next = 'outlet'
                    } else if (d.customer_group == 2) {
                        this.next = 'agent'
                    }
                }
            },
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
                this.$store.commit('setSelectBusinessTypeProspectCustomer', '')
                if (d) {
                    this.$store.commit('setSelectBusinessTypeProspectCustomer', d.id)
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
                this.decline_id = ""
                this.decline_type = 0
                this.decline_note = ""
                this.clearDeclineType = false
                this.decline_id = recordID
                this.declineDialog = true
            },
            decline(id) {
                let API_URL = process.env.VUE_APP_API_URL_BASE;
                axios.put(API_URL+"/bridge/v1/prospective_customer/decline/"+id,{
                    decline_type: this.decline_type,
                    decline_note: this.decline_note,
                },
                {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("bearer")}`
                    }
                }
                ).then(response => {
                    this.declineDialog = false
                    Vue.$toast.open({
                        position: 'top-right',
                        message: 'Data has been declined successfully',
                        type: 'success',
                    });
                    this.clearDeclineType = true
                    this.fetchProspectCustomer()
                }).catch(e => {
                    this.error = e.errors
                })
            },
            //For get selected decline type
            selectedDeclineType(d) {
                this.decline_type = 0
                if (d) {
                    this.decline_type = d.value_int
                }
            },
            //For Show Register Popup Dialog
            // regis(val) {
            //     this.customerID = val
            //     this.register = true
            // },
            //Next step if want to register
            // nextMethod() {
            //     let data = {
            //         customer: this.customerID,
            //         archetype: this.archetype
            //     }
            //     this.$store.commit('setProspectCustomer', data);
            //     if (this.next == 'agent') {
            //         this.$router.push('/customer/agent/create')
            //     } else if (this.next == 'outlet') {
            //         this.$router.push('/customer/branch/create')
            //     }
            // },
            //For upgrade existing customer
            // upgrade(val) {
            //     let data = {
            //         customer: val,
            //         archetype: ""
            //     }
            //     this.$store.commit('setProspectCustomer', data);
            //     this.$router.push('/customer/branch/create')
            // }
        },
        watch: {
            'search': {
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
            'statuses': {
                handler: function (val) {
                    this.$store.commit('setStatusProspectCustomer', val)
                    let that = this;
                    that.fetchProspectCustomer()
                },
                deep: true
            },
            'selectRequest': {
                handler: function (val) {
                    this.$store.commit('setSelectRequestProspectCustomer', val)
                    if(val == 'salesperson'){
                        this.clearSalesperson = false
                        this.disableSalesperson = false
                    }else{
                        this.clearSalesperson = true
                        this.disableSalesperson = true
                    }
                    this.fetchProspectCustomer()
                },
                deep: true
            }
        },
    }
</script>
