export function loginUserSuccess(data) {
    return {
        type: "LOGIN_USER_SUCCESS",
        payload: data
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
                body: JSON.stringify({email: email, password: password})
            })
            .then(response => {
                console.log(response);
                if (response.status === 403) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                } else {
                    dispatch(loginUserSuccess(response));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}