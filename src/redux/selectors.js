// Event selectors
export const selectEvents = (state) => state.events.items;
export const selectEventsLoading = (state) => state.events.loading;
export const selectEventsError = (state) => state.events.error;
export const selectLastFetched = (state) => state.events.lastFetched;

// Derived selectors
export const selectEventStats = (state) => {
  const events = selectEvents(state);
  return {
    total: events.length,
    upcoming: events.filter((e) => e.status === 'upcoming').length,
    completed: events.filter((e) => e.status === 'completed').length,
    companies: [...new Set(events.map((e) => e.company))].length,
    types: [...new Set(events.map((e) => e.type))],
  };
};
