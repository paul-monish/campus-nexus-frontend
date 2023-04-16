import { privateAxios } from "./helper"

export const createOrder=(data)=>{
    console.log("data"+data);
    return privateAxios.post(`/payment/create-order`,data)
    .then(response=>response.data)
}

export const updateOrder=(data)=>{
    return privateAxios.put(`/payment/update-order`,data)
    .then(response=>response.data)
}