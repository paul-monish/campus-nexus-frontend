import { Fragment, useEffect, useState } from "react";


import displayRazorpay from "../handelers/PaymentHandler";
import { getCurrentUserDetails } from "../auth/authenticate";
import { getSemesters } from "../services/semester-service";

function Payment() {

  const[data,setData]=useState({
    amount:'00000',
  });

  const [semList,setSemList]=useState([{
    id:'',
    name:'',
    fees:{}
  }])



  const[sem,setSem]=useState({
    id:'',
    name:'',
    fees:{}
  });


  
  
  const[user,setUser]=useState(undefined);
  //call semeter api
  const getSemester=()=>{
    getSemesters().then((data)=>{
        console.log(data);
        setSemList(data)
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        alert(error.response.data.message)
    })
  }

  const setSemOption=()=> {
    return semList.map((s) => {
      return <option key={s.id} value={s.id}>{s.name} 
             </option>;
    });
  }
  
  const chnageAmount=(id)=>{
    // return  semList.filter((s) => s.id===id).map((s)=>{return s})
    // console.log(typeof(id))
    // console.log(typeof(semList[0].id))
    semList.filter((s)=>s.id===id).map((s)=>{ 
      return setData({...data,'amount':s.fees.fees})
    })
  }
  
  useEffect(()=>{
    setUser(getCurrentUserDetails());
    getSemester()
    document.title="mckvie payment";
  },[]);


  
  //form handler funstion
  const handleForm=(e)=>{
   // postData(amount);
   data['universityRollNumber']=user.universityRollNumber;
   data['semId']=sem.id;
    displayRazorpay(data);
    e.preventDefault();
  };




  const handleChange=(e)=>{
    setSem({...sem,'id':e.target.value})
    chnageAmount(parseInt(e.target.value))
  };


  return (
    <Fragment>
           
            {/* {JSON.stringify(data) }
            {JSON.stringify(user) } */}
            {/* {JSON.stringify(sem) } */}
            <div>Pay Fees:</div>
            <form onSubmit={handleForm}>
              {/* <select id="sem" name="sem" onChange={(e)=>{setSem({...sem,'id':e.target.value})}}>
                <option value="1">1ST</option>
                <option value="2">2ND</option>
                <option value="3">3RD</option>
                <option value="4">4RTH</option>
                <option value="5">5TH</option>
                <option value="6">6TH</option>
                <option value="7">7TH</option>
                <option value="8">8TH</option>
              </select> */}

              <select
              className="form-control"
              aria-label="Floating label select example"
              defaultValue={'DEFAULT'}
              onChange={(e)=>{handleChange(e)}} id="sem" name="sem">
              <option value="DEFAULT" disabled >
                Choose a Semester ...
              </option>
              {setSemOption()}
              </select>

              <label htmlFor="exampleEmail">Amount</label>
              <input type="text" id="amount" name="amount" disabled value={data.amount} 
              /*onChange={(e)=>{setData({...data,'amount':e.target.value})}}*//>
              <button>Submit</button>
            </form>
           
    </Fragment>
  );
}

export default Payment;
