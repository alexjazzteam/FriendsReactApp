import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'

import configStore from './common/config-store'
import Routes from './common/routes'

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <Routes history={browserHistory} />
    </Provider>,
    document.getElementById('root')
);