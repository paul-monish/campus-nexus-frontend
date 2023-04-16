import React from 'react'
import { Circles } from 'react-loader-spinner'
import { Grid } from '@mui/material'
const Loading = ({show}) => {
  return show && (
    <Grid container
    style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Grid item xs='auto'>
        <Circles
        height="80"
        width="80"
        color="#0000FF"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </Grid>
   </Grid>
  )
}

export default Loading