import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Typography, Container, Paper, Grid,Box,FormHelperText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppBar from './appBar';
import { Stack } from '@mui/joy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';

import FormControl from '@mui/material/FormControl';

import Swal from 'sweetalert2'
import { getEnrolledInfo,getSubject,elective,addEnroll} from '../services/user-service';
import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserDetails } from '../auth/authenticate';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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
//add
function createSub(id,subjectCode,subjectName,paperType) {
  return {id,subjectCode,subjectName,paperType};
}
//

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
  const navigate =useNavigate();

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);



  const handleNext = (e) => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
    }
    else{
      //api call
      console.log(payload)
      try{
        addEnroll(payload).then((data)=>{
       console.log(data);
       Swal.fire({
        // position: "top-end",
        icon: "success",
        title: "Your Have Successfully Enrolled!",
        showConfirmButton: false,
        timer: 1500
      });
      fetch(`http://localhost:5001/api/v1/permanent/enroll?uRoll=${payload.universityRollNumber}`)
      window.location.href = `http://localhost:5001/api/v1/permanent/enroll?uRoll=${payload.universityRollNumber}`
      }).catch((error)=>{
        console.log(error)
        if(error.response.status === 400 || error.response.status === 404){
          console.log(error.response.data.message)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message|"Something went wrong!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
          
      })
      }catch(error){
        alert(error)
      }
      
      
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
    semester:{
      id: '',
      deptName: '',
      created_on: ''
    },
    enrolled: false,
    lateral: false,
    streamChanger: false
})
//
  const[sub,setSub]=useState([{id:'',subjectCode:'',subjectName:'',paperType:''}])

  const handleValueChange = (e) => {
    
    optionalRows.filter((s)=>(s.ID===parseInt(e.target.value))).map((s)=>{
      alert(s.ID===parseInt(e.target.value))
      console.log(s);
      return setSub([...sub,{
        id:s.ID,
        subjectCode: s.PAPER_CODE,
        subjectName:s.PAPER_NAME,
        paperType:s.PAPER_TYPE
      }])
    })
     console.log(sub);
     payload["subject"]=sub
    //  setPayload({...payload,subject:sub})
    //  console.log("up")
    //  console.log(payload);
   };
  const [rows,setRows]=useState([{}])
  const [optionalRows,setOptionalRows]=useState([[{}]])
  const[electiveNo,setElectiveNo]=useState([{
    id:'',
    electiveNo:''
  }])
