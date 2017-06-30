import { createStore } from 'redux'
import rootReducer from './core-reducer'

export default function configStore(initState) {
    const store = createStore(rootReducer, initState);

    return store;
}