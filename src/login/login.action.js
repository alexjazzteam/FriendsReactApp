import {getFriendsSuccess} from "../friends/friends.action"
import {browserHistory} from 'react-router'

export function loginUserSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: "LOGIN_USER_SUCCESS",
        payload: {
            token: token
        }
    }
}

export function loginUserFailure(error) {
    return {
        type: "LOGIN_USER_FAILURE",
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function loginUserRequest() {
    return {
        type: "LOGIN_USER_REQUEST"
    }
}

export function loginUser(email, password) {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('http://localhost:3000/auth', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password
                    })
            })
            .then(function(response) {
                try {
                    dispatch(loginUserSuccess(response));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
                return response.json();
            })
            .then(function(json) {
                dispatch(loginUserSuccess(json.token));
                dispatch(getFriendsSuccess(json.friends));
                browserHistory.push('/friends');
            })
            .catch(error => {
                console.log(error);
                dispatch(loginUserFailure({
                    response: {
                        status: 403,
                        statusText: error
                    }
                }));
            })
    }
}

export function logout() {
    return {
        type: "LOGOUT_USER",
        payload: {
            statusText: ""
        }
    }
}