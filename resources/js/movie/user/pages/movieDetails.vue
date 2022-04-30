<template>
    <div>
            
        <v-card outlined max-width="800" class="mx-auto">
            <v-img height="300px" :src="imagePath+allDetails.poster_path" cover v-if="img = true">

                <v-card-title class="white--text d-flex justify-content-between algin-items-center">
                    <span>
                        <v-btn small color="orange white--text" @click="playTrailer(allDetails.id)">
                            <v-icon left>mdi-motion-play</v-icon>
                            Watch Trailer
                        </v-btn>
                    </span>
                    <p class="ml-3">
                        {{allDetails.title}}
                    </p>
                </v-card-title>
            </v-img>

            <div v-for="video in videoLink" :key="video.id" v-else>
                <video width="800" height="300" controls >
                    <source :src="videoPath+video.key" type="video/mp4">
                </video>

                {{videoPath+video.key}}
            </div>
            
            <v-card-title>Casts</v-card-title>

            <v-card-actions>

                <div class="d-flex flex-wrap mx-2 align-items-center">
                    <div v-for="cast in casts" :key="cast.id">
                        <v-avatar size="60" v-if="cast.profile_path">
                            <v-img :src="imagePath+cast.profile_path"></v-img>
                        </v-avatar>
                    </div>
                </div>
                
            </v-card-actions>

            <!-- <v-card-title>Crews</v-card-title>
            <v-card-actions>

                <div class="d-flex flex-wrap mx-2 align-items-center">
                    <div v-for="crew in crews" :key="crew.id">
                        <v-avatar size="60">
                            <v-img v-if="crew.profile_path" :src="imagePath+crew.profile_path"></v-img>
                        </v-avatar>
                    </div>
                </div>
                
            </v-card-actions> -->

            <v-card-actions @click="show = !show">
                <v-btn color="orange lighten-2" text>
                    Overview
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text>
                        {{ allDetails.overview }}
                    </v-card-text>
                </div>
            </v-expand-transition>

            

            
        </v-card>

    </div>
</template>

<script>
    export default {


        data() {
            return {
                allDetails: this.$route.params.details,
                videoLink: [],
                img: true,
                casts: [],
                show: false,
            }
        },

        methods:{
            playTrailer(movie_id){
                axios.get("https://api.themoviedb.org/3/movie/"+movie_id+"/videos?api_key=49464736fba80789eb69d1c6a5b65743&language=en-US").then(response=>{
                    this.videoLink = response.data.results;
                    this.img = false;

                    console.log(response.data.results[0])
                })
            },

            getCast(){
                axios.get("https://api.themoviedb.org/3/movie/"+this.allDetails.id+"/credits?api_key=49464736fba80789eb69d1c6a5b65743&language=en-US").then(response=>{

                    //this.crews = response.data.crew;
                    this.casts = response.data.cast;

                    console.log(response.data);
                })
            }
        },

        mounted(){
            this.getCast();
        }
    }

</script>