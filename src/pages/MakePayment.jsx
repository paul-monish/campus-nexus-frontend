import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  FormHelperText,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
// import { useNavigate } from "react-router-dom";
import Stack from "@mui/joy/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import img1 from './images/logo.jpg';
import displayRazorpay from "../handelers/PaymentHandler";
import { getCurrentUserDetails } from "../auth/authenticate";
import { getSemesters } from "../services/semester-service";
import AppBar from "../components/appBar";
import { getStudentPaymentRecord } from "../services/user-service";
import Navbar from "../components/Navbar";
// import Redis from "redis";

const ColoredLine = () => (
  <div sx={{ marginTop: "10px", marginBottom: "10px" }}>
    <hr
      style={{
        color: "#D3D3D3",
        backgroundColor: "#D3D3D3",
        marginTop: "20px",
        height: 0.1,
        borderColor: "#D3D3D3",
        borderTop: ".1px solid #D3D3D3",
      }}
    />
  </div>
);

const paperStyle = {
  padding: 20,
  height: "950px",
  width: "750px",
  margin: "120px auto",
  borderRadius: 10,
};
// const avatarStyle = { backgroundColor: '#20bce4', height: "60px", width: "60px", borderRadius: 1 }
const btnstyle = { margin: "8px 0", backgroundColor: "#182c5c",color:'#c2c2c2' };

function createData(id, course, semester, amount, payment_type) {
  return { id, course, semester, amount, payment_type };
}

function ratesFor(rates, fees) {
  return { rates, fees };
}

