<template>
    <div>
        <div class="d-flex flex-wrap jsutify-content-between justify-content-center">
            <div v-for="genre in genres" :key="genre.id">
                <v-btn small outlined rounded color="red" class="mx-2 my-2" @click="getResultsByGenre(genre.id)">
                    {{genre.name}}
                </v-btn>
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
