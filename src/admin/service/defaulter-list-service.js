import { myAxios } from "../../services/helper";
export const getDefaulterListBySem=(sem)=>{
    return myAxios
    .get(`/permanent/list/${sem}`)
    .then((response)=>response.data);
  }

  export const enrollForm=(user)=>{
    return myAxios
    .get('/permanent/enroll',user)
    .then((response)=>response.data);
  }