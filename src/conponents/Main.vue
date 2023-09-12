<script setup>
// vue
import { ref, computed, onMounted } from "vue";
// Component
import Countdown from "../conponents/Countdown.vue"
import Game from "../conponents/Game.vue"
import Result from "../conponents/Result.vue"
import Level from "../conponents/Level.vue";
import History from "../conponents/History.vue";
import Crosshair from "../conponents/Crosshair.vue"
import Chooseoption from "./Chooseoption.vue";
// RouterVue
import { useRoute } from "vue-router";
const {params} = useRoute()
const hp = ref(0)
const state = ref(0)
const pagecount = ref(false);
const timercount = ref(3);
const left = ref(0);
const top = ref(0);
const widthmove = ref(0)
const heightmove = ref(0)
const enemy = ref(false);
const timer = ref("");
const scorehit = ref(0);
const scoremove = ref(0);
const clickmove = ref(0)
const total = ref(0);
const game =ref("")
const userName = ref("");
const crossHairCursor = ref('cursor-pg')
const winWidth = ref(window.innerWidth);
const winHeight = ref(window.innerHeight);
const direction = ref('')
onMounted(()=>{
    userName.value = params.name
    game.value = params.game
})

window.addEventListener("resize", () => (winWidth.value = window.innerWidth));
window.addEventListener("resize", () => (winHeight.value = window.innerHeight));
const Cusor = (cursor) => {
  crossHairCursor.value = cursor
}
const history = (h) => {
  state.value = h
}
const nextState = () => {
  state.value++
}
const crosshairPage = (n) => {
  state.value = n
}
const backMenu = () => {
  state.value = 0
  enemy.value = false;
  timercount.value = 3;
  scorehit.value = 0;
  total.value = 0;
  scoremove.value = 0;
  clickmove.value=0
  widthmove.value=0
  heightmove.value=0
  game.value=''
}
function diff(choose) {
  switch (choose) {
    case "easy":
      delay(1200);
      countdown();
      break;
    case "normal":
      delay(1000);
      countdown();
      break;
    case "hard":
      delay(700);
      countdown();
      break;
    default:
      break;
  }
  timer.value = 30;
  state.value++
}
function diffspeed(choose) {
  switch (choose) {
    case "easy":
      delaymove(3000)
      countdown()
      widthmove.value=Number(140)
      heightmove.value=Number(140)
      break;
    case "normal":
      delaymove(3000);
      countdown()
      widthmove.value=Number(100)
      heightmove.value=Number(100)
      break;
    case "hard":
      delaymove(3000);
      countdown()
      widthmove.value=Number(60)
      heightmove.value=Number(60)
      break;
    default:
      break;
  }
  timer.value = 30;
  state.value++
}
// Random
const random = (value) => {
  top.value = Number(Math.floor(Math.random() * (winHeight.value - 331) + 70));
  left.value = Number(Math.floor(Math.random() * (winWidth.value - 753) + value));
  if(game.value !== 'aimlap')randomdirection()
  enemy.value = true;
}
const randomdirection = ()=>{
  direction.value=Math.floor(Math.random()*10)<=5?'2s':'3.5s'
}
// Delay 
function delay(time) {
  let x = setInterval(() => {
    random(500);
    if (timer.value <= 0) {
      clearInterval(x);
    }
  }, time);
}
function delaymove(time) {
  let x = setInterval(() => {
    random(20);
    hp.value= 100
    if (timer.value <= 0) {
      clearInterval(x);
    }
  }, time);
  
}
// Time
function countdown() {
  timercount.value=3
  pagecount.value = true;
  let timer = setInterval(() => {
    timercount.value--;
    if (timercount.value <= 0) {
      clearInterval(timer);
      gametimer();
      state.value++
    }
  }, 1000);
}
function gametimer() {
  let time = setInterval(() => {
    timer.value--;
    if (timer.value <= 0) {
      clearInterval(time);
      state.value++
    }
  }, 1000);
}

// Hit
function hit() {
  scorehit.value++;
  enemy.value = false;
}
function move() {
  scoremove.value++;
  hp.value-=1
  if (hp.value <=0) {
    enemy.value = false
    clickmove.value++
  }
}
const score = computed(() => {
  return Number((scorehit.value * 12 * accuracy.value));
})
const accuracy = computed(() => {
  let x = Math.floor((scorehit.value / total.value) * 100);
  return isNaN(x) ? 0 : x
});
const amcomeback = (x)=>{
  state.value=x
}


</script>
<template>
  <!-- Chooseoption -->
    <div v-if="state === 0"  >
    <Chooseoption  :name="userName"  @next-state="nextState" @cross-hair="crosshairPage"></Chooseoption>
    </div>
  <!-- Level -->
  <div v-if="state === 1"  >
    <Level :game="game" :name="userName" @diffical="diff" @next-state="nextState" @tracking="diffspeed" @back="amcomeback"></Level>
  </div>
  <!-- countdown -->
  <div v-if="state === 2" class="w-screen h-screen bg-cover bg-gray-700 m-auto text-font bg-[url('/bg/zz1.jpg')]  text-white" >
    <Countdown @next-state="nextState" :timercount="timercount" />
  </div>
  <!-- game -->
  <div v-if="state === 3" class="w-screen h-screen bg-cover bg-blue-800 text-font text-white bg-[url('/bg/zz1.jpg')]"
    @click="total++" :class="crossHairCursor">
    <Game  @hit-target="hit"  @move-target="move" :enemy="enemy" :left="left" :top="top" :direction="direction" :timer="timer" :scorehit="scorehit"  :clickmove="clickmove"  :widthmove="widthmove" :heightmove="heightmove" :game="game" :hp="hp"/>
  </div>
  <!-- result -->
  <div v-if="state === 4" class="bg-teal-900 w-screen h-screen flex flex-col text-font text-white bg-[url('/bg/qq.gif')]">
    <Result @reset-state="backMenu" @history-state="history" :score="score" :hit="scorehit" :accuracy="accuracy" :total="total" :move="scoremove" :clickmove="clickmove" :game="game" :name="userName"/>
  </div>
  <!-- crosshair -->
  <div v-if="state === 'Crosshair'"
    class="w-screen h-screen bg-purple-700 flex flex-col text-font bg-[url('/bg/bg-gif.gif')]" >
    <Crosshair @reset-state="backMenu" @crossHairCursor="Cusor" :name="userName" @back="amcomeback"></Crosshair>
  </div> 
   <!-- History -->
  <div v-if="state === 'History'">
      <History  @reset-state="backMenu" :name="userName" :game="game"/>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Sriracha&display=swap");

.text-font {
  font-family: "Sriracha", cursive;
}
</style>
