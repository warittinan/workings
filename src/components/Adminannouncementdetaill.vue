!<script setup>
import { ref, onBeforeMount,onMounted } from "vue";
import{useRoute,useRouter} from 'vue-router'
import moment from "moment-timezone";
import { RouterLink } from "vue-router";
import {useDataStore} from '../stores/data.js'
import Showdatadetail from "./Showdatadetail.vue";
import Navbar from "./navbar.vue";
const number = useRoute()
const router = useRouter()
const announcement = ref([])
const store = useDataStore()
let timeZone = moment.tz.guess();

onMounted(async () => {
  await store.fetchAnnouncementdetail(number.params.id) 
  store.mode = 'admin'
  if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else if(store.announcement == undefined){
    await store.fetchrefreshtoken();
    if(store.token == '401'){
      router.push({ path: "/login" });
    }else{
    location.reload();
    }
  }else if(announcement.value ==404 || announcement.value == 400){
      alert('The request page is not available')
      router.push({ name: 'Homeadmin'})
    }   

})
</script>
<!-- <template>
<div class="w-screen h-screen flex flex-col cursor-default" v-if="store.announcement != Number()">
<div class=" w-full h-[7%] bg-[#03001C] flex text-white">
  <div class="h-full w-full">
    <div class="flex lg:flex-1 pt-2 pl-4">
      <div class="-m-1.5 p-1.5 flex">
        <img class="h-8 w-auto" :src="'https://cdn-icons-png.flaticon.com/512/5371/5371017.png'" alt="integra-ted logo" />
        <span class="pt-1.5 pl-3 font-mono">INTEGRA-TED</span>
      </div>
      <span class="pt-1.5 pr-3 font-mono text-xs absolute right-0 justify-items-end">Timezone: {{ timeZone }}</span>
    </div>
</div>
</div>
<div class=" w-full h-[93%] bg-white flex ">
    <div class="w-[90%] h-full  pl-20 pt-7 flex flex-col "> 
        <Showdatadetail></Showdatadetail>
        <div class="h-2/6 w-full  flex flex-col items-center space-y-5 ">
            <button class=" btn bg-[#E9E9E9] hover:bg-[#E9E9E9] hover:border-[#A30303] border-[#A30303] text-[#A30303] w-52 h-16 normal-case text-lg font-bold border-2 rounded-full ann-button " @click="gotoedit()">Edit Announcement</button>
            <RouterLink :to="{name: 'Homeadmin'}">
              <button class="  bg-[#C6DCE4] border-[#13005A] text-[#13005A] w-52 h-16 text-lg font-bold border-2 rounded-full ann-button">Back to homepage</button>
            </RouterLink>
        </div>
    </div>

    
    <div class="w-[10%] h-full">
    </div>
</div>
</div>
<div class="w-screen h-screen flex flex-col" v-if="store.announcement == Number()">
<div class=" w-full h-[7%] bg-[#03001C] flex text-white">
  <div class="h-full w-full">
    <div class="flex lg:flex-1 pt-2 pl-4">
      <div class="-m-1.5 p-1.5 flex">
        <img class="h-8 w-auto" :src="'https://cdn-icons-png.flaticon.com/512/5371/5371017.png'" alt="integra-ted logo" />
        <span class="pt-1.5 pl-3 font-mono">INTEGRA-TED</span>
      </div>
      <span class="pt-1.5 pr-3 font-mono text-xs absolute right-0 justify-items-end">Timezone: {{timeZone}}</span>
    </div>
</div>
</div>
<div class=" w-full h-[93%] bg-white flex flex-col justify-center items-center">
  <img src="../image/cross.png" class=" w-52 ">
  <h1 class="text-[#CE1212] ">
          - No Announcement - 
         </h1>
</div>
</div>
</template> -->
<template>
  <div class="w-screen h-screen ">
    <div class="w-full h-full flex-col flex cursor-default ">
      <div class="w-full h-[6%] bg-white text-[#555357] ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col border-t-2">
        <div class="w-full h-[14%] pl-10 pt-5 text-[#1C1B1D] font-bold flex ">
          <p class="text-6xl  ann-title w-[50%]  ">SIT Announcements (SAS)</p>
          <p class="ann-timezone w-[50%] justify-end flex pr-5 text-base font-semibold text-[#555357]">Timezone: {{ timeZone }}</p>
        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] space-y-10 flex flex-col" v-if="store.announcement.content?.length != 0">
          <div class="w-full h-full  ">
            <Showdatadetail :id="number.params.id" ></Showdatadetail>
          </div>

        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] flex flex-col justify-center items-center" v-if="store.announcement.content?.length == 0">
          <img src="../image/cross.png" class=" w-52 ">
            <h1 class="text-[#CE1212] pr-8">
              No Announcement
            </h1>
        </div>
        
      </div>
      <!-- <div class="w-full h-full bg-white flex-col">
        <div class="w-full h-[14%] pl-10 text-black space-y-3">
          <p class="text-6xl font-bold ann-title">SIT Announcements (SAS)</p>
          <p class="ann-timezone">Timezone: {{ timeZone }}</p>
        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] space-y-10 flex flex-col" v-if="store.announcement.content?.length != 0">
          <div class="w-full h-full  ">
            <Showdatadetail :id="number.params.id" ></Showdatadetail>
          </div>

        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] flex flex-col justify-center items-center" v-if="store.announcement.content?.length == 0">
          <img src="../image/cross.png" class=" w-52 ">
            <h1 class="text-[#CE1212] pr-8">
              No Announcement
            </h1>
        </div>
      </div> -->
    </div>
  </div>
</template>
<style scoped></style>