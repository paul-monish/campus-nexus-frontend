import axios from "axios";
import { getToken } from "../auth/authenticate";
import  API_URL from "../Config";

//public 
export const myAxios=axios.create({
    baseURL:`${API_URL}`,
});

//private
export const privateAxios=axios.create({
    baseURL:`${API_URL}`
})

privateAxios.interceptors.request.use(config=>{
    const token=getToken()
    if(token){
        // config.headers.common.Authorization=`Bearer ${token}`
        config.headers['Authorization'] = `Bearer ${token}`;
        return config
    }
},error=> Promise.reject(error))