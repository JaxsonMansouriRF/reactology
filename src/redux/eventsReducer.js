import * as actionTypes from './actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastFetched: null,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EVENTS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: null,
        lastFetched: Date.now(),
      };

    case actionTypes.FETCH_EVENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };

    default:
      return state;
  }
};

export default eventsReducer;
