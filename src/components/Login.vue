<script setup>

import { ref, onBeforeMount } from "vue";
import { useDataStore } from '../stores/data.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useDataStore()
const textcheckpassword = ref('');
const csscode = ref('')
const username = ref('')
const password = ref('')
const divdisable = ref(false)
const btndisable = ref(true)
const data = ref([])
const successImageSrc = '/src/image/check.png';
const incorrectImageSrc = '/src/image/no.png';
const doesNotExistsImageSrc = '/src/image/no.png';
const img = ref('')
const submit = async () => {
  data.value = {
    "username": username.value,
    "password": password.value
  }

  if (username.value.length != 0 || password.value.length != 0) {
    divdisable.value = true
    btndisable.value = false
    await store.fetchlogin(data.value)
    if (typeof store.login == 'object') {
      csscode.value = 'text-[#56A95D]'
      textcheckpassword.value = 'Login Successful'
      img.value = 'success'
      setTimeout(() => {
        router.push("/admin/user");
      }, 1000);
    } else if(store.login == 404){
      btndisable.value = false
      csscode.value = 'text-[#D44949]'
      img.value = 'doesNotExists'
      textcheckpassword.value = 'A user with the specified username DOES NOT exist'
    }
    
    else {
      btndisable.value = false
      csscode.value = 'text-[#D44949]'
      img.value = 'failed'
      textcheckpassword.value = 'Password Incorrect'
    }
  } 
}
const check = () => {
  if (username.value.length != 0 && password.value.length != 0)  {
    btndisable.value = false
  } else {
    btndisable.value = true
  }
}
</script>
 
<template>
  <div class=" w-screen h-screen flex-col bg-white text-black">
    <div class="w-full h-full flex flex-row">
      <div class="w-full h-[100%] flex items-center justify-center">
        <img class="h-100 w-auto" :src="'https://convergesolution.com/images/service/banner/digital-marketing.png'"
          alt="integra-ted logo"/>
      </div>
      <div class="w-full h-[70%] ">
        <div class="w-full h-full ">
          <div class="w-full h-full  flex flex-col items-center justify-center mt-32">
            <!-- <div class=" w-[40%] h-[10%] flex text-2xl font-bold items-center pl-5 ann-message"
              :class="csscode" v-if="divdisable == true">
              <p>{{ textcheckpassword }}</p>
            </div> -->
            <div class=" w-[50%] h-[10%] flex flex-col text-xl font-bold justify-center items-center pl-5 mt-4 rounded-xl ann-message" :class="csscode" v-if="divdisable == true">
              <img v-if="img == 'success'" :src="successImageSrc" alt="Login success Image" class="mr-2 w-[20%] pb-5"/>
              <img v-if="img == 'failed'" :src="incorrectImageSrc" alt="Password Incorrect Image" class="mr-2 w-[20%] pb-5" />
              <img  v-show="img == 'doesNotExists'" :src="doesNotExistsImageSrc" alt="The specified username DOES NOT exist" class="mr-2 w-[10%] pb-5" />
              <p class="text-xl">{{ textcheckpassword }}</p>
           </div>
            <div class="w-[60%] h-[50%] text-[#555357] flex flex-col justify-center mt-16">
              <div class="w-full h-[20%] flex pl-5 text-4xl font-bold text-[#1C1B1D]">
                <p>SAS Login</p>
              </div>
              <div class="w-full h-[80%] pl-5 pr-5">
                <div class="w-full h-[40%] space-y-2 flex flex-col justify-center">
                  <p>Username</p>
                  <input class="w-full h-10 rounded-full border-2 border-[#C6C6C6] bg-[#F8F7F7] pl-5  ann-username"
                    type="text" v-model="username" @input="check">
                </div>
                <div class="w-full h-[30%] space-y-2 ">
                  <p>Password</p>
                  <input class="w-full h-10 rounded-full border-2 border-[#C6C6C6] bg-[#F8F7F7] pl-5  ann-password"
                    type="password" v-model="password" @input="check">
                </div>
                <div class="w-full h-[30%] flex justify-center pt-8">
                  <button class="w-36 h-10 rounded-full bg-[#9798EE] border-2 border-[#8D8EE2] text-white ann-button " :disabled="btndisable"
                    @click="submit">LOGIN</button>
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