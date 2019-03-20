import { SEARCH, CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_TERM, ON_SEARCH_ERROR, UPDATE_LOADING_STATE } from "../actions/ActionTypes";

const initialState = {
  searchResults: [],
  userCount: null,
  pageInfo: null,
  search: '',
  loading: false,
  error: null
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case SEARCH:
      return Object.assign({}, state, {
        searchResults: state.searchResults.concat(action.payload.searchResults),
        userCount: action.payload.userCount,
        pageInfo: action.payload.pageInfo,
        loading: false,
      });
    case CLEAR_SEARCH_RESULTS:
      return Object.assign({}, state, {
        searchResults: [],
        userCount: null,
        pageInfo: null,
        error: null,
        loading: false
      });
    case UPDATE_SEARCH_TERM:
      return Object.assign({}, state, {
        search: action.payload.searchTerm
      });
    case UPDATE_LOADING_STATE:
      return Object.assign({}, state, {
        loading: action.payload.loading
      });
    case ON_SEARCH_ERROR:
      return Object.assign({}, state, {
        searchResults: [],
        userCount: null,
        pageInfo: null,
        error: action.payload.error,
        loading: false,
      });
    default: 
      return state;
  }
}

export default rootReducer;
