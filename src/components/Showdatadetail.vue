!<script setup>
import { useDataStore } from '../stores/data.js'
const store = useDataStore()
import{useRoute,useRouter} from 'vue-router'
const router = useRouter()
const prop =defineProps({
  id: {
    type: Number,
  }
})
const gotoedit = () =>{
  router.push({ name: 'Adminedit', params: { id: prop.id } })
}
const backadmin = ()=>{
    router.push({ name: 'Homeadmin'})
}
const backuser = () => {
  router.push({ name: 'homeuser'})
}
</script>
 
<template>
    <div v-if="store.mode == 'active'" class="w-full h-full space-y-3">
        <div class="w-full h-[71%] pl-[1%] pr-[1%]">
            <div class=" w-full h-auto pb-8 shadow-md shadow-[#555357]/30 text-[#1C1B1D] rounded-xl flex-col bg-[#F4F4F4]">
                <div class="w-full pl-10 pr-10 space-y-2 text-[#1C1B1D]">
                    <div class="flex flex-row">
                        <div class="w-full h-[25%] space-y-2 pt-5 ">
                            <p class="ann-title font-bold text-4xl cursor-pointer">{{ store.announcement?.announcementTitle }}</p>
                        </div>
                        <div class="w-full h-full flex justify-end pt-5">
                            <p class="ann-category bg-black rounded-full text-white w-20 h-6 text-center text-sm">{{ store.announcement?.announcementCategory }}</p>
                        </div>
                    </div>
                <div class="w-full h-[25%] space-y-2">
                    <p class="ql-editor ann-description"  v-html="store.announcement.announcementDescription" ></p>
                </div>
                </div>
            </div>
            <div class="w-full h-[25%] pt-10 flex justify-center">
                <button class="ann-button w-28 h-10 rounded-full bg-[#9798EE] text-white font-semibold" @click="backuser">Back</button>
            </div>
        </div>
    </div>
    <div v-else-if="store.mode == 'close'"  class="w-full h-full space-y-3 ">
        <div class="w-full h-[71%] pl-[1%] pr-[1%]">
            <div class="w-full h-auto pb-8 shadow-md shadow-[#555357]/30 text-[#1C1B1D] rounded-xl flex-col bg-[#F4F4F4]">
                <div class="w-full pl-10 pr-10 space-y-2 text-[#1C1B1D]">
                    <div class="flex flex-row">
                        <div class="w-full h-[25%] space-y-2 pt-5 ">
                            <p class="ann-title font-bold text-4xl">{{ store.announcement?.announcementTitle }}</p>
                        </div>
                        <div class="w-full h-full flex justify-end pt-5">
                            <p class="ann-category bg-black rounded-full text-white w-20 h-6 text-center text-sm">{{ store.announcement?.announcementCategory }}</p>
                        </div>
                    </div>
                    <div class="w-full h-[25%] space-y-2">
                        <p class="ql-editor ann-description"  v-html="store.announcement.announcementDescription" ></p>
                    </div>
                <div class="w-full h-[20%] space-x-2 flex flex-row">
                    <p class="font-">Close Date :</p>
                    <p class="ann-close-date text-[#D44949]">{{ store.changetime(store.announcement?.closeDate) ? store.changetime(store.announcement?.closeDate) : '-' }}</p>
                </div>
                </div>
            </div>
            <div class="w-full h-[25%] pt-10 flex justify-center">
                <button class="ann-button w-28 h-10 rounded-full bg-[#9798EE] text-white font-semibold" @click="backuser">Back</button>
            </div>
        </div>
    </div>
    <div v-else-if="store.mode == 'admin'" class="w-full h-full space-y-3">
        <div class="w-full h-[71%] pl-[1%] pr-[1%]">
            <div class="w-full h-auto pb-8 shadow-md shadow-[#555357]/30 text-[#1C1B1D] rounded-xl flex-col bg-[#F4F4F4]">
                <div class="w-full pl-10 pr-10 space-y-2 text-[#1C1B1D]">
                    <div class="flex flex-row">
                        <div class="w-full h-[25%] space-y-2 pt-5 ">
                            <p class="ann-title font-bold text-4xl">{{ store.announcement?.announcementTitle }}</p>
                        </div>
                        <div class="flex flex-col">
                        <div class="flex flex-row space-x-3">
                            <div class="w-full h-full flex justify-end pt-5">
                            <p class="ann-category bg-black rounded-full text-white w-20 h-6 text-center text-sm">{{ store.announcement?.announcementCategory }}</p>
                        </div>
                        <div class="w-full h-full flex justify-end pt-5">
                            <p class="ann-category rounded-full text-center text-sm w-24 h-6"
                            :class="store.announcement?.announcementDisplay === 'Y' ? 'bg-[#56A95D] text-white' : 'bg-[#D44949] text-white'">
                                Display: {{ store.announcement?.announcementDisplay }}
                            </p>
                        </div>
                        </div>
                        <div class="flex justify-center pt-2">
                            <p>Views: {{ store.announcement?.viewCount }}</p>
                        </div>
                    </div>
                    </div>
                    <div class="w-full h-[25%]">
                        <p class="ql-editor ann-description"  v-html="store.announcement.announcementDescription" ></p>
                    </div>
                <div class="w-full h-[20%] space-x-2">
                    <p class="font-">Publish Date :</p>
                    <p class="ann-close-date text-[#D44949]">{{ store.changetime(store.announcement?.publishDate) ? store.changetime(store.announcement?.publishDate) : '-' }}</p>
                </div>
                <div class="w-full h-[20%] space-x-2">
                    <p class="font-">Close Date :</p>
                    <p class="ann-close-date text-[#D44949]">{{ store.changetime(store.announcement?.closeDate) ? store.changetime(store.announcement?.closeDate) : '-' }}</p>
                </div>
                </div>
                <div class="w-full h-[25%] pt-5 flex flex-row space-x-2 pl-10">
                <button class="ann-button w-20 h-8 rounded-full bg-[#9798EE] text-white font-semibold" @click="gotoedit">Edit</button>
                <button class="ann-button w-20 h-8 rounded-full bg-white border-2 border-[#555357] text-[#1C1B1D] font-semibold" @click="backadmin">Back</button>
            </div>
            </div>
        </div>
        <!-- <div class="w-full h-auto pb-8 shadow-md shadow-[#555357]/30 text-[#1C1B1D] rounded-xl flex-col bg-[#F4F4F4]">
            <div class="w-full pl-10 pr-10 space-y-2 text-[#1C1B1D]">
                    <div class="flex flex-row">
                        <div class="w-full h-[25%] space-y-2 pt-5 ">
                            <p class="ann-title font-bold text-4xl">{{ store.announcement?.announcementTitle }}</p>
                        </div>
                        <div class="w-full h-full flex justify-end pt-5">
                            <p class="ann-category bg-black rounded-full text-white w-20 h-6 text-center text-sm">{{ store.announcement?.announcementCategory }}</p>
                        </div>
                    </div>
                <div class="w-full h-[18%] space-y-2">
                    <p class="font-bold">Description</p>
                    <p class="ql-editor ann-description"  v-html="store.announcement.announcementDescription" ></p>
                </div>
                <div class="w-full h-[18%] space-y-2 ">
                    <p class="font-bold">Publish Date</p>
                    <p class="ann-publish-date">{{ store.changetime(store.announcement?.publishDate) ? store.changetime(store.announcement?.publishDate) :'-' }}</p>
                </div>
                <div class="w-full h-[18%] space-y-2 ">
                    <p class="font-bold">Close Date</p>
                    <p class="ann-close-date">{{ store.changetime(store.announcement?.closeDate) ? store.changetime(store.announcement?.closeDate) : '-' }}</p>
                </div>
                <div class="w-full h-[18%] space-y-2 ">
                    <p class="font-bold">Category</p>
                    <p class="ann-category">{{ store.announcement?.announcementCategory }}</p>
                </div>
                <div class="w-full h-[10%] space-x-2 font-bold ">
                    <button class="ann-button border-2 w-20 rounded-lg text-white bg-[#1C1B1D]/50 border-[#1C1B1D]/50"  @click="gotoedit">Edit</button>
                    <button class="ann-button border-2 w-20 rounded-lg border-[#1C1B1D]/50" @click="backadmin">Back</button>
                </div>
            </div>
        </div> -->
    </div>
    </template>
 
 
<style scoped>

</style>