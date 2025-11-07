import React, { Component, useEffect, useState } from 'react';
import EventList from '../components/Events/EventList.jsx';
import LightSwitch from '../components/Misc/LightSwitch.jsx';
import Header from '../components/Layout/Header.jsx';
import Footer from '../components/Layout/Footer.jsx';
import Body from '../components/Layout/Body.jsx';
import { mockFetchEvents } from '../utils/MockedEventData.js';

// Arrow function component
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [eventsData, setEventsData] = useState([]);

  const fetchInitialEventsData = async () => {
    setIsLoading(true);
    setIsError(null);
    try {
      const response = await mockFetchEvents();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonPromise = response.json(); // not the data yet
      const data = await jsonPromise; // wait for JSON to resolve
      setEventsData(data);
    } catch (error) {
      console.log('Error fetching events data:', error);
      setIsError(error);
      setIsLoading(false);
    } finally {
      console.log('Fetching events data complete');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Dashboard mounted');
    fetchInitialEventsData();
  }, []);

  return (
    <div>
      <Header pageName={'EventFlow Dashboard'} />
      <Body>
        {isError && <div>Error loading events: {isError.message}</div>}
        {isLoading ? (
          <div>Loading events...</div>
        ) : (
          <EventList eventsData={eventsData} key={'eventList'} />
        )}
      </Body>
      <Footer />
    </div>
  );
};

export default Dashboard;
