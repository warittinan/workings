<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
const { params } = useRoute();
const props = defineProps({
  name: {
    type: String, default: ''
  },
})

const modalbtn = ref(false)

const name = ref('')
const password = ref("")
const user = ref([])
const userregister = ref("")
const passwordregister = ref("")
const passwordconfirmregister = ref("")
const checklogin = ref("")
const showname = ref("")
const showpassword = ref("")
const router = useRouter()
const namealeart = ref("")
const cheackMsg = ref(false)
const passwordinput = ref("")
const checkdelect = ref('')
const changepassword =ref('')
const userchange =ref('')
const passwordchange =ref('')
const passwordconfirmchange =ref('')
const checky = ref(false)
const loginChecker = async () =>{
  try {
    const loginStatus = await fetch('http://localhost:5000/login')
    if (loginStatus.ok) {
      const status = await loginStatus.json()
      return status
    } else {
      console.log("Don't get");
    }
  } catch (error) {
    console.log(error);
  }
}
const loginCheckerEditor = async (stat) =>{
  try {
    const loginStatus = await fetch('http://localhost:5000/login', {method: 'PUT',headers: {
      'Content-Type': 'application/json'
    },body: JSON.stringify(
      {
        status: stat
      }
    )
  })
    if (loginStatus.ok) {
      const status = await loginStatus.json()
      checky.value.status = stat
    } else {
      console.log("Don't get");
    }
  } catch (error) {
    console.log(error);
  }
}
const username = async () => {
  try {
    const get = await fetch('http://localhost:5000/user')
    if (get.ok) {
      const user = await get.json()
      return user
    } else {
      console.log("Don't get");
    }
  } catch (error) {
    console.log(error);
  }
}
const deleteuser = async ()=>{
 const id= user.value.find(x => x.name === name.value).id
  try{
    const res = await fetch(`http://localhost:5000/user/${id}`, {method: 'DELETE'})
    if(res.ok){
      console.log('delete successfully')
      user.value = user.value.filter(quest => quest.name !== name.value)
      deletepush() 
    }else{
      throw new Error('Cannot delete data!')
    }
  }catch(error){
    console.log(`Error:${error}`); 
  }
 
}
const updatepassword = async ()=>{
  const id= user.value.find(x => x.name === userchange.value).id
  try{
    const data = await fetch(`http://localhost:5000/user/${id}`, {
      method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },body: JSON.stringify(
      {
        name: userchange.value,
        password: passwordchange.value
      }
    )
  })
    if(data.status===200){
      const le = await data.json()
      user.value = user.value.filter(x => x.id !== id)
      user.value.push(le)
      name.value = ""
    }else{
      throw new Error('Cannot delete data!')
    }
  }catch(error){
    console.log(`Error:${error}`); 
  }
}
const createuser = async () => {
  try {
    const data = await fetch('http://localhost:5000/user', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userregister.value, password: passwordregister.value
      })
    })
    if (data.ok) {
      const res = await data.json()
      user.value.push(res)
      
    } else {
      console.log('Post error')
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  user.value = await username()
  checky.value = await loginChecker()
  if (params.name !== undefined && checky.value.status === true) {
    name.value = params.name
  }else{
    router.push({path:'/'})
  }
})


function fail() {
  Msg("Login fail")
  showpassword.value = ""
  name.value = ""
  password.value = ""
  showname.value = ""
}

const Login = () => {
  if (name.value !== "") {
    Msg("You are already login")
    checklogin.value = ""
  } else {
    checklogin.value = 'login'
  }
}
const Delect = ()=>{
  if(name.value === ""||name.value.toLocaleLowerCase() === "guest"){
    Msg("Can not delete account")
    checkdelect.value = ""
}else{
    checkdelect.value ="delect"
}
}
const Msg = (alert) => {
  if (cheackMsg.value === false) {
    cheackMsg.value = true
    namealeart.value = alert
    timeout()
    modalbtn.value = true
  }else{
    timeoutMSg()
    Msg(alert)
    modalbtn.value = true
  }
}
const timeoutMSg = () => {
  modalbtn.value = false
  cheackMsg.value = false
}
const timeout = () => setTimeout(timeoutMSg, 1500)

function checkuser() {
  const namecorrect = user.value.filter(x => x.name === showname.value)
  if (showname.value === "" && showpassword.value === "") {
    Msg("Please enter username and password")
    showname.value = ""
    showpassword.value = ""
  } else if (showname.value === "" || showpassword.value === "") {
    Msg("Please enter username or password")
    showname.value = ""
    showpassword.value = ""
  } else if (namecorrect.length === 0) {
    Msg("User account not found")
    showname.value = ""
    showpassword.value = ""
  }
  else {
    const nameinput = user.value.find(x => x.name === showname.value).name
    passwordinput.value = user.value.find(x => x.name === showname.value).password
    if (nameinput) {
      passwordinput.value === showpassword.value ? Msg("Login Success") : fail();
      name.value = showname.value
      password.value = showpassword.value
      showname.value = ""
      showpassword.value = ""
      loginCheckerEditor(true)
      router.push({ name: 'Menuback', params: { name: name.value} })
    }
  }

}

