import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './core-reducer'
import thunk from 'redux-thunk'

export default function configStore(initState) {
    let createStoreWithMiddleware;
    const middleware = applyMiddleware(thunk);
    createStoreWithMiddleware = compose(middleware);
    const store = createStoreWithMiddleware(createStore)(rootReducer, initState);

    return store;
}