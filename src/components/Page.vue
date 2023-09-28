!<script setup>
import { useDataStore } from '../stores/data.js'
const store = useDataStore()
</script>
 
<template>
  <div class=" w-full flex flex-row justify-center space-x-3 text-[#1C1B1D]/70 h-10 ">
                <button class=" w-16 h-10 text-center  ann-page-prev rounded-xl text-white shadow-md shadow-black/30  " :class="store.disableprev == false?`bg-[#9798EE]  `:'bg-[#D0DCFF]'" @click="store.pages('Prev') "
                  :disabled="store.disableprev">Prev</button>
                  <div v-for="(id,index) in store.currentPage" :key="index" class="h-10">
                  <button class=" w-10 h-10  text-center rounded-xl text-[#9798EE]  shadow-md shadow-black/30 " :class="`ann-page-${index}`,store.numberpage == id ? `bg-[#FFF0BB]     ` : `bg-[#D0DCFF]   ` "
                    @click="store.pages(id)">{{ id }}</button>
                </div>
                <button class=" w-16 h-10 text-center  ann-page-next rounded-xl  text-white shadow-md shadow-black/30  " :class="store.disablenext == false?`bg-[#9798EE]  `:'bg-[#D0DCFF]'"  @click="store.pages('Next')"
                  :disabled="store.disablenext">Next</button>
              </div>
  </template>
 
<style scoped>

</style>