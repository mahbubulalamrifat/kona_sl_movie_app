<template>
    <v-app>
        <nav-bar></nav-bar>
        <v-main>
            <div class="pa-3">
                <router-view></router-view>
                <vue-progress-bar></vue-progress-bar>
            </div>
        </v-main>

        <!-- Back to top btn -->
        <v-btn v-scroll="onScroll" v-show="fab" fab dark fixed bottom right color="primary" @click="toTop">
            <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      
    </v-app>
</template>

<script>

import navBar from './pages/common/navbar.vue'


export default {

    props: ['authuser', 'permission'],

    components:{
       'nav-bar'        : navBar,
    },

    data(){
        return{
            fab: false
            
        }
    },

    methods:{

        onScroll(e) {
            if (typeof window === 'undefined') return
            const top = window.pageYOffset || e.target.scrollTop || 0
            this.fab = top > 20
        },

        toTop() {
            this.$vuetify.goTo(0)
        },

    

       
    },

   

    created(){

        

        this.$Progress.start();

        this.$Progress.finish();  
    }
    
}
</script>

