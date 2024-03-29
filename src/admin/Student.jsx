import React from 'react'
import Header from './Header'
import SideNav from './SideNav'
import Footer from './Footer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const Student = () => {
    useEffect(() => {
        

    }, [])
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
                <h1>Student List</h1>
                </div>
                <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="admin/admin-dashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Student List</li>
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
                    <h3 className="card-title">Comprehensive List of Student</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                    <table id="example1" className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Rendering engine</th>
                            <th>Browser</th>
                            <th>Platform(s)</th>
                            <th>Engine version</th>
                            <th>CSS grade</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Trident</td>
                            <td>Internet
                            Explorer 4.0
                            </td>
                            <td>Win 95+</td>
                            <td> 4</td>
                            <td>X</td>
                        </tr>
                        <tr>
                            <td>Trident</td>
                            <td>Internet
                            Explorer 5.0
                            </td>
                            <td>Win 95+</td>
                            <td>5</td>
                            <td>C</td>
                        </tr>
                        <tr>
                            <td>Trident</td>
                            <td>Internet
                            Explorer 5.5
                            </td>
                            <td>Win 95+</td>
                            <td>5.5</td>
                            <td>A</td>
                        </tr>
                       
                       
                        </tbody>
                        <tfoot>
                        <tr>
                            <th>Rendering engine</th>
                            <th>Browser</th>
                            <th>Platform(s)</th>
                            <th>Engine version</th>
                            <th>CSS grade</th>
                        </tr>
                        </tfoot>
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

export default Student