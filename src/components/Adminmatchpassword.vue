!<script setup>
import moment from "moment-timezone";
import navbar from "./navbar.vue";
import { ref,onBeforeMount } from "vue";
import { useDataStore } from '../stores/data.js'
import{useRouter} from 'vue-router'
let timeZone = moment.tz.guess();
const router = useRouter()
const store = useDataStore()
const textcheckpassword = ref('');
const csscode = ref('')
const username = ref('')
const password=ref('')
const divdisable =ref(false)
const data = ref([])
const img= ref('')
const matchedImageSrc = '/src/image/check.png';
const notMatchedImageSrc = '/src/image/no.png';
const doesNotExistsImageSrc = '/src/image/no.png';
onBeforeMount ( async ()=>{
  store.boldpage = 'Match'

  if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else {
    await store.fetchrefreshtoken();
    console.log(store.token);
    if(store.token == '401'){
      router.push({ path: "/login" });
    }
  }
})

const checkusernameandpassword = async ()=>{
  data.value ={
    "username":username.value,
    "password":password.value
  }

  await store.fetchmatch(data.value)
  if(store.match.status == undefined){
    csscode.value='text-[#56A95D]'
    textcheckpassword.value ='Password Matched'
    img.value = 'matched'
  }else if (store.match.status == 401){
  csscode.value='text-[#D44949]'
  textcheckpassword.value ='Password NOT Matched'
  img.value = 'notMatched'
  }else{
  csscode.value='text-[#D44949]'
  textcheckpassword.value ='The specified username DOES NOT exist'
  img.value = 'doesNotExists'
  }
}

</script>
 
<template>
  <div class="w-screen h-screen ">
     <div class="w-full h-full flex-col flex cursor-default ">
       <div class="w-full h-[6%] bg-white text-[#555357] ">
         <navbar></navbar>
       </div>
       <div class="w-full h-[94%] bg-white flex-col border-t-2">
         <div class="w-full h-[80%] pl-[1%] pr-[1%] pt-[5%]">
           <div class="w-full h-full  flex flex-col items-center space-y-20">
            <div class=" w-[50%] h-[10%] flex flex-col text-xl font-bold justify-center items-center pl-5 mt-4 rounded-xl ann-message" :class="csscode" >
               <img v-show="img =='matched'" :src="matchedImageSrc" alt="Matched Image" class="mr-2 w-[10%] pb-5" />
               <img v-show="img == 'notMatched'" :src="notMatchedImageSrc" alt="Not Matched Image" class="mr-2 w-[10%] pb-5" />
               <img  v-show="img == 'doesNotExists'" :src="doesNotExistsImageSrc" alt="The specified username DOES NOT exist" class="mr-2 w-[10%] pb-5" />
               <p class="text-xl">{{ textcheckpassword }}</p>
            </div>
            <div class="w-[30%] h-[60%] " >
             <div class="w-full h-[20%] flex pl-5 text-4xl text-[#1C1B1D] font-bold ">
               <p>Match Password</p>
             </div>
             <div class="w-full h-[60%] pl-5 pr-5 space-y-5">
                 <div class="w-full h-[40%] space-y-2 flex flex-col justify-center text-[#555357] font-bold">
                   <p>Username</p>
                   <input class="w-full h-10 rounded-full border-2 border-[#C6C6C6] bg-[#F8F7F7] pl-5 ann-username" type="text" v-model="username" >
                 </div>
                 <div class="w-full h-[30%] space-y-2 text-[#555357] font-bold ">
                     <p>Password</p>
                     <input class="w-full h-10  rounded-full border-2 border-[#C6C6C6] bg-[#F8F7F7] pl-5 ann-password"  type="password" v-model="password" >
                 </div>
                 <div class="w-full h-[30%] pt-8 flex justify-center">
                   <button class="w-36 h-10 rounded-full bg-[#9798EE] border-2 border-[#8D8EE2] text-white ann-button" @click="checkusernameandpassword">Match or Not</button>
                 </div>
             </div>
            </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>
 
 
<style scoped>

</style>