<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-tabs v-model="tab" class="mb14">
                <v-tab :href="`/customer-relation/sales-assignment`"><b class="no-caps">Sales Assignment</b></v-tab>
                <v-tab :href="`/customer-relation/sales-assignment-objective`"><b class="no-caps">Sales Assignment Objective</b></v-tab>
            </v-tabs>
            <v-row>
                <!-- <v-col cols="12" md="3">
                   <SelectSalesGroup
                        @selected="salesGroupSelected"
                        :dense="true"
                        :norequired="true"
                    ></SelectSalesGroup>
                </v-col> -->
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="start_date.model"
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
                                    clearable
                                    @click:clear="start_date.value1 = [],start_date.value2 = [],start_date.input = '',fetchAssignmentList()"
                                    v-model="start_date.input"
                                    maxlength="24"
                                    dense
                                >
                                    <template v-slot:label>
                                        Start Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            persistent-hint
                            v-model="start_date.value"
                        >
                        <v-btn
                            text
                            color="primary"
                            @click="start_date.model = false,fetchAssignmentList()"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="end_date.model"
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
                                    clearable
                                    @click:clear="end_date.value1 = [],end_date.value2 = [],end_date.input = '',fetchAssignmentList()"
                                    v-model="end_date.input"
                                    maxlength="24"
                                    dense
                                >
                                    <template v-slot:label>
                                        End Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            persistent-hint
                            v-model="end_date.value"
                        >
                        <v-btn
                            text
                            color="primary"
                            @click="end_date.model = false,fetchAssignmentList()"
                        >
                            OK
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.status"
                        :items="filter.statuses"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-title">
            <v-row >
                 <v-col class="flex-align-end">
                    <router-link :to="{ name: 'CreateSalesAssignment' }" class="routerLink" v-privilege="'sla_exp'">
                        <v-btn
                            depressed
                            color="#50ABA3"
                            class="no-caps bold white--text"
                        >Create Assignment</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="table_header"
                :items="assignment_list.data"
                :loading="assignment_list.isLoading"
                :items-per-page="10"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{props.item.code}}</td>
                        <td>{{props.item.teritory.description}}</td>
                        <td>{{'-'}}</td>
                        <td>{{props.item.start_date | moment("YYYY-MM-DD")}}</td>
                        <td>{{props.item.end_date | moment("YYYY-MM-DD")}}</td>
                        <td>
                            <div v-if="props.item.status == 1">
                                <v-chip
                                    :color="statusMaster('active')"
                                    small
                                ><span class="pa-md-2">Active</span></v-chip>
                            </div>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('finished')"
                                    small
                                >Finished</v-chip>
                            </div>
                            <div v-if="props.item.status == 3">
                                <v-chip
                                    :color="statusMaster('cancelled')"
                                    small
                                >Cancelled</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'sla_rdd'" :to="`/customer-relation/sales-assignment/detail/${props.item.id}`">
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <div class="px-md-2" v-if="props.item.status == 1">
                                        <hr>
                                    </div>
                                    <v-list-item @click="changeStatus(props.item.id)" v-if="props.item.status == 1">
                                        <v-list-item-content>
                                            <v-list-item-title>Cancel</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "SalesAssignment",
        data() {
            return {
                ConfirmData : {},
                tab: '/customer-relation/sales-assignment',
            }
        },
        created() {
            this.fetchAssignmentList()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchAssignmentList()
                }
            });
        },
        computed: {
            ...mapState({
                assignment_list: state => state.assignment.assignment_list,
                table_header: state => state.assignment.assignment_list.table_header,
                filter: state => state.assignment.assignment_list.filter,
                start_date: state => state.assignment.assignment_list.filter.start_date,
                end_date: state => state.assignment.assignment_list.filter.end_date,
            }),
        },
        methods: {
            ...mapActions ([
                'fetchAssignmentList',
            ]),
            // For cancel assignment
            changeStatus(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to cancel this sales assignment",
                    title : "Cancel Sales Assignment",
                    text : "Are you sure want to Cancel this sales assignment?",
                    urlApi : "/crm/v1/sales/assignment/cancel/"+id,
                    data : {}
                }
            },
            // For select sales group filter
            // salesGroupSelected(d) {
            //     this.filter.sales_group_id = '';
            //     if(d){
            //         this.filter.sales_group_id = d.id
            //     }
            //     Vue.nextTick(() => {
            //         this.fetchAssignmentList()
            //     });
            // },
        },
        watch: {
            'filter.status': {
                handler: function (val) {
                    Vue.nextTick(() => {
                        this.fetchAssignmentList()
                    });
                },
                deep: true
            },
            'start_date.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.start_date.value1[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.start_date.value1[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.start_date.value2[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                        }
                    } else if (val == "") {
                        this.start_date.value = []
                    }
                },
                deep: true
            },
            'start_date.value': {
                handler: function (val) {
                    if (val) {
                        this.start_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
            'end_date.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.end_date.value1[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.end_date.value1[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.end_date.value2[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                        }
                    } else if (val == "") {
                        this.end_date.value = []
                    }
                },
                deep: true
            },
            'end_date.value': {
                handler: function (val) {
                    if (val) {
                        this.end_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
        },
    }
</script>
