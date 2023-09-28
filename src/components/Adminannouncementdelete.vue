!<script setup>
import { ref, onBeforeMount, onMounted } from "vue";
import { useRouter,useRoute } from 'vue-router'
import { useDataStore } from '../stores/data.js'
const router = useRouter()
const route = useRoute()
const store = useDataStore()
const next = async (parameter) => {
    if(parameter == 'cancel'){
        router.push({ path:'/admin/announcement' })
}else{
    await store.fetchdelect(route.params.id)
    router.push({ path:'/admin/announcement' })
}   
}
</script>
 
<template>
<div class=" w-screen h-screen flex items-center justify-center bg-white">
          <div class=" w-full h-full flex justify-center items-center">
            <div class="w-1/2 h-1/2 rounded-xl relative bg-[#03001C] flex flex-col justify-center text-white space-y-5">
              <RouterLink to="/admin/announcement">
                <label class="btn btn-sm bg-red-500 text-white hover:bg-red-500 absolute right-2 top-2">✕</label>
              </RouterLink>
              <div class="flex flex-col text-center justify-center space-y-2 ">
                <p class="text-5xl">Delete Announcement ?</p>
              <p>Deleting this announcement will also delete announcement data.</p>
              </div>
            <div class="flex justify-center space-x-8">
                <label  class=" cursor-default h-8 w-44 pl-2 text-center bg-[#C6DCE4] rounded-xl text-[#03001C] border-[#13005A] border-2 hover:bg-yellow-50" @click="next('cancel')">Cancel</label>
                <label  class=" cursor-default h-8 w-44 pl-2 text-center bg-[#C6DCE4] rounded-xl text-[#A30303] border-[#13005A] border-2 hover:bg-yellow-50" @click="next('delete')">Delete</label>
            </div>
             </div>
          </div>
        </div>

</template>
 
<style scoped>

</style>