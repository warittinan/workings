<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { useDataStore } from '../stores/data.js'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from "vue-router";
import moment from "moment-timezone";
import navbar from "./navbar.vue";
let timeZone = moment.tz.guess();
const data = ref([])
const datacat = ref([])
const store = useDataStore()
const number = useRoute()
const router = useRouter()
const datafomat = ref([])
const datepubilc = ref()
const dateclose = ref()
const timeclose = ref()
const timepublic = ref()
const display = ref()
const countdes = ref(0)
const des = ref()
const disable = ref(true)
const title = ref()
const category = ref('ทั่วไป')

onBeforeMount(async () => {
  store.boldpage = "Announcement"
    console.log(store.announcement);
  if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else if(store.announcement.length ==0){
    await store.fetchrefreshtoken();
    if(store.token == '401'){
      router.push({ path: "/login" });
    }else{
    location.reload();
    }
  }else{
  await store.fetchAnnouncementdetail(number.params.id)
  await store.fetchCategory()
    datacat.value = store.category
  data.value = store.announcement
  des.value = data.value.announcementDescription
  title.value = data.value.announcementTitle
  category.value = data.value.announcementCategory
  display.value = data.value.announcementDisplay == "Y" ? true : false
  if (data.value.publishDate != null) {
    data.value.publishDate = new Date(data.value.publishDate)
    datepubilc.value = changeDate(data.value.publishDate)
    timepublic.value = changeTime(data.value.publishDate)
  }
  if (data.value.closeDate != null) {
    data.value.closeDate = new Date(data.value.closeDate)
    dateclose.value = changeDate(data.value.closeDate)
    timeclose.value = changeTime(data.value.closeDate)
  }
  des.value === undefined ? countdes.value = 0 : countdes.value = des.value.length
  }


});
const changeTime = (date) => {
  if (date.getFullYear() > 1970) {
    return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric' })
  }
}
const changeDate = (date) => {
  if (date.getFullYear() > 1970) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
  }
}

const submit = async () => {
  const id = datacat.value.find((item) => item.categoryName == category.value)
  const pubish = store.checkdatetime(datepubilc.value, timepublic.value, "pubilc") != undefined ? store.checkdatetime(datepubilc.value, timepublic.value, "pubilc") : null
  const close = store.checkdatetime(dateclose.value, timeclose.value, "close") != undefined ? store.checkdatetime(dateclose.value, timeclose.value, "close") : null
  function displaychange() {
    if (display.value == undefined) {
      return "N"
    } else if (display.value == true) {
      return "Y"
    } else if (display.value == false) {
      return "N"
    }
  }
  datafomat.value = {
    announcementTitle: title.value == undefined ? undefined : title.value.length == 0 ? undefined : title.value,
    announcementDescription: des.value == undefined ? undefined : des.value.length == 0 ? undefined : des.value,
    announcementDisplay: displaychange(display.value),
    publishDate: pubish,
    closeDate: close,
    categoryId: id?.id
  }
  await store.fetchedit(datafomat.value, number.params.id)
  if (store.edited.detail != undefined) {
    for (let i = 0; i < store.edited.detail.length; i++) {
      if (store.edited.detail[i].field == "announcementTitle") {
        store.edited.detail[i].field = "Title"
      } else if (store.edited.detail[i].field == "announcementDescription") {
        store.edited.detail[i].field = "Description"
      } else if (store.edited.detail[i].field == "announcementDisplay") {
        store.edited.detail[i].field = "Display"
      } else if (store.edited.detail[i].field == "publishDate") {
        store.edited.detail[i].field = "Publish Date"
      } else if (store.edited.detail[i].field == "closeDate") {
        store.edited.detail[i].field = "Close Date"
      } else if (store.edited.detail[i].field == "categoryId") {
        store.edited.detail[i].field = "Category"
      }
      alert(store.edited.detail[i].field + " " + store.edited.detail[i].errorMessage)
    }
  } else {
    router.push({ name: 'detail', params: { id: number.params.id } })
  }
}
const back = () => {
  router.push({ name: 'detail', params: { id: number.params.id } })
}
const newdate = (date) => {
  if (date == undefined) {
    return null
  } else {
    const newdate = new Date(date)
    newdate.toLocaleString('en-GB')
    return newdate.getFullYear() + "-" + (newdate.getMonth() + 1) + "-" + newdate.getDate()
  }
}
const textEditer = ref('')
const check = () => {
  if (datepubilc.value != undefined && timepublic.value == undefined) {
    timepublic.value = "06:00"
  } else if (dateclose.value != undefined && timeclose.value == undefined) {
    timeclose.value = "18:00"
  }
  let datap = data.value.publishDate != null ? newdate(data.value.publishDate) : null
  let datac = data.value.closeDate != null ? newdate(data.value.closeDate) : null
  const newp = newdate(datepubilc.value)
  const newc = newdate(dateclose.value)
  let chenkdis = textEditer.value.getQuill().getText().trim()
  let dis = display.value == false ? 'N' : 'Y'
  
  if (((chenkdis.length != 0) && (des.value != data.value.announcementDescription)) || (title.value != data.value.announcementTitle) ||
    (category.value != data.value.announcementCategory) || (dis != data.value.announcementDisplay) ||
    (newp != datap) || (newc != datac)) {
    disable.value = false
  } else {
    disable.value = true
  }
}



