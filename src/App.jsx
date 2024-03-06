import React, { useEffect, useState } from "react"
import { Navbar } from "./components/index.js"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice.js"
import { Outlet } from "react-router-dom"





function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className="h-screen w-full">
      <Navbar />
      <main>
      <Outlet/>
    </main>
    
    </div>

  ) : (<div className="text 3xl text-center p-4 h-screen w-full">Loading</div>)
}

export default App
