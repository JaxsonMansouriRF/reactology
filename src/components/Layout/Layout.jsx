import React from 'react';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header pageName="Events Dashboard" />
      <Body>
        <Outlet />
      </Body>
      <Footer />
    </>
  );
};

export default Layout;
