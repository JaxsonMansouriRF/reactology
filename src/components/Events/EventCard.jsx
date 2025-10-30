//Key Points About Props
// 1. Immutable inside the component – a component cannot change its props.
// 2. Passed from parent → child – data flows one-way in React.
// 3. Can be any type – strings, numbers, booleans, objects, functions, even other components.

import React from 'react';
import {Card, CardContent, Grid, Typography} from "@mui/material";

const EventCard = (props) => {
  return (
      <Grid size={4} key={props.id}>
        <Card sx={{ height: 200 }}>
          <CardContent>
            <Typography variant="h6">{props.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {props.date} &mdash; {props.location}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {props.description}
            </Typography>
            <Typography variant="caption" color={props.rsvp ? 'primary' : 'textSecondary'}>
              RSVP: {props.rsvp ? 'Yes' : 'No'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
  )
}


export default EventCard;
