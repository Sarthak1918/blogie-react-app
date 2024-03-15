import React, { useEffect, useState, useRef } from 'react';
import { Logo, LogoutBtn, ThemeSwitcher } from './index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);



  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (slug) => {
    setShowMenu(false); // Close the menu when any item is clicked
    navigate(slug);
  };

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true,
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: 'My Posts',
      slug: 'my-posts',
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: 'add-post',
      active: authStatus,
    },
  ];

  return (
    <div className="w-full px-10 py-6 flex justify-between items-center">
      <Link to={'/'}>
        <Logo size={'text-3xl'} />
      </Link>

      <ul
        ref={menuRef}
        className={`flex gap-4 items-center font-semibold z-[999999] text-sm ${
          showMenu
            ? 'flex-col bg-slate-700 transition-[3s] text-white w-full absolute top-20 right-0 p-4'
            : 'hidden sm:flex'
        }`}
      >
        {navItems.map(
          (item) =>
            item.active && (
              <li
                key={item.name}
                className="hover:bg-blue-100 px-3 py-1 rounded-full transition-all"
              >
                <button onClick={() => handleMenuItemClick(item.slug)}>{item.name}</button>
              </li>
            )
        )}
        {authStatus && (
          <li>
            <LogoutBtn />
          </li>
        )}
      </ul>

      <div className="flex gap-2 items-center sm:hidden">
        <button className="text-xl" onClick={()=>{
          setShowMenu((prev)=>!prev)
          console.log(showMenu);
        }}>
          &#9776;
        </button>
      </div>
    </div>
  );
}

export default Navbar;
