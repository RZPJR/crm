<template>
    <v-container fill-height class="main-container">
    </v-container>
</template>

<script>
    import { mapState, mapActions } from "vuex";

    export default {
        name: 'DistributionNetworkDetail',
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
                distribution_network_detail: state => state.distributionNetwork.distribution_network_detail,
            })
        },
        methods: {
            ...mapActions ([
                'DistributionNetworkDetail',
            ]),
            renderData(){
                this.DistributionNetworkDetail({id: this.$route.params.id});
            },
        }
    }
</script>


<style scoped>
    .preview-image {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }
    
    .image-box {
        width:250px;
        height:50px;
        background: #EBEBEB;
        border-style:dashed;
        border-color:gray;
        border-width:1px;
        text-align: center;
        padding-top: 10px;
        margin: 10px;
    }
    
    .image-box-big {
        width:250px;
        height:250px;
        background: #EBEBEB;
        border-style:dashed;
        border-color:gray;
        border-width:1px;
        text-align: center;
        padding-top: 110px;
        margin: 0px 0px 10px 10px;
    }

    .row-container {
        margin: 5px;
    }

    .gray-row-container {
        margin: 5px;
        background-color:#F5F5F5;
        border-radius: 8px;
        padding: 15px;
    }

    .child-container {
        background-color:#F5F5F5;
        border-radius: 8px;
        padding: 15px;
    }

    .grandchild-container {
        padding: 0px !important
    }

    .big-value {
        font-size: 18px;
        text-align: center;
        font-weight: bold;
    }
</style>