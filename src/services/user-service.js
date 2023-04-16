
import { myAxios } from "./helper"
import { encryptPayload } from "../security/JWTSecurity"
const secretKey = 'MySecretKey12345';
const initVector = 'MyInitVector123';

// 

export const login=(user)=>{
    // const eU = encryptPayload(JSON.stringify(user.username), secretKey, initVector);
    // const eP = encryptPayload(JSON.stringify(user.password), secretKey, initVector);
    // console.log(eU+eP)
    // user={
    //     username:eU,
    //     password:eP
    // }

    // const encryptedPayload = encryptPayload(JSON.stringify(user), secretKey, initVector);
    // console.log(encryptedPayload)
    return myAxios
    .post('/auth/authenticate',user
    // ,{
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
      )
    .then((response)=>response.data);
}
export const sendOtpEmail=(user)=>{
  // console.log(process.env.REACT_APP_BASE_URL+"ss");
    return myAxios
    .post('/user/send-otp',user)
    .then((response)=>response.data);
}

export const changePassword=(user)=>{
    return myAxios
    .put('/user/update-password',user)
    .then((response)=>response.data);
}