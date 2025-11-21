import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  InputAdornment,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
} from '@mui/material';
import { Search, Clear, History, Delete, Event } from '@mui/icons-material';
import { useThemeContext } from '../utils/Context/ThemeContext.jsx';
import { mockFetchEvents } from '../utils/MockedEventData.js';
import EventCard from '../components/Events/EventCard.jsx';

// MESSY VERSION - All logic mixed in the component
const Events = () => {
  const { theme } = useThemeContext();

  // Multiple useState calls for different pieces of state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('eventSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    const savedPreferences = localStorage.getItem('eventSearchPreferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      setStatusFilter(prefs.statusFilter || 'all');
      setTypeFilter(prefs.typeFilter || 'all');
      setSortBy(prefs.sortBy || 'date');
      setSortOrder(prefs.sortOrder || 'asc');
    }
  }, []);

  // Fetch events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await mockFetchEvents();
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Save search history when search term changes
  useEffect(() => {
    if (debouncedSearchTerm.trim() && !searchHistory.includes(debouncedSearchTerm.trim())) {
      const newHistory = [debouncedSearchTerm.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem('eventSearchHistory', JSON.stringify(newHistory));
    }
  }, [debouncedSearchTerm, searchHistory]);

  // Save preferences when filters change
  useEffect(() => {
    const preferences = {
      statusFilter,
      typeFilter,
      sortBy,
      sortOrder,
    };
    localStorage.setItem('eventSearchPreferences', JSON.stringify(preferences));
  }, [statusFilter, typeFilter, sortBy, sortOrder]);

  // Filter and sort events - complex logic mixed in component
  useEffect(() => {
    let filtered = [...events];

    // Apply search filter
    if (debouncedSearchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.company.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
          event.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter((event) => event.type === typeFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'attendees':
          aValue = a.attendees;
          bValue = b.attendees;
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredEvents(filtered);
  }, [events, debouncedSearchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  // Event handlers scattered throughout component
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setSortBy('date');
    setSortOrder('asc');
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('eventSearchHistory');
  };

  const selectFromHistory = (historyItem) => {
    setSearchTerm(historyItem);
    setShowHistory(false);
  };

  const removeFromHistory = (indexToRemove) => {
    const newHistory = searchHistory.filter((_, index) => index !== indexToRemove);
    setSearchHistory(newHistory);
    localStorage.setItem('eventSearchHistory', JSON.stringify(newHistory));
  };

  // Get unique types for filter options - logic mixed in component
  const uniqueTypes = useMemo(() => {
    const types = [...new Set(events.map((event) => event.type))];
    return types.sort();
  }, [events]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ color: theme.TEXT_COLOR }}>
          Loading events...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading events: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: theme.TEXT_COLOR,
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Event Search & Filtering
        </Typography>
        <Divider
          sx={{
            backgroundColor: '#90caf9',
            height: '3px',
            width: '150px',
            mx: 'auto',
            mb: 2,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: theme.SUB_TEXT_COLOR,
            fontWeight: 300,
          }}
        >
          Find and filter corporate events (MESSY VERSION - No Custom Hook)
        </Typography>
      </Box>

      {/* Search and Filters - Complex form logic mixed directly in component */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.CARD_BACKGROUND }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Events"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowHistory(searchHistory.length > 0)}
              onBlur={() => setTimeout(() => setShowHistory(false), 200)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setSearchTerm('')} size="small">
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: theme.TEXT_COLOR,
                },
                '& .MuiInputLabel-root': {
                  color: theme.SUB_TEXT_COLOR,
                },
              }}
            />

            {/* Search History Dropdown - Complex UI logic */}
            {showHistory && searchHistory.length > 0 && (
              <Paper
                sx={{
                  position: 'absolute',
                  zIndex: 1000,
                  width: '100%',
                  maxWidth: '300px',
                  mt: 1,
                  backgroundColor: theme.CARD_BACKGROUND,
                }}
              >
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Recent Searches"
                      primaryTypographyProps={{
                        variant: 'subtitle2',
                        color: theme.SUB_TEXT_COLOR,
                      }}
                    />
                    <IconButton size="small" onClick={clearSearchHistory}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </ListItem>
                  {searchHistory.map((item, index) => (
                    <ListItem key={index} button onClick={() => selectFromHistory(item)}>
                      <History fontSize="small" sx={{ mr: 1, color: theme.SUB_TEXT_COLOR }} />
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{ color: theme.TEXT_COLOR }}
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(index);
                        }}
                      >
                        <Clear fontSize="small" />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: theme.SUB_TEXT_COLOR }}>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
                sx={{ color: theme.TEXT_COLOR }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: theme.SUB_TEXT_COLOR }}>Type</InputLabel>
              <Select
                value={typeFilter}
                label="Type"
                onChange={handleTypeFilterChange}
                sx={{ color: theme.TEXT_COLOR }}
              >
                <MenuItem value="all">All Types</MenuItem>
                {uniqueTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: theme.SUB_TEXT_COLOR }}>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={handleSortChange}
                sx={{ color: theme.TEXT_COLOR }}
              >
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="company">Company</MenuItem>
                <MenuItem value="attendees">Attendees</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                onClick={handleSortOrderChange}
                sx={{
                  color: theme.TEXT_COLOR,
                  borderColor: theme.SUB_TEXT_COLOR,
                  minWidth: '60px',
                }}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
              <Button
                variant="outlined"
                onClick={clearAllFilters}
                startIcon={<Clear />}
                sx={{
                  color: theme.TEXT_COLOR,
                  borderColor: theme.SUB_TEXT_COLOR,
                  flexGrow: 1,
                }}
              >
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {searchTerm && (
            <Chip
              label={`Search: "${searchTerm}"`}
              onDelete={() => setSearchTerm('')}
              color="primary"
              size="small"
            />
          )}
          {statusFilter !== 'all' && (
            <Chip
              label={`Status: ${statusFilter}`}
              onDelete={() => setStatusFilter('all')}
              color="secondary"
              size="small"
            />
          )}
          {typeFilter !== 'all' && (
            <Chip
              label={`Type: ${typeFilter}`}
              onDelete={() => setTypeFilter('all')}
              color="secondary"
              size="small"
            />
          )}
          {(sortBy !== 'date' || sortOrder !== 'asc') && (
            <Chip
              label={`Sort: ${sortBy} (${sortOrder})`}
              onDelete={() => {
                setSortBy('date');
                setSortOrder('asc');
              }}
              color="default"
              size="small"
            />
          )}
        </Box>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: theme.TEXT_COLOR }}>
          {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
        </Typography>
        {filteredEvents.length === 0 && searchTerm && (
          <Typography variant="body2" sx={{ color: theme.SUB_TEXT_COLOR, mt: 1 }}>
            No events match your search criteria. Try adjusting your filters or search term.
          </Typography>
        )}
      </Box>

      {/* Event Results */}
      <Grid container spacing={3}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>

      {/* No Results State */}
      {filteredEvents.length === 0 && !searchTerm && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Event sx={{ fontSize: 60, color: theme.SUB_TEXT_COLOR, mb: 2 }} />
          <Typography variant="h5" sx={{ color: theme.TEXT_COLOR, mb: 1 }}>
            No Events Found
          </Typography>
          <Typography variant="body1" sx={{ color: theme.SUB_TEXT_COLOR }}>
            Try adjusting your filters to see more events.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events;
