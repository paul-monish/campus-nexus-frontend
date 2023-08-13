import {createOrder, updateOrder} from "../services/payment-service";
import { toast } from "react-toastify";

function loadScript(src){
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}
export default async function displayRazorpay(data){
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );
  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }
 
  // const result = await privateAxios.post(`/payment/create-order`,data);
  let result="";
   try{
    result= await createOrder(data);
    console.log(result);
    if (!result) {
        alert("Server error. Are you online?");
        return;
    }
    }catch(error){ 
        alert(error.response.data.message);
        return;
      
    }

 
  const  { id,universityRollNumber,amount, orderId, currency,semId } = result;
  const options = {
      key: "rzp_test_J8r4aTJYjRo9AF", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "MCKV Institute Of Engineering",
      description: "Fees Payment",
      image:"../download.png",
      order_id:orderId,
      handler: async function (response) {
          const data = {
              orderCreationId:orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              semId:semId,
              amount:amount,
              payment_id:id,
              universityRollNumber:universityRollNumber,
              status: "paid"
          };
          console.log(data);
          //update payment on server
          // let update_data=JSON.stringify({
          //     payment_id:data.razorpayPaymentId,
          //     order_id:data.razorpayOrderId,
          //     status:data.status
          // })
          //console.log(update_data);
          // const result = await privateAxios.put(`/payment/update-order`,data);
          const result = await updateOrder(data);
          if(result){
             alert("successfully payment!!");
             toast.success('Successfully Payment !', {
              position: toast.POSITION.TOP_RIGHT
              });
          
          }
          else{
              toast.error("payment is faild!!");
          }
       
      },
      prefill: {
          name:"",
          email:"",
          contact:"",
      },
      notes: {
          address: "MCKV Institute Of Engineering",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const rzp = new window.Razorpay(options);

  // rzp.on('payment.failed', function (response){
  //     console.log(response.error.code);
  //     console.log(response.error.description);
  //     console.log(response.error.source);
  //     console.log(response.error.step);
  //     console.log(response.error.reason);
  //     console.log(response.error.metadata.order_id);
  //     console.log(response.error.metadata.payment_id);
  //     alert("oops");
  // }),

  rzp.open();
}
