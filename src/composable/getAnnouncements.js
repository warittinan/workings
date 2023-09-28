const vite = import.meta.env.VITE_API_ROOT;
import {useDataStore} from '../stores/data.js'
const getAnnouncements = async (mode, catagory_id, numberpage) => {
    let url = ``
    if (mode == 'admin') {
        if (catagory_id == null) {
            url = `?mode=${mode}&page=${numberpage}`  
        } else {
            url = `?mode=${mode}&category=${catagory_id}&page=${numberpage}`
        }


    } else {
        if (catagory_id == null) {
            url = `?mode=${mode}&page=${numberpage}`
        } else {
            url = `?mode=${mode}&category=${catagory_id}&page=${numberpage}`
        }
    }
    try {
        if(mode == 'admin'){
            const res = await fetch(`${vite}/api/announcements/pages${url}`, {
                method: 'GET',
                headers: {
                    'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken')}` 
                } 
            })
            if (res.status === 200) {
                const announcements = await res.json()
                return announcements
            } else {
                return res.status;
            }
        }else{
            const res = await fetch(`${vite}/api/announcements/pages${url}`)
            if (res.status === 200) {
                const announcements = await res.json()
                return announcements
            } else {
                return res.status;
            } 
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const getAnnouncementdetail = async (id) => {
    let fetchurl = ''
   if( useDataStore().mode == "admin"){
    fetchurl = `${vite}/api/announcements/${id}`
   }else{
    fetchurl = `${vite}/api/announcements/${id}?count=true`
   }
    try {
       if(useDataStore().mode == "admin"){
        const res = await fetch(`${fetchurl}`, {
            method: 'GET',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken')}` 
            } })
        if (res.status === 200) {
            const announcements = await res.json()
            return announcements
        } else {
            return res.status
        }
       }else{
        const res = await fetch(`${fetchurl}`, {
            method: 'GET'})
        if (res.status === 200) {
            const announcements = await res.json()
            return announcements
        } else {
            return res.status
        }
       }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const getcategory = async () => {
    try {
        if(useDataStore().mode == "admin"){
            const res = await fetch(`${vite}/api/categories`, {
                method: 'GET'})
            if (res.status === 200) {
                const categories = await res.json()
                return categories
            } else {
                throw new Error('This is something wrong, cannot read your categories data!')
            }
        }else{
            const res = await fetch(`${vite}/api/categories`, {
                method: 'GET'})
            if (res.status === 200) {
                const categories = await res.json()
                return categories
            } else {
                throw new Error('This is something wrong, cannot read your categories data!')
            }
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const getdelete = async (id) => {
    try {
        const res = await fetch(`${vite}/api/announcements/${id}`, {
            method: 'DELETE',headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`
            },
        })
        if (res.status === 200) {
            return "complete"
        } else {
            return res.status
        }
    } catch (error) {

        console.log(`ERROR: ${error}`)
    }
}
const add = async (data) => {
    try {
        const res = await fetch(`${vite}/api/announcements`, {
            method: 'POST', headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                data
            )
        }
        )
        if (res.status === 200) {
            return "complete"
        } else {
            let error = await res.json()
            return error
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const edit = async (data, id) => {
    try {
            const res = await fetch(`${vite}/api/announcements/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    data
                )
            }
            )
            if (res.status === 200) {
                return "complete"
            } else {
                return  ''
            } 
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}

export { getAnnouncements, getAnnouncementdetail, getcategory, getdelete, add, edit }