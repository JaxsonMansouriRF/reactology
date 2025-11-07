import React, { Component } from 'react';
import EventList from '../components/Events/EventList.jsx';
import LightSwitch from '../components/Misc/LightSwitch.jsx';
import Header from '../components/Layout/Header.jsx';
import Footer from '../components/Layout/Footer.jsx';
import Body from '../components/Layout/Body.jsx';
import { darkTheme, lightTheme } from '../components/Misc/Themes.js';

// Arrow function component
const Dashboard = () => {
  const { PRIMARY_COLOR, TEXT_COLOR, ACCENT_COLOR, BACKGROUND_COLOR } = darkTheme;
  return (
    <div>
      <Header
        pageName={'EventFlow Dashboard'}
        PRIMARY_COLOR={PRIMARY_COLOR}
        TEXT_COLOR={TEXT_COLOR}
        ACCENT_COLOR={ACCENT_COLOR}
      />
      <Body BACKGROUND_COLOR={BACKGROUND_COLOR} TEXT_COLOR={TEXT_COLOR} ACCENT_COLOR={ACCENT_COLOR}>
        <EventList key={'eventList'} />
      </Body>
      <Footer PRIMARY_COLOR={PRIMARY_COLOR} TEXT_COLOR={TEXT_COLOR} ACCENT_COLOR={ACCENT_COLOR} />
    </div>
  );
};

export default Dashboard;
