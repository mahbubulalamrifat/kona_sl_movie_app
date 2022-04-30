import axios from "axios";
import {
    mapGetters
} from 'vuex'


import {debounce} from './../../../../helpers'





export default {
    data() {
        return {

            search: '',

            imagePath: 'https://image.tmdb.org/t/p/original',

            videoPath: 'https://www.youtube.com/watch?v=',

            genres: [],

            results: [],

            page: 1,
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
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=49464736fba80789eb69d1c6a5b65743&query=' + this.search).then(response => {
                this.results = response.data.results

                console.log(response)
            })
        },


        // getResults
        getResultsByGenre(id) {
            axios.get('https://api.themoviedb.org/3/discover/movie?api_key=49464736fba80789eb69d1c6a5b65743&&with_genres=' + id).then(response => {
                this.results = response.data.results

                console.log(response)
            })
        }


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
            'roles': 'getRoles',
        }),

    },



}
