import React from 'react';
import { Box, Grid, Typography, Container, Divider } from '@mui/material';
import EventCard from './EventCard.jsx';
import { useThemeContext } from '../../utils/Context/ThemeContext.jsx';

const EventList = ({ eventsData }) => {
  const { theme } = useThemeContext();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: theme.TEXT_COLOR,
            fontWeight: 'bold',
            mb: 2,
            letterSpacing: '0.5px',
          }}
        >
          Corporate Events Dashboard
        </Typography>
        <Divider
          sx={{
            backgroundColor: '#90caf9',
            height: '3px',
            width: '100px',
            mx: 'auto',
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: theme.SUB_TEXT_COLOR,
            fontWeight: 300,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Manage and track Fortune 500 corporate events and conferences
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="stretch">
        {eventsData && eventsData.length > 0 ? (
          eventsData.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id} sx={{ display: 'flex' }}>
              <EventCard event={event} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 2,
                border: '2px dashed #666',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: '#999',
                  mb: 2,
                  fontWeight: 300,
                }}
              >
                No events available
              </Typography>
              <Typography variant="body2" sx={{ color: '#777' }}>
                Check back later for upcoming corporate events
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default EventList;
