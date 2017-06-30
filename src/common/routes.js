import React from 'react';
import { Router, Route } from 'react-router'

import Login from '../login/login.container'
import Friends from '../friends/friends.container'

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Login} />
        <Route path="/friends" component={Friends} />
    </Router>
);

export default Routes;