const MakePayment = () => {
  const [rows, setRows] = useState([{}]);
  const [active, setActive] = useState(false);
  const [user, setUser] = useState({});
  const [selectedValue, setSelectedValue] = useState({
    id: "",
    name: "",
    fees: {},
  });
  const [semList, setSemList] = useState([
    {
      id: "",
      name: "",
      fees: {},
    },
  ]);
  const [data, setData] = useState({
    amount: "00000",
  });

  //call semeter api
  const getAllSemesters = () => {
    getSemesters()
      .then((data) => {
        setSemList(data);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404)
          alert(error.response.data.message);
      });
  };
  const getRows = (data) => {
    return data.map((s) => {
      return createData(
        s.id,
        s.paymentDetails.user.department.deptName,
        s.semester.name,
        s.paymentDetails.amount,
        "Card"
      );
    });
  };
  //call payment details api
  const getPaymentDetails = (userId) => {
    getStudentPaymentRecord(userId)
      .then((data) => {
        setRows(getRows(data));
        // setRows(oldRow=>[...oldRow,r])
      })
      .catch((error) => {
        //   if(error.response.status === 400 || error.response.status === 404)
        //     alert(error.response.data.message)
      });
  };
  const makeSemMenu = () => {
    return semList.map((s) => {
      return (
        <MenuItem key={s.id} value={s.id}>
          {s.name}
        </MenuItem>
      );
    });
  };
  const chnageAmountOnSelect = (id) => {
    semList
      .filter((s) => s.id === id)
      .map((s) => {
        return setData({ ...data, amount: s.fees.fees });
      });
  };
  const handleValueChange = (event) => {
    setSelectedValue({ ...selectedValue, id: event.target.value });
    setActive(true);
    chnageAmountOnSelect(parseInt(event.target.value));
  };

  const handlePayment = (e) => {
    data["universityRollNumber"] = user.universityRollNumber;
    data["semId"] = selectedValue.id;
    displayRazorpay(data);
    e.preventDefault();
  };
  useEffect(() => {
    setUser(getCurrentUserDetails());

    if (user.universityRollNumber !== undefined) {
      getPaymentDetails(user.universityRollNumber);
      getAllSemesters();
    }
  }, [user.universityRollNumber]);

  //global to local
  const rateTable = [
    ratesFor("Tuition", "₹" + data.amount),
    ratesFor("Total", "₹" + data.amount),
  ];

  return (
    <>
      <Navbar />
      <Paper
        elevation={4}
        style={paperStyle}
        boxshadow={"5px 5px 5px "}
        border={1}
      >
        <Grid className="stud-info">
          <Typography variant="h5" gutterBottom marginBottom={1} marginTop={4}>
            {" "}
            Application for Fees Payment
          </Typography>
          <ColoredLine />

          <Stack direction={"row"} spacing={2} marginTop={3}>
            <Typography
              gutterBottom
              fontWeight={1000}
              sx={{ fontFamily: "Roboto", fontSize: 15, textAlign: "center" }}
            >
              Applicant Name :
            </Typography>
            <Typography
              gutterBottom
              fontWeight={350}
              sx={{ fontFamily: "Roboto", fontSize: 15, textAlign: "center" }}
            >
              {" "}
              {user.name}{" "}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Typography
              fontWeight={1000}
              sx={{ fontFamily: "Roboto", fontSize: 15, textAlign: "center" }}
            >
              Email :
            </Typography>
            <Typography
              fontWeight={350}
              sx={{ fontFamily: "Roboto", fontSize: 15, textAlign: "center" }}
            >
              {" "}
              {user.email}{" "}
            </Typography>
          </Stack>

          <Typography variant="h6" gutterBottom marginBottom={1} marginTop={3}>
            {" "}
            Previous payment information
          </Typography>

          <TableContainer component={Paper} sx={{ border: "0px solid #ccc" }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ backgroundColor: "#182c5c" }}>
                <TableRow>
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">
                    Course
                  </TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">
                    Semester
                  </TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">
                    Amount
                  </TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">
                    Payment Type
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow
                      key={row?.id}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: "1px solid #ccc",
                        },
                      }}
                    >
                      <TableCell
                        sx={{ borderRight: "1px solid #ccc" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row?.course}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ccc" }}
                        align="center"
                      >
                        {row?.semester}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ccc" }}
                        align="center"
                      >
                        {row?.amount / 100}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ccc" }}
                        align="center"
                      >
                        {row?.payment_type}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: "1px solid #ccc",
                      },
                    }}
                  >
                    No data Found
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom marginBottom={1} marginTop={4}>
            {" "}
            Select semester for next payment
          </Typography>

          <Box width={250} marginTop={2}>
            <FormControl fullWidth>
              <InputLabel label="" id="sem-select" required>
                Choose Sem
              </InputLabel>
              <Select
                labelId="sem-select"
                id="sem"
                name="sem"
                defaultValue={"DEFAULT"}
                label="Semester"
                // value={selectedValue}
                onChange={(event) => {
                  handleValueChange(event);
                }}
              >
                <MenuItem value="DEFAULT" disabled>
                  ---Choose a Semester---
                </MenuItem>
                {makeSemMenu()}
              </Select>
              <FormHelperText> Please select Semester </FormHelperText>
            </FormControl>
          </Box>

          <Typography variant="h6" gutterBottom marginBottom={1} marginTop={5}>
            Processing Fee Rates
          </Typography>

          <TableContainer component={Paper} sx={{ border: "0px solid #ccc" }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead sx={{ backgroundColor: "#182c5c" }}>
                <TableRow>
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">
                    Rates for
                  </TableCell>
                  <TableCell sx={{ color: "#FFFFFF" }} align="center">
                    Fees
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rateTable.map((row2) => (
                  <TableRow
                    key={row2.rates}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: "px solid #ccc",
                      },
                    }}
                  >
                    <TableCell
                      sx={{ borderRight: "1px solid #ccc" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {row2.rates}
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #ccc" }}
                      align="center"
                    >
                      {row2.fees}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container justifyContent="center">
            <Grid item>
              <Box width={100} marginTop={7}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  fullWidth
                  fontWeight="bold"
                  disabled={!active}
                  onClick={(e) => handlePayment(e)}
                >
                  Pay Here
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid container>
          <Typography
            fontWeight={1000}
            sx={{ fontFamily: "Catamaran", fontSize: 25, textAlign: "center" }}
          ></Typography>
        </Grid>
      </Paper>
    </>
  );
};

export default MakePayment;
