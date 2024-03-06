import React, { useEffect, useState } from 'react'
import { Logo, LogoutBtn, ThemeSwitcher } from './index'
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus
    },
    {
      name: "My Posts",
      slug: "my-posts",
      active: authStatus
    },
    {
      name: "Add Post",
      slug: "add-post",
      active: authStatus
    }
  ]
  return (
    <div className='w-full p-4 flex justify-between items-center'>
      <Link to={"/"}>
        <Logo size={"text-3xl"} />
      </Link>

      <ul className='flex gap-4 items-center font-semibold text-sm'>
        {
          navItems.map((item) => {
            return (
              item.active ?
                <li key={item.name} className='hover:bg-blue-100  px-3 py-1 rounded-full transition-all'>
                  <button onClick={()=>navigate(item.slug)}>{item.name}</button>
                </li>
                : null
            )
          })
        }
        {authStatus &&(<li>
          <LogoutBtn/>
        </li>) }
      </ul>

      <div className='flex gap-2 items-center'>
        <ThemeSwitcher/>
      </div>

    </div>
  )
}

export default Navbar