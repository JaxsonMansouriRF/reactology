import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Events = () => {
  const { eventId } = useParams();

  useEffect(() => {
    //   load up event based on eventId
  }, [eventId]);

  return (
    <div>
      <h2>Events Page - EventID: {eventId}</h2>
      <p>This is the Events page content.</p>
    </div>
  );
};

export default Events;
