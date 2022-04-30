<template>
    <div>

        <genre-component></genre-component>

        <v-row v-scroll="onScroll">
            <v-col cols="3" lg="3" md="3" v-for="movies in results" :key="movies.id">
                <v-card @click="showDetails(movies)">
                    <v-img :src="imagePath+movies.poster_path" height="250"></v-img>

                    <v-card-subtitle class="d-flex justify-content-between align-items-center">
                        <span class="font-weight-bold"> {{movies.title}} </span> <span class="primary--text"> {{movies.release_date}} </span>
                    </v-card-subtitle>

                    <v-card-text>
                        <div class="d-flex align-items-center">
                            <v-rating :value="movies.vote_average" color="amber" length="10" dense half-increments readonly
                                size="14"></v-rating>

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
        components:{
            "genre-component":genre,
        },

        methods: {

            onScroll(){

                if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                    
                    this.page += 1;
                    this.getMovie();
                }

            },

            getMovie() {

                axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=49464736fba80789eb69d1c6a5b65743&page='+this.page)
                    .then(
                        response => {
                            if(this.page > 1){
                                this.results.push(response.data.results);
                            }else{
                                this.results = response.data.results;
                            }
                        })

            },

            showDetails(data){
                this.$router.push({name: 'Details', params: { details: data }})
            }
        },

        mounted() {
            this.getMovie();
            
        },
    }

</script>