<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row :class="submission_list.showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="submission_list.showFilter = !submission_list.showFilter"
                        v-if="submission_list.showFilter"
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
                        @click="submission_list.showFilter = !submission_list.showFilter"
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
            <v-row v-if="submission_list.showFilter">
                <v-col cols="12" md="3">
                    <SelectSalesGroup
                        v-model="submission_list.sales_group_id"
                        @selected="salesGroupSelected"
                        :norequired="true"
                        :dense="true"
                        :clear="submission_list.clearGroup"
                        :label="'Territory'"
                    ></SelectSalesGroup>
                </v-col>
                <v-col cols="12" md="3">
                    <v-menu
                        ref="menu"
                        v-model="submission_list.submitted_date_model"
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
                                    v-model="submission_list.submitted_date_input"
                                    dense
                                >
                                    <template v-slot:label>
                                        Submitted Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            v-model="submission_list.submitted_date"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" md="3">
                    <SelectTaskTipe
                        v-model="submission_list.task_type"
                        :default="1"
                        :dense="true"
                        @selected="taskTypeSelected"
                    ></SelectTaskTipe>
                </v-col>
                <v-col cols="12" md="3">
                    <v-select
                        v-model="submission_list.statuses"
                        :items="submission_list.status"
                        label="Status"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="12" md="3" class="-mt24">
                    <v-select
                        v-model="submission_list.out_of_route"
                        :items="submission_list.out_of_route_options"
                        label="Out Of Route"
                        item-text="text"
                        item-value="value"
                        outlined
                        dense
                    ></v-select>
                </v-col>
            </v-row>
        </div>
        <div class="box-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="table_header"
                :items="submission_list.items"
                :loading="submission_list.loading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.item.territory.description}}</td>
                        <td>{{ props.item.salesperson ? props.item.salesperson.name : "-" }}</td>
                        <td>{{ props.item.task === 1 ? "Visit" : props.item.task === 2 ? 'Follow Up' : 'Customer Acquisition' }}</td>
                        <td>{{ props.item.out_of_route === 1 ? "Yes" : "No" }}</td>
                        <td>{{ props.item.submit_date == '0001-01-01T00:00:00Z' ? '-' : props.item.submit_date | moment("YYYY-MM-DD HH:mm:ss") }}</td>
                        <td>{{ props.item.finish_date == '0001-01-01T00:00:00Z' ? '-' : props.item.finish_date | moment("YYYY-MM-DD HH:mm:ss") }}</td>
                        <td>
                            <div v-if="props.item.status == 2">
                                <v-chip
                                    :color="statusMaster('finished')"
                                    small
                                >Finished</v-chip>
                            </div>
                            <div v-if="props.item.status == 27">
                                <v-chip
                                    :color="statusMaster('failed')"
                                    small
                                >Failed</v-chip>
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
                                    <v-list-item  :to="`/customer-relation/sales-assignment-submission/detail/${props.item.id}/`+submission_list.task_type" v-privilege="'sla_sub_rdd'">
                                        <v-list-item-content>
                                            <v-list-item-title>Detail</v-list-item-title>
                                        </v-list-item-content>
                                        <v-list-item-icon>
                                            <v-icon>mdi-open-in-new</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>
        <LoadingBar :value="submission_list.overlay"/>
    </v-container>
</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "SubmissionList",
        data() {
            return {
            }
        },
        mounted() {
            this.fetchAssignmentSubmission()
        },
        computed: {
            ...mapState({
                submission_list: state => state.assignmentSubmission.assignment_submission,
                table_header: state => state.assignmentSubmission.assignment_submission.table.fields,
            }),
        },
        methods: {
            ...mapActions ([
                'fetchAssignmentSubmission',
            ]),
            salesGroupSelected(d) {
                this.submission_list.sales_group_id = '';
                if(d){
                    this.submission_list.sales_group_id = d.id
                }
                this.fetchAssignmentSubmission()
            },
            taskTypeSelected(val) {
                this.submission_list.task_type = null;
                if (val){
                    this.submission_list.task_type = val.value;
                    if(this.submission_list.task_type == 3){
                        this.submission_list.sales_group_id = '';
                        this.submission_list.clearGroup = true
                    }else{
                        this.submission_list.clearGroup = false
                    }
                }
                this.fetchAssignmentSubmission()
            },
        },
        watch: {
            'submission_list.statuses': {
                handler: function (val) {
                    Vue.nextTick(() => {
                        this.fetchAssignmentSubmission()
                    });
                },
                deep: true
            },
            'submission_list.out_of_route': {
                handler: function (val) {
                    this.fetchAssignmentSubmission()
                },
                deep: true
            },
            'submission_list.submitted_date_input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.submission_list.submitted_date[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.submission_list.submitted_date[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.submission_list.submitted_date[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                        }
                    }
                },
                deep: true
            },
            'submission_list.submitted_date': {
                handler: function (val) {
                    if (val) {
                        this.submission_list.submitted_date_input = this.formatDateRange(val)
                        this.fetchAssignmentSubmission()
                    }
                },
                deep: true
            },
        }
    }
</script>
