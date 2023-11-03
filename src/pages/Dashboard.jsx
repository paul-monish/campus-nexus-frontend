import React from 'react';
import {  Grid, Paper, Typography, Button, AppBar, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import logo1 from '../images/mckvlogo.png';

const Dashboard = () => {
  const paperStyle = { padding: 20, height: '440px', width: "750px", margin: "120px auto", borderRadius: 10 }
  // const avatarStyle = { backgroundColor: '#20bce4', height: "60px", width: "60px", borderRadius: 1 }
  // const btnstyle = { margin: '8px 0' }
  // const navigate = useNavigate();
  // const navigateToLogin = () => {
  //   navigate("/login");
  // }
  return (
    <>
    <Navbar></Navbar>
      <Paper elevation={4} style={paperStyle} boxShadow={"5px 5px 5px "}>
        <Grid container>
        <img src={logo1} alt="" className='body-logo'/>
            <Typography fontWeight={1000} sx={{fontFamily: 'Catamaran', fontSize: 25, textAlign: "center" }}>
            A minimalist Fees Payment and Ranklist application for MCKVIE (MCKV INSTITUTE OF ENGINEERING).
            </Typography>
        </Grid>
      </Paper>
    </>


  )
}
export default Dashboard