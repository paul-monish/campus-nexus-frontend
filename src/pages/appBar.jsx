import React from 'react'
import { Typography } from '@mui/material';
import logo2 from '../images/cnlogo.png';
import logo1 from '../images/mckvlogo2.png'
import {createTheme, ThemeProvider} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/joy/Stack';

const appBarTheme = createTheme({
    palette: {
      appbarColor: {
        main: '#182c5c',
        contrastText: '#fff',
      },
    },
  });

const appBar = () => {
  return (
    <>
        <ThemeProvider theme={appBarTheme}>
        <AppBar position='absolute' color="appbarColor">
          <Toolbar>
            <img src={logo2} alt="logo" className='nav-logo' />
            <Typography varient="h1" component='div' fontWeight={800} sx={{ flexGrow: 2, fontSize: 20, fontFamily: 'Montserrat' }} > </Typography>
            <Stack direction='row' spacing={1}>
            <img src={logo1} alt="mckvlogo2" height={50} width={300}/>
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

    </>
  )
}

export default appBar