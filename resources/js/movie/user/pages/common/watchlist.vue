<template>
    <div>
        <v-row>
            <v-col cols="12" lg="3" md="6" sm="6" v-for="movies in userWatchList" :key="movies.id">
                <!-- <v-skeleton-loader class="mx-auto" type="image, card-heading, list-item, list-item-three-line"
                    v-if="dataFetching == true">
                </v-skeleton-loader> -->

                <v-hover>
                    <template v-slot:default="{ hover }">

                        <v-card>
                            <v-img :src="imagePath+movies.poster_path" height="250"></v-img>

                            <v-card-subtitle class="d-flex justify-content-between align-items-center">
                                <span class="font-weight-bold"> {{movies.title}} </span> <span class="primary--text">
                                    {{movies.release_date}} </span>
                            </v-card-subtitle>

                            <v-card-text>
                                <div class="d-flex align-items-center">
                                    <v-rating :value="movies.vote_average" color="amber" length="10" dense
                                        half-increments readonly size="14"></v-rating>

                                    <div class="grey--text ms-4">
                                        {{movies.vote_average}} ({{movies.vote_count}})
                                    </div>
                                </div>

                            </v-card-text>

                            <v-divider class="mx-4"></v-divider>
                            <v-card-title>Genres</v-card-title>

                            <v-card-text>
                                <v-chip-group column>
                                    <v-chip>5:30PM</v-chip>

                                </v-chip-group>
                            </v-card-text>

                            <v-fade-transition>
                                <v-overlay v-if="hover" absolute color="#036358">
                                    <div class="d-flex flex-column justify-content-center align-items-center">
                                        <v-btn @click="showDetails(movies)">View Details</v-btn>
                                        or,
                                        <v-btn small color="error" class="mt-3 white--text"
                                            @click="removeWatchList(movies)">
                                            <v-icon left>mdi-star</v-icon> Remove from Watchlist
                                        </v-btn>
                                    </div>
                                </v-overlay>
                            </v-fade-transition>

                        </v-card>
                    </template>
                </v-hover>

            </v-col>

        </v-row>
    </div>
</template>


<script>
    export default {
        methods: {
            showDetails(data) {
                this.$router.push({
                    name: 'Details',
                    params: {
                        details: data
                    }
                })
            },


            getWatchList(){
                axios.get('/watchlist/index').then(response => {
                    this.$store.commit('setWatchList', response.data);
                });
            }
        },

        mounted(){
            this.getWatchList();
        }
    }

</script>
