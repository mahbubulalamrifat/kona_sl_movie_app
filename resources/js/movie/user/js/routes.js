import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Trending from '../pages/category/trending.vue'
import Toprated from '../pages/category/toprated.vue'
import Upcoming from '../pages/category/upcoming.vue'

import Details from '../pages/movieDetails.vue'
import er404 from '../pages/common/404.vue'


const router = new VueRouter({
    mode: 'history',
    routes : [

        { 
            path: '/', 
            component: Trending,
            name: 'Trending',
            meta:{
                title: 'Movie for Enthusias -- Trending',
            },   
        },

        { 
            path: '/top-rated', 
            component: Toprated,
            name: 'Toprated',
            meta:{
                title: 'Movie for Enthusias -- Top Rated',
            },   
        },

        { 
            path: '/upcoming', 
            component: Upcoming,
            name: 'Upcoming',
            meta:{
                title: 'Movie for Enthusias -- Upcoming',
            },   
        },

        { 
            path: '/details', 
            component: Details,
            name: 'Details',
            meta:{
                title: 'Movie for Enthusias -- Details',
            },   
        },
       
        


        { 
            path: '/*', 
            component: er404,
            name: 'er404',
            meta:{
                title: 'Movie 404',
            },   
        },

    ]
});


export default router;