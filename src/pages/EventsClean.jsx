// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   Typography,
//   Divider,
//   Grid,
//   TextField,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Select,
//   Chip,
//   InputAdornment,
//   Button,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Alert,
// } from '@mui/material';
// import { Search, Clear, History, Delete, Event } from '@mui/icons-material';
// import { useThemeContext } from '../utils/Context/ThemeContext.jsx';
// import { mockFetchEvents } from '../utils/MockedEventData.js';
// import EventCard from '../components/Events/EventCard.jsx';
// import useEventSearch from '../hooks/useEventSearch.js';
//
// // CLEAN VERSION - Using custom hook
// const EventsClean = () => {
//   const { theme } = useThemeContext();
//
//   // Simple state for data fetching
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//
//   // All search/filter logic is now in the custom hook!
//   const {
//     searchTerm,
//     statusFilter,
//     typeFilter,
//     sortBy,
//     sortOrder,
//     searchHistory,
//     showHistory,
//     filteredEvents,
//     availableTypes,
//     hasActiveFilters,
//     updateSearchTerm,
//     updateStatusFilter,
//     updateTypeFilter,
//     updateSortBy,
//     toggleSortOrder,
//     clearAllFilters,
//     clearSearchHistory,
//     selectFromHistory,
//     removeFromHistory,
//     toggleHistoryVisibility,
//   } = useEventSearch(events);
//
//   // Simple data fetching - only concern of this component
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         setLoading(true);
//         const response = await mockFetchEvents();
//         const data = await response.json();
//         setEvents(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchEvents();
//   }, []);
//
//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography variant="h4" sx={{ color: theme.TEXT_COLOR }}>
//           Loading events...
//         </Typography>
//       </Container>
//     );
//   }
//
//   if (error) {
//     return (
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Alert severity="error">Error loading events: {error}</Alert>
//       </Container>
//     );
//   }
//
//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Header */}
//       <Box sx={{ mb: 4, textAlign: 'center' }}>
//         <Typography
//           variant="h3"
//           component="h1"
//           gutterBottom
//           sx={{
//             color: theme.TEXT_COLOR,
//             fontWeight: 'bold',
//             mb: 2,
//           }}
//         >
//           Event Search & Filtering
//         </Typography>
//         <Divider
//           sx={{
//             backgroundColor: '#90caf9',
//             height: '3px',
//             width: '150px',
//             mx: 'auto',
//             mb: 2,
//           }}
//         />
//         <Typography
//           variant="h6"
//           sx={{
//             color: theme.SUB_TEXT_COLOR,
//             fontWeight: 300,
//           }}
//         >
//           Find and filter corporate events (CLEAN VERSION - With Custom Hook 🎉)
//         </Typography>
//       </Box>
//
//       {/* Search and Filters - Clean with custom hook! */}
//       <Paper sx={{ p: 3, mb: 4, backgroundColor: theme.CARD_BACKGROUND }}>
//         <Grid container spacing={3} alignItems="center">
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               label="Search Events"
//               value={searchTerm}
//               onChange={(e) => updateSearchTerm(e.target.value)}
//               onFocus={() => toggleHistoryVisibility(searchHistory.length > 0)}
//               onBlur={() => setTimeout(() => toggleHistoryVisibility(false), 200)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <Search />
//                   </InputAdornment>
//                 ),
//                 endAdornment: searchTerm && (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => updateSearchTerm('')} size="small">
//                       <Clear />
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   color: theme.TEXT_COLOR,
//                 },
//                 '& .MuiInputLabel-root': {
//                   color: theme.SUB_TEXT_COLOR,
//                 },
//               }}
//             />
//
//             {/* Search History Dropdown */}
//             {showHistory && searchHistory.length > 0 && (
//               <Paper
//                 sx={{
//                   position: 'absolute',
//                   zIndex: 1000,
//                   width: '100%',
//                   maxWidth: '300px',
//                   mt: 1,
//                   backgroundColor: theme.CARD_BACKGROUND,
//                 }}
//               >
//                 <List dense>
//                   <ListItem>
//                     <ListItemText
//                       primary="Recent Searches"
//                       primaryTypographyProps={{
//                         variant: 'subtitle2',
//                         color: theme.SUB_TEXT_COLOR,
//                       }}
//                     />
//                     <IconButton size="small" onClick={clearSearchHistory}>
//                       <Delete fontSize="small" />
//                     </IconButton>
//                   </ListItem>
//                   {searchHistory.map((item, index) => (
//                     <ListItem key={index} button onClick={() => selectFromHistory(item)}>
//                       <History fontSize="small" sx={{ mr: 1, color: theme.SUB_TEXT_COLOR }} />
//                       <ListItemText
//                         primary={item}
//                         primaryTypographyProps={{ color: theme.TEXT_COLOR }}
//                       />
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeFromHistory(index);
//                         }}
//                       >
//                         <Clear fontSize="small" />
//                       </IconButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Paper>
//             )}
//           </Grid>
//
//           <Grid item xs={12} sm={6} md={2}>
//             <FormControl fullWidth>
//               <InputLabel sx={{ color: theme.SUB_TEXT_COLOR }}>Status</InputLabel>
//               <Select
//                 value={statusFilter}
//                 label="Status"
//                 onChange={(e) => updateStatusFilter(e.target.value)}
//                 sx={{ color: theme.TEXT_COLOR }}
//               >
//                 <MenuItem value="all">All Status</MenuItem>
//                 <MenuItem value="upcoming">Upcoming</MenuItem>
//                 <MenuItem value="completed">Completed</MenuItem>
//                 <MenuItem value="cancelled">Cancelled</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//
//           <Grid item xs={12} sm={6} md={2}>
//             <FormControl fullWidth>
//               <InputLabel sx={{ color: theme.SUB_TEXT_COLOR }}>Type</InputLabel>
//               <Select
//                 value={typeFilter}
//                 label="Type"
//                 onChange={(e) => updateTypeFilter(e.target.value)}
//                 sx={{ color: theme.TEXT_COLOR }}
//               >
//                 <MenuItem value="all">All Types</MenuItem>
//                 {availableTypes.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//
//           <Grid item xs={12} sm={6} md={2}>
//             <FormControl fullWidth>
//               <InputLabel sx={{ color: theme.SUB_TEXT_COLOR }}>Sort By</InputLabel>
//               <Select
//                 value={sortBy}
//                 label="Sort By"
//                 onChange={(e) => updateSortBy(e.target.value)}
//                 sx={{ color: theme.TEXT_COLOR }}
//               >
//                 <MenuItem value="date">Date</MenuItem>
//                 <MenuItem value="title">Title</MenuItem>
//                 <MenuItem value="company">Company</MenuItem>
//                 <MenuItem value="attendees">Attendees</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//
//           <Grid item xs={12} sm={6} md={2}>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button
//                 variant="outlined"
//                 onClick={toggleSortOrder}
//                 sx={{
//                   color: theme.TEXT_COLOR,
//                   borderColor: theme.SUB_TEXT_COLOR,
//                   minWidth: '60px',
//                 }}
//               >
//                 {sortOrder === 'asc' ? '↑' : '↓'}
//               </Button>
//               <Button
//                 variant="outlined"
//                 onClick={clearAllFilters}
//                 startIcon={<Clear />}
//                 sx={{
//                   color: theme.TEXT_COLOR,
//                   borderColor: theme.SUB_TEXT_COLOR,
//                   flexGrow: 1,
//                 }}
//               >
//                 Clear
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//
//         {/* Active Filters Display */}
//         {hasActiveFilters && (
//           <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//             {searchTerm && (
//               <Chip
//                 label={`Search: "${searchTerm}"`}
//                 onDelete={() => updateSearchTerm('')}
//                 color="primary"
//                 size="small"
//               />
//             )}
//             {statusFilter !== 'all' && (
//               <Chip
//                 label={`Status: ${statusFilter}`}
//                 onDelete={() => updateStatusFilter('all')}
//                 color="secondary"
//                 size="small"
//               />
//             )}
//             {typeFilter !== 'all' && (
//               <Chip
//                 label={`Type: ${typeFilter}`}
//                 onDelete={() => updateTypeFilter('all')}
//                 color="secondary"
//                 size="small"
//               />
//             )}
//             {(sortBy !== 'date' || sortOrder !== 'asc') && (
//               <Chip
//                 label={`Sort: ${sortBy} (${sortOrder})`}
//                 onDelete={() => {
//                   updateSortBy('date');
//                   if (sortOrder !== 'asc') {
//                     toggleSortOrder();
//                   }
//                 }}
//                 color="default"
//                 size="small"
//               />
//             )}
//           </Box>
//         )}
//       </Paper>
//
//       {/* Results Summary */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6" sx={{ color: theme.TEXT_COLOR }}>
//           {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'} Found
//         </Typography>
//         {filteredEvents.length === 0 && searchTerm && (
//           <Typography variant="body2" sx={{ color: theme.SUB_TEXT_COLOR, mt: 1 }}>
//             No events match your search criteria. Try adjusting your filters or search term.
//           </Typography>
//         )}
//       </Box>
//
//       {/* Event Results */}
//       <Grid container spacing={3}>
//         {filteredEvents.map((event) => (
//           <Grid item xs={12} sm={6} md={4} key={event.id}>
//             <EventCard event={event} />
//           </Grid>
//         ))}
//       </Grid>
//
//       {/* No Results State */}
//       {filteredEvents.length === 0 && !searchTerm && (
//         <Box sx={{ textAlign: 'center', py: 8 }}>
//           <Event sx={{ fontSize: 60, color: theme.SUB_TEXT_COLOR, mb: 2 }} />
//           <Typography variant="h5" sx={{ color: theme.TEXT_COLOR, mb: 1 }}>
//             No Events Found
//           </Typography>
//           <Typography variant="body1" sx={{ color: theme.SUB_TEXT_COLOR }}>
//             Try adjusting your filters to see more events.
//           </Typography>
//         </Box>
//       )}
//     </Container>
//   );
// };
//
// export default EventsClean;
