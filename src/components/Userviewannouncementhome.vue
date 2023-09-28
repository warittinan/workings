<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from 'vue-router'
import { useDataStore } from '../stores/data.js'
import moment from "moment-timezone";
import Page from "./Page.vue"
import Showdata from "./Showdata.vue"
const searchKeyword = ref('')
const announcement = ref([])
const store = useDataStore()
let timeZone = moment.tz.guess();
const active = ref('Closed Announcements')
const category = ref('ทั้งหมด')
const datacategory = ref([])
const filtercategory = ref(null)
let count = ref(0)
import navbar from "./navbar.vue";
onBeforeMount(async () => {
  store.boldpage="Announcement"
  store.pagesbackend =0
  store.currentPage =[]
  await store.fetchAnnouncement(store.mode,store.categoryid, store.pagesbackend)
  await store.fetchCategory()

  announcement.value.content = store.announcement?.content
  count.value = store.announcement?.totalElements
  datacategory.value = store.category
  store.pagesnunber("f")
  if (store.mode == 'active' || store.mode == 'admin') {
    active.value = 'Closed Announcements'
  } else {
    active.value = 'Active Announcements'
  }
  const cat = datacategory.value.find((item) => item.id == store.categoryid) != undefined ? datacategory.value.find((item) => item.id == store.categoryid) : null
  category.value = cat != null ? cat.categoryName : 'ทั้งหมด'
})


const filter = async () => {
  const cat = datacategory.value.find((item) => item.categoryName == category.value) != undefined ? datacategory.value.find((item) => item.categoryName == category.value) : null
  filtercategory.value = cat != null ? cat.id : null
  store.categoryid = filtercategory.value
  store.pagesbackend =0
  await store.fetchAnnouncement(store.mode, store.categoryid, store.pagesbackend)
  count.value = store.announcement?.totalElements
  store.currentPage = []
  store.numberpage = 1
  store.disablenext = false
  store.disableprev = true
  store.pagesnunber("f")
  console.log(store.announcement);
}
const fetch = async () => {
  await store.fetchAnnouncement(store.mode,store.categoryid, store.pagesbackend)
  announcement.value.content = store.announcement?.content
  count.value = store.announcement?.totalElements

}
const switchmode = async () => {
  if (active.value == 'Closed Announcements') {
    store.mode = 'close'
    active.value = 'Active Announcements'
    store.pagesbackend= 0
    await fetch()
    store.currentPage = []
    store.numberpage = 1
    store.pagesnunber("f")
  } else {
    active.value = 'Closed Announcements'
    store.mode = 'active'
    store.pagesbackend= 0
    await fetch()
    store.currentPage = []
    store.numberpage = 1
    store.pagesnunber("f")
  }
}
</script>
 
