import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from './login.action'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    login() {
        this.props.actions.loginUser(this.email.value, this.password.value);
    }

    render() {
        return (
            <div className="container">
                <div style={{marginTop: '100px'}} className="col-md-4 col-md-offset-4">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input style={{margin: '10px'}} type="email" id="inputEmail" className="form-control" placeholder="Email address" ref={(input) => { this.email = input; }}/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input style={{margin: '10px'}} type="password" id="inputPassword" className="form-control" placeholder="Password" ref={(input) => { this.password = input; }}/>
                    <button style={{margin: '10px'}} className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login.bind(this)}>Sign in</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);