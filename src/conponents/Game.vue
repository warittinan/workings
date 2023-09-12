!<script setup>
import { computed } from "vue";
const prop = defineProps({
  timer:{
    type:Number,defualt:0},
  enemy:Boolean,
  top:{
    type:Number,default:0},
  left:{
    type:Number,default:0},
  hp:{
    type:Number,default:0},
  clickmove:{
    type:Number,default:0},
  widthmove:{
    type:Number,default:0},
  heightmove:{
    type:Number,default:0},
  game:{
    type:String,default:''},
  scorehit:{
    type:Number,default:''},
  direction:{
    type:String,default:''
  }
})
const timer = computed(()=>prop.timer)
const left = computed(()=>prop.left)
const top = computed(()=>prop.top)
const enemy = computed(() => prop.enemy)
const hp = computed(() => {
  return prop.hp.toFixed()})
const clickmove = computed(() => prop.clickmove)
const widthmove = computed(() => prop.widthmove)
const heightmove = computed(() => prop.heightmove)
const scorehit =computed(()=>prop.scorehit)
const direction=computed(()=>{
  return prop.direction})
defineEmits(['hit-target','move-target'])
</script>
 
<template>
<div v-if="prop.game=='aimlap'">
  <div class="flex justify-center text-center  ">
      <h1 class="bg-black border-white border-8 w-20 h-10 rounded-2xl my-5 mx-2 ">
        Time: {{ timer }}
      </h1>
      <h1 class="bg-black border-white border-8 w-20 h-10 rounded-2xl my-5 mx-2">
        Hit: {{ scorehit }}
      </h1>
    </div>
    <div v-show="enemy" class="w-24 h-24 bg-white rounded-full"
      :style="{ position: 'absolute', top: top + 'px', left: left + 'px' }" @click="$emit('hit-target')">
    </div>
</div>
<div v-if="prop.game!='aimlap'">
  <div class="flex justify-center text-center ">
      <div class="bg-black border-white border-8 w-20 h-10 rounded-2xl my-5 mx-2 ">
        Time: {{ timer }}
      </div>
      <div class="bg-black border-white border-8 w-20 h-10 rounded-2xl my-5 mx-2">
        Hit: {{ clickmove }}
      </div>
    </div>
    <div id="enemy" v-show="enemy" class="radial-progress bg-white text-blue-600"  
      :style="{ position: 'absolute', top: top + 'px', left: left + 'px', width: widthmove + 'px', height: heightmove + 'px'}
      " v-bind:style="`--value:${hp}`" @mousemove  ="$emit('move-target')">{{ hp }}%
    </div>
</div>
</template>
 
<style scoped>
@keyframes movement{
  0%  {transform:translate(0)}
  50%  {transform:translate(500px)}
  100% {transform:translate(0px)}
}
div #enemy{
  background-color: paleturquoise;
  animation: movement v-bind(direction) infinite;
}


</style>