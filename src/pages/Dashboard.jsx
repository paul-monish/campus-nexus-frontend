import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import logo1 from "../images/mckvlogo.png";

const Dashboard = () => {
  const paperStyle = {
    padding: 20,
    height: "440px",
    width: "750px",
    margin: "120px",
    borderRadius: 10,
  };
 
  return (
    <>
      <Navbar></Navbar>
      <Paper elevation={4} style={paperStyle} boxShadow={"5px 5px 5px "}>
        <Grid container>
          <img src={logo1} alt="logo" className="body-logo" />
          <Typography
            fontWeight={1000}
            sx={{ fontFamily: "Catamaran", fontSize: 25, textAlign: "center",paddingBottom:2 }}
          >
            A minimalist Fees Payment and Ranklist application for MCKVIE (MCKV
            INSTITUTE OF ENGINEERING).
          </Typography>
          <Typography fontWeight={600}
            sx={{ fontFamily: "Catamaran", fontSize: 15, textAlign: "center",borderTop:1,paddingTop:2,borderTopColor:'#c2c2c2'}}>
            MCKV Institute of Engineering is one of the top engineering colleges
            in West Bengal established almost two decades ago with a vision to
            foster the spirit of technological learning and its application
            through creating the right kind of opportunity and ambience for
            educating young minds in the digital era. The Institute has been
            accredited by NAAC with an ‘A’ Grade, and it is an Autonomous
            Institute affiliated to MAKAUT, WB and approved by AICTE.
          </Typography>
        </Grid>
      </Paper>
    </>
  );
};
export default Dashboard;
