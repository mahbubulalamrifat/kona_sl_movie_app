import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({

    state : {
        auth: null,
        searchData: null,
        genreData: null,
    },

    getters : {

        getAuth(state){
            return state.auth;
        },
        getSearchData(state){
            return state.searchData;
            
        },
        getGenreData(state){
            return state.genreData;
            
        },
    
 
    },

    mutations : {

        // Auth User
        setAuth(state, data){
            state.auth = data;
        },

        setSearchData(state, data){
            state.searchData = data;
        },

        setGenreData(state, data){
            state.genreData = data;
        },
    
    },

    actions :  {
        
    },

});