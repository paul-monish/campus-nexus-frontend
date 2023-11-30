import React from 'react'
import Header from './Header'
import SideNav from './SideNav'
import Footer from './Footer'
import { useState,useEffect } from 'react'
import {getDefaulterListBySem} from './service/defaulter-list-service'
import { Link } from 'react-router-dom'
import "jquery-ui-dist/jquery-ui"
import { getSemesters } from '../services/semester-service'
import {useRef} from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useLocation } from 'react-router-dom'
const DefaulterList = () => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Users table',
        sheet: 'Users'
    })
    
    const [rows,setRows]=useState([
        {
           id:'',
           name:'',
           collageRollNumber:'',
           department:{
            deptName:''
           },
           semester:{
            name:'',
            fees:{
                fees:''
            }
           }
        }
      ])
      //call semeter api
  const getDefaulterList=(sem)=>{
    getDefaulterListBySem(sem).then((data)=>{
        console.log(data)
        setRows(data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    try{
        // getDefaulterList()
        getAllSemesters()
    }catch(error){
        alert(error)
    }

   
  },[]);
//   add
const handleValueChange = (event) => {
//    alert(typeof(parseInt(event.target.value)))
   switch(parseInt(event.target.value)){
    case 1:getDefaulterList('sem1');break;
    case 2:getDefaulterList('sem2');break;
    case 3:getDefaulterList('sem3');break;
    case 4:getDefaulterList('sem4');break;
    case 5:getDefaulterList('sem5');break;
    case 6:getDefaulterList('sem6');break;
    case 7:getDefaulterList('sem7');break;
    case 8:getDefaulterList('sem8');break;
   }
  };
const [semList,setSemList]=useState([{
    id:'',
    name:'',
    fees:{}
  }])
  const getAllSemesters=()=>{
    getSemesters().then((data)=>{
        setSemList(data)
    }).catch((error)=>{
      console.log(error)
      if(error.response.status === 400 || error.response.status === 404)
        alert(error.response.data.message)
    })
  }
  const makeSemMenu=()=> {
    return semList.map((s) => {
      return <option key={s.id} value={s.id}>{s.name}</option>;
    });
  }

  const location = useLocation()
    const path=location.pathname
  return (
    <div className="wrapper">
        <Header/>
        <SideNav/>

        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
            <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                <h1>Defaulter List</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/admin-dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Defaulter List</li>
                </ol>
                </div>
            </div>
            </div>{/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content">
            <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                <div className="card">
                    <div className="card-header">
                    <h3 className="card-title">List of Student of Outstanding Fees</h3>
                    </div>
                    {/* {JSON.stringify(rows)} */}
                    {/* /.card-header */}
                    <div className="card-body">
                      <div className="row">
                        <div className="col-3 ml-0">
                             {/* add */}
                        <div className="form-group">
                            <select className="form-select ml-3" aria-label="Default select example" placeholder="Select a Sem" onChange={(event)=>{handleValueChange(event)}}>
                            <option selected disable>---Select Semester---</option>
                            {makeSemMenu()}
                            </select>
                        </div>
                        </div>
                        <div className="col-2 mr-0 offset-7">
                        <button className="btn btn-success " onClick={onDownload}> Export excel </button>
                        </div>
                    </div>
                    {/* add */}
                    <table id="example1" className="table table-bordered table-striped" ref={tableRef}>
                        <thead>
                        <tr>
                            <th>Sl no</th>
                            <th>Student Name</th>
                            <th>Class RollNumber</th>
                            <th>Department</th>
                            <th>Semester</th>
                            <th>Outstanding</th>
                        </tr>
                        </thead>
                        <tbody >
                        
                        {rows.length>1? rows.map((row,index) => (
                        <tr key={row?.id}>
                        <td>{row?.id?? index+1}</td>
                        <td>{row?.name}</td>
                        <td>{row?.collageRollNumber}</td>
                        <td>{row?.department?.deptName}</td>
                        <td>{row?.semester.name}</td>
                        <td>{row?.semester.fees.fees}</td>
                        </tr>
                        )):<tr style={{textAlign:'center'}}>No data Found</tr>}
                        </tbody>
                    
                    </table>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
                </div>
                {/* /.col */}
            </div>
            {/* /.row */}
            </div>
            {/* /.container-fluid */}
        </section>
        {/* /.content */}
        </div>
        {/* /.content-wrapper */}

        <Footer/>
    </div>
  )
}

export default DefaulterList