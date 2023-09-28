!<script setup>
import { ref,computed,onMounted } from "vue";
import moment from "moment-timezone";
import{useRoute,useRouter} from 'vue-router'
import { useDataStore } from '../stores/data.js'
import navbar from "./navbar.vue";
const id = useRoute()
let timeZone = moment.tz.guess();
const store = useDataStore()
const username = ref('');
const name = ref('');
const email = ref('');
const role = ref("");
const disabled = ref(true);
const newdata = ref([])
const router = useRouter()
const texterrorname = ref('')
const texterrorusername = ref('')
const texterroremail = ref('')
const csstexterror = ref("text-red-500 cursor-default")
onMounted( async()=>{
 await store.fetchuserdetail(id.params.id)
 if(localStorage.getItem("accessToken") == null){
    router.push({ path: "/login" });
  }else if(store.users == undefined){
    await store.fetchrefreshtoken();
    if(store.token == '401'){
      router.push({ path: "/login" });
    }else{
    location.reload();
    }
  }else{
    username.value = store.userdetail.username
  name.value = store.userdetail.name
  email.value = store.userdetail.email
  role.value = store.userdetail.role
  store.boldpage = 'User'
  }
  
})
const checktext = () =>{
    //   if( username.value.length >45 ||username.value.length < 1){
    //     alert("Username must be between 1 and 45")
    //     username.value = username.value.substring(0, username.value.length - 1);
    //     disabled.value = false;
    //   }else if(name.value.length >100 || name.value.length < 1){
    //     alert("Name must be between 1 and 100")
    //     name.value = name.value.substring(0, name.value.length - 1);
    //     disabled.value = false;
    //   }else if(email.value.length >150 || email.value.length < 1){
    //     alert("Email must be between 1 and 150")
    //     email.value = email.value.substring(0, email.value.length - 1);
    //     disabled.value = false;
    //   }else if( username.value.trim().length !=0 && name.value.trim().length !=0 && email.value.trim().length !=0){
    //     if(username.value != store.userdetail.username || name.value != store.userdetail.name || email.value != store.userdetail.email || role.value != store.userdetail.role){
    //       disabled.value = false;
    //     }else{
    //       disabled.value = true;
    //     }
    //   }
    //   else{
    //     disabled.value = true;
    // }
    disabled.value = false;
}
const submit = async ()=>{
newdata.value = {
  username:username.value,
  name:name.value,
  email:email.value,
  role:role.value
}

await store.fetchupdateuser(id.params.id,newdata.value)
if (store.edited.detail != undefined) {
    for (let i = 0; i < store.edited.detail.length; i++) {
      if (store.edited.detail[i].field == "username") {
        if (username.value.trim().length == 0) {
          texterrorusername.value = "The username is required";
        } else if (username.value.length > 45) {
          store.edited.detail[i].errorMessage.includes("between")
            ? (texterrorusername.value = ` ${store.edited.detail[i].errorMessage}`)
            : "";
        } else {
          texterrorusername.value = store.edited.detail[i].errorMessage;
        }
      } else if (store.edited.detail[i].field == "name") {
        if (name.value.trim().length == 0) {
          texterrorname.value = "The name is required";
        } else if (name.value.length > 100) {
          store.edited.detail[i].errorMessage.includes("between")
            ? (texterrorname.value = `${store.edited.detail[i].errorMessage}`)
            : "";
        } else {
          texterrorname.value = store.edited.detail[i].errorMessage;
        }
      } else if (store.edited.detail[i].field == "email") {
        if (email.value.trim().length == 0) {
          texterroremail.value = "The email is required"
        } else if (email.value.length > 150) {
          store.edited.detail[i].errorMessage.includes("between")
            ? (texterroremail.value = `${store.edited.detail[i].errorMessage}`)
            : "";
        } else {
          texterroremail.value = store.edited.detail[i].errorMessage;
        }
      }
    }
  } else {
    router.push("/admin/user");
  }

}
const backadminmanagement = ()=>{
  router.push('/admin/user')
}

