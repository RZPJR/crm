<template>
    <v-container fill-height class="main-container">
        <div class="box">
             <v-col cols="12" md="12">
                <v-row>
                    <v-col>
                        <div>Step 1. Download Template</div>
                        <div class="mt-2 text-black60">Download Eden Farm assignment template</div>
                        <div class="mt-5">
                            <!-- <SelectSalesGroup
                                @selected="salesGroupSelected"
                                :dense="true"
                            ></SelectSalesGroup> -->
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <div class="mt-16 pt-13">
                                <v-btn
                                    depressed
                                    color="#50ABA3"
                                    class="no-caps bold white--text px-7 mt-16"
                                    @click="downloadAssignmentFile()"
                                    :disabled="disableButton"
                                    v-privilege="'sla_exp'"
                                >Download</v-btn>
                            </div>
                        </v-card-actions>
                    </v-col>
                    <v-col class="mx-10 px-10 hr-dash-right hr-dash-left">
                        <div>Step 2. Update Template</div>
                        <div class="my-2 text-black60">Update with spreadsheet application</div>
                        <v-img 
                            class="mt-4 mx-16" 
                            width="250px" 
                            :src='logo_url'
                        />
                    </v-col>
                    <v-col>
                        <div>Step 3. Upload File<span class="red--text">*</span></div>
                        <div class="my-2 text-black60"> Assignment will be created based on data uploaded</div>
                        <div class="mt-5">
                            <v-tooltip top :disabled="!disableButton">
                                <template v-slot:activator="{ on: tooltip }">
                                    <div v-on="{ ...tooltip }">
                                            <!-- :disabled="disableButton" -->
                                        <UploadExcel
                                            @onSelect="onSelectFile"
                                            @onDelete="onDeleteFile"
                                            :clear="clear"
                                            :error="error.id"
                                        ></UploadExcel>
                                    </div>
                                </template>
                                <span>Please select sales group before upload</span>
                            </v-tooltip>
                        </div>
                        <v-card-actions class="mt-6">
                            <v-spacer></v-spacer>
                            <v-btn
                                depressed
                                color="#50ABA3"
                                class="no-caps bold white--text px-7"
                                @click="uploadFile()"
                                v-privilege="'sla_upl'"
                            >Upload</v-btn>
                                <!-- :disabled="disableUpload" -->
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-col>
        </div>
        <div v-if="error_detail.length > 0" class="box red--text">
            <h3>Error Upload:</h3>
            <div v-for="(item, idx) in error_detail" :key="idx">
                {{ error_detail[idx].message }}
            </div>
        </div>
        <LoadingBar :value="create_assignment.isLoading"/>
    </v-container>
</template>
<script>
    import { Worktime } from "@vue-mf/global";
    import { mapState, mapActions, mapMutations } from 'vuex';

    export default {
        name: "CreateSalesAsignment",
        components: { Worktime },
        data() {
            return {
                logo_url: '',
            }
        },
        computed : {
            ...mapState({
                create_assignment: state => state.assignment.create_assignment,
                clear: state => state.assignment.create_assignment.clear,
                error: state => state.assignment.create_assignment.error,
                error_detail: state => state.assignment.create_assignment.error_detail,
            }),
            //For watch disable download
            disableButton() {
                if (this.create_assignment.sales_group_id) return false
                else return true
            },
            disableUpload() {
                if (this.create_assignment.sales_group_id && this.create_assignment.data.length>1 && !this.error_detail.length>0) return false
                else return true
            }
        },
        methods: {
            ...mapActions([
                'readAssignmentFile',
                'downloadAssignmentFile',
                'createAssignment',
            ]),
            ...mapMutations([
                'setCreateAssignment',
                'setCreateAssignmentErrorDetail'
            ]),
            // For select sales group filter
            // salesGroupSelected(d) {
            //     this.sales_group_id = '';
            //     this.clear1 = true
            //     if(d){
            //         this.sales_group_id = d.id
            //         this.clear1 = false
            //         this.errorDetail = []
            //     }else{
            //         this.product_template_upload = []
            //         this.errorDetail = []
            //     }
            // },
            // For delete file excel
            onDeleteFile(ev) {
                this.$store.commit('setCreateAssignment', []);
                this.$store.commit('setCreateAssignmentErrorDetail', []);
            },
            // For select file excel
            onSelectFile(file) {
                this.readAssignmentFile(file);
            },
            // For select upload excel
            uploadFile() {
                this.createAssignment()
            },
        },
        created() {
            this.logo_url = Worktime;
        },
    }
</script>