import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Chip, Grid, Card, CardContent } from '@mui/material';
import { selectEventStats, selectEventsLoading } from '../../redux/selectors';
import { useThemeContext } from '../../utils/Context/ThemeContext';
import { fetchEvents } from '../../redux/actions.js';

// Example Dashboard widget showing Redux event stats
const EventStatsWidget = () => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  // Select data from Redux store
  const eventStats = useSelector(selectEventStats);
  const loading = useSelector(selectEventsLoading);

  // Fetch events if needed
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <Card sx={{ p: 2, backgroundColor: theme.CARD_BACKGROUND }}>
        <Typography>Loading event statistics...</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ p: 2, backgroundColor: theme.CARD_BACKGROUND }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: theme.TEXT_COLOR, mb: 2 }}>
          📊 Event Statistics (From Redux)
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" sx={{ color: theme.ACCENT_COLOR }}>
                {eventStats.total}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.TEXT_COLOR }}>
                Total Events
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" sx={{ color: '#4caf50' }}>
                {eventStats.upcoming}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.TEXT_COLOR }}>
                Upcoming
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" sx={{ color: '#ff9800' }}>
                {eventStats.completed}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.TEXT_COLOR }}>
                Completed
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box textAlign="center">
              <Typography variant="h4" sx={{ color: '#2196f3' }}>
                {eventStats.companies}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.TEXT_COLOR }}>
                Companies
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ color: theme.TEXT_COLOR, mb: 1 }}>
            Event Types:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {eventStats.types.map((type, index) => (
              <Chip
                key={index}
                label={type}
                size="small"
                sx={{
                  backgroundColor: theme.ACCENT_COLOR + '20',
                  color: theme.TEXT_COLOR,
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventStatsWidget;
