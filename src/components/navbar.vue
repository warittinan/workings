<script setup>
import { useDataStore } from "../stores/data.js";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useDataStore();
</script>
 
<template >
  <div class="w-full h-full flex-col ">
    <div class=" w-full h-full flex  cursor-default">
    <div class="flex w-[20%] h-full items-center pl-5 space-x-2 ann-app-title">
      <img class="h-8 w-auto" :src="'https://cdn-icons-png.flaticon.com/512/5371/5371017.png'" alt="integra-ted logo" />
      <p class="text-base font-bold text-[#1C1B1D]">INTEGRA-TED</p>
    </div>
    <div class="flex w-[60%] h-full items-center">
      <button class="ann-menu w-[45%] flex justify-end pr-16 text-base  break-all"
        :class="store.boldpage == 'Announcement' ? 'font-bold' : ''" @click="store.gotoannouncement">
        Announcements
      </button>
      <button class="ann-menu w-[10%] flex items-center   text-base break-all"
        :class="store.boldpage == 'User' ? 'font-bold' : ''" @click="store.gotousers">
        User
      </button>
      <button class="ann-menu w-[45%]  flex items-center  text-base  break-all"
        :class="store.boldpage == 'Match' ? 'font-bold' : ''" @click="store.gotomatchpassword">
        Match Password
      </button>
    </div>
    <div class="flex w-[20%] h-full items-center justify-end pr-5 font-bold text-xl text-[#1C1B1D]">
      <p>SAS</p>
    </div>
    
  </div>
  </div>
  
</template>
 
<style scoped></style>