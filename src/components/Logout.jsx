import React, { useEffect,useState } from 'react'
import { doLogout, getCurrentUserDetails } from '../auth/authenticate';
import { logout } from '../services/user-service';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
const Logout = () => {
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
  const btnstyle = { margin: '8px 0', backgroundColor: "#ffa500" }
  return (
   
    <div>
       <Button type='submit' color='primary' variant="contained" style={btnstyle} sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center' }} fullWidth fontWeight="bold"  onClick={exitFromSession}>Logout</Button> 
    </div>
  )
}
export default Logout