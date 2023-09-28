!
<script setup>
import { ref, onBeforeMount } from "vue";
import { useDataStore } from "../stores/data.js";
import { useRouter } from "vue-router";
import moment from "moment-timezone";
import navbar from "./navbar.vue";
let timeZone = moment.tz.guess();
let router = useRouter();
const store = useDataStore();
onBeforeMount(async () => {
  await store.fetchusers();
  if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else if(store.users == undefined){
    await store.fetchrefreshtoken();
    if(store.token == '401'){
      router.push({ path: "/login" });
  }else{
    location.reload();
  }
  }
  store.boldpage = "User";
});
const addnewuser = () => {
  router.push({ path: "/admin/user/add" });
};
const delectuser = async (id) => {
  if (confirm("Do you want to delete")) {
    await store.fetchdelectuser(id);
    await store.fetchusers();
    if (Number(store.deleted)) {
      alert("Can't delete user ");
    }
  }
};
const edituser = (id) => {
  router.push({ name: "adminedituser", params: { id: id } });
};
const logout = ()=>{
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  router.push({ path: "/login" });
}
</script>

<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full  flex-col cursor-default">
      <div class="w-full h-[6%] bg-white text-[#555357] ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col border-t-2">
        <div class="w-full h-full">
          <div class="w-full h-[14%] pl-10 pt-5 text-[#1C1B1D] font-bold flex ">
          <p class="text-6xl  ann-title w-[50%]  ">User Management</p>
          <p class="ann-timezone w-[50%] justify-end flex pr-5 text-base font-semibold text-[#555357] ">Timezone: {{ timeZone }}</p>
        </div>

        <div class="w-full h-[5%] flex items-center pr-10 justify-end">
          <button class="border-2 rounded-full border-[#213264] w-44 h-8  ann-button text-sm  bg-[#2C4282] text-white" @click="addnewuser">
            + Add New User
          </button>
        </div>
        <div class="w-full h-[81%] pl-[3%] pr-[3%] ">
          <div class="w-full h-[90%] flex-col  ">
            <div class="w-full h-full space-y-5">
              <div class="w-full h-[7%] flex  text-[#555357] font-bold border-b-2 text-lg">
              <p class="break-all w-[5%] text-center ">No.</p>
              <p class="break-all w-[14%]">Username</p>
              <p class="break-all w-[14%]">Name</p>
              <p class="break-all w-[14%]">Email</p>
              <p class="break-all w-[14%]">Role</p>
              <p class="break-all w-[14%]">Created On</p>
              <p class="break-all w-[14%]">Update On</p>
              <p class="break-all w-[11%]"></p>
            </div>
            <div class="w-full h-[90%] space-y-2 overflow-y-auto " >
              <div class=" w-full h-[10%]  rounded-2xl text-[#555357] shadow-md shadow-[#555357]/30" v-for="(user, index) in store.users" :class="index %2==0?'bg-[#D0DCFF] ':'bg-[#FFF0BB]'">
                <div class="w-full h-full flex ann-item ">
                  <p class="text-center break-all w-[5%] h-full flex items-center justify-center ">{{ index + 1 }}</p>
                  <p class="w-[14%] ann-username break-all  flex items-center">
                    {{ user.username }}
                  </p>
                  <p class="w-[14%] h-full  ann-name break-all  flex items-center">
                    {{ user.name }}
                  </p>
                  <p class="w-[14%] h-full text-left ann-email break-all  flex items-center">
                    {{ user.email }}
                  </p>
                  <p class="w-[14%] h-full ann-role break-all  flex items-center">{{ user.role }}</p>
                  <p class="w-[14%]  h-full ann-created-on break-all  flex items-center">
                    {{ store.changetime(user.createdOn) }}
                  </p>
                  <p class=" w-[14%] h-full ann-updated-on break-all  flex items-center">
                    {{ store.changetime(user.updatedOn) }}
                  </p>
                  <div class="w-[11%]  h-full flex space-x-2 justify-center items-center text-white pr-4">
                    <button class="w-20  rounded-md  ann-button bg-[#5FA0EF]" @click="edituser(user.id)">
                      edit
                    </button>
                    <button class="w-20 rounded-md ann-button bg-[#D44949]" @click="delectuser(user.id)">
                      delete
                    </button>
                  </div>
                </div>

              </div>
            </div>
            </div>
          </div>
          <div class="w-full h-[10%] flex justify-end items-center text-[#1C1B1D] space-x-2 cursor-pointer" @click="logout">
            <img src="../image/icon_logout.png" class="w-5" >
            <button> logout</button>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
