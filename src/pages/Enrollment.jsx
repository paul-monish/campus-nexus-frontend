import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Typography, Container, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppBar from './appBar';
import { Stack } from '@mui/joy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { getEnrolledInfo,getSubject,elective,addEnroll} from '../services/user-service';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserDetails } from '../auth/authenticate';

const ColoredLine = () => (
  <div sx={{ marginTop: "10px", marginBottom: "10px" }}>
    <hr style={{
      color: '#D3D3D3',
      backgroundColor: '#D3D3D3',
      marginTop: '20px',
      height: .1,
      borderColor: '#D3D3D3',
      borderTop: ".1px solid #D3D3D3"
    }} />
  </div>
)

function createData(ID,PAPER_CODE, PAPER_NAME, PAPER_TYPE) {
  return { ID,PAPER_CODE, PAPER_NAME, PAPER_TYPE };
}
function createOptionalRow(ID,PAPER_CODE, PAPER_NAME,ELECTIVE_NO, PAPER_TYPE) {
  return {  ID,PAPER_CODE, PAPER_NAME, ELECTIVE_NO,PAPER_TYPE}
}
function createElectiveRow(ID,ELECTIVE_NO) {
  return { ID, ELECTIVE_NO };
}

const steps = ['Step 1', 'Step 2']; // Two steps

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '2rem'
  },
}));

const paperStyle = { padding: 20, height: '720px', width: "750px", margin: "120px auto", borderRadius: 10 }

