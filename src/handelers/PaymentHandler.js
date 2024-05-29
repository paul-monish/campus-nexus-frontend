import {createOrder, updateOrder} from "../services/payment-service";
import Swal from 'sweetalert2'
import  {RAZORPAY_KEY} from "../Config";
// import logo from "";
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
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Razorpay SDK failed to load. You Are Not online",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
     return;
  }
 
  // const result = await privateAxios.post(`/payment/create-order`,data);
  let result="";
   try{
      result= await createOrder(data);
      if (!result) {
          Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Server error. You Are Not Online!",
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
          return;
      }
    }catch(error){ 
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message??"Something Went Wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
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
          try{
            const result = await updateOrder(data);
            if(result){
                Swal.fire({
                    icon: "success",
                    title: "Your Payment Is Successfull!",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  window.location.reload(true);
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
          }catch(error){
            alert(error)
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
          color: "#0a1945",
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
