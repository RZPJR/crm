<template>
    <v-container fill-height class="main-container">
        <div class="box">
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        name="code"
                        v-model="form.code"
                        required
                        outlined
                        dense
                        disabled
                        :error-messages="error.code"
                    >
                        <template slot="label">Code<span style="color:red;">*</span></template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        name="name"
                        v-model="form.name"
                        maxlength="100"
                        required
                        outlined
                        dense
                        disabled
                        :error-messages="error.name"
                    >
                        <template slot="label">Assignment Name<span style="color:red;">*</span></template>
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="mtn24">
                    <v-textarea
                        name="objective"
                        v-model="form.objective"
                        maxlength="250"
                        outlined
                        rows="3"
                        class="pt-0 mt-0"
                        :counter="250"
                        :error-messages="error.objective"
                    >
                        <template v-slot:label>Objective<span style="color:red">*</span></template>
                    </v-textarea>
                </v-col>
                <v-col cols="12" md="6" class="mtn24">
                    <v-textarea
                        name="survey_link"
                        v-model="form.survey_link"
                        maxlength="250"
                        outlined
                        rows="3"
                        class="pt-0 mt-0"
                        :counter="250"
                        :error-messages="error.surveylink"
                    >
                        <template v-slot:label>Survey Link</template>
                    </v-textarea>
                </v-col>
            </v-row>
        </div>
        <div class="box">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    @click="$router.go(-1)"
                    depressed
                    outlined
                    color="#EBEBEB"
                    class="main-btn"
                ><span class="text-black80">Cancel</span></v-btn>
                <v-btn
                    depressed
                    color="#50ABA3"
                    class="main-btn white--text"
                    @click="confirmButton()"
                    v-privilege="'sla_obj_upd'"
                >Update</v-btn>
            </v-card-actions>
        </div>
        <ConfirmationDialogNew :sendData="ConfirmData"/>
        <LoadingBar :value="isLoading"/>
    </v-container>
</template>
<script>
    import {mapState, mapActions } from 'vuex';

    export default {
        name: 'SalesAssignmentObjectiveUpdate',
        data () {
            return {
                business_type:null,
                sendForm: {},
                error:{},
                ConfirmData:[]
            }
        },
        computed : {
            ...mapState({
                isLoading: state => state.assignmentObjective.update_assignment_objective_list.isLoading,
                form: state => state.assignmentObjective.update_assignment_objective_list.form,
            }),
        },
        methods:{
            ...mapActions([
                'fetchAssignmentObjectiveUpdateDetail',
            ]),
            renderData() {
                this.fetchAssignmentObjectiveUpdateDetail({id: this.$route.params.id});
            },
            // For Confirm Action
            confirmButton() {
                if(this.form.survey_link){
                    this.sendForm = {
                        name: this.form.name,
                        objective: this.form.objective,
                        survey_link: this.form.survey_link
                    }
                }else{
                    this.sendForm = {
                        name: this.form.name,
                        objective: this.form.objective,
                    }
                }
                this.ConfirmData = {
                    model : true,
                    title : "Update Assignment Objective",
                    text : "Are you sure want to update this Assignment Objective?",
                    urlApi : "/crm/v1/sales/assignment/objective/"+this.$route.params.id,
                    nextPage : "/customer-relation/sales-assignment-objective",
                    data : this.sendForm
                }
            },
        },
        created() {
            this.renderData()
        },
        mounted () {
            let self = this
            this.$root.$on('event_error', function(err){
                self.error = err
            });
        },
    }
</script>