const Enrollment = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (e) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
    }
    else{
      //api call
      
      console.log("hh")
      // setpayload()
      // setPayload({...payload,subject:sub})
      console.log(payload);
      addEnroll(payload).then((data)=>{
        //setSubject(data)
       console.log(data);
        
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        alert(error.response.data.message)
    })
      e.preventDefault();
    }
    
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };
  //
  const[user,setUser]=useState({
    universityRollNumber:'',
    semester:{},
    department:{}
  });  
  const[enroll,setEnroll]=useState({
    user:{
      name:'',
      universityRollNumber:'',
      examRollNumber:'',
      semester:{},
      department:{},
      enrolled:'',
      subject:[{id:''}],
    
  }});
  //
  const[payload,setPayload]=useState({
    name: '',
    email: '',
    universityRollNumber: '',
    contactNumber: '',
    dob: '',
    collageRollNumber:'' ,
    examRollNumber: '',
    department: {
        id: '',
        deptName: '',
        created_on: ''
    },
    roles: [
       {
        id:'',
        name:''
       }
    ],
    subject: [
       {
        id:'',
        subjectCode:'',
        subjectName:''
       }    
    ],
    enrolled: false,
    lateral: false,
    streamChanger: false
})
//
  const[sub,setSub]=useState([{id:'',subjectCode:'',subjectName:''}])

  const handleValueChange = (e) => {
    alert(e.target.value);
    optionalRows.filter((s)=>(s.ID===parseInt(e.target.value))==true).map((s)=>{
      console.log(s);
      setSub([...sub,{
        id:s.ID,
        subjectCode: s.PAPER_CODE,
        subjectName:s.PAPER_NAME
      }])
    })
    
     //enroll.user["subject"]=sub
     console.log(sub);
     setPayload({...payload,subject:sub})
     console.log("up")
     console.log(payload);
     // setSelectedValue({...selectedValue,'id':event.target.value});
     // setActive(true);
     // chnageAmountOnSelect(parseInt(event.target.value))
   };
  const [rows,setRows]=useState([{}])
  const [optionalRows,setOptionalRows]=useState([[{}]])
    const[electiveNo,setElectiveNo]=useState([{
    id:'',
    electiveNo:''
  }])
  const getRows=(data)=>{
    return data.filter((s)=>s.active===true && s.optional===false).map((s)=>{
        return createData(s.id,s.subjectCode,s.subjectName,'T')
    })
  }
  const getOptionalRows=(data)=>{
      return data.filter((s)=>s.active===true && s.optional===true).map((s)=>{
        return createOptionalRow(s.id,s.subjectCode,s.subjectName,s.electiveNo,'T')
      })
  }
  const getElectiveRow=(data)=>{
    return data.map((s)=>{
      return createElectiveRow(s.id,s.electiveNo)
    })
  }
  //const navigate =useNavigate();

  const getSub=(semId,deptId)=>{
    getSubject(semId,deptId).then((data)=>{
        //setSubject(data)
        setRows(getRows(data))
        setOptionalRows(getOptionalRows(data))
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        alert(error.response.data)
    })
  }

  //
  const elec=(semId,deptId)=>{
    elective(semId,deptId).then((data)=>{
        //setSubject(data)
       setElectiveNo(getElectiveRow(data))
        
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        alert(error.response.data)
    })
  }
  const getEnroll=(uId)=>{
    getEnrolledInfo(uId).then((data)=>{
      console.log(data)
      setEnroll(data);
      setpayload(data)
      
    }).catch((error)=>{
      console.log(error);
      if(error.response.status === 400 || error.response.status === 404 || error.response.data.status === "false" || error.response.status === 401)
       if(error.response.data===""){ 
        // navigate("/user/dashboard")
      }
    })
  }
  const setpayload=(enroll)=>{
    console.log("ff")
    console.log(enroll);
    setPayload({...payload,
      name: enroll.user.name,
      email: enroll.user.email,
      universityRollNumber: enroll.user.universityRollNumber,
      contactNumber: enroll.user.contactNumber,
      dob: enroll.user.dob,
      collageRollNumber: enroll.user.collageRollNumber,
      examRollNumber: enroll.user.examRollNumber,
      department: {
          id: enroll.user.department.id,
          deptName: enroll.user.department.deptName,
          created_on: enroll.user.department.created_on,
      },
      roles: enroll.user.roles,
      subject:[{}],
      enrolled: 1,
      lateral: false,
      streamChanger: false
    })
  }
  useEffect(()=>{
    setUser(getCurrentUserDetails());
   
   
    if(user.universityRollNumber!==undefined){
      //call api
      getEnroll(user.universityRollNumber)
      
      getSub(user.semester.id,user.department.id)
      elec(user.semester.id,user.department.id)
      
    }
  },[user.universityRollNumber,user.semester.id,user.department.id]);

  const getStepContent = (step) => {
    
    switch (step) {
      case 0:
        return (
          <div >
            <Typography align="center" variant="h5" gutterBottom marginBottom={1} marginTop={3}><b>MCKV INSTITUTE OF ENGINEERING</b></Typography>

            <Typography align="center" gutterBottom marginBottom={0} marginTop={1}>243, G.T. ROAD (NORTH) LILUAH, HOWRAH-711204, WEST BENGAL, INDIA</Typography>

            <Typography align="center" gutterBottom marginBottom={1} marginTop={1} sx={{ fontSize: '.8rem' }}>(An Autonomous Institution Affiliated to Maulana Abul Kalam Azad University of Technology)</Typography>
            <ColoredLine />

            <Typography sx={{ fontSize: '1.2rem' }} align="center" gutterBottom marginBottom={1} marginTop={2}><b>Enrollment Form 2021- 22 for REGULAR Students</b></Typography>

            <Stack direction={'row'} spacing={2} marginTop={1} >
              <Typography gutterBottom fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> <b>Enrollment For :</b> </Typography>
              <Typography gutterBottom fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>{enroll.user.semester.name} Enrollment 2021-22 </Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>Name :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> {enroll.user.name} </Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>For the Degree of :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>Bachelors Degree in B.Tech. in {enroll.user.department.deptName}</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> Registration No. With Year :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>{enroll.user.universityRollNumber} OF 2021-2022</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2} marginBottom={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> Roll No. :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>{enroll.user.examRollNumber}</Typography>
            </Stack>

            <Typography gutterBottom sx={{ fontSize: '1rem' }}>COMPULSORY PAPERS</Typography>

            <TableContainer component={Paper} sx={{ border: '0px solid #ccc' }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{ backgroundColor: "#182c5c" }}>
                  <TableRow>
                    <TableCell sx={{ color: '#FFFFFF' }} align='center'>PAPER CODE</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">PAPER NAME</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }} align="center">PAPER TYPE</TableCell>
                  </TableRow>
                </TableHead>


                <TableBody>
                  {/* {JSON.stringify(payload)} */}
                  {rows.map((row) => (
                    <TableRow
                      key={row.ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 'px solid #ccc' } }}

                    >
                      <TableCell sx={{ borderRight: '1px solid #ccc' }}
                        align="center" component="th" scope="row">
                        {row.PAPER_CODE}
                      </TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row.PAPER_NAME}</TableCell>
                      <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row.PAPER_TYPE}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );

      case 1:
        return (
          <>
            <Typography gutterBottom marginTop={3} sx={{ fontSize: '1.2rem' }}> SELECT ELECTIVE PAPERS</Typography> <ColoredLine />

            <Grid>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           {/* elective */}
           <TableContainer component={Paper} sx={{ border: '0px solid #ccc' }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableBody>
              <TableRow
                      key={1}
                      sx={{ '&:last-child td, &:last-child th': { border: 'px solid #ccc' } }}

              >
              {
                electiveNo.map((e)=>(
                  <TableCell sx={{ borderRight: '1px solid #ccc' }}
                        align="center" component="th" scope="row">

                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{e.ELECTIVE_NO}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label" key={e.ELECTIVE_NO}
                        name={e.ELECTIVE_NO}  onChange={(event)=>{handleValueChange(event)}}
                      >
                    {
                      optionalRows.filter((o)=>o.ELECTIVE_NO===e.ELECTIVE_NO).map((s)=>(
                        <FormControlLabel key={s.ID} value={s.ID} control={<Radio />} label={s.PAPER_NAME}/>
                      ))
                    }
                    </RadioGroup>
              </FormControl>

              </TableCell>
              ))
              }
               </TableRow>
               </TableBody>
              </Table>
            </TableContainer>
              
           
              
              </div>
            </Grid>
          </>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <AppBar></AppBar>
      <Paper elevation={4} style={paperStyle} boxshadow={"5px 5px 5px "} border={1}>
        <Grid className='stud-info'>
          <Container className={classes.container}>


            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 1 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography>All steps completed.</Typography>
                  <Button onClick={() => setActiveStep(0)}>Reset</Button>
                </div>
              ) : (
                <div >
                  {getStepContent(activeStep)}
                  <div >
                    <Button sx={{ marginTop: '20px' }} disabled={activeStep === 0} onClick={handleBack} >
                      Back
                    </Button>
                    <Button sx={{ marginTop: '20px' }} variant="contained" color="primary" onClick={(e)=>handleNext(e)}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>

          </Container>
        </Grid>
      </Paper>
    </>
  );
};

export default Enrollment;
