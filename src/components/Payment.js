import { Fragment, useEffect, useState } from "react";


import displayRazorpay from "../handelers/PaymentHandler";
import { getCurrentUserDetails } from "../auth/authenticate";

function Payment() {

  const[data,setData]=useState({
    amount:'',
  });
  
  const[user,setUser]=useState(undefined);
  
  useEffect(()=>{
    setUser(getCurrentUserDetails());
    document.title="mckvie payment";
  },[]);

  

  //form handler funstion
  const handleForm=(e)=>{
   // postData(amount);
   data['universityRollNumber']=user.universityRollNumber;
   
    displayRazorpay(data);
    e.preventDefault();
  };
  return (
    <Fragment>
            {/* {JSON.stringify(data) }
            {JSON.stringify(user) } */}
            <div>Pay Fees:</div>
            <form onSubmit={handleForm}>
              <label htmlFor="exampleEmail">Amount</label>
              <input type="text" id="amount" name="amount" 
              onChange={(e)=>{setData({...data,'amount':e.target.value})}}/>
              <button>Submit</button>
            </form>
           
    </Fragment>
  );
}

export default Payment;
