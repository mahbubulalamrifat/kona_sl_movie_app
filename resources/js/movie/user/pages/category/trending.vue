<template>
    <div>

        <genre-component></genre-component>

        <v-row v-scroll="onScroll">
            <v-col cols="12" lg="3" md="6" sm="6" v-for="movies in resultsTrending" :key="movies.id">
                <v-skeleton-loader class="mx-auto" type="image, card-heading, list-item, list-item-three-line"
                    v-if="dataFetching == true"></v-skeleton-loader>
                <v-card @click="showDetails(movies)" v-else>
                    <v-img :src="imagePath+movies.poster_path" height="250"></v-img>

                    <v-card-subtitle class="d-flex justify-content-between align-items-center">
                        <span class="font-weight-bold"> {{movies.title}} </span> <span class="primary--text">
                            {{movies.release_date}} </span>
                    </v-card-subtitle>

                    <v-card-text>
                        <div class="d-flex align-items-center">
                            <v-rating :value="movies.vote_average" color="amber" length="10" dense half-increments
                                readonly size="14"></v-rating>

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

                </v-card>
            </v-col>

        </v-row>

    </div>
</template>

<script>
    import genre from "../genre.vue"
    export default {
        components: {
            "genre-component": genre,
        },
        data() {
            return {
                results: [],
            }
        },

        methods: {

            onScroll() {

                if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
                    this.page += 1;
                    this.getMovieTrending();

                }


            },

            showDetails(data) {
                this.$router.push({
                    name: 'Details',
                    params: {
                        details: data
                    }
                })
            }
        },

        mounted() {
            this.getMovieTrending();

        },

        watch: {
            searchData: function (e) {

                if (e) {
                    this.resultsTrending = e;
                }

            },

            genreData: function (e) {

                if (e) {
                    this.resultsTrending = e;
                }

            }
        }

    }

</script>
