<script setup>
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useDataStore } from "../stores/data.js";
import navbar from "./navbar.vue";
import moment from "moment-timezone";
let timeZone = moment.tz.guess();
const display = ref();
const title = ref();
const pudate = ref();
const des = ref();
const closedate = ref();
const data = ref();
const putime = ref();
const closetime = ref();
const datacategory = ref([]);
const category = ref("ทั่วไป");
const store = useDataStore();
const router = useRouter();
const disablebutton = ref(false);
const textEditer = ref("");
const newdata = () => {
  function displaychange() {
    if (display.value == undefined) {
      return "N";
    } else if (display.value == true) {
      return "Y";
    } else if (display.value == false) {
      return "N";
    }
  }
  const id = datacategory.value.find(
    (item) => item.categoryName == category.value
  );
  const pubish = store.checkdatetime(pudate.value, putime.value, "pubilc");
  const close = store.checkdatetime(closedate.value, closetime.value, "close");
  data.value = {
    announcementTitle:
      title.value == undefined
        ? undefined
        : title.value.length == 0
          ? undefined
          : title.value,
    announcementDescription:
      textEditer.value.getQuill().getText().trim().length == 0
        ? null
        : des.value,
    announcementDisplay: displaychange(),
    publishDate: pubish,
    closeDate: close,
    categoryId: id?.id,
  };
  add();
};
onBeforeMount(async () => {
  store.boldpage="Announcement"
  await store.fetchCategory();
  if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else {
    await store.fetchrefreshtoken();
    if(store.token == '401'){
      router.push({ path: "/login" });
    }
    datacategory.value = store.category;
  newdateuser();
  }

});
const add = async () => {
  await store.fetchadd(data.value);

  if (store.added.detail != undefined) {
    for (let i = 0; i < store.added.detail.length; i++) {
      if (store.added.detail[i].field == "announcementTitle") {
        store.added.detail[i].field = "Title";
      } else if (store.added.detail[i].field == "announcementDescription") {
        store.added.detail[i].field = "Description";
      } else if (store.added.detail[i].field == "announcementDisplay") {
        store.added.detail[i].field = "Display";
      } else if (store.added.detail[i].field == "publishDate") {
        store.added.detail[i].field = "Publish Date";
      } else if (store.added.detail[i].field == "closeDate") {
        store.added.detail[i].field = "Close Date";
      } else if (store.added.detail[i].field == "categoryId") {
        store.added.detail[i].field = "Category";
      }

      alert(
        store.added.detail[i].field + " " + store.added.detail[i].errorMessage
      );
    }
  } else {
    router.push({ path: "/admin/announcement" });
  }
};
const back = () => {
  router.push({ path: "/admin/announcement" });
};

