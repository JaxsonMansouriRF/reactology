import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip,
} from '@mui/material';
import { Search, Event, Business, CalendarToday } from '@mui/icons-material';
import { useThemeContext } from '../../utils/Context/ThemeContext.jsx';
import useEventSearch from '../../hooks/useEventSearch.js';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../../redux/actions.js';
import { selectEvents } from '../../redux/selectors.js';

// Simple search widget demonstrating hook reusability with Redux
const EventSearchWidget = () => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  // Get events from Redux store
  const events = useSelector(selectEvents);

  // Same custom hook, different UI implementation
  const { searchTerm, filteredEvents, updateSearchTerm } = useEventSearch(events);

  // Fetch events from Redux if not already loaded
  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ color: theme.TEXT_COLOR, mb: 3 }}>
        🔍 Redux + Hook Demo - Simple Search Widget
      </Typography>

      <TextField
        fullWidth
        label="Quick Event Search"
        value={searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            color: theme.TEXT_COLOR,
          },
          '& .MuiInputLabel-root': {
            color: theme.SUB_TEXT_COLOR,
          },
        }}
      />

      {searchTerm && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={`${filteredEvents.length} results for "${searchTerm}"`}
            color="primary"
            size="small"
          />
        </Box>
      )}

      <Paper sx={{ backgroundColor: theme.CARD_BACKGROUND, maxHeight: 400, overflow: 'auto' }}>
        <List>
          {filteredEvents.slice(0, 5).map((event) => (
            <ListItem key={event.id}>
              <ListItemIcon>
                <Event sx={{ color: theme.TEXT_COLOR }} />
              </ListItemIcon>
              <ListItemText
                primary={event.title}
                secondary={
                  <Box sx={{ color: theme.SUB_TEXT_COLOR }}>
                    <Typography variant="caption" component="div">
                      <Business sx={{ fontSize: 12, mr: 0.5 }} />
                      {event.company}
                    </Typography>
                    <Typography variant="caption" component="div">
                      <CalendarToday sx={{ fontSize: 12, mr: 0.5 }} />
                      {event.date}
                    </Typography>
                  </Box>
                }
                primaryTypographyProps={{ color: theme.TEXT_COLOR }}
              />
            </ListItem>
          ))}
          {filteredEvents.length === 0 && searchTerm && (
            <ListItem>
              <ListItemText
                primary="No events found"
                primaryTypographyProps={{
                  color: theme.SUB_TEXT_COLOR,
                  textAlign: 'center',
                }}
              />
            </ListItem>
          )}
        </List>
      </Paper>

      {searchTerm === '' && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" sx={{ color: theme.SUB_TEXT_COLOR }}>
            Start typing to search events...
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default EventSearchWidget;
