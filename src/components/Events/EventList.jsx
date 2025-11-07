import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { MOCKED_EVENT_DATA } from '../../utils/MockedEventData';
import EventCard from './EventCard.jsx';

const EventList = () => {
  const [eventsData, setEventsData] = useState([]);

  const fetchEventsData = () => {
    // Successful response
    setEventsData(MOCKED_EVENT_DATA);
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  return (
    <Grid container spacing={3}>
      {eventsData.map((event) => (
        <EventCard
          id={event.id}
          name={event.name}
          date={event.date}
          location={event.location}
          description={event.description}
          rsvp={event.rsvp}
        />
      ))}
    </Grid>
  );
};

export default EventList;
