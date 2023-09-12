<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const prop = defineProps({
  score: { type: Number, default: 0 },
  hit: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0.00 },
  total: { type: Number, default: 0 },
  game: { type: String, default: "" },
  move: { type: Number, default: 0 },
  clickmove: { type: Number, default: 0 },
  name: { type: String, default: "" },
})
const useraimlap = async () => {
  try {
    const get = await fetch('http://localhost:5000/aimlap')
    if (get.ok) {
      const user = await get.json()
      return user
    } else {
      console.log("Don't get");
    }
  } catch (error) {
    console.log(error);
  }
}
onMounted(async () => {
  dataaimlap.value = await useraimlap()
  datatracking.value = await usertracking()
})

const usertracking = async () => {
  try {
    const get = await fetch('http://localhost:5000/tracking')
    if (get.ok) {
      const user = await get.json()
      return user
    } else {
      console.log("Don't get");
    }
  } catch (error) {
    console.log(error);
  }
}
const dataaimlap = ref([])
const datatracking = ref([])
const emits = defineEmits(['reset-state'])
const router = useRouter()
const { params } = useRoute()
const back = () => {
  if (params.name == undefined) {
    backhavenotuser()
  } else {
    router.push({ name: 'Menuback', params: { name: params.name } })
  }
}

const backhavenotuser = () => {
  emits('reset-state')
  router.push({ name: 'Menuback', params: { name: prop.name } })
}
</script>

<template>
  <div class="bg-teal-900 w-screen h-screen flex flex-col text-font text-white bg-[url('/bg/qq.gif')]">
  <div class="w-full h-full flex flex-col">
    <div class="flex  flex-col items-center  space-y-5 my-4 ">
      <div class=" w-52 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl text-center py-3  text-4xl ">
          History🏆
        </div>
        <div class="w-96 h-40 border-4  border-blue-300 rounded-3xl bg-cover bg-no-repeat bg-center"
          style="background-image: url('/bg/Doraemon.png');"> </div>
      </div>

      <div class="flex h-full w-full flex-row   ">
        <div class=" flex flex-col w-1/5 justify-end items-center">
          <div class="flex  items-end mb-5 ">
            <button class=" w-52 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl hover:bg-red-500 text-2xl"
              @click="back()">
              Back To Menu
            </button>
          </div>
        </div>
        <div class="flex flex-col w-4/5 h-full justify-center items-start" v-if="prop.game === 'tracking'">
          <div class=" w-full   h-[400px] mb-5  overflow-y-auto  text-black bg-white border-8 border-blue-300">

            <table class="w-full  ">
              <tr class="text-black bg-white border-b-4 border-blue-300 h-14">
                <th class="w-4/12 border-r-4 border-blue-300">Name</th>
                <th class="w-4/12 border-r-4 border-blue-300">Hit</th>
                <th class="w-4/12 border-blue-300">Score</th>
              </tr>
              <tr v-for=" user in datatracking " :key="user.id" class="text-center h-14">
                <td class="w-4/12 "> {{ user.name != '' ? user.name : "null" }}</td>
                <td class="w-4/12 ">{{ user.hit }}</td>
                <td class="w-4/12">{{ user.score }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="flex flex-col w-4/5 h-full justify-center items-start" v-if="prop.game === 'aimlap'">
          <div class=" w-full h-[400px] mb-5  overflow-y-auto  text-black bg-white border-8 border-blue-300">            
              <table class="w-full  ">
                <tr class="text-black bg-white border-b-4 border-blue-300 h-14">
                  <th class="border-r-4 border-blue-300 w-3/12">Name</th>
                  <th class="border-r-4 border-blue-300 w-3/12">Hit</th>
                  <th class="border-r-4 border-blue-300 w-3/12">Accuracy</th>
                  <th class=" border-blue-300 w-3/12">Score</th>
                </tr>
                <tr v-for=" user in dataaimlap " :key="user.id" class="text-center h-14">
                  <td class="w-3/12 "> {{ user.name != '' ? user.name : "null" }}</td>
                  <td class="w-3/12 ">{{ user.scorehit }}</td>
                  <td class="w-3/12 ">{{ user.accuracy }}%</td>
                  <td class="w-3/12">{{ user.score }}</td>
                </tr>
              </table>
          </div>
        </div>
        <div v-if="prop.game == ''" class="w-full h-full flex space-x-10 ">
          <div class="flex flex-col w-2/4 h-full justify-center items-start">
            <h1>Aimlap:</h1>
            <div class=" w-full   h-[400px] mb-5  overflow-y-auto  text-black bg-white border-8 border-blue-300">

              <div class="flex">
                <table class="w-full  ">
                  <tr class="text-black bg-white border-b-4 border-blue-300 h-14">
                    <th class="border-r-4 border-blue-300 w-3/12">Name</th>
                    <th class="border-r-4 border-blue-300 w-3/12">Hit</th>
                    <th class="border-r-4 border-blue-300 w-3/12">Accuracy</th>
                    <th class="border-blue-300">Score</th>
                  </tr>
                  <tr v-for=" user in dataaimlap " :key="user.id" class="text-center h-14">
                    <td class="w-3/12 "> {{ user.name != '' ? user.name : "null" }}</td>
                    <td class="w-3/12 ">{{ user.scorehit }}</td>
                    <td class="w-3/12 ">{{ user.accuracy }}%</td>
                    <td class="w-3/12 ">{{ user.score }}</td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
          <div class="flex flex-col w-2/4 h-full justify-center items-start">
            <h1>Tracking:</h1>
            <div class=" w-full  h-[400px] mb-5  overflow-y-auto  text-black bg-white border-8 border-blue-300">
              <table class="w-full  ">
                <tr class="text-black bg-white border-b-4 border-blue-300 h-14">
                  <th class="w-4/12 border-r-4 border-blue-300">Name</th>
                  <th class="w-4/12 border-r-4 border-blue-300">Hit</th>
                  <th class="w-4/12 border-blue-300">Score</th>
                </tr>
                <tr v-for=" user in datatracking " :key="user.id" class="text-center h-14">
                  <td class="w-4/12 "> {{ user.name != '' ? user.name : "null" }}</td>
                  <td class="w-4/12 ">{{ user.hit }}</td>
                  <td class="w-4/12">{{ user.score }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="w-1/5">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>