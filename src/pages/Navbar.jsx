import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Typography, Button} from '@mui/material'
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";
import Stack from '@mui/joy/Stack';
import logo2 from '../images/cnlogo.png';

const theme = createTheme({
    palette: {
        appbarColor: {
            main: '#182c5c',
            contrastText: '#fff',
        },
    },
});
const Navbar = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/user/fees-payment");
    }

    const navigate2 = useNavigate();
    const navigateToEnrollment = () => {
        navigate2("/user/enrollment");
    }
    return (
        <ThemeProvider theme={theme}>
            <AppBar position='absolute' color="appbarColor">
                <Toolbar>
                    <img src={logo2} alt="logo" className='nav-logo' />
                    <Typography varient="h1" component='div' fontWeight={800} sx={{ flexGrow: 2, fontSize: 20, fontFamily: 'Montserrat' }} > </Typography>
                    <Stack direction='row' spacing={1}>
                        <Button color='inherit' sx={{ fontFamily: 'Catamaran', fontSize: 17 }}> Home</Button>
                        <Button color='inherit' sx={{ fontFamily: 'Catamaran', fontSize: 17 }}> College Ranklist</Button>
                        <Button color='inherit' sx={{ fontFamily: 'Catamaran', fontSize: 17 }}> Student Profile</Button>
                        <Button color='inherit' sx={{ fontFamily: 'Catamaran', fontSize: 17 }}> Search</Button>
                        <Button onClick={navigateToLogin} color='inherit' sx={{ fontFamily: 'Catamaran', fontSize: 17 }}> Make Payment</Button>
                        <Button onClick={navigateToEnrollment} color='inherit' sx={{ fontFamily: 'Catamaran', fontSize: 17 }}>Enrollment</Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    )
}
export default Navbar