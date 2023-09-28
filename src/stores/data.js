import { defineStore,acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter} from "vue-router";
import  {getAnnouncements,getAnnouncementdetail,getcategory,getdelete,add,edit} from "../composable/getAnnouncements";
import { getUsers,deleteUser,getUserdetail,updateUser,createUser,matchPassword,Login,gettoken } from "../composable/getUsers";
export const useDataStore = defineStore('x',() =>{
    const announcement = ref([])
    const category = ref([])
    const deleted = ref([])
    const added = ref()
    const edited = ref()
    const mode = ref('active')
    const categoryid = ref(null)
    const numberpage = ref(1)
    const currentPage = ref([])
    const disableprev = ref(true)
    const disablenext = ref(false)
    const countpage = ref(0)
    const pagesbackend = ref(0)
    const showdata = ref("")
    const users = ref([])
    const userdetail = ref([])
    const boldpage = ref('')
    let router = useRouter();
    const match = ref("")
    const login = ref("")
    const token = ref("")
    const fetchAnnouncement = async (mode, catagory_id, numberpage) => {
        announcement.value = await getAnnouncements(mode, catagory_id, numberpage)
        if( announcement.value != undefined){
          countpage.value = announcement.value.totalPages
        }
        
    }
    const fetchAnnouncementdetail = async (id) => {
        announcement.value = await getAnnouncementdetail(id)
    }

    const changetime = (date) => {
        if(new Date(date).getFullYear() >1970){
            return new Date(date).toLocaleString('en-GB',{dateStyle: 'medium', timeStyle: 'short'} )
        }else{ return '-'}
            
      }
    const fetchCategory = async () => { 
        category.value = await getcategory()
    }
    const fetchdelect = async (id) => {
       deleted.value = await getdelete(id)
        
    }
    const fetchadd = async (data) => {
        added.value =await add(data)
        
    }
    const fetchedit = async (data,id) => {
        edited.value= await edit(data,id)
    }
    function checkdatetime(date, time, type) {
        if ((date == undefined && time != undefined)) {
          alert("please enter correct date and time format ")
    
        } else if ((date?.length == 0 && time != undefined)) {
          const newdate = new Date(date + " " + time)
          if (newdate.toLocaleString('en-GB') != 'Invalid Date') {
            return newdate.toISOString()
          } else {
            return null
          }
        }
        else if ((date != undefined && (time === undefined || time != undefined))) {
          if (time === undefined) {
            if (type == "pubilc") {
              time = "6:00"
              const newdate = new Date(date + " " + time)
              if (newdate.toLocaleString('en-GB') != 'Invalid Date') {
                return newdate.toISOString()
              } else {
                return null
              }
            } else if (type == "close") {
              time = "18:00"
              const newdate = new Date(date + " " + time)
              if (newdate.toLocaleString('en-GB') != 'Invalid Date') {
                return newdate.toISOString()
              } else {
                return null
              }
            }
          } else if (time != undefined) {
            const newdate = new Date(date + " " + time)
            if (newdate.toLocaleString('en-GB') != 'Invalid Date') {
              return newdate.toISOString()
            } else {
              return null
            }
          }
    
    
        }
      }
      const pagesnunber =(choose) => {
        let amountpage = ''
        if(choose != "prev"&& choose != "next"){
          if (numberpage.value <= 10 && choose != "next" && choose != "prev") {
          amountpage = countpage.value > 10 ? 10 : countpage.value
          for (let i = 0; i < amountpage; i++) {
            currentPage.value.push(i + 1)
          }
        } 
        }else if(choose == "next"){
          if (numberpage.value > currentPage.value[currentPage.value.length - 1] && choose == "next") {
          currentPage.value.shift()
          currentPage.value.push(numberpage.value)
        }
        }else if (choose == "prev") {
          if (numberpage.value > 10 && choose == "prev") {
          let y = currentPage.value[0]
          currentPage.value.pop()
          currentPage.value.unshift(y - 1)
        } else if (numberpage.value == 10 && choose == "prev") {
          let y = currentPage.value[0]
          currentPage.value.pop()
          currentPage.value.unshift(y - 1)
        }else if ((currentPage.value[currentPage.value[0]] !=1 ) && choose == "prev") {
          let y = currentPage.value[0]
            if(y != 1){
              let y = currentPage.value[0]
          currentPage.value.pop()
          currentPage.value.unshift(y - 1)
            }
          if(numberpage.value ==1){
            disableprev.value = true
            disablenext.value = false
          }
        }
        }
      
        
      }
      const pages = async (number) => {
        if (number == 'Next') {
          numberpage.value++
          pagesbackend.value = numberpage.value - 1
          await fetchAnnouncement(mode.value, categoryid.value, pagesbackend.value)
          
          if (numberpage.value > 10 && numberpage.value < countpage.value) {
            disablenext.value = false
            disableprev.value = false
            pagesnunber("next")
          }
          else if (numberpage.value <= 10 && !(numberpage.value == countpage.value)) {
            disablenext.value = false
            disableprev.value = false
          }
          else if (numberpage.value == countpage.value) {
            pagesnunber("next")
            disablenext.value = true
            disableprev.value = false
          } 
        } else if (number == 'Prev') {
          if (numberpage.value  == 1) {
            numberpage.value = 1
            disableprev.value = true
            disablenext.value = false
          }
          else if (numberpage.value <= 10 || (numberpage.value == countpage.value)) {
            disablenext.value = false
            disableprev.value = false
            numberpage.value--
            pagesbackend.value = numberpage.value - 1
            await fetchAnnouncement(mode.value, categoryid.value, pagesbackend.value)
            pagesnunber("prev")
          } else {
            numberpage.value--
            pagesbackend.value = numberpage.value - 1
            await fetchAnnouncement(mode.value, categoryid.value, pagesbackend.value)
            pagesnunber("prev")
          }
        } else {
          numberpage.value = number
          pagesbackend.value = numberpage.value - 1
          disablenext.value = false
          disableprev.value = false
          if (numberpage.value == countpage.value) {
            disablenext.value = true
            disableprev.value = false
          }
          else if (numberpage.value == 1) {
            disablenext.value = false
            disableprev.value = true
          }
          await fetchAnnouncement(mode.value, categoryid.value, pagesbackend.value)
        }
      }
      const fetchusers = async () => {
        users.value = await getUsers()
      }
      const fetchdelectuser = async (id) => {
        deleted.value = await deleteUser(id)
      }
      const fetchuserdetail = async (id) => {
        userdetail.value = await getUserdetail(id)
      }
      const fetchupdateuser = async (id,data) => {
        edited.value=await updateUser(id,data)
      }
      const fetchadduser = async (data) => {
        added.value = await createUser(data)
      }
      const gotoannouncement = () => {
        router.push({ name: 'Homeadmin'});
      };
      const gotousers = () => {
        router.push({ name: 'adminmanagement'});
      };
      const gotomatchpassword = ()=>{
        router.push({name:"adminmatchpassword"})
      }
      const fetchmatch = async (data)=>{
        match.value = await matchPassword(data)
      }
      const fetchlogin = async (data)=>{
        login.value = await Login(data)
      }
      const fetchrefreshtoken = async ()=>{
        token.value = await gettoken()
      }

    return { fetchAnnouncement,announcement,changetime,fetchAnnouncementdetail,
      fetchCategory,category,fetchdelect,fetchadd,fetchedit,deleted,added,edited,
      mode,categoryid,checkdatetime,pagesnunber,currentPage,pages,disablenext,disableprev,
      pagesbackend,numberpage,showdata,fetchusers,users,fetchdelectuser,fetchuserdetail,
      userdetail,fetchupdateuser,fetchadduser,gotoannouncement,gotousers,gotomatchpassword,boldpage,fetchmatch,match,fetchlogin,login,fetchrefreshtoken,token} 

})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useDataStore,import.meta.hot))
}