</script>
 
<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full  flex-col cursor-default">
      <div class="w-full h-[6%] bg-white text-[#555357] ">
        <navbar></navbar>
      </div>
      <div class="w-full h-[94%] bg-white flex-col border-t-2">
        <div class="w-full h-[14%] pl-10 pt-5 text-[#1C1B1D] font-bold flex ">
          <p class="text-6xl  ann-title w-[50%]  ">User Management</p>
          <p class="ann-timezone w-[50%] justify-end flex pr-5 text-base font-semibold text-[#555357] ">Timezone: {{ timeZone }}</p>
        </div>
        <div class="w-full h-[71%] pl-[3%] pr-[3%] ">
            <form class=" w-full h-[80%] text-[#1C1B1D] border-2 rounded-xl flex-col " @submit.prevent="submit()">
                <div class=" text-2xl font-bold w-full h-[10%] flex items-center pl-10 text-[#1C1B1D]  border-b-2 ">
                    User Details:
                </div>
                <div class="w-full h-[90%] pl-10 pr-10">
                    <div class="w-full h-[20%] space-y-2 pt-5 ">
                      <div class="w-full flex space-x-5 cursor-default">
                        <p>Username</p>
                        <p :class="csstexterror  " class="ann-error-username font-bold">{{ texterrorusername }}</p>
                      </div>
                    <input class="w-full h-8 border-2 rounded-xl border-gray-400 bg-white pl-5 ann-username" type="text" v-model.trim="username" @input="checktext" required minlength="1" maxlength="45">
                </div>
                <div class="w-full h-[20%] space-y-2 pt-3">
                  <div class="w-full flex space-x-5 cursor-default">
                    <p>Name</p>
                      <p :class="csstexterror " class="ann-error-name font-bold">{{ texterrorname }}</p>
                    </div>
                    <input class="w-full h-8 border-2 rounded-xl border-gray-400 bg-white pl-5 ann-name" type="text" v-model.trim="name" @input="checktext" required minlength="1" maxlength="100" >
                </div>
                <div class="w-full h-[20%] space-y-2 pt-2">
                  <div class="w-full flex space-x-5 cursor-default">
                    <p>Email</p>
                      <p :class="csstexterror " class="ann-error-email font-bold">{{ texterroremail }}</p>
                    </div>
                    <input class="w-full h-8 border-2 rounded-xl border-gray-400 bg-white pl-5 ann-email" type="email" v-model.trim="email" @input="checktext" required maxlength="150" minlength="1"  pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/">
                </div>
                <div class="w-full h-[20%] space-y-2 ">
                    <p>Role</p>
                    <select class="bg-white border-2 rounded-xl border-gray-400 w-full ann-role pl-5 " v-model.trim="role" @change="checktext" >
                        <option value="announcer">announcer</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <div class="w-full h-[10%] flex space-x-10">
                    <div class="flex space-x-3">
                      <p>Created On :</p>
                      <p class="ann-created-on text-[#56A95D]">{{ store.changetime(store.userdetail.createdOn) }}</p>
                    </div>
                    <div class="flex space-x-3">
                      <p>Update On :</p>
                      <p class="ann-updated-on text-[#D44949]">{{ store.changetime(store.userdetail.updatedOn) }}</p>
                    </div>
                    
                </div>
                <div class="w-full h-[10%] space-x-2 ">
                    <button class="ann-button  w-20 border-2 rounded-full text-white bg-[#9798EE] border-[#9798EE]" :disabled="disabled" :class="disabled ?'bg-[#1C1B1D]/20 border-[#1C1B1D]/20 ':'bg-[#1C1B1D]/50 border-[#1C1B1D]/50 '" type="submit" >Save</button>
                    <button class="ann-button border-2 w-20 rounded-full border-[#1C1B1D]/50" @click="backadminmanagement">Cancel</button>
                </div>
                </div>
              </form>
        </div>

      </div>
    </div>
  </div>
</template>
 
<style scoped>

</style>