import React from 'react';
import Header from './Header.jsx';
import Body from './Body.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header pageName="Events Dashboard" />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};

export default Layout;
