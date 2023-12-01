import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getCurrentUserDetails } from '../auth/authenticate';
import { useState} from 'react';

const SideNav = () => {
    const [user,setUser]=useState({});
    useEffect(()=>{
            setUser(getCurrentUserDetails())
    },[])
  return (
    <div>
    {/* Main Sidebar Container */}
    <aside className="main-sidebar  elevation-4" style={{backgroundColor: "#202c5c"}}>
    {/* Brand Logo */}
    <Link to="#" className="brand-link">
        <img src="/dist/img/campus_nexus_logo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light" style={{color:"#f2f2f2"}}>Campus Nexus</span>
    </Link>
    {/* Sidebar */}
    <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
            <img src="/dist/img/user.png" className="img-circle elevation-2" alt="User" />
        </div>
        <div className="info">
            <Link to="#" className="d-block" style={{color:"#f2f2f2"}}>{user.name}</Link>
        </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
            <button className="btn btn-sidebar" style={{color:"#f2f2f2"}}> 
                <i className="fas fa-search fa-fw" />
            </button>
            </div>
        </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
            with font-awesome or any other icon font library */}
           
            <li className="nav-item">
            <Link to="/admin/admin-dashboard" className="nav-link" style={{color:"#f2f2f2"}}>
                <i className="nav-icon far fa-image" />
                <p >
                Admin Dashboard
                </p>
            </Link>
            </li>

            <li className="nav-item">
            <Link to="/admin/student-list" className="nav-link" style={{color:"#f2f2f2"}}>
                <i className="nav-icon far fa-image" />
                <p>
                Student List
                </p>
            </Link>
            </li>

            <li className="nav-item">
            <Link to="/admin/defaulter-list" className="nav-link" style={{color:"#f2f2f2"}}>
                <i className="nav-icon far fa-image" />
                <p>
                Defaulter List
                </p>
            </Link>
            </li>

            <li className="nav-item">
            <Link to="/admin/student-list" className="nav-link" style={{color:"#f2f2f2"}}>
                <i className="nav-icon far fa-image" />
                <p>
                Enrollment Status
                </p>
            </Link>
            </li>

            <li className="nav-item">
            <Link to="/admin/student-list" className="nav-link" style={{color:"#f2f2f2"}}>
                <i className="nav-icon far fa-image" />
                <p>
                Payment Status
                </p>
            </Link>
            </li>
           
        </ul>
        </nav>
        {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
    </aside>

    </div>
  )
}

export default SideNav