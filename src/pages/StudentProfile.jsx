import React from "react";
import { memo } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const navigate=useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen px-20 gap-3 justify-center items-center">
        <span
          style={{ fontSize: "18px", fontWeight: "500" }}
        >{`Please enter your University \n Roll Number:`}</span>

        <input
          type="text"
          style={{
            width: "30%",
            height: "40px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            outline: "none",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        />

        <button
          style={{
            backgroundColor: "#182c5c",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            color: "#c2c2c2",
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "45px",
            paddingRight: "45px",
            borderRadius: "5px",
          }}
          onClick={()=>navigate('/user/profile')}
        >{`Search`}</button>
      </div>
    </>
  );
};

export default memo(StudentProfile);
