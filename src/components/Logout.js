import React, { useEffect,useState } from 'react'
import { doLogout, getCurrentUserDetails } from '../auth/authenticate';
import { logout } from '../services/user-service';
import { useNavigate } from 'react-router-dom';
export const Logout = () => {
    const navigate =useNavigate();
const[user,setUser]=useState(undefined);
useEffect(()=>{
    setUser(getCurrentUserDetails());
  },[]);

  const exitFromSession=()=>{
    //call api
    logout(user).then((data)=>{
        if(data.success===true){
            doLogout(()=>{
                alert(data.message)
                navigate("/login")
            })
        }
        
      }).catch((error)=>{
        console.log(error)
      })
  }
    
  return (
    <div><button onClick={exitFromSession}>Logout</button></div>
  )
}
