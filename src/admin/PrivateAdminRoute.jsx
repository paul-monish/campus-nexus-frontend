import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth/authenticate';

export const PrivateAdminRoute = () => {
    return isLoggedIn() ? <Outlet/>:<Navigate to={"/admin-login"}/>
}