<script setup>
import { useDataStore } from "../stores/data.js";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useDataStore();
function nextadmin(id) {
  router.push({ name: "detail", params: { id: id } });
}
function next(id) {
  router.push({ name: "detailuser", params: { id: id } });
}
const deleteannouncement = async (id) => {
  if (confirm("Do you want to delete")) {
    await store.fetchdelect(id);
    await store.fetchAnnouncement(
      store.mode,
      store.categoryid,
      store.pagesbackend
    );
    if (Number(store.deleted)) {
      alert("Can't delete announcement ");
    }
  }
};
</script>

<template>
  <div v-if="store.mode == 'active'" class="w-full h-full space-y-3  text-[#555357]">
    <!-- <div v-for=" (filter, index) in store.announcement?.content" :key="store.id"
      class=" flex flex-row  w-full space-x-2  ann-item cursor-default">
      <div class="border-r-2 flex flex-col ">
        <div class="flex justify-end pr-3">
          <p>No.{{ (index + 1) + (5 * store.pagesbackend) }}</p>
        </div>
      </div>
      <div>
        <div class=" pb-3 text-black">
          <p class="ann-title ann-button cursor-pointer hover:underline hover:bold hover:text-black"
            @click="next(filter.id)">{{ filter.announcementTitle }}</p>
        </div>
        <div class="flex space-x-2">
          <p class=" bg-[#D9D9D9]  text-center rounded-lg ann-category"
            :class="filter.announcementCategory == 'ทั่วไป' ? 'bg-blue-300 w-16' : filter.announcementCategory == 'หางาน' ? 'bg-red-300 w-16' : filter.announcementCategory == 'ทุนการศึกษา' ? 'bg-orange-300 w-28' : filter.announcementCategory == 'ฝึกงาน' ? 'bg-indigo-400 w-16' : ''">
            {{ filter.announcementCategory }}
          </p>
        </div>
      </div>
    </div> -->
    <!-- <table class="table-fixed w-full  text-black cursor-default">
      <thead>
        <tr class="border-b-2  h-16 bg-[#D9D9D9]/20 border-[#8f8f8f] ">
          <th class=" break-all">No.</th>
          <th class="break-all text-left">Title</th>
          <th class="break-all">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filter, index) in store.announcement?.content" :key="store.id" class="text-center">
          <td class="text-center break-all h-16">
            {{ index + 1 + 5 * store.pagesbackend }}
          </td>
          <td class=" h-16 ann-title break-all cursor-pointer hover:font-bold text-left " @click="next(filter.id)">
            {{ filter.announcementTitle }}
          </td>
          <td class="h-16 ann-category break-all">
            {{ filter.announcementCategory }}
          </td>
        </tr>
      </tbody>
    </table> -->
    <div class="w-full h-[10%] flex  text-[#555357] font-bold  text-lg border-b-2">
      <p class="break-all w-[10%] text-center ">No.</p>
      <p class="break-all w-[70%]">Title</p>
      <p class="break-all w-[20%]">Category</p>
    </div>
    <div class="w-full h-[90%] text-[#555357] ">
      <div class="w-full h-full space-y-2">
        <div v-for=" (filter, index) in store.announcement.content" :key="store.id" class=" flex flex-row  w-full h-[15%]  ann-item cursor-default shadow-md shadow-[#555357]/30 rounded-2xl"  :class="index %2==0?'bg-[#D0DCFF] ':'bg-[#FFF0BB]'">
      <p class="w-[10%] text-center flex items-center justify-center ">{{ (index + 1) + (5 * store.pagesbackend) }}</p>
      <p class="w-[70%] ann-title ann-button flex items-center font-bold cursor-pointer " @click="next(filter.id)">{{ filter.announcementTitle }}</p>
      <p class=" w-[20%] rounded-lg ann-category flex items-center">{{ filter.announcementCategory }}</p>
      
    </div>
      </div>
    </div>
  </div>
  <div v-else-if="store.mode == 'close'" class="w-full h-full space-y-3  ">
    <!-- <div v-for="(filter, index) in store.announcement.content" :key="store.id"
      class="flex flex-row w-full space-x-2 ann-item cursor-default">
      <div class="flex flex-col">
        <div class="flex w-1 justify-end">
          <p>No.{{ index + 1 + 5 * store.pagesbackend }}</p>
        </div>
      </div>
      <div>
        <div class="pb-3 text-black">
          <p class="ann-title ann-button cursor-pointer hover:underline hover:bold hover:text-black"
            @click="next(filter.id)">
            {{ filter.announcementTitle }}
          </p>
        </div>
        <div class="flex space-x-2">
          <p class="bg-[#D9D9D9] text-center rounded-lg ann-category" :class="filter.announcementCategory == 'ทั่วไป'
            ? 'bg-blue-300 w-16'
            : filter.announcementCategory == 'หางาน'
              ? 'bg-red-300 w-16'
              : filter.announcementCategory == 'ทุนการศึกษา'
                ? 'bg-orange-300 w-28'
                : filter.announcementCategory == 'ฝึกงาน'
                  ? 'bg-indigo-400 w-16'
                  : ''
            ">
            {{ filter.announcementCategory }}
          </p>
          <span class="flex bg-[#D9D9D9] w-60 pl-2 rounded-lg" v-if="filter.closeDate != null">
            Close Date: &nbsp;
            <p class="ann-close-date">
              {{ store.changetime(filter.closeDate) }}
            </p>
          </span>
          <span class="flex bg-[#D9D9D9] w-28 pl-2 rounded-lg" v-if="filter.closeDate == null">
            Close Date: &nbsp;
            <p class="ann-close-date">
              {{ store.changetime(filter.closeDate) }}
            </p>
          </span>
        </div>
      </div>
    </div> -->
    <!-- <table class="table-fixed w-full text-black cursor-default">
      <thead>
        <tr class="border-b-2  h-16 bg-[#D9D9D9]/20 border-[#8f8f8f] ">
          <th class="w-20 break-all">No.</th>
          <th class="break-all">Title</th>
          <th class="break-all">Category</th>
          <th class="break-all">Colse Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filter, index) in store.announcement?.content" :key="store.id" class="text-center">
          <td class="text-center break-all">
            {{ index + 1 + 5 * store.pagesbackend }}
          </td>
          <td class="px-6 py-4 whitespace-pre-wrap ann-title break-all cursor-pointer hover:font-bold"
            @click="next(filter.id)">
            {{ filter.announcementTitle }}
          </td>
          <td class="px-6 py-4 whitespace-pre-wrap ann-category break-all">
            {{ filter.announcementCategory }}
          </td>

          <td class="ann-close-date break-all">
            {{ store.changetime(filter.closeDate) }}
          </td>
        </tr>
      </tbody>
    </table> -->
    <div class="w-full h-[10%] flex  text-[#555357] font-bold  text-lg border-b-2">
      <p class="break-all w-[10%] text-center ">No.</p>
      <p class="break-all w-[70%]">Title</p>
      <p class="break-all w-[10%]">Category</p>
      <p class="break-all w-[10%]">Close Date</p>

    </div>
    <div class="w-full h-[90%] text-[#555357] ">
      <div class="w-full h-full space-y-2">
        <div v-for=" (filter, index) in store.announcement.content" :key="store.id" class=" flex flex-row  w-full h-[15%]  ann-item cursor-default shadow-md shadow-[#555357]/30 rounded-2xl"  :class="index %2==0?'bg-[#D0DCFF] ':'bg-[#FFF0BB]'">
      <p class="w-[10%] text-center flex items-center justify-center ">{{ (index + 1) + (5 * store.pagesbackend) }}</p>
      <p class="w-[70%] ann-title ann-button flex items-center font-bold cursor-pointer " @click="next(filter.id)">{{ filter.announcementTitle }}</p>
      <p class=" w-[10%]  rounded-lg ann-category flex items-center">{{ filter.announcementCategory }}</p>
      <p class=" w-[10%] ann-close-date flex items-center">{{ store.changetime(filter.closeDate) }}</p>
      
    </div>
      </div>
    </div>
  </div>
  <div v-else-if="store.mode == 'admin'" class="w-full h-full space-y-5   ">
    <div class="w-full h-[10%] flex  text-[#555357] font-bold  text-lg border-b-2">
      <p class="break-all w-[5%] text-center ">No.</p>
      <p class="break-all w-[14%]">Title</p>
      <p class="break-all w-[14%]">Category</p>
      <p class="break-all w-[14%]">Publish Date</p>
      <p class="break-all w-[14%]">Close Date</p>
      <p class="break-all w-[14%]">Display</p>
      <p class="break-all w-[14%]">Views</p>
      <p class="break-all w-[11%]"></p>
    </div>
    <div class="w-full h-[90%] text-[#555357] ">
      <div class="w-full h-full space-y-2 ">
        <div v-for=" (filter, index) in store.announcement.content" :key="store.id" class=" flex flex-row  w-full h-[15%]  ann-item cursor-default shadow-md shadow-[#555357]/30 rounded-2xl"  :class="index %2==0?'bg-[#D0DCFF] ':'bg-[#FFF0BB]'">
      <p class="w-[5%] text-center flex items-center justify-center ">{{ (index + 1) + (5 * store.pagesbackend) }}</p>
      <p class="w-[14%] ann-title ann-button flex items-center font-bold ">{{ filter.announcementTitle }}</p>
      <p class=" w-[14%]  rounded-lg ann-category flex items-center">{{ filter.announcementCategory }}</p>
      <p class=" w-[14%] ann-publish-date flex items-center"> {{ store.changetime(filter.publishDate) }}</p>
      <p class=" w-[14%] ann-close-date flex items-center">{{ store.changetime(filter.closeDate) }}</p>
      <p class="w-[14%]   ann-display flex items-center " :class="filter.announcementDisplay == 'Y' ? 'text-[#56A95D]' : 'text-[#D44949]'">{{filter.announcementDisplay}}</p>
      <p class=" w-[14%]   ann-counter flex items-center"> {{ filter.viewCount }}</p>
      <div class="w-[11%] justify-end items-center h-full flex  space-x-2 text-white font-medium pr-4">
        <button
          class=" w-20 rounded-md  ann-button bg-[#5FA0EF]"
          @click="nextadmin(filter.id)">view</button>
        <button
          class=" ann-button  w-20 rounded-md bg-[#D44949] "
          @click="deleteannouncement(filter.id)">delete</button>
      </div>
    </div>
      </div>
    </div>
    <!-- <table class="table-fixed w-full  text-black cursor-default">
      <thead>
        <tr class="border-b-2  h-16 bg-[#D9D9D9]/20 border-[#8f8f8f] ">
          <th class="w-20 break-all">No.</th>
          <th class="break-all">Title</th>
          <th class="break-all">Category</th>
          <th class="break-all">Publish Date</th>
          <th class="break-all">Colse Date</th>
          <th class="break-all">Display</th>
          <th class="break-all">Views</th>
          <th class="break-all">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(filter, index) in store.announcement?.content" :key="store.id" class="text-center">
          <td class="text-center break-all">
            {{ index + 1 + 5 * store.pagesbackend }}
          </td>
          <td class="px-6 py-4 whitespace-pre-wrap ann-title break-all">
            {{ filter.announcementTitle }}
          </td>
          <td class="px-6 py-4 whitespace-pre-wrap ann-category break-all">
            {{ filter.announcementCategory }}
          </td>
          <td class="whitespace-pre-wrap ann-publish-date break-all">
            {{ store.changetime(filter.publishDate) }}
          </td>
          <td class="ann-close-date break-all">
            {{ store.changetime(filter.closeDate) }}
          </td>
          <td class="ann-display break-all">
            {{ filter.announcementDisplay }}
          </td>
          <td class="ann-button break-all ann-counter">
            {{ filter.viewCount }}
          </td>
          <td class="flex space-x-4 h-20 justify-center items-center">
            <button class="ann-button w-14 text-center rounded-xl border-2" @click="nextadmin(filter.id)">
              view
            </button>
            <button class="w-20 rounded-xl border-2 ann-button" @click="deleteannouncement(filter.id)">
              delete
            </button>
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<style scoped></style>
