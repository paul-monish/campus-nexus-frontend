import React from "react";
import { memo } from "react";
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex h-auto px-40 pt-20  flex-col gap-8 mb-10">
        <div className=" w-[100%]  flex justify-between px-2  ">
          <div
            className="flex flex-col items-center pr-5  justify-center"
            style={{ borderRight: "3px solid blue" }}
          >
            <span style={{fontSize:'12px'}}>{`CLASS OF`}</span>
            <span style={{fontSize:'44px'}}>{`2024`}</span>
          </div>
          <div className="flex flex-col items-end py-5 justify-center">
            <span style={{fontSize:'20px'}}>{`KASHISH JAIN (20114802722)`}</span>
            <span style={{fontSize:'15px'}}>{`MCKV INSTITUTE OF ENGINEERING`}</span>
          </div>
        </div>

        <div
          className="flex flex-col  bg-white h-auto w-[100%]  gap-3 rounded-lg justify-start items-start px-12 py-8"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <span style={{fontSize:'20px',fontWeight:'500'}}>{`Student Details`}</span>
          <div className="flex flex-col w-[50%]">
            <div className="flex justify-between ">
              <span>{`Enrollment Number`}</span>
              <span>{`00615002716`}</span>
            </div>
            <div className="flex justify-between">
              <span>{`Student Name`}</span>
              <span>{`00615002716`}</span>
            </div>
            <div className="flex justify-between">
              <span>{`Programme`}</span>
              <span>{`00615002716`}</span>
            </div>
            <div className="flex justify-between">
              <span>{`Branch`}</span>
              <span>{`00615002716`}</span>
            </div>
            <div className="flex justify-between">
              <span>{`Institute`}</span>
              <span>{`00615002716`}</span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col  bg-white  w-[100%]  gap-3 rounded-lg justify-center items-start  px-12 py-8"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",marginBottom:'15px'}}
        >
          <span  style={{fontSize:'20px',fontWeight:'500'}}>{`Overall Result`}</span>
          <div className="flex justify-between w-[70%]">
            <div className="flex flex-col">
              <span>{`Marks: ${8075}/9000`}</span>
              <span>{`Credit Marks: 18527/21400`}</span>
              <span>{`CGPA: 9.271`}</span>
              <span>{`Credits Obtained: 214/214`}</span>
            </div>
            <div className="flex flex-col ">
              <span>{`Percentage: 89.722 %`}</span>
              <span>{`Credit Percentage: 86.785 %`}</span>
              <span>{`Equivalent Percentage: 92.7 %`}</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default memo(Profile);