//add
const getSubs=(data)=>{
  return data.filter((s)=>s.active===true && s.optional===false).map((s)=>{
      return createSub(s.id,s.subjectCode,s.subjectName,s.paperType)
  })
}
//
  const getRows=(data)=>{
    return data.filter((s)=>s.active===true && s.optional===false).map((s)=>{
        return createData(s.id,s.subjectCode,s.subjectName,s.paperType)
    })
  }
  const getOptionalRows=(data)=>{
      return data.filter((s)=>s.active===true && s.optional===true).map((s)=>{
        return createOptionalRow(s.id,s.subjectCode,s.subjectName,s.electiveNo,s.paperType)
      })
  }
  const getElectiveRow=(data)=>{
    return data.map((s)=>{
      return createElectiveRow(s.id,s.electiveNo)
    })
  }


  const getSub=(semId,deptId)=>{
    getSubject(semId,deptId).then((data)=>{
        //setSubject(data)
        setRows(getRows(data))

        setSub(getSubs(data))//add

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
      if(data===null){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "fees yet not payed or student alreay enrolled!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
        navigate("/user/dashboard")
      }
      setEnroll(data);
      setpayload(data)
      
    }).catch((error)=>{
      console.log(error);
    })
  }

  const setpayload=(enroll)=>{
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
      semester:{
        id: enroll.user.semester.id,
        name: enroll.user.semester.name,
        created_on: enroll.user.semester.created_on
      },
      roles: enroll.user.roles,
      subject:[{
          id:'',
          subjectCode:'',
          subjectName:''
      }],
      enrolled: 1,
      lateral: false,
      streamChanger: false
    })
  }

  useEffect(()=>{
    setUser(getCurrentUserDetails());
   
    if(user?.universityRollNumber!==undefined){
      //call api
      try{
        getEnroll(user?.universityRollNumber)
        getSub(user?.semester.id,user.department.id)
        elec(user?.semester.id,user.department.id)
      }catch(error){
        alert(error)
      }
    }
  },[user?.universityRollNumber,user?.semester.id,user?.department.id]);

  const getStepContent = (step) => {
    
    switch (step) {
      case 0:
        return (
          <div >
            <Typography align="center" variant="h5" gutterBottom marginBottom={1} marginTop={3}><b>MCKV INSTITUTE OF ENGINEERING</b></Typography>

            {/* {JSON.stringify(sub)} */}
            <Typography align="center" gutterBottom marginBottom={0} marginTop={1}>243, G.T. ROAD (NORTH) LILUAH, HOWRAH-711204, WEST BENGAL, INDIA</Typography>

            <Typography align="center" gutterBottom marginBottom={1} marginTop={1} sx={{ fontSize: '.8rem' }}>(An Autonomous Institution Affiliated to Maulana Abul Kalam Azad University of Technology)</Typography>
            <ColoredLine />

            <Typography sx={{ fontSize: '1.2rem' }} align="center" gutterBottom marginBottom={1} marginTop={2}><b>Enrollment Form {enroll?.user.batch} for Regular Students</b></Typography>

            <Stack direction={'row'} spacing={2} marginTop={1} >
              <Typography gutterBottom fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> <b>Enrollment For :</b> </Typography>
              <Typography gutterBottom fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>{enroll?.user.semester.name} Enrollment {enroll?.user.batch} </Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>Name :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> {enroll?.user.name} </Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>For the Degree of :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>Bachelors Degree in {enroll?.user.department.deptName}</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> Registration No. With Year :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>{enroll?.user.universityRollNumber} Of {enroll?.user.batch}</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2} marginBottom={2}>
              <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> Roll No. :</Typography>
              <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>{enroll?.user.examRollNumber}</Typography>
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
                      <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row.PAPER_TYPE==='S'?'Sessional':row.PAPER_TYPE==='P'?'Practical':'Theory'}</TableCell>
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
          {/* <Box width={230} marginTop={2}>  */}
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} 
          direction="row"
          justifyContent="center"
          alignItems="center"
          // style={{ display: 'flex'}}
          >
          {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
           {/* elective */}
           {/* <TableContainer component={Paper} sx={{ border: '0px solid #ccc' }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableBody>
              <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 'px solid #ccc' } }}> */}
              {/* {
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
              } */}

                {/* <Typography variant="h6" gutterBottom marginBottom={1} marginTop={4}> Select semester for next payment</Typography> */}
                {
                  electiveNo.map((e,index)=>(
                    <Grid item xs={2} sm={4} md={4} key={index}>
                    {/* <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center" component="th" scope="row">*/}
                    {/* <Box width={230} marginTop={2}>  */}
                      <FormControl fullWidth>
                        <InputLabel label='' id="paper-select" required >Choose {e.ELECTIVE_NO} Paper</InputLabel>
                        <Select
                          labelId="paper-select"
                          id={"paper-"+e.ELECTIVE_NO}
                          defaultValue={'DEFAULT'}
                          label="Paper"
                          // value={selectedValue} 
                          key={e.ELECTIVE_NO}
                          name={"paper-"+e.ELECTIVE_NO}
                          onChange={(event)=>{handleValueChange(event)}}
                        >
                          <MenuItem value="DEFAULT" disabled>---Choose a {e.ELECTIVE_NO} Paper---</MenuItem>
                          {
                            optionalRows.filter((o)=>o.ELECTIVE_NO===e.ELECTIVE_NO).map((s)=>(
                              <MenuItem key={s.ID} value={s.ID}>{s.PAPER_NAME} {s.PAPER_TYPE==='S'?'(Sessional)':s.PAPER_TYPE==='P'?'(Practical)':'(Theory)'
                              }</MenuItem>
                            ))
                          }
                        </Select>
                        <FormHelperText> Please select {e.ELECTIVE_NO} optional paper </FormHelperText>
                      </FormControl>
                      {/* </Box> */}
                   {/* </TableCell> */}
                    </Grid>
                  ))
                }
               {/* </TableRow>
               </TableBody>
              </Table>
            </TableContainer> */}
            {/* elective */}
            {/* </div> */}
            </Grid>
            </Box>
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