<template>
  <!-- <div class="w-screen h-screen flex flex-col">
    <div class="flex flex-nowrap w-full h-1/3  bg-[#03001C] text-white">
      <div class="h-full w-full cursor-default">
        <div class="flex  pt-1 pl-4">
          <div class=" p-1.5 flex">
            <img class="h-8 w-auto" :src="'https://cdn-icons-png.flaticon.com/512/5371/5371017.png'"
              alt="integra-ted logo" />
            <span class="pt-1.5 pl-3 font-mono">INTEGRA-TED</span>
          </div>
          <span class="pt-1.5 pr-3 font-mono text-xs absolute right-0 justify-items-end">Timezone: {{ timeZone }}</span>
        </div>
        <div class="flex flex-row h-2/3  w-full items-center ">
          <div class=" h-full w-full flex justify-center items-center flex-row space-x-2  ">
            <div class="pt-16">
              <img class="h-36 w-auto" :src="'https://cdn-icons-png.flaticon.com/512/3737/3737131.png'"
                alt="megaphone logo" />
            </div>
            <div class="h-full w-fit flex flex-col space-y-6 pt-5 ">
              <p class="text-6xl pt-10 font-mono font-bold">SIT Announcements System(SAS)</p>
              <div class="w-full ">
                <input v-model.trim="searchKeyword"
                  class="w-full p-1 outline-none rounded-2xl border border-gray-200 bg-[#FFFDDE] text-gray-500 font-mono pl-4"
                  type="text" placeholder="Search for announcements" @input="input()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex h-2/3 w-full bg-white text-black">
      <div class="w-full h-full  pl-14">
        <div class=" w-full h-1/6 flex">
          <div class="flex h-1/12 space-x-3 pt-3 text-gray-400 w-full cursor-pointer">
            <p>Category: </p>
            <select v-model="category" class="ann-category-filter rounded-lg w-fit text-center h-fit  bg-[#D9D9D9] text-black"
              @change="filter">
              <option value="ทั้งหมด" >ทั้งหมด</option>
              <option value="ทั่วไป"  >ทั่วไป</option>
              <option value="ทุนการศึกษา"  >ทุนการศึกษา</option>
              <option value="หางาน"  >หางาน</option>
              <option value="ฝึกงาน"  >ฝึกงาน</option>
            </select>
          </div>
          <div class="flex w-full h-full justify-end pr-10 pt-2">
            <div>
              <button type="button"
                class=" ann-button btn  bg-[#C6DCE4] rounded-xl text-[#13005A] border-[#13005A] border-2 hover:bg-yellow-50"
                @click="switchmode"> {{ active }} </button>

            </div>
          </div>
        </div>
        <div class="w-full h-5/6 flex  pl-14"
          v-if="announcement.content?.length != 0 && filterchoos.content?.length != 0 && active == 'Active Announcements'">
          <div class=" h-full w-4/6 text-gray-500 space-y-4 ">
            <Showdata></Showdata>
          </div>
          <div class="h-full w-2/6 flex pb-10 flex-col justify-end  " v-if="count > 5">
            <Page></Page>
          </div>
        </div>
        <div class="w-full h-5/6 flex  pl-14"
          v-if="announcement.content?.length != 0 && filterchoos.content?.length != 0 && active != 'Active Announcements'">
          <div class=" h-full w-4/6 text-gray-500 space-y-4">
            <Showdata></Showdata>
          </div>
          <div class="h-full w-2/6 flex pb-10 flex-col justify-end  " v-if="count > 5">
            <Page></Page>
          </div>
        </div>
        <div class="h-11/12 w-full pt-8 text-gray-500 flex flex-col my-auto items-center "
          v-if="announcement.content?.length == 0 || filterchoos.content?.length == 0">
          <img src="../image/cross.png" class=" w-52 ">
          <h1 class="text-[#CE1212] pr-8">
            No Announcement
          </h1>

        </div>
      </div>

    </div>
</div> -->
<div class="w-screen h-screen cursor-default ">
  <div class="w-full h-full  flex-col ">
    <div class="w-full h-[6%] bg-white text-[#555357] ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col border-t-2">
        <div class="w-full h-[14%] pl-10 pt-5 text-[#1C1B1D] font-bold flex flex-row">
          <p class="text-6xl ann-title w-[50%]">SIT Announcements (SAS)</p>
          <p class="ann-timezone w-[50%] justify-end flex pr-5 text-base font-semibold text-[#555357] ">Timezone: {{ timeZone }}</p>
        </div>

        <div class="w-full h-[5%] flex items-center pr-10" >
          <div class="w-full h-[5%] flex items-center space-x-3 pl-10">
            <p class="font-bold text-[#555357]">Category: </p>
            <select v-model="category" class="ann-category  rounded-full w-fit text-center h-fit border-2 bg-white text-[#555357] border-[#1C1B1D]/50"
              @change="filter">
              <option value="ทั้งหมด"  class="ann-category-filter">ทั้งหมด</option>
              <option value="ทั่วไป"  class="ann-category-filter">ทั่วไป</option>
              <option value="ทุนการศึกษา"  class="ann-category-filter">ทุนการศึกษา</option>
              <option value="หางาน"  class="ann-category-filter">หางาน</option>
              <option value="ฝึกงาน"  class="ann-category-filter">ฝึกงาน</option>
            </select>
          </div>
          <button class="rounded-full w-60 h-8  ann-button font-bold  text-white" @click="switchmode" :class="active == 'Closed Announcements'?'bg-[#D44949]':'bg-[#56A95D]'">
            {{ active }}
          </button>
        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] space-y-10 flex flex-col" v-if="store.announcement.content?.length != 0">
          <div class="w-full h-full">
            <div class="w-full h-[70%]  ">
            <Showdata></Showdata> 
            
          </div>
          <Page v-if=" count > 5" class="w-full h-[30%]"></Page>
          </div>
        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] flex flex-col justify-center items-center" v-if="store.announcement.content?.length == 0">
          <img src="../image/cross.png" class=" w-52 ">
            <h1 class="text-[#CE1212] pr-8">
              No Announcement
            </h1>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style scoped></style>
