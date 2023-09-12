<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
<div class=" w-screen h-screen flex justify-center items-center bg-white text-black">
    <div class="text-5xl justify-center flex flex-col items-center space-y-4">
        <h1> 404 PAGE NOT FOUND</h1>
        <RouterLink to="/">
            <button class="w-52 h-20 bg-red-300 rounded-xl text-white">Home</button>
        </RouterLink>
    </div>
</div>
</template>
 
<style scoped>

</style>