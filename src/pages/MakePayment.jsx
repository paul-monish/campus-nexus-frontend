import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import { Grid, Paper, Typography, Button, Box, FormHelperText } from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
// import { useNavigate } from "react-router-dom";
import Stack from '@mui/joy/Stack';
import logo2 from '../images/cnlogo.png';
import logo1 from '../images/mckvlogo2.png'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import img1 from './images/logo.jpg';
import displayRazorpay from "../handelers/PaymentHandler";
import { getCurrentUserDetails } from "../auth/authenticate";
import { getSemesters } from "../services/semester-service";

import { getStudentPaymentRecord } from "../services/user-service"
import Logout from "../components/Logout";
// import Redis from "redis";
const appBarTheme = createTheme({
  palette: {
    appbarColor: {
      main: '#182c5c',
      contrastText: '#fff',
    },
  },
});

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

const paperStyle = { padding: 20, height: '950px', width: "750px", margin: "120px auto", borderRadius: 10 }
// const avatarStyle = { backgroundColor: '#20bce4', height: "60px", width: "60px", borderRadius: 1 }
const btnstyle = { margin: '8px 0', backgroundColor: "#ffa500" }


function createData(id,course, semester, amount, payment_type) {
  return { id,course, semester, amount, payment_type };
}

function ratesFor(rates, fees) {
  return { rates, fees };
}

