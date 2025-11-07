import React from 'react';
import { Grid } from '@mui/material';
import EventCard from './EventCard.jsx';

const EventList = ({ eventsData = [] }) => {
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
