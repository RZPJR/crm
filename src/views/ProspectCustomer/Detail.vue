<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row class="mb2">
                <v-col class="fs24 bold">
                    {{ detail_prospect_customer.code }}
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
    import Vue from 'vue'
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "ProspectCustomerDetail",
        data() {
            return {
                ConfirmData: {},
            };
        },
        async created() {
            await this.fetchProspectCustomerDetail({id: this.$route.params.id});
            this.$root.$on('event_success', function(res){
                if (res) {
                    self.fetchProspectCustomerDetail({id: self.$route.params.id})
                }
            });
        },
        computed: {
            ...mapState({
                detail_prospect_customer: state => state.prospectCustomer.detail_prospect_customer.data
            })
        },
        methods: {
            ...mapActions([
                "fetchProspectCustomerDetail"
            ]),
        }
    }
</script>
