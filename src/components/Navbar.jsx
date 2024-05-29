import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Typography, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/joy/Stack";
import logo2 from "../images/nexus-logo.png";
import { useCallback } from "react";
import Logout from "./Logout";

const theme = createTheme({
  palette: {
    appbarColor: {
      main: "#182c5c",
      contrastText: "#fff",
    },
  },
});

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    navigate("/user/fees-payment");
  };

  const navigateToEnrollment = () => {
    navigate("/user/enrollment");
  };

  const navigateToRankList = useCallback(() => {
    navigate("/user/rank-list");
  }, [navigate]);

  const navigateToStudentProfile = useCallback(() => {
    navigate("/user/student-profile");
  }, [navigate]);

  const navigateToDashboard = useCallback(() => {
    navigate("/user/dashboard");
  }, [navigate]);

  return (
    <ThemeProvider theme={theme} style={{width:'100%'}}>
      <AppBar position="absolute" color="appbarColor">
        <Toolbar>
          <div className="flex  justify-center items-center gap-3">
            <div className="bg-white rounded-md" style={{ boxShadow: "rgba(5, 5, 5, 0.35) 0px 5px 15px" }}>
              <img
                src={logo2}
                alt="logo"
                className="nav-logo"
                style={{ height: "30px", width: "30px", objectFit: "contain" }}
              />
            </div>
            <span className="text-slate-100 text-bold" style={{fontSize:'17px'}}>{`Campus Nexus`}</span>
          </div>
          <Typography
            varient="h1"
            component="div"
            fontWeight={800}
            sx={{ flexGrow: 2, fontSize: 20, fontFamily: "Montserrat" }}
          >
            {" "}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              onClick={navigateToDashboard}
              color="inherit"
              sx={{
                fontFamily: "Catamaran",
                fontSize: 15,
                fontWeight: 600,
                color:
                  location.pathname === "/user/dashboard"
                    ? "#ffffff"
                    : "#c2c2c2",
              }}
            >
              {" "}
              Home
            </Button>
            <Button
              onClick={navigateToRankList}
              color="inherit"
              sx={{
                fontFamily: "Catamaran",
                fontSize: 15,
                fontWeight: 600,
                color:
                  location.pathname === "/user/rank-list"
                    ? "#ffffff"
                    : "#c2c2c2",
              }}
            >
              {" "}
              College Rank List
            </Button>
            <Button
              onClick={navigateToStudentProfile}
              color="inherit"
              sx={{
                fontFamily: "Catamaran",
                fontSize: 15,
                fontWeight: 600,
                color:
                  location.pathname === "/user/student-profile"
                    ? "#ffffff"
                    : "#c2c2c2",
              }}
            >
              {" "}
              Student Profile
            </Button>
            {/* <Button
              color="inherit"
              sx={{ fontFamily: "Catamaran", fontSize: 17 }}
            >
              {" "}
              Search
            </Button> */}
            <Button
              onClick={navigateToLogin}
              color="inherit"
              sx={{
                fontFamily: "Catamaran",
                fontSize: 15,
                fontWeight: 600,
                color:
                  location.pathname === "/user/fees-payment"
                    ? "#ffffff"
                    : "#c2c2c2",
              }}
            >
              {" "}
              Make Payment
            </Button>
            <Button
              onClick={navigateToEnrollment}
              color="inherit"
              sx={{
                fontFamily: "Catamaran",
                fontSize: 15,
                fontWeight: 600,
                color:
                  location.pathname === "/user/enrollment"
                    ? "#ffffff"
                    : "#c2c2c2",
              }}
            >
              Enrollment
            </Button>
            <Logout />
          </Stack>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};
export default Navbar;
