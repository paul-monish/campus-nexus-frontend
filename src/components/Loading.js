import React from "react";
import { Circles } from "react-loader-spinner";
import { Box, Grid } from "@mui/material";
const Loading = ({ show }) => {
  return (
    show && (
      <div
        style={{
          position: "fixed",
          width: "100%",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: " #47464691", //
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex:99997
        }}
      >
       
        <div
          item
          xs="auto"
          style={{
            backgroundColor: "#ffffffec",
            paddingRight: 9,
            paddingLeft: 9,
            paddingTop: 10,
            paddingBottom:10,
            borderRadius: 7,
          }}
        >
          <Circles
            height="40"
            width="40"
            color=" #202c5c"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    )
  );
};

export default Loading;
