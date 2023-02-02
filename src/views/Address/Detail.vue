<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mb2">
                <v-col cols="12" class="fs24 bold">Customer</v-col>
                <v-col cols="12" class="fs16 bold">Basic Info</v-col>
            </v-row>
            <div class="hr-title mx-1 mb30"/>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Business Type'" :value="customer_detail.customer?.name"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Customer'" :value="customer_detail.customer?.name" :routePath="'/customer-relation/customer/detail/'+this.customer_detail.customer?.id"/>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-row>
                <v-col cols="12" class="fs24 bold">Address</v-col>
            </v-row>
            <v-row class="mb2">
                <v-col class="fs16 bold">Basic Info</v-col>
                <v-col class="d-flex justify-end -mt5">
                    <v-btn
                        v-if="customer_detail.status == 1"
                        elevation="0"
                        rounded
                        small
                        class="no-caps mb4"
                        :color="statusMaster('active')"
                    >Active</v-btn>
                    <v-btn
                        v-if="customer_detail.status == 2"
                        elevation="0"
                        rounded
                        small
                        class="no-caps mb4"
                        :color="statusMaster('archived')"
                    >Archived</v-btn>
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" class="-mt3">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="bg-white">
                            <!-- <v-list-item v-privilege="'olt_upd'" :to="{ name: 'BranchUpdate', params: { id: customer_detail.id } }">
                                <v-list-item-title>Update</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                            <v-list-item v-privilege="'olt_cvt_arc'" :to="`/customer/branch/archetype/convert/${customer_detail.id}`" v-if="items.status == 1 && customer_detail.status === 1">
                                <v-list-item-title>Convert Archetype</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                            <v-list-item v-privilege="'olt_cvt_arc'" :to="`/customer/branch/convert/${customer_detail.id}`" v-if="items.status != 1 && customer_detail.status === 1">
                                <v-list-item-title>Convert Archetype</v-list-item-title>
                                <v-list-item-icon><v-icon>mdi-open-in-new</v-icon></v-list-item-icon>
                            </v-list-item>
                            <div>
                                <hr>
                            </div>
                            <v-list-item v-privilege="'olt_upd_sps'" @click="showUpdateSalesperson(customer_detail.id)">
                                <v-list-item-title>Update Salesperson</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-privilege="'olt_arc'" @click="archive(customer_detail.id)" v-if="customer_detail.status === 1">
                                <v-list-item-title>Archive</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="unarchive(customer_detail.id)" v-if="customer_detail.status === 2">
                                <v-list-item-title>Unarchive</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-privilege="'filter_rdl'" @click="seeHistory()">
                                <v-list-item-title>See History</v-list-item-title>
                            </v-list-item> -->
                        </v-list>
                    </v-menu>
                </v-col>
            </v-row>
            <div class="hr-title mx-1 mb30"/>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Code'" :value="customer_detail.code ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address Name'" :value="customer_detail.name ?? '-'"/>
                </v-col>
            </v-row>
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Sales Info</v-col>
            </v-row>
            <div class="hr-title mx-1 mb30"/>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Archetype'" :value="customer_detail.archetype?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Salesperson'" :value="customer_detail.salesperson?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Price Set'" :value="customer_detail.price_set?.name ?? '-'"/>
                </v-col>
            </v-row>
            <v-row class="my2">
                <v-col cols="12" class="fs16 bold">Shipping Info</v-col>
            </v-row>
            <div class="hr-title mx-1 mb30"/>
            <v-row class="px-5 mt-5">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'PIC Name'" :value="customer_detail.pic_name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Phone Number'" :value="customer_detail.phone_number ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Alternative Phone Number'" :value="customer_detail.alt_phone_number ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Province'" :value="customer_detail.sub_district?.district?.city?.province?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'City'" :value="customer_detail.sub_district?.district?.city?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'District'" :value="customer_detail.sub_district?.district?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Sub District'" :value="customer_detail.sub_district?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Postal Code'" :value="customer_detail.sub_district?.postal_code ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Default Warehouse'" :value="customer_detail.warehouse?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Area'" :value="customer_detail.sub_district?.area?.name ?? '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Default Shipping Address'" :value="customer_detail.main_branch === 1 ? 'Yes' : customer_detail.main_branch === 2 ? 'No' : '-'"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Shipping Address'" :value="customer_detail.shipping_address ?? '-'" :align="true"/>
                </v-col>
                <v-col cols="12" class="-mt24">
                    <DetailRowNew :name="'Note'" :value="customer_detail.note ?? '-'" :align="true"/>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'AddressDetail',
        data() {
            return {
                // 
            }
        },
        mounted() {
            this.renderData()
        },
        computed: {
            ...mapState({
                customer_detail: state => state.customer.customer_detail,
            })
        },
        methods: {
            ...mapActions ([
                'fetchAddressDetail',
            ]),
            renderData(){
                this.fetchAddressDetail({id: this.$route.params.id});
            },
        }
    }
</script>