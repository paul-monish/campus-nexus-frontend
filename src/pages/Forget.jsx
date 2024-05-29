import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import { sendOtpEmail } from "../services/user-service";
import { useState } from "react";
import { encryptData } from "../security/JWTSecurity";
import Swal from "sweetalert2";
const Forget = () => {
  const paperStyle = {
    padding: 20,
    height: "320px",
    width: "280px",
    margin: "90px auto",
    borderRadius: 10,
  };
  const avatarStyle = {
    backgroundColor: "#1bbd7e",
    height: "60px",
    width: "60px",
  };
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("/Verification");
  };
  const [user, setUser] = useState({
    email: "",
  });
  const handleChnage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    //data validate
    if (user.email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email-Id is required!",
      });
      return;
    }
    //call api
    sendOtpEmail(user)
      .then((data) => {
        //save
        sessionStorage.setItem("otp", encryptData(data.message));
        localStorage.setItem("email", encryptData(user.email));
        Swal.fire({
          icon: "success",
          title: "OTP Send To Your Registered Email-Id, Check Your Mail!!",
          showConfirmButton: false,
          timer: 1500,
        });
        //redirect
        navigateToVerification();
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message ?? "Something Went Wrong!",
          });
        }
      });
  };
  return (
    <Grid>
      <Paper
        elevation={10}
        style={paperStyle}
        boxshadow={"5px 5px 10px #ccc"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <Grid align="center">
          <Avatar style={avatarStyle}>
            {" "}
            <LockResetOutlinedIcon
              sx={{ marginRight: 0.5, height: "45px", width: "50px" }}
            />{" "}
          </Avatar>
          <Typography
            fontFamily={"Roboto"}
            variant="h5"
            padding={1}
            marginBottom="10"
            textAlign="center"
            color={"#4C4C4C"}
          >
            Forgot Password?
          </Typography>
        </Grid>
        <form onSubmit={submitForm}>
          <Typography
            marginBottom={"5px"}
            marginTop={"5px"}
            align="center"
            color={"#AEAEAE"}
          >
            Enter your registered email{" "}
          </Typography>

          <TextField
            margin="normal"
            label="Email"
            id="email"
            type="text"
            fullWidth
            name="email"
            onChange={(e) => handleChnage(e)}
            value={user.email}
          />

          {/* <Button onClick={navigateToVerification} endIcon={<LoginOutlinedIcon />}
                    type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>
                    Submit
                </Button> */}
          <Button
            endIcon={<LoginOutlinedIcon />}
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Submit
          </Button>
        </form>
        <Typography>
          <Link to={"/"}> Back to Login Page </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Forget;
