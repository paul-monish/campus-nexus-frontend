import { Stack } from "@mui/joy";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import AppBar from "../components/appBar";

import FormControl from "@mui/material/FormControl";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getCurrentUserDetails } from "../auth/authenticate";
import {
  addEnroll,
  elective,
  getEnrolledInfo,
  getSubject,
  serveEnrollForm,
} from "../services/user-service";
import Navbar from "../components/Navbar";
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
//add
function createSub(id, subjectCode, subjectName, paperType) {
  return { id, subjectCode, subjectName, paperType };
}
//

function createData(ID, PAPER_CODE, PAPER_NAME, PAPER_TYPE) {
  return { ID, PAPER_CODE, PAPER_NAME, PAPER_TYPE };
}
function createOptionalRow(
  id,
  subjectCode,
  subjectName,
  electiveNo,
  paperType
) {
  return { id, subjectCode, subjectName, electiveNo, paperType };
}
function createElectiveRow(ID, ELECTIVE_NO) {
  return { ID, ELECTIVE_NO };
}

//

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "2rem",
  },
}));

const paperStyle = {
  padding: 20,
  height: "890px",
  width: "750px",
  margin: "120px auto",
  borderRadius: 10,
};

const Enrollment = () => {
  // Sample data for select boxes
  //try code
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const classes = useStyles();
  const handleNext = async (e) => {
    e.preventDefault();
    //api call
    try {
      addEnroll(payload)
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "Your Have Successfully Enrolled!",
            showConfirmButton: false,
            timer: 1000,
          });
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 404) {
            console.log(error.response.data.message);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message | "Something went wrong!",
            });
          }
        });
      await serveUrl(payload.universityRollNumber);
    } catch (error) {
      alert(error);
    }
  };

  //
  const [user, setUser] = useState({
    universityRollNumber: "",
    semester: {},
    department: {},
  });
  const [enroll, setEnroll] = useState({
    user: {
      name: "",
      universityRollNumber: "",
      examRollNumber: "",
      semester: {},
      department: {},
      enrolled: "",
    },
  });
  //
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    universityRollNumber: "",
    contactNumber: "",
    dob: "",
    collageRollNumber: "",
    examRollNumber: "",
    department: {
      id: "",
      deptName: "",
      created_on: "",
    },
    roles: [
      {
        id: "",
        name: "",
      },
    ],
    subject: [
      {
        id: "",
        subjectCode: "",
        subjectName: "",
      },
    ],
    semester: {
      id: "",
      deptName: "",
      created_on: "",
    },
    enrolled: false,
    lateral: false,
    streamChanger: false,
  });
  //

  const [sub, setSub] = useState([
    { id: "", subjectCode: "", subjectName: "", paperType: "" },
  ]);
  const resetSub = () => {
    setSub([{ id: "", subjectCode: "", subjectName: "", paperType: "" }]);
    window.location.reload(true);
  };

  const handleValueChange = (event, idn) => {
    setIsChecked(event.target.checked);
    const selectedSubject = optionalRows.find(
      (s) => s.id === parseInt(event.target.value)
    );
    setSub((prevValues) => {
      // Check if the subject is already in the state
      const isSubjectSelected = prevValues.some(
        (subject) => subject.id === selectedSubject.id
      );

      if (!isSubjectSelected) {
        // Add the selected subject to the state
        return [...prevValues, selectedSubject];
      } else {
        // Remove the selected subject from the state if it's already selected
        return prevValues.filter(
          (subject) => subject.id !== selectedSubject.id
        );
      }
    });

    payload["subject"] = sub;
    if (sub.length - rows.length > electiveNo.length) {
      Swal.fire({
        title:
          "You already selected all subject! Are you finish it or reset your subject?",
        text: "You won't be able to selected extra subject!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reset it!",
        cancelButtonText: "Finish It!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Reset!",
            text: "Your selected subject has been Reseted.",
            icon: "success",
          });
          resetSub();
        } else {
          setSub(sub.splice(-1));
          console.log(sub);
          payload["subject"] = sub;
          handleNext(event);
        }
      });
    }
  };
  const [rows, setRows] = useState([{}]);
  const [optionalRows, setOptionalRows] = useState([[{}]]);
  const [electiveNo, setElectiveNo] = useState([
    {
      id: "",
      electiveNo: "",
    },
  ]);
  //add
  const getSubs = (data) => {
    return data
      .filter((s) => s.active === true && s.optional === false)
      .map((s) => {
        return createSub(s.id, s.subjectCode, s.subjectName, s.paperType);
      });
  };
  //
  const getRows = (data) => {
    return data
      .filter((s) => s.active === true && s.optional === false)
      .map((s) => {
        return createData(s.id, s.subjectCode, s.subjectName, s.paperType);
      });
  };
  const getOptionalRows = (data) => {
    return data
      .filter((s) => s.active === true && s.optional === true)
      .map((s) => {
        return createOptionalRow(
          s.id,
          s.subjectCode,
          s.subjectName,
          s.electiveNo,
          s.paperType
        );
      });
  };
  const getElectiveRow = (data) => {
    return data.map((s) => {
      return createElectiveRow(s.id, s.electiveNo);
    });
  };
  const getSub = (semId, deptId) => {
    getSubject(semId, deptId)
      .then((data) => {
        //setSubject(data)
        setRows(getRows(data));
        setSub(getSubs(data)); //add
        setOptionalRows(getOptionalRows(data));
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404)
          alert(error.response.data);
      });
  };
  //serve enroll form
  const serveUrl = (uRoll) => {
    serveEnrollForm(uRoll)
      .then((data) => {
        window.location.href = `https://invoicestore2.s3.us-east-2.amazonaws.com/${data}`;
      })
      .catch((error) => {
        alert(error);
        if (error.response.status === 400 || error.response.status === 404)
          alert(error.response.data);
      });
  };
  //
  const elec = (semId, deptId) => {
    elective(semId, deptId)
      .then((data) => {
        //setSubject(data)
        setElectiveNo(getElectiveRow(data));
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 404)
          alert(error.response.data);
      });
  };

  const getEnroll = (uId) => {
    getEnrolledInfo(uId)
      .then((data) => {
        if (data === null) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "fees yet not payed or student already enrolled!",
            // footer: '<a href="#">Why do I have this issue?</a>'
          });
          navigate("/user/dashboard");
        }
        setEnroll(data);
        setpayload(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setpayload = (enroll) => {
    setPayload({
      ...payload,
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
      semester: {
        id: enroll.user.semester.id,
        name: enroll.user.semester.name,
        created_on: enroll.user.semester.created_on,
      },
      roles: enroll.user.roles,
      subject: [
        {
          id: "",
          subjectCode: "",
          subjectName: "",
        },
      ],
      enrolled: 1,
      lateral: false,
      streamChanger: false,
    });
  };

  useEffect(() => {
    setUser(getCurrentUserDetails());

    if (user?.universityRollNumber !== undefined) {
      //call api
      try {
        getEnroll(user?.universityRollNumber);
        getSub(user?.semester.id, user.department.id);
        elec(user?.semester.id, user.department.id);
      } catch (error) {
        alert(error);
      }
    }
  }, [user?.universityRollNumber, user?.semester.id, user?.department.id]);
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      if (sub.length - rows.length === electiveNo.length) {
        setActive(true);
      }
    } else {
      setActive(false);
    }
  };

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
          <Container className={classes.container}>
            {/* step 1 */}
            <Typography
              align="center"
              variant="h5"
              gutterBottom
              marginBottom={1}
              marginTop={3}
            >
              <b>MCKV INSTITUTE OF ENGINEERING</b>
            </Typography>
            {/* {JSON.stringify(sub)} */}
            <Typography
              align="center"
              gutterBottom
              marginBottom={0}
              marginTop={1}
            >
              243, G.T. ROAD (NORTH) LILUAH, HOWRAH-711204, WEST BENGAL, INDIA
            </Typography>
            <Typography
              align="center"
              gutterBottom
              marginBottom={1}
              marginTop={1}
              sx={{ fontSize: ".8rem" }}
            >
              (An Autonomous Institution Affiliated to Maulana Abul Kalam Azad
              University of Technology)
            </Typography>
            <ColoredLine />
            <Typography
              sx={{ fontSize: "1.2rem" }}
              align="center"
              gutterBottom
              marginBottom={1}
              marginTop={2}
            >
              <b>Enrollment Form {enroll?.user.batch} for Regular Students</b>
            </Typography>
            <Stack direction={"row"} spacing={2} marginTop={1}>
              <Typography
                gutterBottom
                fontWeight={1000}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {" "}
                <b>Enrollment For :</b>{" "}
              </Typography>
              <Typography
                gutterBottom
                fontWeight={350}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {enroll?.user.semester.name} Enrollment {enroll?.user.batch}{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Typography
                fontWeight={1000}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                Name :
              </Typography>
              <Typography
                fontWeight={350}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {" "}
                {enroll?.user.name}{" "}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Typography
                fontWeight={1000}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                For the Degree of :
              </Typography>
              <Typography
                fontWeight={350}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                Bachelors Degree in {enroll?.user.department.deptName}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <Typography
                fontWeight={1000}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {" "}
                Registration No. With Year :
              </Typography>
              <Typography
                fontWeight={350}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {enroll?.user.universityRollNumber} Of {enroll?.user.batch}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={2} marginBottom={2}>
              <Typography
                fontWeight={1000}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {" "}
                Roll No. :
              </Typography>
              <Typography
                fontWeight={350}
                sx={{ fontFamily: "Roboto", fontSize: 12, textAlign: "center" }}
              >
                {enroll?.user.examRollNumber}
              </Typography>
            </Stack>
            <Typography gutterBottom sx={{ fontSize: "1rem" }}>
              COMPULSORY PAPERS
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
                      PAPER CODE
                    </TableCell>
                    <TableCell sx={{ color: "#FFFFFF" }} align="center">
                      PAPER NAME
                    </TableCell>
                    <TableCell sx={{ color: "#FFFFFF" }} align="center">
                      PAPER TYPE
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* {JSON.stringify(payload)} */}
                  {rows.map((row) => (
                    <TableRow
                      key={row.ID}
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
                        {row.PAPER_CODE}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ccc" }}
                        align="center"
                      >
                        {row.PAPER_NAME}
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #ccc" }}
                        align="center"
                      >
                        {row.PAPER_TYPE === "S"
                          ? "Sessional"
                          : row.PAPER_TYPE === "P"
                          ? "Practical"
                          : "Theory"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* step 1 */}
            {/* step2 */}
            {electiveNo.length > 0 ? (
              <>
                {" "}
                <Typography
                  gutterBottom
                  marginTop={3}
                  sx={{ fontSize: "1rem" }}
                >
                  {" "}
                  SELECT ELECTIVE PAPERS
                </Typography>
                <ColoredLine />
              </>
            ) : undefined}
            <Box sx={{ flexGrow: 1 ,marginTop:2}}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 6, md: 12 }}
              >
                {electiveNo.map((p, index) => (
                  <Grid item xs={2} sm={3} md={6} key={index}>
                    <FormControl fullWidth>
                      <InputLabel label="" id="paper-select" required>
                        Choose {p.ELECTIVE_NO} Paper
                      </InputLabel>
                      <Select
                        labelId="paper-select"
                        id={"paper"}
                        defaultValue={"DEFAULT"}
                        label={"Choose " + p.ELECTIVE_NO + " Paper"}
                        key={index}
                        name={"paper"}
                        onChange={(event) =>
                          handleValueChange(event, p.ELECTIVE_NO)
                        }
                      >
                        <MenuItem value="DEFAULT" disabled>
                          ---Choose a {p.ELECTIVE_NO} Paper---
                        </MenuItem>
                        {optionalRows
                          .filter((o) => o.electiveNo === p.ELECTIVE_NO)
                          .map((s) => (
                            <MenuItem key={s.id} value={s.id}>
                              {s.subjectName}{" "}
                              {s.paperType === "S"
                                ? "(Sessional)"
                                : s.paperType === "P"
                                ? "(Practical)"
                                : "(Theory)"}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        {" "}
                        Please select {p.ELECTIVE_NO} optional paper{" "}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                ))}
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="* I hereby declare that all the information given above is true and correct to the best of my knowledge."
                      checked={isChecked}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </Box>

            <Grid container justifyContent="center">
              <Grid item>
                <Box width={100} marginTop={3}>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    fullWidth
                    fontWeight="bold"
                    disabled={!active}
                    onClick={(e) => handleNext(e)}
                  >
                    Finish
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </>
  );
};

export default Enrollment;
