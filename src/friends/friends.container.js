import React, {Component} from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import * as getFriends from './friends.action'
import * as search from './friends.action'
import * as logout from '../login/login.action'

class Friends extends Component {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            friendsPerPage: 5,
            friends: [],
            classValidation: "form-group",
            buttonValidation: "btn btn-primary"
        };
    }

    componentWillMount() {
        axios.post('http://localhost:3000/get_friends',
            {
                token: localStorage.getItem("token")
            }
        )
            .then(res => {
                this.setState({
                    friends: res.data.friends
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    selectPageListener(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    logOutListener() {
        this.props.logout();
    }

    numberValidate(e) {
        const re = /^\d+$/g;
        if (!re.test(e.target.value) && e.target.value !== "") {
            this.setState({
                classValidation: "form-group has-error",
                buttonValidation: "btn btn-primary disabled"
            });
        } else {
            this.setState({
                classValidation: "form-group",
                buttonValidation: "btn btn-primary"
            });
        }
    }

    search() {
        if ((this.state.buttonValidation === "btn btn-primary") && (this.searchByName.value || this.searchByAge.value || this.searchByGender.value)) {
            this.props.search({
                name: this.searchByName.value,
                age: this.searchByAge.value,
                gender: this.searchByGender.value
            });

            this.setState({
                friends: this.props.friends,
                currentPage: 1,
            });
        }

    }

    cancel() {
        this.props.getFriends();

        this.setState({
            friends: this.props.friends,
            classValidation: "form-group",
            buttonValidation: "btn btn-primary"
        });

        this.searchByName.value = "";
        this.searchByAge.value = "";
        this.searchByGender.value = "";
    }

    render() {
        let friends = (this.props.friends) ? this.props.friends : this.state.friends;

        const indexOfLastFriend = this.state.currentPage * this.state.friendsPerPage;
        const indexOfFirstFriend = indexOfLastFriend - this.state.friendsPerPage;
        let currentFriends = [];

        const pageNumbers = [];

        if (friends) {
            currentFriends = friends.slice(indexOfFirstFriend, indexOfLastFriend);

            for (let i = 1; i <= Math.ceil(friends.length / this.state.friendsPerPage); i++) {
                pageNumbers.push(i);
            }
        }

        let renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number}>
                    <a href="#" id={number} onClick={this.selectPageListener.bind(this)}>{number}</a>
                </li>
            );
        });


        let friendsOutput = currentFriends.map((item, key) => {
            let friend = {
                index: key,
                data: item
            };

            return (
                <tr key={friend.index}>
                    <td>{friend.data.name}</td>
                    <td>{friend.data.lastName}</td>
                    <td>{friend.data.age}</td>
                    <td>{friend.data.gender}</td>
                    <td>{friend.data.birthDate}</td>
                </tr>
            );
        });

        return (
            <div className="container">
                <div className="pull-right">
                    <button style={{margin: '10px'}} className="btn btn-primary" type="submit" onClick={this.logOutListener.bind(this)}>Log out</button>
                </div>
                <h1>Friends</h1>

                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="search-by-name">Name:</label>
                        <input id="search-by-name" className="form-control" type="search" ref={(input) => { this.searchByName= input; }} required/>
                    </div>

                    <div className={this.state.classValidation}>
                        <label style={{marginLeft: "10px"}} htmlFor="search-by-age">Age:</label>
                        <input id="search-by-age" className="form-control" type="text" onChange={this.numberValidate.bind(this)} ref={(input) => { this.searchByAge = input; }} required/>
                    </div>

                    <div className="form-group">
                        <label style={{marginLeft: "10px"}} htmlFor="search-by-gender">Select gender:</label>
                        <select id="search-by-gender" className="form-control" ref={(input) => { this.searchByGender = input; }}>
                            <option disabled selected="selected">Gender</option>
                            <option>Man</option>
                            <option>Woman</option>
                        </select>
                    </div>
                </div>

                <div>
                    <button style={{margin: '10px'}} className={this.state.buttonValidation} type="submit" onClick={this.search.bind(this)}>Find</button>
                    <button style={{margin: '10px'}} className="btn btn-primary" type="submit" onClick={this.cancel.bind(this)}>Cancel</button>
                </div>

                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Last Name</td>
                        <td>Age</td>
                        <td>Gender</td>
                        <td>Birth date</td>
                    </tr>
                    </thead>
                    <tbody>
                    {friendsOutput}
                    </tbody>
                </table>

                <div className="col-md-6 col-md-offset-4">
                    <ul className="pagination">
                        {renderPageNumbers}
                    </ul>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    friends: state.friends.friends
});

const mapDispatchToProps = dispatch => ({
    getFriends: bindActionCreators(getFriends, dispatch).getFriends,
    search: bindActionCreators(search, dispatch).search,
    logout: bindActionCreators(logout, dispatch).logout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends)

