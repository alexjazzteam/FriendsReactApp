import rootReducer from './core-reducer'
import thunk from 'redux-thunk'
import routes from './routes'
import createHistory from 'history/lib/createBrowserHistory'
import { applyMiddleware, compose, createStore } from 'redux'

import {reduxReactRouter} from 'redux-router'


export default function configStore(initState) {
    let createStoreWithMiddleware;
    const middleware = applyMiddleware(thunk);

    createStoreWithMiddleware = compose(
        middleware,
        reduxReactRouter({routes, createHistory})
    );

    const store = createStoreWithMiddleware(createStore)(rootReducer, initState);

    return store;
}