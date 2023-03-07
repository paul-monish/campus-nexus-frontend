import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Payment from './components/Payment';
function App() {
  return (
   
    <BrowserRouter>
     <ToastContainer/>
    <Routes>
      <Route path="/" element={<Payment/>}>
        <Route index element={<Payment/>} />
        <Route path="payment" element={<Payment/>}/>
       
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