const MakePayment = () => {
  // const navigate = useNavigate();
  // const navigateToPayment = () => {
  //   navigate("/MakePayment");
  // };
// added

  const [rows,setRows]=useState([
    {
       
    }
  ])
  const [active,setActive]=useState(false);
  const[user,setUser]=useState({});    
  const [selectedValue, setSelectedValue] = useState({
    id:'',
    name:'',
    fees:{}
  });
  const [semList,setSemList]=useState([{
    id:'',
    name:'',
    fees:{}
  }])
  const[data,setData]=useState({
    amount:'00000',
  });
 

  //call semeter api
  const getAllSemesters=()=>{
    getSemesters().then((data)=>{
        setSemList(data)
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        alert(error.response.data.message)
    })
  }
  const getRows=(data)=>{
    return data.map((s)=>{
        return createData(s.id,s.paymentDetails.user.department.deptName,s.semester.name,s.paymentDetails.amount,'Card')
    })
  }
  //call payment details api
  const getPaymentDetails=(userId)=>{
    getStudentPaymentRecord(userId).then((data)=>{
        console.log(data);
        setRows(getRows(data));
    }).catch((error)=>{
      console.log(error)
    //   if(error.response.status === 400 || error.response.status === 404)
    //     alert(error.response.data.message)
    })
  }
  const makeSemMenu=()=> {
    return semList.map((s) => {
      return <MenuItem key={s.id} value={s.id}>{s.name} 
             </MenuItem>;
    });
  }
  const chnageAmountOnSelect=(id)=>{
    semList.filter((s)=>s.id===id).map((s)=>{ 
      return setData({...data,'amount':s.fees.fees})
    })
  }
  const handleValueChange = (event) => {
    setSelectedValue({...selectedValue,'id':event.target.value});
    setActive(true);
    chnageAmountOnSelect(parseInt(event.target.value))
  };

  const handlePayment=(e)=>{
    data['universityRollNumber']=user.universityRollNumber;
    data['semId']=selectedValue.id;
    displayRazorpay(data);
    e.preventDefault();
  }
 



  useEffect(()=>{
    setUser(getCurrentUserDetails());
    console.log(user);
    if(user.universityRollNumber!==undefined){
        getPaymentDetails(user.universityRollNumber);
        getAllSemesters();
     }
  },[user.universityRollNumber]);

  //global to local 
  const rateTable = [
    ratesFor('Tuition', '₹'+data.amount),
    ratesFor('Total', '₹'+data.amount),
  ];
  

// const rows = [
//     createData('BTECH', 'First', '₹40000', 'Card'),
//     createData('BTECH', 'Second', '₹40000', 'Card'),
//     createData('BTECH', 'Third', '₹42000', 'Card'),
//     createData('BTECH', 'Fourth', '₹42000', 'Card'),
//     createData('BTECH', 'Fifth', '₹44000', 'UPI'),
//   ];

  return (
    <>
      <ThemeProvider theme={appBarTheme}>
        <AppBar position='absolute' color="appbarColor">
          <Toolbar>
            <img src={logo2} alt="logo" className='nav-logo' />
            <Logout/>
            <Typography varient="h1" component='div' fontWeight={800} sx={{ flexGrow: 2, fontSize: 20, fontFamily: 'Montserrat' }} > </Typography>
            <Stack direction='row' spacing={1}>
            <img src={logo1} alt="mckvlogo2" height={50} width={300}/>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      
      <Paper elevation={4} style={paperStyle} boxshadow={"5px 5px 5px "} border={1}>
        <Grid className='stud-info'>

          <Typography variant="h5" gutterBottom marginBottom={1} marginTop={4}> Application for Fees Payment</Typography>
          <ColoredLine />
          
          <Stack direction={'row'} spacing={2} marginTop={3} >
            <Typography gutterBottom fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>Applicant Name :</Typography>
            <Typography gutterBottom fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> {user.name} </Typography>
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <Typography fontWeight={1000} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}>Email :</Typography>
            <Typography fontWeight={350} sx={{ fontFamily: 'Roboto', fontSize: 15, textAlign: "center" }}> {user.email} </Typography>
          </Stack>

          <Typography variant="h6" gutterBottom marginBottom={1} marginTop={3}> Previous payment information</Typography>

          <TableContainer component={Paper} sx={{ border: '0px solid #ccc' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          
              <TableHead sx={{ backgroundColor: "#182c5c" }}>
                <TableRow>
                  <TableCell sx={{ color: '#FFFFFF' }} align='center'>Course</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">Semester</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">Amount</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">Payment Type</TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {rows.length>0? rows.map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{ '&:last-child td, &:last-child th': { border: '1px solid #ccc' } }}

                  >
                    <TableCell sx={{ borderRight: '1px solid #ccc' }}
                      align="center" component="th" scope="row">
                      {row?.course}
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row?.semester}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row?.amount/100}</TableCell>
                    <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row?.payment_type}</TableCell>
                  </TableRow>
                )):<TableRow
                sx={{ '&:last-child td, &:last-child th': { border: '1px solid #ccc' } }}>
                  No data Found
                  </TableRow>
                }
              
              </TableBody>

            </Table>
          </TableContainer>



          <Typography variant="h6" gutterBottom marginBottom={1} marginTop={4}> Select semester for next payment</Typography>


          <Box width={250} marginTop={2}>
        
            <FormControl fullWidth>
              <InputLabel label='' id="sem-select" required >Choose Sem</InputLabel>
              <Select
                labelId="sem-select"
                id="sem" name="sem"
                defaultValue={'DEFAULT'}
                label="Semester"
                // value={selectedValue} 
                onChange={(event)=>{handleValueChange(event)}}
              >
                <MenuItem value="DEFAULT" disabled>Choose a Semester ...</MenuItem>
                {/* <MenuItem value={2}>Second Sem</MenuItem>
                <MenuItem value={3}>Third Sem</MenuItem>
                <MenuItem value={4}>Fourth Sem</MenuItem>
                <MenuItem value={5}>Fifth Sem</MenuItem>
                <MenuItem value={6}>Sixth Sem</MenuItem>
                <MenuItem value={7}>Seventh Sem</MenuItem>
                <MenuItem value={8}>Eighth Sem</MenuItem> */}
                {makeSemMenu()}
              </Select>
              <FormHelperText> Please select Semester </FormHelperText>
            </FormControl>
          </Box>

          <Typography variant="h6" gutterBottom marginBottom={1} marginTop={5}>Processing Fee Rates</Typography>

          <TableContainer component={Paper} sx={{ border: '0px solid #ccc' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">

              <TableHead sx={{ backgroundColor: "#182c5c" }}>
                <TableRow>
                  <TableCell sx={{ color: '#FFFFFF' }} align='center'>Rates for</TableCell>
                  <TableCell sx={{ color: '#FFFFFF' }} align="center">Fees</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rateTable.map((row2) => (
                  <TableRow
                    key={row2.rates}
                    sx={{ '&:last-child td, &:last-child th': { border: 'px solid #ccc' } }}

                  >
                    <TableCell sx={{ borderRight: '1px solid #ccc' }}
                      align="center" component="th" scope="row">
                      {row2.rates}
                    </TableCell>
                    <TableCell sx={{ borderRight: '1px solid #ccc' }} align="center">{row2.fees}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>


          <Grid container justifyContent="center">
            <Grid item>
              <Box width={100} marginTop={7}>
                <Button type='submit' color='primary' variant="contained" style={btnstyle} sx={{fontWeight: 'bold', display: 'flex', justifyContent: 'center' }} fullWidth fontWeight="bold" disabled={!active} onClick={(e)=>handlePayment(e)}>Pay Here</Button>
              </Box>
            </Grid>
          </Grid>


        </Grid>


        <Grid container>
          <Typography fontWeight={1000} sx={{ fontFamily: 'Catamaran', fontSize: 25, textAlign: "center" }}>
          </Typography>
        </Grid>
      </Paper>
    </>
  )
}

export default MakePayment