function newdateuser() {
  const date = new Date();
  date.toLocaleString("en-GB");
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}
const checkaddtime = (parameter) => {
  if (parameter == "publishdate") {
    if (
      pudate.value != undefined &&
      pudate.value != "" &&
      (putime.value == undefined || putime.value == "")
    ) {
      putime.value = "06:00";
    }
  } else if (parameter == "closedate") {
    if (
      closedate.value != undefined &&
      closedate.value != "" &&
      (closetime.value == undefined || closetime.value == "")
    ) {
      closetime.value = "18:00";
    }
  }
};
</script>
<template>
  <!-- <div class="w-screen h-screen bg-white flex justify-center items-center">
      <div class="p-10 w-1/2 h-5/6 rounded-2xl relative bg-[#03001C]  text-white text-lg ">
        <RouterLink to="/admin/announcement">
          <label class="btn btn-sm bg-red-500 text-white hover:bg-red-500 absolute right-2 top-2">✕</label>
        </RouterLink>
        <h1 class="text-[32px] -mt-5">Create New Announcement !</h1>
        <div class="w-full h-full flex flex-col space-y-2 ">
          <div class=" w-full h-[10%]">
            <div class=" w-fit flex">
              <p>Title:</p>&nbsp;<p class="text-red-500">*</p>
            </div>
            <div class="flex flex-col w-full  ">
              <input type="text" class=" ann-title w-full  rounded-lg pl-1 bg-[#D9D9D9] text-black"
                placeholder="title name" v-model.trim="title" >
            </div>
          </div>
          <div class="flex flex-col w-full h-[40%] overflow-y-auto   ">
            <span class="flex">
              <p>Description:</p> &nbsp;<p class="text-red-500">*</p>
            </span>
              <QuillEditor theme="snow" toolbar="full" v-model:content="des" contentType="html"  class=" ann-description " ref="textEditer"/>
          </div>
          <div class="flex flex-col w-full h-[10%] ">
            <p>Publish Date:</p>
            <div class="flex w-full space-x-2">
              <input type="date" required pattern="mm/dd/yyyy" placeholder="01/05/2023" v-model="pudate"
                class="ann-publish-date rounded-lg  bg-[#D9D9D9] text-black" @change="checkaddtime('publishdate')">
              <input type="time" class=" ann-publish-time  rounded-lg pl-1 bg-[#D9D9D9] text-black" placeholder="12:30"
                v-model="putime" @change="checkaddtime('publishdate')">
            </div>
          </div>
          <div class="flex flex-col w-full h-[10%] ">
            <p>Close Date:</p>
            <div class="flex w-full space-x-2">
              <input type="date" required pattern="mm/dd/yyyy" placeholder="01/05/2023" v-model="closedate"
                class=" ann-close-date rounded-lg  bg-[#D9D9D9] text-black" @change="checkaddtime('closedate')" />
              <input type="time" class=" ann-close-time rounded-lg pl-1 bg-[#D9D9D9] text-black " placeholder="12:30"
                v-model="closetime" @change="checkaddtime('closedate')">
            </div>
          </div>
          <div class="flex flex-col w-full justify-start h-[10%] ">
            <p>Display:</p>
            <div class="space-x-2 flex">
              <input type="checkbox" class=" ann-display   rounded-lg pl-1 bg-[#D9D9D9] text-black " placeholder="display"
                v-model="display">
              <p>Check to show this announcement</p>
            </div>
          </div>
          <div class="flex flex-col w-full h-[10%]">
            <div class=" flex">
              <span class="flex">
                <p>Category: </p>
                <p class="text-red-500">*</p> &nbsp;
              </span>
              <select v-model="category" class="ann-category rounded-lg  bg-[#D9D9D9] text-black">
                <option value="ทั่วไป">ทั่วไป</option>
                <option value="ทุนการศึกษา">ทุนการศึกษา</option>
                <option value="หางาน">หางาน</option>
                <option value="ฝึกงาน">ฝึกงาน</option>
              </select>

            </div>
          </div> 
          <div class="w-full flex justify-end h-[10%]">
            <label
              class="ann-button cursor-default h-8 w-44 pl-2 text-center bg-[#C6DCE4] rounded-xl text-[#13005A] border-[#13005A] border-2 hover:bg-yellow-50"
              @click="back()">Cancel</label>
            <button
              class="ann-button cursor-default h-8 w-60 pl-2 text-center bg-[#C6DCE4] rounded-xl text-[#13005A] border-[#13005A] border-2 hover:bg-yellow-50"
              @click="newdata()" :disable="disablebutton">submit</button>
          </div>

        </div>

      </div>
  </div> -->
  <div class="w-screen h-screen">
    <div class="w-full h-full  flex-col cursor-default">
      <div class="w-full h-[6%] bg-white text-black ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col border-t-2 ">
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
                      <input type="date" required pattern="mm/dd/yyyy" placeholder="01/05/2023" v-model="pudate"
                        class="ann-publish-date rounded-lg bg-[#D9D9D9]/40 text-black"
                        @change="checkaddtime('publishdate')" />
                      <input type="time" class="ann-publish-time rounded-lg pl-1 bg-[#D9D9D9]/40 text-black"
                        placeholder="12:30" v-model="putime" @change="checkaddtime('publishdate')" />
                    </div>
                  </div>
                  <div class="w-full h-[10%] ">
                    <p class="font-bold">Close Date</p>
                    <div class="flex w-full space-x-2">
                      <input type="date" required pattern="mm/dd/yyyy" placeholder="01/05/2023" v-model="closedate"
                        class="ann-close-date rounded-lg bg-[#D9D9D9]/40 text-black"
                        @change="checkaddtime('closedate')" />
                      <input type="time" class="ann-close-time rounded-lg pl-1 bg-[#D9D9D9]/40 text-black"
                        placeholder="12:30" v-model="closetime" @change="checkaddtime('closedate')" />
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
                      @click="newdata()" :disable="disablebutton">
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
      </div>
    </div>
  </div>
</template>
<style scoped></style>
