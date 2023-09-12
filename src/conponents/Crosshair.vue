<script setup>
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import data from "../data/data.json"
defineEmits(['reset-state', 'crossHairCursor','back'])
const prop = defineProps({
  name: {
    type: String, default: ""
  }
})
const type = ref('P')
const CrossColor = ref('Green')
let cursor = ref('')
const crossData = computed(() => {
  cursor.value = data.find((crs) => crs.type == type.value).color.find((cx) => cx.id == CrossColor.value).cursor
  return data.find((crs) => crs.type == type.value).color.find((cx) => cx.id == CrossColor.value).image
})
const crossReset = ref(() => {
  type.value = "P"
  CrossColor.value = "Green"
})
</script>
<template>
  <div  class="w-screen h-screen bg-purple-700 flex flex-col text-font bg-[url('/bg/bg-gif.gif')]">
    <div class="flex  m-3 ">
    <div class="flex flex-1">
      <div
        class="text-2xl font-bold rounded-2xl text-font p-4  text-white bg-black border-white border-8 h-20 w-56 text-center">
        User: {{ prop.name }} 
      </div>
    </div>
    <div class="flex flex-2">
        <div
          class="btn rounded-2xl text-font p-4 hover:border-white hover:bg-red-500 text-white bg-black border-white border-8 h-20 w-52 text-center text-xl "
          @click=" $emit('back',0)">
          Back
        </div>
    </div>
  </div>
  <div class="flex flex-row h-full w-full ">
    <div class="flex w-1/2">
      <div class="m-auto bg-white w-[400px] h-[400px] rounded-3xl">
        <div class="absolute m-24 w-[400px] h-[400px] ">
          <img :src= "'/' + crossData" style="width: 200px; height: 200px" />
        </div>
      </div>
    </div>
    <div class="flex flex-col w-1/2   m-auto">
      <div class="flex justify-center">
        <div class="rounded-2xl p-4 border-8 bg-black text-white text-font text-2xl">
          CHANGE CROSSHAIR
        </div>
      </div>
      <div class="grid grid-flow-col justify-center">
        <div class="grid grid-flow-col mt-10">
          <div class="bg-white w-20 h-20 ml-5 ">
            <div class="absolute m-6 w-20 h-20">
              <img src="../assets/pt/p/pblack.png" style="width: 30px; height: 30px" />
            </div>
          </div>
          <div class="bg-white w-20 h-20 ml-5">
            <div class="absolute m-6 w-20 h-20">
              <img src="../assets/pt/x/xblack.png " style="width: 30px; height: 30px" />
            </div>
          </div>
          <div class="bg-white w-20 h-20 ml-5">
            <div class="absolute m-6 w-20 h-20">
              <img src="../assets/pt/o/oblack.png " style="width: 30px; height: 30px" />
            </div>
          </div>
          <div class="bg-white w-20 h-20 ml-5">
            <div class="absolute m-6 w-20 h-20">
              <img src="../assets/pt/t/Tblack.png " style="width: 30px; height: 30px" />
            </div>
          </div>
        </div>
      </div>
      <div class="grid mt-5 justify-center">
        <div class="grid grid-flow-col mt-5 w-[400px]">
          <div>
            <input type="radio" value="P" id="P" v-model="type" class="radio radio-success ml-12" />
            <input type="radio" value="X" id="X" v-model="type" class="radio radio-success ml-20 mr-2" />
            <input type="radio" value="O" id="O" v-model="type" class="radio radio-success ml-16 mr-2" />
            <input type="radio" value="T" id="T" v-model="type" class="radio radio-success ml-16" />
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col justify-center">
        <div class="grid-flow-col rounded-lg mt-32 ">
          <input type="radio" id="green" value="Green" v-model="CrossColor" class="radio radio-success " />
          <label for="green" class="text-white m-auto font-bold text-xl text-font">Green</label>
          <input type="radio" id="black" value="Black" v-model="CrossColor" class="radio radio-success ml-5" />
          <label for="black" class="text-white m-auto font-bold bth text-xl text-font">Black</label>
          <input type="radio" id="red" value="Red" v-model="CrossColor" class="radio radio-success ml-5" />
          <label for="red" class="text-white m-auto font-bold text-xl text-font">Red</label>
          <input type="radio" id="yellow" value="Yellow" v-model="CrossColor" class="radio radio-success ml-5" />
          <label for="yellow" class="text-white m-auto font-bold text-xl text-font">Yellow</label>
          <input type="radio" id="blue" value="Blue" v-model="CrossColor" class="radio radio-success ml-5" />
          <label for="blue" class="text-white m-auto font-bold text-xl text-font">Blue</label>
        </div>
      </div>
      <div class="grid grid-flow-col justify-center space-x-10">
        <button
          class="btn bg-black border-8 border-white rounded-2xl w-20 text-lg text-white mt-20 text-font hover:border-white hover:bg-red-500 "
          @click="$emit('crossHairCursor', cursor),$emit('back',0)">Done</button>

        <button
          class="btn bg-black border-8 border-white rounded-2xl w-20 text-lg text-white mt-20 text-font hover:border-white hover:bg-red-500 "
          @click="crossReset">Reset</button>
      </div>
    </div>
  </div>
  </div>
</template>
 
<style scoped></style>