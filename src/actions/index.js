import { SEARCH, CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_TERM, ON_SEARCH_ERROR, UPDATE_LOADING_STATE } from './ActionTypes';

export function onSearch(payload) {
    return { 
        type: SEARCH, 
        payload: {
            userCount: payload.userCount,
            searchResults: payload.edges,
            pageInfo: payload.pageInfo,
            loading: true,
        } 
    }
};

export function clearSearchResults() {
    return { type: CLEAR_SEARCH_RESULTS }
};

export function onSearchError(payload) {
    return { 
        type: ON_SEARCH_ERROR, 
        payload: {
            error: payload
        }
    }
};

export function updateLoadingState(payload) {
    return { 
        type: UPDATE_LOADING_STATE, 
        payload: {
            loading: payload
        }
    }
};

export function updateSearchTerm(payload) {
    return { 
        type: UPDATE_SEARCH_TERM, 
        payload: {
            searchTerm: payload
        }
    }
};