<template>
    <v-container fill-height class="main-container">
        <div class="box-start">
            <v-row class="mb24">
                <v-col class="fs24 bold">
                    {{form.name}}
                </v-col>
            </v-row>
            <v-row class="mt-6">
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Salesperson'" :value="form.salesperson.name"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Teritory'" :value="form.territory.description"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Phone Number'" :value="form.phone_number ? form.phone_number : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Submitted Date'" :value="form.submit_date ? form.submit_date : '-' | moment('YYYY-MM-DD HH:mm:ss')"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Address'" :value="form.address_name ? form.address_name : '-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew v-if="form.latitude && form.longitude" :name="'Latlong'" :value="form.latitude+', '+form.longitude" :crossURL="'https://www.google.com/maps/search/?api=1&query='+form.latitude+','+form.longitude"/>
                    <DetailRowNew v-else :name="'Latlong'" :value="'-'"/>
                </v-col>
                <v-col cols="12" md="6" class="-mt24">
                    <DetailRowNew :name="'Leads from Food App'" :value="form.food_app ? (form.food_app == 1 ? 'No' : 'Yes') : '-'"/>
                </v-col>
                 <v-col cols="12" md="6" class="-mt24">
                     <DetailRowNew :name="'Potential Revenue'" :value="form.potential_revenue ? 'Rp. '+formatPrice(form.potential_revenue) : 'Rp. 0,00'"/>
                </v-col>
            </v-row>
        </div>
        <div class="box-header-table">
            Top Products
        </div>
        <div class="box-body-table">
            <v-data-table
                :mobile-breakpoint="0"
                :headers="header"
                :items="form.customer_acquisition_items"
                :hide-default-footer="true"
                :items-per-page="-1"
            >
                <template v-slot:item="props">
                    <tr style="height:48px">
                        <td>{{ props.index + 1 }}</td>
                        <td>{{ props.item.item.code +' - '+ props.item.item.description }}</td>
                        <td>{{ props.item.is_top === 1 ? 'Yes' : '-' }}</td>
                    </tr>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "CustomerAcquisitionDetail",
        data() {
            return {
                ConfirmData: {},
            };
        },
        async created() {
            await this.fetchCustomerAcquisitionDetail({id: this.$route.params.id});
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchCustomerAcquisitionDetail({id: self.$route.params.id})
                }
            });
        },
        computed: {
            ...mapState({
                header: state =>state.customerAcquisition.detail_customer_acquisition.table_header,
                form: state =>state.customerAcquisition.detail_customer_acquisition.form,
            })
        },
        methods: {
            ...mapActions([
                "fetchCustomerAcquisitionDetail"
            ]),
        }
    }

</script>