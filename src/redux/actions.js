import * as actionTypes from './actionTypes';
import { mockFetchEvents } from '../utils/MockedEventData';

// Events action creators
export const fetchEventsStart = () => ({
  type: actionTypes.FETCH_EVENTS_START,
});

export const fetchEventsSuccess = (events) => ({
  type: actionTypes.FETCH_EVENTS_SUCCESS,
  payload: events,
});

export const fetchEventsError = (error) => ({
  type: actionTypes.FETCH_EVENTS_ERROR,
  payload: error,
});

// Async action creator for fetching events (thunk)
export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch(fetchEventsStart());
    try {
      const response = await mockFetchEvents();
      const events = await response.json();
      dispatch(fetchEventsSuccess(events));
    } catch (error) {
      dispatch(fetchEventsError(error.message));
    }
  };
};
