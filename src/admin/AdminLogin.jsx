import React, { useState } from 'react'
import { FormControlLabel, Checkbox, Grid, Paper, TextField, Typography, Button, Avatar} from '@mui/material'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from "react-router-dom";
import { login } from '../services/user-service';
import { doLogin } from '../auth/authenticate';
import { useNavigate } from 'react-router-dom';

export const AdminLogin = () => {
  const paperStyle = { padding: 20, height: '480px', width: "280px", margin: "7vh auto", borderRadius: 10 }
  const avatarStyle = { backgroundColor: '#1bbd7e', height: "60px", width: "60px" }
  const btnstyle = { margin: '8px 0' }

  const navigate =useNavigate();
 
  const [user,setUser]=useState({
    username:'',
    password:''
  });
  // const [error,setError]=useState({
  //   errors:{},
  //   isError:false
  // });

  //handle change 
   const handleChnage=(e)=>{
    // console.log(e.target.name);
    setUser({...user,[e.target.name]:e.target.value})
   }

   const resetUser=()=>{
    setUser({
      username:'',
      password:''
    })
   }

   const submitForm=(e)=>{
    e.preventDefault()
    //data validate
    if(user.username.trim()==='' || user.password.trim()===''){
      alert("credential is required!!")
      return;
    }
    //call api
    
    login(user).then((data)=>{
      //save
      doLogin(data,()=>{
        //redirect
        navigate("/admin/admin-dashboard")
      })
    }).catch((error)=>{
      // console.log(error)
      console.log(error);
      if(error.response.status === 400 || error.response.status === 404 || error.response.data.status === "false" || error.response.status === 401)
        alert(error.response.data.message)
        resetUser()
    })

   }
  return (
    <Grid align="left">
      <Paper elevation={10} style={paperStyle} boxshadow={"5px 5px 10px #ccc"} sx={{
        ":hover": {
          boxShadow: '10px 10px 20px #ccc'
        }
      }}>
       <Grid align="center">
          <Avatar style={avatarStyle}> <PersonRoundedIcon sx={{ height: "50px", width: "50px" }} /> </Avatar>
          <Typography fontFamily={"Roboto"} variant='h5'
            padding={1} marginBottom="10" textAlign='center' color={"#4C4C4C"}>Login as Admin</Typography>
        </Grid>

       <form onSubmit={submitForm}>
          <TextField margin="normal" label='University Roll' type="text" id='username' 
          name='username'
          fullWidth  
          onChange={(e)=>handleChnage(e)}
          value={user.username}
          />
          <TextField margin="normal" label='Password' type='password' id='password' 
          fullWidth 
          name='password' 
          onChange={(e)=>handleChnage(e)}
          value={user.password}
          />

          <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

          <Button endIcon={<LoginOutlinedIcon />}  type='submit' color='primary' variant="contained" style={btnstyle} fullWidth >Sign in</Button>

          <Button endIcon={<CancelOutlinedIcon />} href='https://mckv.ucanapply.com/' type='submit' color='error' variant="contained" style={btnstyle} fullWidth>Cancel</Button>
       </form>

        <Typography >
          <Link to={"forgot"}> Forgot password? </Link>
        </Typography>

      </Paper>
    </Grid>
  )
}
export default AdminLogin;




