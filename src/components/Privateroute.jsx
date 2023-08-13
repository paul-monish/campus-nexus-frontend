import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth/authenticate';

export const Privateroute = () => {
    return isLoggedIn() ? <Outlet/>:<Navigate to={"/login"}/>
}

