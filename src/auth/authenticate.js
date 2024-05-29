import {decryptData,encryptData} from '../security/JWTSecurity'
export const doLogin=(data,next)=>{
    localStorage.setItem("data",encryptData(data))
    next()
}
export const isLoggedIn=()=>{
    let data=localStorage.getItem("data");
    if(data!=null) return true;
    else return false;
}
export const doLogout=(next)=>{
    localStorage.clear()
    next()
}

export const getCurrentUserDetails=()=>{
    if(isLoggedIn()){
        return JSON.parse(decryptData("data")).user
    }
    else return undefined;
}

export const getToken= ()=>{
    if(isLoggedIn()){
        return JSON.parse(decryptData("data")).token
    }
    else return null;
}