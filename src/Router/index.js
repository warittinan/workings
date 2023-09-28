import { createRouter,createWebHistory } from "vue-router";
import Adminannouncementhome from "../components/Adminannouncementhome.vue";
import NotFound from "../components/Notfound.vue";
import Adminannouncementdetaill from "../components/Adminannouncementdetaill.vue";
import Adminannouncementedit from "../components/Adminannouncementedit.vue";
import Adminannouncementadd from "../components/Adminannouncementadd.vue";
import Adminannouncementdelete from "../components/Adminannouncementdelete.vue";
import Userviewannouncementhome from "../components/Userviewannouncementhome.vue";
import Userviewannouncementdetaill from "../components/Userviewannouncementdetaill.vue";
import Adminmanagement from "../components/Adminmanagement.vue";
import Adminadduser from "../components/Adminadduser.vue";
import Adminedituser from "../components/Adminedituser.vue";
import Adminmatchpassword from "../components/Adminmatchpassword.vue"
import Login from "../components/Login.vue";
import create from "../components/create.vue";
const router =createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[{
        path: '/admin/announcement',
        name: 'Homeadmin',
        component:Adminannouncementhome,
    },
    {
        path: '/admin/announcement/:id',
        name: 'detail',
        component:Adminannouncementdetaill,
    },
    {
        path: '/admin/announcement/:id/edit',
        name: 'Adminedit',
        component:Adminannouncementedit,
    },
    {
        path: '/admin/announcement/Adminadd',
        name: 'Adminadd',
        component:Adminannouncementadd,
    },
    {
        path: '/admin/announcement/:id/delete',
        name: 'delete',
        component:Adminannouncementdelete,
    },
    {
        path: '/announcement',
        name: 'homeuser',
        component:Userviewannouncementhome,
    },
    {
        path: '/announcement/:id',
        name: 'detailuser',
        component:Userviewannouncementdetaill,
    },{
        path: '/admin/user',
        name: 'adminmanagement',
        component:Adminmanagement, 
    },{
        path: '/admin/user/add',
        name: 'adminadduser',
        component:Adminadduser, 
    },{
        path: '/admin/user/:id/edit',
        name: 'adminedituser',
        component:Adminedituser, 
    },{
        path: '/admin/user/match',
        name: 'adminmatchpassword',
        component:Adminmatchpassword, 
    },{
        path: '/login',
        name: 'login',
        component:Login, 
    },{
        path: '/',
        name: 'create',
        component:create, 
    },
    {
        path:'/:catchNotMatchPath(.*)',
        name:'NotFound',
        component:NotFound}
]
})
export default router

