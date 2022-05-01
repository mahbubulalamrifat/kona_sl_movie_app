import axios from "axios";
import {
    mapGetters
} from 'vuex'


import { debounce } from './../../../../helpers'

export default {
    data() {
        return {

            search: '',

            imagePath: 'https://image.tmdb.org/t/p/original',

            videoPath: 'https://www.youtube.com/embed/',

            genres: [],

            resultsToprated: [],
            resultsTrending: [],
            resultsUpcoming: [],

            page: 1,

            dataFetching: true,

            genreId: [],
        }
    },

    methods: {


        // getGenres
        getGenres() {
            axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=49464736fba80789eb69d1c6a5b65743&language=en-US").then(response => {
                this.genres = response.data.genres
            })
        },


        // getResults
        getResults() {
            this.dataFetching = true;
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=49464736fba80789eb69d1c6a5b65743&query=' + this.search).then(response => {

                this.$store.commit('setSearchData', response.data.results);

            });
            this.dataFetching = false;
        },


        // getResults
        getResultsByGenre(id) {
            this.dataFetching = true;
            this.genreId.push(id);
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=49464736fba80789eb69d1c6a5b65743&&with_genres=' + this.genreId).then(response => {
                
                this.$store.commit('setGenreData', response.data.results);
            })
            this.dataFetching = false;
        },

        getMovieTrending() {
            this.dataFetching = true;

            axios.get(
                    'https://api.themoviedb.org/3/trending/movie/day?api_key=49464736fba80789eb69d1c6a5b65743&page=' +
                    this.page)
                .then(
                    response => {
                        if (this.page > 1) {
                            this.resultsTrending.push(...response.data.results);
                        } else {
                            this.resultsTrending = response.data.results;
                        }
                        this.dataFetching = false;
                    })

        },

        getMovieToprated() {

            this.dataFetching = true;

            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=49464736fba80789eb69d1c6a5b65743&page='+this.page)
                .then(
                    response => {
                        if(this.page > 1){
                            this.resultsToprated.push(...response.data.results);
                        }else{
                            this.resultsToprated = response.data.results;
                        }
                    })

            this.dataFetching = false;

        },


        getMovieUpcoming() {

            this.dataFetching = true;

            axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=49464736fba80789eb69d1c6a5b65743&page='+this.page)
                .then(
                    response => {
                        if(this.page > 1){
                            this.resultsUpcoming.push(...response.data.results);
                        }else{
                            this.resultsUpcoming = response.data.results;
                        }
                    })

            this.dataFetching = false;

        },


        // End Methods
    },

    watch: {

        //Excuted When make change value 
        paginate: function (value) {
            this.$Progress.start();
            this.getResults();
            this.$Progress.finish();
        },

      
        search: debounce(function (value) {
            this.$Progress.start();
            this.getResults();
            this.$Progress.finish();
        }, 1000),

    },

    computed: {

        // map this.count to store.state.count getLoading 
        ...mapGetters({
            'auth': 'getAuth',
            'searchData': 'getSearchData',
            'genreData': 'getGenreData',
        }),

    },



}
