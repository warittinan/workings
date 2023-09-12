<script setup>
import { computed,onMounted } from "vue";
import { useRouter } from 'vue-router';
const prop = defineProps({
  score: { type: Number, default: 0 },
  hit: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0.00 },
  total: { type: Number, default: 0 },
  game: { type: String, default: "" },
  move: { type: Number, default: 0 },
  clickmove: { type: Number, default: 0 },
  name: { type: String, default: "" }
})
const aimlap = async (backs) => {
  try {
    const data = await fetch('http://localhost:5000/aimlap', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: prop.name, score: prop.score, scorehit: scorehit.value, accuracy: accuracy.value
      })
    })
    if (data.ok && backs === true) {
      console.log('Post success')
      emits('reset-state')
      back()
    }else if(data.ok && backs === false){
      console.log('Post success')
      emits('history-state','History')
    }else{
      console.log('Post Error');
    }
  } catch (error) {
    console.log(error)
  }
}
const tracking = async (backs) => {
  try {
    const data = await fetch('http://localhost:5000/tracking', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: prop.name, hit: prop.clickmove, score: scoremove.value
      })
    })
    if (data.ok && backs === true) {
      console.log('Post success')
      emits('reset-state')
      back()

    }else if( data.ok && backs === false){
      console.log('Post success')
      emits('history-state','History')
    } else{
      console.log('Post Error');
    }
  } catch (error) {
    console.log(error)
  }
}

const emits = defineEmits(['reset-state','history-state'])
const scorehit = computed(() => prop.hit)
const accuracy = computed(() => prop.accuracy)
const total = computed(() => prop.total)
const scoremove = computed(() => prop.move)
const router = useRouter()
const back = () => {
  router.push({ name: 'Menuback', params: { name: prop.name } })
}

</script>
<template>
  <div class=" w-screen h-screen">
    <div v-if="prop.game == 'aimlap'" class="w-full h-full flex flex-col">
      <div class="flex h-20 flex-row justify-center my-5 ">
        <div class=" w-48 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl text-center py-3  text-4xl ">
          Result
        </div>
      </div>
      <div class="flex h-full w-full flex-row   ">
        <div class=" flex flex-col w-1/4  items-center">
          <div class="flex h-1/2 ">
            <button class=" w-52 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl hover:bg-green-500  text-2xl"
              @click=" aimlap(false)">
              History
            </button>
          </div>
          <div class="flex h-1/2 items-end mb-5 ">
              <button class=" w-52 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl hover:bg-red-500 text-2xl"
                @click="aimlap(true)">
                Back To Menu
              </button>
          </div>
        </div>
        <div class="flex flex-col w-1/4   items-start ">
          <div class="flex h-1/2 items-center  ">
            <div class="w-52 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
              <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
                <p>Time</p>
              </div>
              <div class="absolute m-20">
                <div class="text-white text-4xl ">30</div>
              </div>
            </div>
          </div>
          <div class="flex h-1/2 items-center  ">
            <div class="w-52 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
              <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
                <p>Hit</p>
              </div>
              <div class="absolute m-20">
                <div class="text-white text-4xl ">{{ scorehit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-1/4   items-start ">
          <div class="flex h-1/2 items-center  ">
            <div class="w-52 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
              <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
                <p>Accuracy</p>
              </div>
              <div class="absolute m-20">
                <div class="text-white text-4xl ">{{ accuracy }}%</div>
              </div>
            </div>
          </div>
          <div class="flex h-1/2 items-center  ">
            <div class="w-52 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
              <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
                <p>Miss</p>
              </div>
              <div class="absolute m-20">
                <div class="text-white text-4xl ">{{ total - scorehit }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class=" flex flex-col w-1/4 h-full justify-center items-start">
          <div class="w-72 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
            <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
              <p>Score</p>
            </div>
            <div class="absolute m-20">
              <div class="text-white text-4xl "> {{ score }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="prop.game != 'aimlap'" class="w-full h-full flex flex-col">
      <div class="flex h-20 flex-row justify-center my-5 ">
        <div class=" w-48 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl text-center py-3  text-4xl ">
          Result
        </div>
      </div>
      <div class="flex h-full w-full flex-row   ">
        <div class=" flex flex-col w-1/4  items-center">
          <div class="flex h-1/2 ">
            <button class=" w-52 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl hover:bg-green-500  text-2xl"
              @click="tracking(false)">
              History
            </button>
          </div>
          <div class="flex h-2/3 items-end mb-5 ">
              <button class=" w-52 h-20 border-8 bg-sky-900 border-blue-300 rounded-3xl hover:bg-red-500 text-2xl"
                @click="tracking(true)">
                Back To Menu
              </button>
          </div>
        </div>
        <div class="flex flex-col w-1/4 h-full justify-center items-start">
          <div class="w-52 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
            <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
              <p>Time</p>
            </div>
            <div class="absolute m-20">
              <div class="text-white text-4xl ">30</div>
            </div>
          </div>
        </div>
        <div class=" flex flex-col w-1/4 h-full justify-center  items-start">
          <div class="w-52 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
            <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
              <p>Hit</p>
            </div>
            <div class="absolute m-20">
              <div class="text-white text-4xl "> {{ clickmove }}</div>
            </div>
          </div>
        </div>
        <div class=" flex flex-col w-1/4 h-full justify-center  items-start">
          <div class="w-72 h-52 border-4 rounded-2xl  bg-sky-900 border-white flex justify-center ">
            <div class="w-40 h-14 text-3xl border-4 bg-sky-900 border-white flex justify-center -mt-4 py-2 rounded-xl">
              <p>Score</p>
            </div>
            <div class="absolute m-20">
              <div class="text-white text-4xl "> {{ scoremove }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>