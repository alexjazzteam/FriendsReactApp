import {createReducer} from '../utils'

const initialState = {
    userName: null,
    statusText: null
};

export default createReducer(initialState, {
    "LOGIN_USER_REQUEST": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': null
        });
    },
    "LOGIN_USER_SUCCESS": (state, payload) => {
        return Object.assign({}, state, {
            'userName': "name",
            'statusText': 'You have been successfully logged in.'
        });

    },
    "LOGIN_USER_FAILURE": (state, payload) => {
        console.log(`Authentication Error: ${payload.status} ${payload.statusText}`);
        return Object.assign({}, state, {
            'userName': null,
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    }
});