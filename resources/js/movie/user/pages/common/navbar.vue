<template>
    <div>
        <v-toolbar fixed dark dense class="nav_color">

            <v-app-bar-title>
                MOVEA
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">

                <v-btn small plain text link route :to="{ name: 'Trending'}" exact>
                    Trending
                </v-btn>

                <v-btn small plain text link route :to="{ name: 'Toprated'}" exact>
                    Top Rated
                </v-btn>


                <v-btn small plain text link route :to="{ name: 'Upcoming'}">
                    Up Coming
                </v-btn>



            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-expand-x-transition >
                <v-text-field v-show="expand" placeholder="search by title" filled dense class="mt-4" v-model="search"></v-text-field>
            </v-expand-x-transition>

            <v-btn icon @click="expand = !expand">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>




            <v-menu open-on-hover offset-y transition="scale-transition">

                <template v-slot:activator="{ on, attrs }">

                    <v-avatar size="40" v-bind="attrs" v-on="on">
                        <v-img src="/all-assets/common/dummy.jpg"></v-img>
                    </v-avatar>

                </template>

                <v-list dense dark class="nav_color">
                    <v-list-item @click="signinModal = true">
                        <v-list-item-title>Signin</v-list-item-title>
                    </v-list-item>
                </v-list>

            </v-menu>


            <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        </v-toolbar>



        <v-navigation-drawer v-model="drawer" absolute temporary dark right height="100%" class="nav_color">


            <v-list dense>

                <v-list-item link route :to="{ name: 'Dashboard'}" exact>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>


        <v-dialog v-model="signinModal" :overlay="false" max-width="500px" transition="dialog-transition">

            <v-form>

                <v-card class="pb-4">
                    <v-card-title class="justify-center">
                        MOVEA Portal
                    </v-card-title>
                    <v-card-text>
                        <!-- Error -->
                        <v-alert v-if="error" shaped prominent type="error" dismissible>
                            {{ errorMsg }}
                        </v-alert>


                        <form @submit.prevent="loginMode ? login() : register()">

                            <v-text-field type="text" label="Email" :rules="[v => !!v || 'Email is required!']"
                                v-model="form.email" prepend-icon="mdi-account-alert-outline" required></v-text-field>
                            <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />



                            <v-text-field :type="passwordType ?'text': 'password'"
                                :append-icon="passwordType ?'mdi-eye':'mdi-eye-slash'"
                                @click:append="passwordType=!passwordType" label="Password"
                                :rules="[v => !!v || 'Password is required!']" v-model="form.password"
                                prepend-icon="mdi-lock-alert-outline" required></v-text-field>
                            <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />


                            <v-btn block outlined rounded class="light-blue darken-4 text-white" type="submit" v-if="loginMode = true">
                                <v-icon dense>
                                    mdi-login
                                </v-icon>
                                Login
                            </v-btn>

                            <v-btn block outlined rounded class="light-green darken-4 text-white" type="submit" v-else>
                                <v-icon dense>
                                    mdi-login
                                </v-icon>
                                Register
                            </v-btn>

                        </form>

                    </v-card-text>

                    <div class="text-center">Not registered yet ? 
                        <v-btn class="teal--text" text plain small @click="regs()"> 
                            <v-icon size="16" left>
                                mdi-account-plus
                            </v-icon>
                            Register
                        </v-btn>
                    </div>
                </v-card>

                <v-overlay :value="overlay">
                    <v-progress-circular
                        indeterminate
                        size="64"
                    ></v-progress-circular>
                </v-overlay>

            </v-form>

        </v-dialog>

    </div>
</template>




<script>
    import Form from 'vform'
    import auth from '../../js/common/auth'
    export default {
        data() {
            return {
                signinModal: false,
                drawer: null,


                passwordType: false,
                loading: false,
                password: null,

                error: false,
                errorMsg: '',


                // Form
                form: new Form({
                    email: '',
                    password: ''
                }),

                expand: false,
                overlay: false,

                loginMode: true,

            }
        },


        methods:{
            ...auth,


            regs(){
                this.loginMode = false
            }
        },

        watch: {
            signinModal: function (e) {
                if (!e) {
                    this.form.errors.clear();
                    this.form.reset();
                    this.error = false;
                }
            }
        },
    }

</script>


<style scoped>
    .nav_color {
        background-color: transparent !important;
    }

    .v-btn--active,
    .v-list-item--active {
        color: #2bed0f !important;
        background-color: transparent !important;
        text-decoration: none;
        border-bottom: 2px solid #2bed0f;
    }

    .v-sheet.v-toolbar:not(.v-sheet--outlined) {
        box-shadow: none;
    }

</style>
