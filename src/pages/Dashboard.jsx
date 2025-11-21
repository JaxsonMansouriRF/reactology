import React, { useEffect, useState } from 'react';
import EventList from '../components/Events/EventList.jsx';
import { mockFetchEvents } from '../utils/MockedEventData.js';
import EventSearchWidget from '../components/Events/EventSearchWidget.jsx';

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
      {isError && <div>Error loading events: {isError.message}</div>}
      {isLoading ? (
        <div>Loading events...</div>
      ) : (
        <>
          <EventSearchWidget />
          <EventList eventsData={eventsData} key={'eventList'} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
