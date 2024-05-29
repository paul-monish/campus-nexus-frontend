import React from "react";
import { memo } from "react";
import Navbar from "../components/Navbar";

const RankList = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex flex-col h-auto  px-20 gap-5 mb-10">
        <div
          className="flex flex-col mt-24 bg-white h-auto w-[100%] pb-6 pt-4 gap-3 rounded-lg justify-center items-center"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <span style={{ fontSize: "27px" }}>{`University Ranklist`}</span>

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row gap-2">
              <span
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >{`Programme: `}</span>
              <span style={{ fontSize: "14px" }}>{`  B.Tech.`}</span>
            </div>
            <div className="flex flex-row gap-2">
              <span
                style={{ fontSize: "14px", fontWeight: "bold" }}
              >{`Course: `}</span>
              <span
                style={{ fontSize: "14px" }}
              >{`Computer Science And Engineering`}</span>
            </div>
          </div>
          <div className="flex gap-8">
            <select
              name="year"
              className="bg-slate-100 rounded-sm p-2"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <option>{`2020-2024`}</option>
              <option>{`2019-2023`}</option>
            </select>
            <select
              name="dept"
              className="bg-slate-100 rounded-sm p-2"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <option>{`CSE`}</option>
              <option>{`ECE`}</option>
              <option>{`EE`}</option>
            </select>
            <select
              name="sem"
              className="bg-slate-100 rounded-sm p-2"
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
            >
              <option>{`Overall`}</option>
              <option>{`Sem1`}</option>
              <option>{`Sem2`}</option>
              <option>{`Sem3`}</option>
              <option>{`Sem4`}</option>
              <option>{`Sem5`}</option>
              <option>{`Sem6`}</option>
              <option>{`Sem7`}</option>
              <option>{`Sem8`}</option>
            </select>
            <button
              style={{
                backgroundColor: "#182c5c",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                color:'#c2c2c2',
                paddingTop:'5px',
                paddingBottom:'5px',
                paddingLeft:'45px',
                paddingRight:'45px',
                borderRadius:'5px'
              }}
            >{`Search`}</button>
          </div>
        </div>

        <div
          className="flex flex-col  bg-white max-h-[750px] w-[80%]  h-auto rounded-lg px-4 py-10"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead
                className="text-xs text-gray-700 uppercase  dark:text-gray-400"
                style={{ backgroundColor: "#182c5c" }}
              >
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Enroll No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Marks
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GPA
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rank
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Make your selection and click on Search to load the Ranklist */}
    </React.Fragment>
  );
};

export default memo(RankList);
