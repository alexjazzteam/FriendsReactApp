export function getFriendsSuccess(listFriends) {
    return {
        type: 'GET_FRIENDS_SUCCESS',
        payload: listFriends
    }
}

export function getFriendsFailure(error) {
    return {
        type: 'GET_FRIENDS_FAILURE',
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function getFriendsRequest() {
    return {
        type: "GET_FRIENDS_REQUEST"
    }
}

export function getFriends() {
    return function(dispatch) {
        dispatch(getFriendsRequest());
        return fetch('http://localhost:3000/get_friends', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("token")
            })
        })
            .then(response => {
                return response.json();
            })
            .then(function(json) {
                dispatch(getFriendsSuccess(json.friends));
            })
    }
}

export function searchSuccess(searchValue) {
    return {
        type: 'SEARCH_SUCCESS',
        payload: searchValue
    }
}

export function searchFailure(error) {
    return {
        type: 'SEARCH_FAILURE',
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}

export function searchRequest() {
    return {
        type: "SEARCH_REQUEST"
    }
}

export function search(searchValue) {
    return function(dispatch) {
        dispatch(searchRequest());
        return fetch('http://localhost:3000/search', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchValue: searchValue,
                token: localStorage.getItem("token")
            })
        })
            .then(response => {
                return response.json();
            })
            .then(function(json) {
                dispatch(searchSuccess(json));
            })
            .catch(error => {
                dispatch(searchFailure(error));
            })
    }
}
