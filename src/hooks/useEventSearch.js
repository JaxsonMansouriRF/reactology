import { useState, useEffect, useMemo } from 'react';

// Custom hook for event search, filtering, and sorting functionality
const useEventSearch = (events = []) => {
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  // Search history state
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load saved preferences from localStorage on hook initialization
  useEffect(() => {
    const savedHistory = localStorage.getItem('eventSearchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }

    const savedPreferences = localStorage.getItem('eventSearchPreferences');
    if (savedPreferences) {
      try {
        const prefs = JSON.parse(savedPreferences);
        setStatusFilter(prefs.statusFilter || 'all');
        setTypeFilter(prefs.typeFilter || 'all');
        setSortBy(prefs.sortBy || 'date');
        setSortOrder(prefs.sortOrder || 'asc');
      } catch (error) {
        console.error('Error loading search preferences:', error);
      }
    }
  }, []);

  // Debounce search term to avoid excessive filtering
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
      try {
        localStorage.setItem('eventSearchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving search history:', error);
      }
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
    try {
      localStorage.setItem('eventSearchPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving search preferences:', error);
    }
  }, [statusFilter, typeFilter, sortBy, sortOrder]);

  // Filter and sort events based on current criteria
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = [...events];

    // Apply search filter
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchLower) ||
          event.company?.toLowerCase().includes(searchLower) ||
          event.location?.toLowerCase().includes(searchLower) ||
          event.type?.toLowerCase().includes(searchLower) ||
          event.description?.toLowerCase().includes(searchLower)
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
          aValue = new Date(a.date || 0);
          bValue = new Date(b.date || 0);
          break;
        case 'attendees':
          aValue = a.attendees || 0;
          bValue = b.attendees || 0;
          break;
        case 'company':
          aValue = (a.company || '').toLowerCase();
          bValue = (b.company || '').toLowerCase();
          break;
        case 'title':
          aValue = (a.title || '').toLowerCase();
          bValue = (b.title || '').toLowerCase();
          break;
        default:
          aValue = new Date(a.date || 0);
          bValue = new Date(b.date || 0);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [events, debouncedSearchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  // Get unique types for filter options
  const availableTypes = useMemo(() => {
    const types = [...new Set(events.map((event) => event.type).filter(Boolean))];
    return types.sort();
  }, [events]);

  // Helper functions for managing search and filters
  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const updateStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const updateTypeFilter = (type) => {
    setTypeFilter(type);
  };

  const updateSortBy = (sort) => {
    setSortBy(sort);
  };

  const toggleSortOrder = () => {
    setSortOrder((currentOrder) => (currentOrder === 'asc' ? 'desc' : 'asc'));
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
    try {
      localStorage.removeItem('eventSearchHistory');
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const selectFromHistory = (historyItem) => {
    setSearchTerm(historyItem);
    setShowHistory(false);
  };

  const removeFromHistory = (indexToRemove) => {
    const newHistory = searchHistory.filter((_, index) => index !== indexToRemove);
    setSearchHistory(newHistory);
    try {
      localStorage.setItem('eventSearchHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error updating search history:', error);
    }
  };

  const toggleHistoryVisibility = (visible) => {
    setShowHistory(visible);
  };

  // Check if any filters are active (for UI feedback)
  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== '' ||
      statusFilter !== 'all' ||
      typeFilter !== 'all' ||
      sortBy !== 'date' ||
      sortOrder !== 'asc'
    );
  }, [searchTerm, statusFilter, typeFilter, sortBy, sortOrder]);

  // Return all the state and functions that components need
  return {
    // Search and filter state
    searchTerm,
    statusFilter,
    typeFilter,
    sortBy,
    sortOrder,

    // Search history state
    searchHistory,
    showHistory,

    // Computed values
    filteredEvents: filteredAndSortedEvents,
    availableTypes,
    hasActiveFilters,

    // Actions
    updateSearchTerm,
    updateStatusFilter,
    updateTypeFilter,
    updateSortBy,
    toggleSortOrder,
    clearAllFilters,

    // History actions
    clearSearchHistory,
    selectFromHistory,
    removeFromHistory,
    toggleHistoryVisibility,
  };
};

export default useEventSearch;
