import {decryptData,encryptData} from '../security/JWTSecurity'
export const doLogin=(data,next)=>{
    // localStorage.setItem("data",JSON.stringify(data))
    localStorage.setItem("data",encryptData(data))
    next()
}
export const isLoggedIn=()=>{
    let data=localStorage.getItem("data")
    // let data=decryptData(data1)
    // console.log(data1)
    if(data!=null) return true;
    else return false;
}
export const doLogout=(next)=>{
    // localStorage.removeItem("data")
    localStorage.clear()
    next()
}

export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        // return JSON.parse(localStorage.getItem("data")).user
        return JSON.parse(decryptData("data")).user
    }
    else return undefined;
}

export const getToken= ()=>{
    if(isLoggedIn()){
        // return JSON.parse(localStorage.getItem("data")).token
        return JSON.parse(decryptData("data")).token
    }
    else return null;
}