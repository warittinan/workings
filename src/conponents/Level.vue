<script setup>
defineEmits(['diffical' , 'tracking', 'back'])
const props = defineProps({
  game: {
    type: String, default: ""
  },
  name: {
    type: String, default: ""
  }
})
</script>
<template>
  <div class="w-screen h-screen  m-auto text-white text-font bg-[url('/bg/bg-gif.gif')]">
    <div class="flex flex-col w-full h-full text-font">
      <div class="flex  m-3 z-10">
        <div class="flex flex-1">
          <div
            class="text-2xl font-bold rounded-2xl text-font p-4  text-white bg-black border-white border-8 h-20 w-56 text-center">
            User: {{ props.name }}
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
      <div class="flex flex-col h-full justify-center items-center space-y-8 text-3xl " v-if="props.game == 'aimlap'">
        <img class=" -mt-48 " src="/bg/logo.png" style="width:600px ;">
        <h1 class="w-44 h-20 p-1 border-8 bg-sky-900 border-blue-300 text-5xl   rounded-3xl text-center text-white">
          LEVEL
        </h1>
        <div class="flex">
            <button id="oo" class="w-32 h-14  border-4 rounded-2xl bg-emerald-500 border-white text-white"
              @click="$emit('diffical', 'easy')">
              Easy
            </button>
        </div>
        <div class="flex">
            <button class="w-32 h-14 p-1 border-4 rounded-2xl bg-yellow-500 border-white text-white"
              @click="$emit('diffical', 'normal')">
              Normal
            </button>
        </div>
        <div class="flex">
            <button class="w-32 h-14 p-1 border-4 rounded-2xl bg-red-500 border-white text-white"
              @click="$emit('diffical', 'hard')">
              Hard
            </button>
        </div>
      </div>
      <div class="flex flex-col h-full justify-center items-center space-y-8 text-3xl " v-if="props.game !== 'aimlap'">
        <img class=" -mt-48 " src="/bg/logo.png" style="width:600px ;">
        <h1 class="w-40 h-15 p-1 border-8 border-white text-4xl   rounded-3xl text-center text-white">
          LEVEL
        </h1>
        <div class="flex">
            <button class="w-32 h-14  border-8 rounded-2xl bg-emerald-500 border-white text-white"
              @click="$emit('tracking', 'easy')">
              Easy
            </button>
        </div>
        <div class="flex">
            <button class="w-32 h-14 p-1 border-8 rounded-2xl bg-yellow-500 border-white text-white"
              @click="$emit('tracking', 'normal')">
              Normal
            </button>
        </div>
        <div class="flex">
            <button class="w-32 h-14 p-1 border-8 rounded-2xl bg-red-500 border-white text-white"
              @click="$emit('tracking', 'hard')">
              Hard
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>