</script>
<template>
  <div class="w-screen h-screen ">
    <div class="w-full h-full  flex-col cursor-default">
      <div class="w-full h-[6%] bg-white text-black ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col ">
        <div class="w-full h-[14%] pl-10 pt-5 text-black font-bold flex ">
          <p class="text-6xl  ann-title w-[50%]  ">SIT Announcements (SAS)</p>
          <p class="ann-timezone w-[50%] justify-end flex pr-5 text-xl ">Timezone: {{ timeZone }}</p>
        </div>
        <div class="w-full h-[86%] pl-[1%] pr-[1%] space-y-10 flex flex-col">
          <div class="w-full h-full">
            <div class="w-full h-full pl-[1%] pr-[1%]">
              <div class="w-full h-[95%] text-black border-2 rounded-xl flex-col">
                <div class="text-2xl font-bold w-full h-[10%] flex items-center pl-5 border-b-2">
                  Announcement Detail:
                </div>
                <div class="w-full h-[90%] pl-5 pr-10 space-y-2">
                  <div class="w-full h-full ">
                    <div class="w-full h-[10%] space-y-2">
                    <p class="font-bold">Title</p>
                    <input type="text" class="ann-title w-full rounded-lg  pl-1 bg-[#D9D9D9]/40 text-black"
                      v-model.trim="title" />
                  </div>
                  <div class="w-full h-[40%] overflow-y-auto ">
                    <p class="font-bold">Description</p>
                    <QuillEditor theme="snow" toolbar="full" v-model:content="des" contentType="html"
                      class="ann-description" ref="textEditer" />
                  </div>
                  <div class="w-full h-[10%] ">
                    <p class="font-bold">Publish Date</p>
                    <div class="flex w-full space-x-2">
                      <input type="date" required pattern="mm/dd/yyyy" placeholder="01/05/2023" v-model="datepubilc"
                        class="ann-publish-date rounded-lg bg-[#D9D9D9]/40 text-black"
                        @change="check()" />
                      <input type="time" class="ann-publish-time rounded-lg pl-1 bg-[#D9D9D9]/40 text-black"
                         v-model="timepublic" @change="check()" />
                    </div>
                  </div>
                  <div class="w-full h-[10%] ">
                    <p class="font-bold">Close Date</p>
                    <div class="flex w-full space-x-2">
                      <input type="date" required pattern="mm/dd/yyyy" placeholder="01/05/2023" v-model="dateclose"
                        class="ann-close-date rounded-lg bg-[#D9D9D9]/40 text-black"
                        @change="check()" />
                      <input type="time" class="ann-close-time rounded-lg pl-1 bg-[#D9D9D9]/40 text-black"
                         v-model="timeclose" @change="check()" />
                    </div>
                  </div>
                  <div class="w-full h-[10%] ">
                    <p class="font-bold">Category</p>
                    <select v-model="category" class="ann-category rounded-lg bg-[#D9D9D9]/40 text-black">
                      <option value="ทั่วไป">ทั่วไป</option>
                      <option value="ทุนการศึกษา">ทุนการศึกษา</option>
                      <option value="หางาน">หางาน</option>
                      <option value="ฝึกงาน">ฝึกงาน</option>
                    </select>
                  </div>
                  <div class="flex flex-col w-full justify-start h-[10%] ">
                    <p>Display:</p>
                    <div class="space-x-2 flex">
                      <input type="checkbox" class=" ann-display  pl-1 bg-[#D9D9D9] text-black "
                        placeholder="display" v-model="display">
                      <p>Check to show this announcement</p>
                    </div>
                  </div>
                  <div class="w-full h-[10%] space-x-2">
                    <button
                      class="ann-button cursor-pointer  h-8 w-20  text-center  rounded-full text-white  border-2 bg-[#9798EE] border-[#9798EE] "
                      @click="submit" :disable="disablebutton">
                      Create
                    </button>
                    <button
                      class="ann-button cursor-pointer h-8 w-20  text-center  rounded-full  border-[#1C1B1D]/30  border-2 "
                      @click="back()">Cancel</button>

                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-[76%] pl-[1%] pr-[1%] flex flex-col justify-center items-center"
          v-if="store.announcement.content?.length == 0">
          <img src="../image/cross.png" class=" w-52 ">
          <h1 class="text-[#CE1212] pr-8">
            No Announcement
          </h1>
        </div>
      </div>
  </div>
</div></template>
<style scoped></style>