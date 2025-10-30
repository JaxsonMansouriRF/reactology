import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { MOCKED_EVENT_DATA } from '../../utils/MockedEventData';

const EventList= () => {
  return (
      <Grid container spacing={3}>
        {MOCKED_EVENT_DATA.map(event => (
            <Grid size={4} key={event.id}>
              <Card sx={{ height: 200 }}>
                <CardContent>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {event.date} &mdash; {event.location}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {event.description}
                  </Typography>
                  <Typography variant="caption" color={event.rsvp ? 'primary' : 'textSecondary'}>
                    RSVP: {event.rsvp ? 'Yes' : 'No'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
        ))}
      </Grid>
  );
};

export default EventList;
