!
<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import moment from "moment-timezone";
import { useRouter } from "vue-router";
import { useDataStore } from "../stores/data.js";
import navbar from "./navbar.vue";
const store = useDataStore();
const router = useRouter();
let timeZone = moment.tz.guess();
const username = ref("");
const name = ref("");
const email = ref("");
const role = ref("announcer");
// const disabled = ref(true);
const data = ref([]);
const password = ref("");
const confirmpassword = ref("");
const texterrorname = ref("");
const texterrorusername = ref("");
const texterrorpassword = ref("");
const texterroremail = ref("");
const csstexterror = ref("text-red-500 cursor-default text-sm");

onMounted(async () => { 
  store.boldpage = "User";
  if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else {
    await store.fetchrefreshtoken();
    if(store.token == '401'){
      router.push({ path: "/login" });
  }
  }
});
const submit = async () => {
  data.value = {
    username: username.value,
    name: name.value,
    email: email.value,
    role: role.value,
    password: password.value,
  };
  if (password.value == confirmpassword.value) {
    await store.fetchadduser(data.value);

    if (store.added.detail != undefined) {
      for (let i = 0; i < store.added.detail.length; i++) {
        if (store.added.detail[i].field == "password") {
          let req = new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,14}$"
          );
          if (password.value.trim().length == 0) {
            texterrorpassword.value = "The password is required";
          } else if (password.value.length < 8 || password.value > 14) {
            store.added.detail[i].errorMessage.includes("between")
              ? (texterrorpassword.value = `Password ${store.added.detail[i].errorMessage}`)
              : "";
          }
          else if (req.test(password.value.trim()) != true) {
            store.added.detail[i].errorMessage.includes("uppercase")
              ? (texterrorpassword.value = `Password ${store.added.detail[i].errorMessage}`)
              : "";
          }
          else if (password.value != confirmpassword.value) {
            texterrorpassword.value = "The password DOES NOT match";
          } else {
            texterrorpassword.value = `Password ${store.added.detail[i].errorMessage}`;
          }
        } else if (store.added.detail[i].field == "username") {
          if (username.value.trim().length == 0) {
            texterrorusername.value = "The username is required";
          } else if (username.value.length > 45) {
            store.added.detail[i].errorMessage.includes("between")
              ? (texterrorusername.value = ` ${store.added.detail[i].errorMessage}`)
              : "";
          } else {
            texterrorusername.value = store.added.detail[i].errorMessage;
          }
        } else if (store.added.detail[i].field == "name") {
          if (name.value.trim().length == 0) {
            texterrorname.value = "The name is required";
          } else if (name.value.length > 100) {
            store.added.detail[i].errorMessage.includes("between")
              ? (texterrorname.value = `${store.added.detail[i].errorMessage}`)
              : "";
          } else {
            texterrorname.value = store.added.detail[i].errorMessage;
          }
        } else if (store.added.detail[i].field == "email") {
          if (email.value.trim().length == 0) {
            texterroremail.value = "The email is required"
          } else if (email.value.length > 150) {
            store.added.detail[i].errorMessage.includes("between")
              ? (texterroremail.value = `${store.added.detail[i].errorMessage}`)
              : "";
          } else {
            texterroremail.value = store.added.detail[i].errorMessage;
          }
        }
      }
    } else {
      router.push("/admin/user");
    }
  } else {
    texterrorpassword.value = "The password DOES NOT match"
  }
};
const backadminmanagement = () => {
  router.push("/admin/user");
};
</script>

<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full  flex-col cursor-default">
      <div class="w-full h-[6%] bg-white text-black ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col border-t-2">
        <div class="w-full h-[14%] pl-10 pt-5 text-black font-bold flex ">
          <p class="text-6xl  ann-title w-[50%]  ">User Management</p>
          <p class="ann-timezone w-[50%] justify-end flex pr-5 text-xl ">Timezone: {{ timeZone }}</p>
        </div>
        <div class="w-full h-[71%] pl-[3%] pr-[3%] font-bold">
          <form class="w-full h-[90%] text-black border-2 rounded-lg flex flex-col overflow-x-auto"
            @submit.prevent="submit()">
            <div class="text-2xl font-bold w-full h-[10%] flex items-center pl-10 border-b-2 bg-[#D9D9D9]/30">
              User Details:
            </div>
            <div class="w-full h-[90%] pl-10 pr-10">
              <div class="w-full h-full">
                <div class="w-full h-[14%] space-y-2">
                <div class="w-full flex space-x-5 cursor-default">
                  <p>Username</p>
                  <p :class="csstexterror" class="ann-error-username">
                    {{ texterrorusername }}
                  </p>
                </div>
                <input class="w-full border-2 rounded-full border-gray-400 pl-5 ann-username bg-[#D9D9D9]/30"
                   type="text" v-model.trim="username" required minlength="1" maxlength="45" />
              </div>
              <div class="w-full h-[14%] space-y-2 cursor-default">
                <div class="w-full flex space-x-5 cursor-default">
                  <p>Password</p>
                  <p :class="csstexterror" class="ann-error-password">
                    {{ texterrorpassword }}
                  </p>
                </div>
                <input class="w-full  border-2 rounded-full border-gray-400 bg-[#D9D9D9]/30 pl-5 ann-password"
                   type="password" v-model.trim="password" required minlength="8" maxlength="14" />
              </div>
              <div class="w-full h-[14%] space-y-2 cursor-default">
                <p>
                  Confirm password
                </p>

                <input class="w-full  border-2 rounded-full border-gray-400 bg-[#D9D9D9]/30 pl-5 ann-confirm-password"
                   type="password" v-model.trim="confirmpassword" required minlength="8"
                  maxlength="14" />
              </div>
              <div class="w-full h-[14%] space-y-2 cursor-default">
                <div class="w-full flex space-x-5 cursor-default">
                  <p>Name</p>
                  <p :class="csstexterror" class="ann-error-name">
                    {{ texterrorname }}
                  </p>
                </div>

                <input class="w-full  border-2 rounded-full border-gray-400 bg-[#D9D9D9]/30 pl-5 ann-name"
                  type="text" v-model.trim="name" required minlength="1" maxlength="100" />
              </div>
              <div class="w-full h-[14%] space-y-2 cursor-default">
                <div class="w-full flex space-x-5 cursor-default">
                  <p>Email</p>
                  <p :class="csstexterror" class="ann-error-email">
                    {{ texterroremail }}
                  </p>
                </div>

                <input class="w-full  border-2 rounded-full border-gray-400 bg-[#D9D9D9]/30 pl-5 ann-email"
                  type="email" v-model.trim="email" required maxlength="150" minlength="1"
                  pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/" />
              </div>
              <div class="w-full h-[14%] space-y-2 cursor-default">
                <p>Role</p>
                <select class="bg-[#D9D9D9]/30 border-2 rounded-full border-gray-400 w-full ann-role pl-5 cursor-pointer"
                  v-model="role">
                  <option value="announcer">announcer</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div class="w-full h-[16%] flex flex-row items-center space-x-2">
                <button class="ann-button  w-20 border-2 rounded-full text-white bg-[#9798EE] border-[#9798EE]" type="submit" >
                  Save
                </button>
                <button class="ann-button border-2 w-20 rounded-full border-[#1C1B1D]/50" @click="backadminmanagement">
                  Cancel
                </button>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
