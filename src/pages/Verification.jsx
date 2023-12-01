import { Grid, Paper, TextField, Typography, Button, Avatar } from '@mui/material'
import { Link, useNavigate } from "react-router-dom";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import { useState } from 'react';
import { decrypt } from '../security/JWTSecurity';
import Swal from 'sweetalert2';
const Verification = () => {
  const paperStyle = { padding: 20, height: '330px', width: "280px", margin: "90px auto", borderRadius: 10 }
  const avatarStyle = { backgroundColor: '#1bbd7e', height: "60px", width: "60px" }
  const btnstyle = { margin: '8px 0' }

  const [otp,setOtp]=useState({
    otp:''
  })
  const handleChnage=(e)=>{
    // console.log(e.target.name);
    setOtp({...otp,[e.target.name]:e.target.value})
   }

  const navigate = useNavigate();
  const navigateToReset = () => {
    if(otp.otp.trim()==='' ){
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text:"OTP is required!",
        });
    return;
  }
    if(decrypt(sessionStorage.getItem('otp'))===otp.otp){
      sessionStorage.removeItem('otp')
      navigate("/Reset");
    }
    else{
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text:"Entered Correct OTP!",
        });        
      return
    }
    
  }
  

  return (
    <Grid >

      <Paper elevation={10} style={paperStyle} boxshadow={"5px 5px 10px #ccc"} sx={{
        ":hover": {
          boxShadow: '10px 10px 20px #ccc'
        }
      }}>
        <Grid align="center">
          <Avatar style={avatarStyle}> <DomainVerificationOutlinedIcon sx={{height: "45px", width: "50px" }} /> </Avatar>
          <Typography fontFamily={"Roboto"} variant='h5'
            padding={1} marginBottom="10" textAlign='center' color={"#4C4C4C"}>Email Verification</Typography>
        </Grid>

        <Typography marginBottom={"10px"} marginTop={"10px"} align='center' color={"#AEAEAE"}> We've sent a code to your email </Typography>

        <TextField margin='normal' label='Enter 6 digit code' type="text" fullWidth 
        name='otp' 
        id='otp'
        onChange={(e)=>handleChnage(e)}
        value={otp.otp}
        />

        <Button onClick={navigateToReset} endIcon={<LoginOutlinedIcon />} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>

        <Typography >
          <Link to={"/"} > Back to Login Page </Link>
        </Typography>

      </Paper>
    </Grid>
  )
}

export default Verification