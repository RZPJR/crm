<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="-mb38">
                <v-col cols="12" md="4">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                            <v-text-field
                                dense
                                v-model="filter.search"
                                outlined
                                filled
                                placeholder="Search..."
                                v-on="{ ...tooltip }"
                                prepend-inner-icon="search"
                            ></v-text-field>
                        </template>
                        <span>Search by salesperson name</span>
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
                        v-if="filter"
                        class="no-caps fs12"
                    >
                        Hide<v-icon right>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-else
                        class="no-caps fs12"
                    >
                        Show<v-icon right>mdi-chevron-down</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row v-if='showFilter'>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.task_type"
                        :items="detail_assignment.task_type_list"
                        label="Task Type"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="finish_date.model"
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
                                    @click:clear="finish_date.value1 = [],finish_date.value2 = [] ,finish_date.input = '',renderData()"
                                    v-model="finish_date.input"
                                    maxlength="24"
                                    dense
                                >
                                    <template v-slot:label>
                                        Finish Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            persistent-hint
                            v-model="finish_date.value"
                        >
                            <v-btn
                                text
                                color="primary"
                                @click="finish_date.model = false,renderData()"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="filter.status"
                        :items="status_list"
                        label="Status"
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
                <v-col class="fs24 bold">
                    Batch: {{detail_assignment.data.code}}
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :headers="detail_assignment.table_header"
                :items="detail_assignment.data.sales_assignment_item"
                :loading="detail_assignment.isLoading"
                :items-per-page="10"
                :mobile-breakpoint="0"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{props.item.salesperson ? props.item.salesperson.name : '-'}}</td>
                        <td>{{props.item.task === 1 ? 'Visit' : 'Follow Up' }}</td>
                        <td>{{props.item.customer_acquisition_id ? props.item.customer_acquisition_id : '-'}}</td>
                        <td>{{props.item.start_date|moment("YYYY-MM-DD")}}</td>
                        <td>{{props.item.end_date|moment("YYYY-MM-DD")}}</td>
                        <td>{{props.item.finish_date == '0001-01-01T00:00:00Z' ? '-' : props.item.finish_date|moment("YYYY-MM-DD HH:mm:ss")}}</td>
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
                            <div v-if="props.item.status == 27">
                                <v-chip
                                    :color="statusMaster('failed')"
                                    small
                                >Failed</v-chip>
                            </div>
                        </td>
                        <td>
                            <v-menu offset-y v-if="props.item.status == 1">
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item @click="changeStatus(props.item.id)">
                                        <v-list-item-content>
                                            <v-list-item-title>Cancel</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ filter.search }}" found no results.
                </v-alert>
            </v-data-table>
        </div>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
    </v-container>
</template>
<script>
    import Vue from 'vue';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "SalesAssignmentDetail",
        data() {
            return {
                showFilter : false,
                batch_name: '',
                loading: false,
                ConfirmData : {},
                items:[],
                status_list: [
                    {
                        text: 'All Status',
                        value: 999
                    },
                    {
                        text: 'Active',
                        value: 1
                    },
                    {
                        text: 'Cancelled',
                        value: 3
                    }
                ]
            }
        },
        created() {
            this.renderData()
        },
        mounted() {
            let self = this
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.renderData()
                }
            });
        },
        computed: {
            ...mapState({
                detail_assignment: state => state.assignment.detail_assignment,
                filter: state => state.assignment.detail_assignment.filter,
                finish_date: state => state.assignment.detail_assignment.filter.finish_date,
            })
        },
        methods: {
            ...mapActions([
                'fetchAssignmentListDetail',
            ]),
            renderData(){
                this.fetchAssignmentListDetail({id: this.$route.params.id});
            },
            //For Cancel Assignment
            changeStatus(id) {
                this.ConfirmData = {
                    model : true,
                    status : true,
                    statusMsg : "Success to cancel this task",
                    title : "Cancel task",
                    text : "Are you sure want to Cancel this task?",
                    urlApi : "/crm/v1/sales/assignment/cancel/item/"+id,
                    data : {}
                }
            },
        },
        watch: {
            'filter.status': {
                handler: function (val) {
                    Vue.nextTick(() => {
                        this.renderData()
                    });
                },
                deep: true
            },
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
            'finish_date.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.finish_date.value1[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.finish_date.value1[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.finish_date.value2[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                        }
                    } else if (val == "") {
                        this.finish_date.value = []
                    }
                },
                deep: true
            },
            'finish_date.value': {
                handler: function (val) {
                    if (val) {
                        this.finish_date.input = this.formatDateRange(val)
                    }
                },
                deep: true
            },
            'filter.task_type': {
                handler: function (val) {
                    let that = this
                    that.renderData()
                },
                deep: true
            },
        },
    }
</script>