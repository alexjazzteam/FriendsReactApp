import {createReducer} from '../utils'
import {browserHistory} from 'react-router'

const initialState = {
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
            'statusText': 'You have been successfully logged in.',
            'token': payload.token
        });

    },
    "LOGIN_USER_FAILURE": (state, payload) => {
        return Object.assign({}, state, {
            'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
        });
    },
    "LOGOUT_USER": (state, payload) => {
        localStorage.removeItem("token");
        browserHistory.push('/');

        return Object.assign({}, state, {
            'statusText': payload.statusText
        });
    },
});