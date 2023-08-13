import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Payment from './components/Payment';
import Login from './pages/Login';
import { Privateroute } from './components/Privateroute';
import {Home} from './pages/Home';
import Forget from './pages/Forget'
import Verification from './pages/Verification'
import Reset from './pages/Reset'
import Loading from './components/Loading';
import { useEffect, useState } from 'react';
import { myAxios, privateAxios } from './services/helper';
import MakePayment from '../src/pages/MakePayment';
function App() {
  const [loading,setLoading]=useState(false);
  useEffect(()=>{
    //request interceptor
    myAxios.interceptors.request.use((config)=>{
      setLoading(true);
      return config;
    },(error)=>{
      return Promise.reject(error);
    });
    privateAxios.interceptors.request.use((config)=>{
      setLoading(true);
      return config;
    },(error)=>{
      return Promise.reject(error);
    });
    //response interceptor
    myAxios.interceptors.response.use((config)=>{
      setLoading(false);
      return config;
    },(error)=>{
      setLoading(false);
      return Promise.reject(error);
    });
    privateAxios.interceptors.response.use((config)=>{
      setLoading(false);
      return config;
    },(error)=>{
      setLoading(false);
      return Promise.reject(error);
    });
  },[])
  return (  
    <BrowserRouter>
     <ToastContainer/>
     <Loading show={loading}/>
    <Routes>   
      <Route path="/" element={<Login/>}/>
      <Route path="/login" element={<Login/>}/>
      {/* <Route path="*" element={<NoPage />} /> */}
      <Route path="/home" element={<Home/>}/>
      <Route path="/forgot" element={<Forget/>}/>
      <Route path="/reset" element={<Reset/>}/>
      <Route path="/verification" element={<Verification/>}/>
      <Route path="/user" element={<Privateroute/>}>
        <Route path="payment" element={<Payment/>}/>
        <Route path="fees-payment" element={<MakePayment/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
export default App;
