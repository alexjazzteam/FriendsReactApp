import {createReducer} from '../utils'

const initialState = {
    statusText: null,
    friends: null
};

export default createReducer(initialState, {

    "GET_FRIENDS_REQUEST": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': null
        });
    },

    "GET_FRIENDS_SUCCESS": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': 'You have been successfully logged in.',
            'friends': payload
        });
    },

    "GET_FRIENDS_FAILURE": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },

    "SEARCH_REQUEST": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': null
        });
    },

    "SEARCH_SUCCESS": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': 'You have been successfully logged in.',
            'friends': payload
        });
    },

    "SEARCH_FAILURE": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    }
});
