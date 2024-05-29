import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Payment from "./components/Payment";
import Login from "./pages/Login";
import { Privateroute } from "./components/Privateroute";

import Forget from "./pages/Forget";
import Verification from "./pages/Verification";
import Reset from "./pages/Reset";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import { myAxios, privateAxios } from "./services/helper";
import MakePayment from "../src/pages/MakePayment";
import Logout from "./components/Logout";
import MyTest from "./pages/MyTest";

import Enrollment from "./pages/Enrollment";
import Dashboard from "./pages/Dashboard";

// admin import
import Student from "./admin/Student";
import AdminDashboard from "./admin/AdminDashboard";
import DefaulterList from "./admin/DefaulterList";
import AdminLogin from "./admin/AdminLogin";
import RankList from "./pages/RankList";
import StudentProfile from "./pages/StudentProfile";
import Profile from "./pages/Profile";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //request interceptor
    myAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    privateAxios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    //response interceptor
    myAxios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );
    privateAxios.interceptors.response.use(
      (config) => {
        setLoading(false);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );
    /*
    if(isLoggedIn()){
      setUser(getCurrentUserDetails());
    }
     
      isRedisCacheActive(user).then((data)=>{
   
      
    }).catch((error)=>{
    
      if(error.response.status === 400 || error.response.status === 404 || error.response.data.status === "false" || error.response.status === 401){}
        //alert(error.response.data.message)
    })
     */
  }, []);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Loading show={loading} />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/" element={<Dashboard/>}/> */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<NoPage />} /> */}
        <Route path="/forgot" element={<Forget />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/test" element={<MyTest />} />

        {/* Admin Route */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Privateroute />}>
          <Route path="student-list" element={<Student />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="defaulter-list" element={<DefaulterList />} />
        </Route>

        {/* Student route */}
        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
          <Route path="fees-payment" element={<MakePayment />} />
          <Route path="enrollment" element={<Enrollment />} />
          <Route path="rank-list" element={<RankList />} />
          <Route path="student-profile" element={<StudentProfile />} />
          <Route path="profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
