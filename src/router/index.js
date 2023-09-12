import { createRouter,createWebHistory } from "vue-router";
import Menu from "../conponents/Menu.vue"
import Choosegame from "../conponents/Choosegame.vue"
import Level from "../conponents/Level.vue"
import App  from "../App.vue";
import Main from "../conponents/Main.vue";
import NotFound from "../conponents/NotFound.vue";
import History from "../conponents/History.vue"
import Crosshair from "../conponents/Crosshair.vue"
const router =createRouter({
    history:createWebHistory(),
    routes:[{
        path: '/',
        name: 'Menu',
        component:Menu,
    },
    {
        path: '/menu/:name',
        name: 'Menuback',
        component:Menu,
    },{
        path: '/choosegame/:name',
        name: 'Choosegame',
        component:Choosegame,
    },
    {
        path: '/play/:name/:game',
        name: 'Play',
        component:Main 
    },
    {
        path: '/history/:name',
        name: 'History',
        component:History 
    },
    {
        path:'/:catchNotMatchPath(.*)',
        name:'NotFound',
        component:NotFound}
]
})
export default router

