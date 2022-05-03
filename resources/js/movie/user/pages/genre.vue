<template>
    <div>
        <div class="d-flex flex-wrap jsutify-content-between justify-content-center">
            
            <div v-for="genre in genres" :key="genre.id">
                <v-btn-toggle multiple class="mx-2 my-2" outlined rounded color="red">
                    <v-btn small outlined color="red" rounded @click="getResultsByGenre(genre.id)">
                        {{genre.name}}
                    </v-btn>
                </v-btn-toggle>
            </div>
            
        </div>
    </div>
</template>


<script>
    export default {

        created(){
            this.getGenres();
        }
    }

</script>
