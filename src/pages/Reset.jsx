import { Grid, Paper, TextField, Typography, Button, Avatar } from '@mui/material'
import { Link } from "react-router-dom";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import {changePassword }from '../services/user-service';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { decrypt } from '../security/JWTSecurity';
import Swal from 'sweetalert2';
const Reset = () => {
  const paperStyle = { padding: 20, height: '370px', width: '280px', margin: "90px auto", borderRadius: 10 }
  const avatarStyle = { backgroundColor: '#1bbd7e', height: "60px", width: "60px" }
  const btnstyle = { margin: '8px 0' }
    const navigate =useNavigate();
    const [user,setUser]=useState({
        password:'',
        cpassword:''
       });
    const [data,setData]=useState(undefined);
    useEffect(()=>{
      
        setData(decrypt(localStorage.getItem('email')));
        document.title="mckvie payment";
      },[]);
       const handleChnage=(e)=>{
         setUser({...user,[e.target.name]:e.target.value})
        }
        const submitForm=(e)=>{
         e.preventDefault()
         //data validate
         if(user.password.trim()==='' || user.cpassword.trim()===''){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password Is Required!",
          });
           return;
         }
         if(user.password.trim()!==user.cpassword.trim()){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password Must Be Same!",
          });
            return;
          }
         //call api
         user['email']=data
         changePassword(user).then((data)=>{
           //save
             Swal.fire({
              icon: "success",
              title: data.message??"Your Password Is Successfully Changed!",
              showConfirmButton: false,
              timer: 1500
            });
             localStorage.removeItem('email')
             navigate("/login")
          
         }).catch((error)=>{
           if(error.response.status === 400 || error.response.status === 404){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message|"Something Went Wrong!",
            });
            return
           }
         })
     
        }
  return (
    <Grid >

    <Paper elevation={10} style={paperStyle} boxshadow={"5px 5px 10px #ccc"} sx={{
        ":hover": {
            boxShadow: '10px 10px 20px #ccc'
        }
    }}>
        <Grid align="center">
            <Avatar style={avatarStyle}> <LockResetOutlinedIcon sx={{marginRight: .5 , height: "45px", width: "50px" }} /> </Avatar>
            <Typography fontFamily={"Roboto"} variant='h5'
                padding={1} marginBottom="10" textAlign='center' color={"#4C4C4C"}>Reset Password</Typography>
        </Grid>
        <form onSubmit={submitForm}>
        <TextField margin="normal" label='Enter new password' type="password" fullWidth 
        id='password'
        name='password' 
        onChange={(e)=>handleChnage(e)}
        value={user.password}
        />
        <TextField margin="normal" label='Confirm password' type="password" fullWidth 
        id='cpassword'
        name='cpassword' 
        onChange={(e)=>handleChnage(e)}
        value={user.cpassword}
        />

        <Button endIcon={<LoginOutlinedIcon />} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>
        </form>
        <Typography >
            <Link to={"/"} > Back to Login Page </Link>
        </Typography>

    </Paper>
</Grid>
  )
}

export default Reset