import React from 'react'
import { useDispatch } from "react-redux"
import { logout as authLogout } from '../store/authSlice'
import authService from '../appwrite/auth'
import useToast from './useToast'

function LogoutBtn() {
    const dispatch = useDispatch()
    const notify = useToast()

    function logoutHandler() {
        authService.logout().then(() => {
            dispatch(authLogout())
            notify("Logged out successfully","success")
        })
    }

    return (
        <button onClick={logoutHandler} type="submit" className='hover:bg-blue-200 bg-blue-400 px-3 py-1 rounded-full transition-all font-semibold'>Logout</button>

    )
}

export default LogoutBtn