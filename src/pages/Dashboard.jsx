import React, { useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../redux/actions.js';
import { selectEvents, selectEventsLoading, selectEventsError } from '../redux/selectors.js';
import { useThemeContext } from '../utils/Context/ThemeContext.jsx';
import EventList from '../components/Events/EventList.jsx';
import EventSearchWidget from '../components/Events/EventSearchWidget.jsx';
import EventStatsWidget from '../components/Events/EventStatsWidget.jsx';

// Updated Dashboard using Redux for event management
const Dashboard = () => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  // Get data from Redux store instead of local state
  const events = useSelector(selectEvents);
  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  // Fetch events on component mount
  useEffect(() => {
    console.log('Dashboard mounted - fetching from Redux');
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ color: theme.TEXT_COLOR, mb: 4, textAlign: 'center' }}>
        📊 Event Management Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Event Stats Widget - Shows Redux data */}
        <Grid item xs={12} md={6}>
          <EventStatsWidget />
        </Grid>

        {/* Search Widget - Uses Redux events */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 'fit-content' }}>
            <EventSearchWidget />
          </Box>
        </Grid>

        {/* Event List - Shows all events from Redux */}
        <Grid item xs={12}>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: theme.TEXT_COLOR, mb: 2 }}>
              All Events (From Redux Store)
            </Typography>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                Error loading events: {error}
              </Typography>
            )}
            {loading ? (
              <Typography>Loading events from Redux...</Typography>
            ) : (
              <EventList eventsData={events} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
