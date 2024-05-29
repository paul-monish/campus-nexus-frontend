import React, { useEffect,useState } from 'react'
import { doLogout, getCurrentUserDetails } from '../auth/authenticate';
import { logout } from '../services/user-service';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Swal from 'sweetalert2'
const AdminLogout = () => {
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
                Swal.fire({
                  icon: "success",
                  title: data.message??"Logout Successfully!",
                  showConfirmButton: false,
                  timer: 1500
                });
                navigate("/admin-login")
            })
        }
        
      }).catch((error)=>{
        alert(error)
      })
  }
  const btnstyle = { margin: '8px 0', backgroundColor: "#ffa500" }
  return (
   
    <div>
       <Button type='submit' color='primary' variant="contained" style={btnstyle} sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center' }} fullWidth fontWeight="bold"  onClick={exitFromSession}>Logout</Button> 
    </div>
  )
}
export default AdminLogout