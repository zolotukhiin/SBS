// рендерит все основные компоненты

import React, { useEffect } from 'react'
import Header from '../header';
import { Container } from '../container';
import { Navbar } from '../nav-bar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectCurrentUser } from '../../features/user/userSlice';
import { Profile } from '../profile';

const Layout = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/auth');
    };
  }, [])

  return (
    <>
      <Header />
      <Container>
        <div className='flex-2 p-4'>
          <Navbar />
        </div>
        <div className='flex-1 p-4'>
          <Outlet />
        </div>
        <div className='flex-2 p-4'>
          <div className='flex-col flex gap-5'>
            <Profile />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Layout;
