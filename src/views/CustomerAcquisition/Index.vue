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
                                dense
                                filled
                                v-privilege="'filter_rdl'"
                            >
                            </v-text-field>
                        </template>
                        <span>Search by customer name</span>
                    </v-tooltip>
                </v-col>
            </v-row>
            <v-row class="hr-title"/>
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        class="no-caps fs12"
                    >
                        Hide
                        <v-icon
                            right
                        >
                            mdi-chevron-up
                        </v-icon>
                    </v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                    >
                        Show
                        <v-icon
                            right
                        >
                            mdi-chevron-down
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if="showFilter">
                <!-- <v-col cols="12" md="3">
                    <SelectSalesPerson
                        v-model="salesperson"
                        :norequired="true"
                        :dense="true"
                        @selected="salespersonSelected"
                        v-privilege="'filter_rdl'"
                    ></SelectSalesPerson>
                </v-col> -->
                <!-- <v-col cols="12" md="3">
                    <SelectSalesGroup
                        v-model="sales_group_id"
                        @selected="salesGroupSelected"
                        :norequired="true"
                        :dense="true"
                        :label="'Territory'"
                    ></SelectSalesGroup>
                </v-col> -->
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="submitted_date.model"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on }">
                            <div v-on="on">
                                <v-text-field
                                    prepend-inner-icon="mdi-calendar"
                                    outlined
                                    maxlength="24"
                                    @click:clear="submitted_date.value1= [],submitted_date.value2= [],submitted_date.input = '',renderData()"
                                    v-model="submitted_date.input"
                                    dense
                                    clearable
                                >
                                    <template v-slot:label>
                                        Submitted Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            v-model="submitted_date.value"
                        >
                        <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="submitted_date.model = false,renderData()"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
        </div>
        <div class="box-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="customer_acquisition.table_header"
                :items="customer_acquisition.data"
                :loading="customer_acquisition.isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.name }}</td>
                        <td>{{ props.item.phone_number ?  props.item.phone_number : '-'}}</td>
                        <td>{{ props.item.address_name ? props.item.address_name : '-'}}</td>
                        <td>{{ props.item.salesperson?.display_name ? props.item.salesperson.display_name : '-'}}</td>
                        <td>{{ props.item.territory ? (props.item.territory.description ? props.item.territory.description : '-') : '-'}}</td>
                        <td>{{ props.item.submit_date == '0001-01-01T00:00:00Z' ? '-' : props.item.submit_date | moment("YYYY-MM-DD HH:mm:ss") }}</td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'ca_rdd'" :to="{ name: 'CustomerAcquisitionDetail', params: { id: props.item.id } }">
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <LoadingBar :value="customer_acquisition.isLoading"/>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "CustomerAcquisition",
        data() {
            return {
                showFilter : false,
            }
        },
        mounted() {
            this.renderData()
        },
        computed: {
            ...mapState({
                customer_acquisition: state => state.customerAcquisition.customer_acquisition,
                filter: state => state.customerAcquisition.customer_acquisition.filter,
                submitted_date: state => state.customerAcquisition.customer_acquisition.filter.submitted_date,
                table_header: state => state.customerAcquisition.customer_acquisition.table_header,
            }),
        },
        methods: {
            ...mapActions([
                'fetchCustomerAcquisition',
            ]),
            // For get data from API
            renderData(){
                this.fetchCustomerAcquisition();
            },
        },
        watch: {
            'filter.search': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                    that.renderData()
                    }, 1000);
                },
                deep: true
            },
            'submitted_date.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.submitted_date.value1[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.submitted_date.value1[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.submitted_date.value2[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                        }
                    } else if (val == "") {
                        this.submitted_date.value = []
                    }
                },
                deep: true
            },
            'submitted_date.value': {
                handler: function (val) {
                    if (val) {
                        this.submitted_date.input = this.formatDateRange(val)
                    } else {
                        this.item
                    }
                },
                deep: true
            },
        }
    }
</script>