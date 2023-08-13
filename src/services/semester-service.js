
import { myAxios } from "./helper"


export const getSemesters=()=>{
    return myAxios
    .get('/permanent/all-semester')
    .then((response)=>response.data);
}