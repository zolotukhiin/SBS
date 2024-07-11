import React, { useContext } from 'react'
import { ThemeContext } from '../theme-provider'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from '@nextui-org/react';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import { logout, selectIsAuthenticated } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImExit } from "react-icons/im";

const Header = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className='font-bold text-inherit'>Swap By Swap</p>
        </NavbarBrand>
        <NavbarContent justify='end'>
          <NavbarItem
          className='lg:flex text-3xl cursor-pointer'
          onClick={() => toggleTheme()}
          >
            { theme === 'light' ? <FaRegMoon /> : <LuSunMedium />}
          </NavbarItem>
          {isAuthenticated && (
            <NavbarItem
            className='lg:flex text-3xl cursor-pointer'
            onClick={() => handleLogout()}
            >
              <ImExit />
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  )
}

export default Header
