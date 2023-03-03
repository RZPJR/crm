<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row :class="showFilter?'mb24':''">
                <v-col>
                    Filter 
                    <v-btn 
                        depressed
                        x-small
                        @click="showFilter = !showFilter"
                        v-if="showFilter"
                        data-unq="salesPerformance-button-hide"
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
                        data-unq="salesPerformance-button-show"
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
                <v-col cols="12" md="3" class="mt24">
                    <SelectSalesGroup
                        v-model="filter.sales_group_id"
                        @selected="salesGroupSelected"
                        :norequired="true"
                        :dense="true"
                        :label="'Territory'"
                        data-unq="salesPerformance-select-territory"
                    ></SelectSalesGroup>
                </v-col>
                <v-col cols="12" md="3" class="mt24">
                    <SelectSalesPerson
                        v-model="filter.salesperson"
                        :norequired="true"
                        :dense="true"
                        @selected="salespersonSelected"
                        data-unq="salesPerformance-select-salesperson"
                    ></SelectSalesPerson>
                </v-col>
                <v-col cols="12" md="3" class="mt24">
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
                                    @click:clear="submitted_date.value = [],submitted_date.input = '',fetchSalesPerformanceList()"
                                    v-model="submitted_date.input"
                                    data-unq="salesPerformance-input-submittedDate"
                                    dense
                                >
                                    <template v-slot:label>
                                        Assignment Date
                                    </template>
                                </v-text-field>
                            </div>
                        </template>
                        <v-date-picker
                            range
                            v-model="submitted_date.value"
                        >
                        <v-btn
                            text
                            color="primary"
                            @click="submitted_date.model = false,fetchSalesPerformanceList()"
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
                :headers="table_headers"
                :items="performance_list.items"
                :loading="performance_list.loading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td :data-unq="`salesPerformance-value-salesperson-${props.index}`">
                            {{ props.item.salesperson ? props.item.salesperson.name : "-" }}<br>
                            <span class="text-black60" :data-unq="`salesPerformance-value-salesgroupName-${props.index}`">
                                {{ props.item.sales_assignment ? props.item.sales_assignment.sales_group.name : "-"}}
                            </span>
                        </td>
                        <td :data-unq="`salesPerformance-value-visit-${props.index}`">
                            <span class="text-black60">Plan : </span>{{ props.item.plan_visit ? props.item.plan_visit : "-" }}<br>
                            <span class="text-black60">Actual : </span>{{ props.item.visit_actual ? props.item.visit_actual : "-" }}<br>
                            <span class="text-black60">Percentage : </span>{{ props.item.visit_percentage ? props.item.visit_percentage.toFixed(2)+"%" : "-" }}
                        </td>
                        <td :data-unq="`salesPerformance-value-followup-${props.index}`">
                            <span class="text-black60">Plan : </span>{{ props.item.plan_follow_up ? props.item.plan_follow_up : "-" }}<br>
                            <span class="text-black60">Actual : </span>{{ props.item.follow_up_actual ? props.item.follow_up_actual : "-" }}<br>
                            <span class="text-black60">Percentage : </span>{{ props.item.follow_up_percentage ? props.item.follow_up_percentage.toFixed(2)+"%" : "-" }}<br>
                        </td>
                        <td :data-unq="`salesPerformance-value-totalCA-${props.index}`">{{ props.item.total_ca ? props.item.total_ca : "-" }}</td>
                        <td :data-unq="`salesPerformance-value-revenueEffectiveCall-${props.index}`">{{ props.item.revenue_effective_call ? formatPrice(props.item.revenue_effective_call) : "-" }}</td>
                        <td :data-unq="`salesPerformance-value-revenueTotal-${props.index}`">{{ props.item.revenue_total ? formatPrice(props.item.revenue_total) : "-" }}</td>
                        <td :data-unq="`salesPerformance-value-effectiveCallPercentage-${props.index}`">{{ props.item.effective_call_percentage ? props.item.effective_call_percentage.toFixed(2)+"%" : "-" }}</td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                        :data-unq="`salesPerformance-button-actionButton-${props.index}`"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item  
                                        :to="`/customer-relation/sales-performance/detail/${convert_date}/${props.item.salesperson.id}`"
                                        :data-unq="`salesPerformance-button-detail-${props.index}`"
                                    >
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
    </v-container>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: "PerformanceList",
        data() {
            return {
                id: '',
                showFilter : false,
                convert_date: '',
            }
        },
        mounted() {
            this.encryptDate()
        },
        created() {
            this.fetchSalesPerformanceList()
        },
        computed:{
            ...mapState({
                performance_list: state => state.salesPerformance.performance_readlist,
                table_headers: state => state.salesPerformance.performance_readlist.table_headers,
                filter: state => state.salesPerformance.performance_readlist.filter,
                submitted_date: state => state.salesPerformance.performance_readlist.filter.submitted_date,
            }),
        },
        methods: {
            ...mapActions ([
                'fetchSalesPerformanceList',
            ]),
            //For Filter Salesperson
            salespersonSelected(d) {
                this.filter.salesperson = '';
                if (d) {
                    this.filter.salesperson = d.id;
                }
                this.fetchSalesPerformanceList()
            },
            // For select sales group filter
            salesGroupSelected(d) {
                this.filter.sales_group_id = '';
                if(d){
                    this.filter.sales_group_id = d.id
                }
                this.fetchSalesPerformanceList()
            },
            // For encrypt date
            encryptDate(){
                let arrDate = []
                if(this.submitted_date.value.length == 1){
                    arrDate = [
                        this.submitted_date.value[0],
                        this.submitted_date.value[0]
                    ]
                } else if (this.submitted_date.value.length == 2) {
                    arrDate = [
                        this.submitted_date.value[0],
                        this.submitted_date.value[1]
                    ]
                }
                arrDate = arrDate.toString()
                arrDate = arrDate.replace(/-|,/g, "")
                arrDate = parseInt(arrDate) * 8
                this.convert_date = arrDate
            }
        },
        watch: {
            'submitted_date.input': {
                handler: function (val) {
                    if (val) {
                        if (val.length == 10) {
                            let valid = this.$moment(val, 'YYYY-MM-DD', true).isValid()
                            if (valid == true) {
                                this.submitted_date.value[0] = this.$moment(val).format('YYYY-MM-DD')
                            }
                        } else if (val.length == 24) {
                            let date1 = val.substr(0, 10)
                            let date2 = val.substr(14, 23)
                            let valid1 = this.$moment(date1, 'YYYY-MM-DD', true).isValid()
                            let valid2 = this.$moment(date2, 'YYYY-MM-DD', true).isValid()
                            if (valid1 == true && valid2 == true) {
                                this.submitted_date.value[0] = this.$moment(date1).format('YYYY-MM-DD')
                                this.submitted_date.value[1] = this.$moment(date2).format('YYYY-MM-DD')
                            }
                           
                        }
                    }else if (val == "") {
                        this.start_date.value = []
                    }
                },
                deep: true
            },
            'submitted_date.value': {
                handler: function (val) {
                    if (val) {
                        this.submitted_date.input = this.formatDateRange(val)
                        this.encryptDate()
                    }
                },
                deep: true
            },
        },
    }
</script>