function checkchange() {
  if (userchange.value.toLowerCase === "guest ") {
    Msg("Cann't Changepassword")
    userchange.value = ""
    passwordchange.value = ""
    passwordconfirmchange.value = ""
  } else if (passwordchange.value == "" && passwordconfirmchange.value == "") {
    Msg("Enter your password")
    userchange.value = ""
    passwordchange.value = ""
    passwordconfirmchange.value = ""
  }
  else {
      if (userchange.value == "") {
      Msg("Please Enter username")
      userchange.value = ""
      passwordchange.value = ""
      passwordconfirmchange.value = ""
    } else if(!user.value.find((x) => x.name === userchange.value)){
      Msg("User account not found")
      userchange.value = ""
      passwordchange.value = ""
      passwordconfirmchange.value = ""
    }else if (passwordchange.value === passwordconfirmchange.value) {
      updatepassword()
      userchange.value = ""
      passwordchange.value = ""
      passwordconfirmchange.value = ""
      Msg("Changepassword success")
    }
    else {
      Msg("The password and confirmpassword don't match")
      userchange.value = ""
      passwordchange.value = ""
      passwordconfirmchange.value = ""
    }
  }
}
function register() {
  if (user.value.find((x) => x.name === userregister.value)||userregister.value.toLowerCase === "guest ") {
    Msg("This username is already used")
    userregister.value = ""
    passwordregister.value = ""
    passwordconfirmregister.value = ""
  } else if (passwordregister.value === "" && passwordconfirmregister.value == "") {
    Msg("Enter your password")
    userregister.value = ""
    passwordregister.value = ""
    passwordconfirmregister.value = ""
  }
  else {
    if (userregister.value == "") {
      Msg("Please Enter username")
      userregister.value = ""
      passwordregister.value = ""
      passwordconfirmregister.value = ""
    } else if (passwordregister.value === passwordconfirmregister.value) {
      createuser()
      userregister.value = ""
      passwordregister.value = ""
      passwordconfirmregister.value = ""
      Msg("Register success")
    }
    else {
      Msg("The password and confirmpassword don't match")
      userregister.value = ""
      passwordregister.value = ""
      passwordconfirmregister.value = ""
    }
  }
}
function guest() {
  name.value = "Guest"
  router.push({ name: 'Menuback', params: { name:"Guest"} })
  Msg("Login Guest")
  loginCheckerEditor(true)
}
function deletepush() {
  name.value=""
  router.push({ name: 'Menu'})
  Msg("Delete Success")
}
const logout = () => {
  if (name.value === "") {
    Msg("Login First")
  } else {
    name.value = ""
    password.value = ""
    showname.value = ""
    showpassword.value = ""
    router.push({ name: 'Menu'})
    Msg("Logout Success")
    loginCheckerEditor(false)
  }
}
const gotoplay = () => {
  if (name.value === "") {
    Msg("Login First")
  } else {
    router.push({ name: 'Choosegame', params: { name: name.value } })
  }
}
const crosshair = () => {
  if (name.value === "") {
    Msg("Login First")
  } 
  else {
    // emits('cross-hair','Crosshair') 
    router.push({ name: 'Croo', params: { name: name.value } })
  }
   
  
}
const History = ()=>{
  if (name.value === "") {
    Msg("Login First")
  } 
  else {
    router.push({ name: 'History', params: { name: params.name } })
  }
}
function editpassword(){
  if(name.value.toLocaleLowerCase() === "guest"){
    Msg("Can not changepassword")
    changepassword.value = ""
}else{
    changepassword.value="password"
}
}
</script>
<template>
  <div class="w-screen h-screen m-auto text-white text-font bg-[url('/bg/bg-gif.gif')]">
    <div class="flex flex-col w-full h-full  ">
    <input type="checkbox" id="login" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box h-98 border-4 border-blue-300 bg-sky-900 ">
        <label for="login" class="btn btn-sm btn-circle absolute right-2 top-2 ">✕</label>
        <div class=" flex justify-center ">
          <h3>Username : <span><input class="text-black bg-white" type="text" placeholder="username" v-model="showname"></span></h3>
          <h3>Password : <span><input class="text-black  bg-white" type="password" placeholder="password" v-model="showpassword"></span></h3>
        </div>
        <div class="modal-action flex justify-center">
          <label for="login" class="btn  hover:bg-green-600 bg-blue-600 text-white" @click="checkuser()">Login</label>
          <label for="login" class="btn  hover:bg-green-600 bg-blue-600 text-white" @click="guest()">Guest</label>
        </div>
      </div>
    </div>
    <input type="checkbox" id="register" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box border-4 border-blue-300 bg-sky-900">
        <label for="register" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class=" flex flex-col justify-center space-y-4 ">
          <h3>Username : <span><input class="text-black bg-white" type="text" placeholder="username" v-model="userregister"></span></h3>
          <h3>Password : <span><input class="text-black bg-white" type="password" placeholder="password" v-model="passwordregister"></span></h3>
          <h3>Confirm Password : <span><input class="text-black bg-white" type="password" placeholder="confirm password" v-model="passwordconfirmregister"></span></h3>
        </div>
        <div class="modal-action flex justify-center">
          <label for="register" class="btn hover:bg-green-600 bg-blue-600 text-white" @click="register()">Register</label>
        </div>
      </div>
    </div>
    <input type="checkbox" id="delect" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box border-4 border-blue-300 bg-sky-900">
        <label for="delect" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class=" flex flex-col justify-center space-y-4 ">
          <h1> Sure to delete the account</h1>
          <div class="modal-action flex justify-center">
          <label for="delect" class="btn hover:bg-green-600 bg-blue-600 text-white" @click="deleteuser()">confirm</label>
          <label for="delect" class="btn hover:bg-green-600 bg-blue-600 text-white" @click="">Cancel</label>
        </div>          
        </div>
      </div>
    </div>
    <input type="checkbox" id="password" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box border-4 border-blue-300 bg-sky-900">
        <label for="password" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class=" flex flex-col justify-center space-y-4 ">
          <h1> Sure to chagepassword the account</h1>
          <h3>Username : <span><input class="text-black bg-white" type="text" placeholder="username" v-model="userchange"></span></h3>
          <h3>Password : <span><input class="text-black bg-white" type="password" placeholder="password" v-model="passwordchange"></span></h3>
          <h3>Confirm Password : <span><input class="text-black bg-white" type="password" placeholder="confirm password" v-model="passwordconfirmchange"></span></h3>
          <div class="modal-action flex justify-center">
          <label for="password" class="btn hover:bg-green-600 bg-blue-600 text-white" @click="checkchange()">confirm</label>
          <label for="password" class="btn hover:bg-green-600 bg-blue-600 text-white" @click="">Cancel</label>
        </div>
        </div>
      </div>
    </div>
    <div class=" flex flex-row w-full justify-end  mt-1">
      <div class="flex-none gap-2 mr-1">
        <div class="dropdown dropdown-end ">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <img class=" w-96 h-14 rounded-full " src="../assets/image/Login.png" style="width:600px ;" />
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content  bg-blue-400  rounded-box w-52 mr-4 " v-show="name != '' ">
            <li class="border-2 border-t-0  bg-sky-900 border-blue-300 hover:bg-green-600">
              <label :for="changepassword" @click="editpassword()">Changepassword</label>
            </li>
            <li class="border-2 border-t-0  bg-sky-900 border-blue-300 hover:bg-green-600">
              <label :for="checkdelect" @click="Delect()">DeleteAccount</label>
            </li>
            <li class="border-2 border-t-0  bg-sky-900 border-blue-300 hover:bg-green-600">
              <label @click="logout()">Logout</label>
            </li>
          </ul>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content  bg-blue-400  rounded-box w-52 mr-4 " v-show="name == '' ">
            <li class="border-2   bg-sky-900 border-blue-300 hover:bg-green-600">
              <label :for="checklogin" @click="Login()">Login</label>
            </li>
            <li class="border-2 border-t-0 bg-sky-900 border-blue-300 hover:bg-green-600">
              <label for="register">Register</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="w-full h-full">
<!-- Put this part before </body> tag -->
<div>
    <input type="checkbox" id="my-modal-3" class="modal-toggle" v-model="modalbtn" />
    <div class="modal -mt-">
      <div class="modal-box absolute bg-orange-100">
        <h3 class="text-lg font-bold text-orange-700">✉️ Message</h3>
        <div class="w-full h-32 mt-5 bg-white  rounded-2xl flex justify-center items-center">
          <p class="py-4 text-center text-red-600 text-4xl "> {{ namealeart }} !! </p>
        </div>
      </div>
    </div>
</div>
      <div class=" flex flex-col h-full w-full justify-start items-center space-y-8">
      <img class=" " src="/bg/logo.png" style="width:700px ;"> 
        <div class="flex">
          <button class="w-48 h-20 text-xl border-8 rounded-2xl bg-sky-900 border-blue-300 hover:bg-green-600"
            @click="gotoplay()" >
            PLAY
          </button>
        </div>
        <div class="flex">
            <button class="w-48 h-20 text-xl border-8 rounded-2xl bg-sky-900 border-blue-300 hover:bg-green-600"
            @click=" History() ">
            History
          </button>
        </div>
    </div>
    </div>

  </div>
  </div>
  
</template>
 
<style scoped></style>