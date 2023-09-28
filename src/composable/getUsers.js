const vite = import.meta.env.VITE_API_ROOT;
const getUsers = async () => {
    try {
        const res = await fetch(`${vite}/api/users`, {
            method: 'GET',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken')}` 
            } 
        })
        if (res.status === 200) {
            const users = await res.json()
            return users
        } else {
            throw new Error('This is something wrong, cannot read your users data!')
            }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const deleteUser = async (id) => {
    try {
        const res = await fetch(`${vite}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
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
const getUserdetail = async (id) => {
    try {
        const res = await fetch(`${vite}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`
            },
            })
        if (res.status === 200) {
            const users = await res.json()
            return users
        } else {
            throw new Error('This is something wrong, cannot read your users data!')
            }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const updateUser = async (id,data) => {
    try {
        const res = await fetch(`${vite}/api/users/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
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
const createUser = async (data) => {

    try {
        const res = await fetch(`${vite}/api/users`, {
            method: 'POST',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)
        })
        if (res.status === 201) {
            return "complete"
        } else {
            let error = await res.json()
            return error
            }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const matchPassword = async (data)=>{
    try {
        const res = await fetch(`${vite}/api/users/match`, {
            method: 'POST',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('accessToken') }`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        console.log(res.status === 200);
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
const Login = async (data)=>{
    try {
        const res = await fetch(`${vite}/api/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (res.status === 200) {
            let x =await res.json()
            localStorage.setItem("accessToken",`${Object.values(x)[0]}`);
            localStorage.setItem("refreshToken", `${Object.values(x)[1]}`)
            return x
        } else {
            return res.status
        }
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
}
const gettoken = async () =>{
    try {
        const res = await fetch(`${vite}/api/token`, {
            method: 'GET',
            headers: {
                'Authorization':'Bearer' +' '+`${localStorage.getItem('refreshToken')}` 
            } })
        if (res.status === 200) {
            let x =await res.json()
            localStorage.setItem("accessToken",`${Object.values(x)[0]}`);
            localStorage.setItem("refreshToken", `${Object.values(x)[1]}`)
            return x
        } else{
            throw new Error('This is something wrong, cannot read your users data!')
        }
    } catch  {
        return '401'
    }
}
export { getUsers, deleteUser,getUserdetail,updateUser,createUser,matchPassword,Login,gettoken }