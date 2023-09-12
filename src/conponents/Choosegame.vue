!<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const {params} = useRoute();
const router = useRouter()
const prop = defineProps({
  name:{
    type:String,default:""
  }
})
const selectgame = (game)=>{
  router.push({name:'Play',params:{name:params.name,game:game}})
}
const back = ()=> {
  router.push({name:'Menuback',params:{name:params.name}})
}

</script>
<template>
  <div class="w-screen h-screen  m-auto text-white text-font bg-[url('/bg/bg-gif.gif')]">
<div class="flex flex-col w-full h-full  text-font ">
    <div class="flex h-fit m-3 z-10 ">
        <div class="flex flex-1">
          <div
          class="text-2xl font-bold rounded-2xl text-font p-4  text-white bg-black border-white border-8 h-20 w-56 text-center"
        >
        User: {{ params.name }}
        </div>
        </div>
      <div class="flex flex-2">
          <div
          class="btn rounded-2xl text-font p-4 hover:border-white hover:bg-red-500 text-white bg-black border-white border-8 h-20 w-52 text-center text-xl "
          @click=" back()">
          Back
        </div>

</div>
      </div>    
      <div class=" flex flex-col h-full justify-center items-center space-y-8">
      <img class=" -mt-48 " src="/bg/logo.png" style="width:700px ;"> 
       <div class="w-[400px] h-24  border-8 rounded-2xl  bg-sky-900 border-blue-300">
        <h1 class=" w-96  mt-2  ml-6 font-thin  text-white text-6xl ">
        Minigame🎲
        </h1>
      </div>
      <div class="flex  space-x-40 mt-96 ">
        <button class="w-56 h-40  text-3xl font-mono  border-8 rounded-2xl bg-red-600 border-white hover:bg-green-600" 
          @click="selectgame('aimlap')">
          Aimlap 🎯 
        </button>
        <div class=" border-8 rounded-2xl border-white"> </div>
        <div>
          <button class="w-56 h-40 text-3xl font-mono border-8 rounded-2xl bg-yellow-600 border-white hover:bg-green-600"
            @click="selectgame('tracking')">
              Tracking 🖱
            </button>
          </div>
        </div>
    </div>
    </div>
  </div>
</template>
 
<style scoped>

</style>