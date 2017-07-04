import { combineReducers } from 'redux'
import login from '../login/login.reducer'
import friends from '../friends/friends.reducer'

export default combineReducers({
    login,
    friends
})