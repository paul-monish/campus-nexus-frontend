import { Fragment, useEffect, useState } from "react";
import {Form,FormGroup,Input,Button,Label,Container,Row,Col} from "reactstrap";
import  API_URL from "../Config";
import axios from "axios";
import { toast } from "react-toastify";

function Payment() {
  useEffect(()=>{
    document.title="mckvie payment";
  },[]);
  const[amount,setAmount]=useState({});
  //form handler funstion
  const handleForm=(e)=>{
    console.log(amount);
   // postData(amount);
   displayRazorpay(amount);
    e.preventDefault();
  };
  function loadScript(src) {
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

async function displayRazorpay(data) {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const result = await axios.post(`${API_URL}/payment/create-order`,data);

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }
    console.log(result.data);
    const { amount, orderId, currency } = result.data;
    // console.log(amount);
    // console.log(order_id);
    // console.log(currency);


    const options = {
        key: "rzp_test_J8r4aTJYjRo9AF", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "MCKV Institute Of Engineering",
        description: "Fees Payment",
        image:"./download.png",
        order_id:orderId,
        handler: async function (response) {
            const data = {
                orderCreationId:orderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
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
            const result = await axios.put(`${API_URL}/payment/update-order`,data);
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
  return (
    <Fragment>
    <Container>
        <Row>
            <Col lg={{offset:3,size:6}}>
            <Form onSubmit={handleForm}>
                <FormGroup>
                    <Label for="exampleEmail">
                    Amount
                    </Label>
                    <Input
                    type="text"
                    id="amount"
                    name="amount"
                    onChange={(e)=>{
                        setAmount({...amount,amount:e.target.value})
                    }}
                    />
                </FormGroup>
                <Button>
                    Submit
                </Button>
            </Form>
            </Col>
        </Row>
    </Container>
    </Fragment>
  );
}

export default Payment;
