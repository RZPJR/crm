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
                            >
                            </v-text-field>
                        </template>
                        <span>Search by code, name, phone number</span>
                    </v-tooltip>
                </v-col>
            </v-row>
        </div><div class="box-title">
            <v-row >
                <v-col class="flex-align-end"></v-col>
                <v-col class="d-flex justify-end h70">
                     <v-btn
                        depressed
                        color="#50ABA3"
                        class="no-caps bold mr20"
                        to="/customer-relation/distribution-network/create"
                    >
                        <span class="text-white">Create Outlet</span>
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="distribution_network.table_header"
                :items="distribution_network.items"
                :loading="distribution_network.isLoading"
                :items-per-page="10"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>
                            {{ props.item.code }}<br>
                        <span class="second-color">{{ props.item.name ?  props.item.name : '-' }}</span>
                        </td>
                        <td>{{ props.item.phone_number ?  props.item.phone_number : '-'}}</td>
                        <td>{{ props.item.finance_area.name ? props.item.finance_area.name : '-'}}</td>
                        <td>{{ props.item.payment_term.name ? props.item.payment_term.name : '-'}}</td>
                        <td>{{ props.item.remaining_outstanding !== null || props.item.remaining_outstanding !== undefined ? 'Rp '+formatPrice(props.item.remaining_outstanding) : '-'}}</td>
                        <td>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on: menu }">
                                    <v-btn
                                        icon
                                        v-on="{ ...menu }"
                                    ><v-icon dark>mdi-dots-vertical</v-icon></v-btn>
                                </template>
                                <v-list class="bg-white">
                                    <v-list-item v-privilege="'dis_net_rdd'" :to="{ name: 'DistributionNetworkDetail', params: { id: props.item.id } }">
                                        <v-list-item-title>Detail</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item  v-privilege="'dis_net_upd'" v-if="props.item.status === 1" :to="{ name: 'DistributionNetworkUpdate', params: { id: props.item.id } }">
                                        <v-list-item-title>Update</v-list-item-title>
                                        <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
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
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'DistributionNetwork',
        data() {
            return {
                // 
            }
        },
        mounted() {
            this.fetchDistributionNetwork()
        },
        computed: {
            ...mapState({
                distribution_network: state => state.distributionNetwork.distribution_network_list,
                filter: state => state.distributionNetwork.distribution_network_list.filter,
            }),
        },
        methods: { 
            ...mapActions([
                'fetchDistributionNetwork'
            ]),
        },
        watch: {
            'filter': {
                handler: function (val) {
                    let that = this
                    clearTimeout(this._timerId)
                    this._timerId = setTimeout(function(){
                        that.fetchDistributionNetwork()
                    }, 1000);
                },
                deep: true
            },
        },
    } 
</script>
