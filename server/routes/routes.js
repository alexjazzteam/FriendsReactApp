const express = require('express');
const router =  express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');

const friends = require('../utils/friends');

router.post('/auth', (req, res) => {
    let user = {
        email: 'hello@test.com',
        password: 'test'
    };

    if (req.body.email === user.email && req.body.password === user.password) {

        let token = jwt.sign(user, 'secret', {
            expiresIn: 86400
        });

        res.status(200)
            .json({
                friends: friends,
                token: token
            });
    } else {
        res.sendStatus(403);
    }
});

router.use(function(req, res, next) {
    let token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

router.post('/get_friends', (req, res) => {
    res.json({
        friends: friends
    });
});

router.post('/search', (req, res) => {
    let searchFriends = friends;

    if (req.body.searchValue.name) {
        searchFriends = searchFriends.filter(function(item) {
            let match = item.name.toLowerCase().indexOf(req.body.searchValue.name.toLowerCase());
            return (match !== -1);
        });
    }

    if (req.body.searchValue.age) {
        searchFriends = searchFriends.filter(function(item) {
            if (req.body.searchValue.age) {
                return (item.age === +req.body.searchValue.age);
            } else {
                return true;
            }
        });
    }

    if (req.body.searchValue.gender && req.body.searchValue.gender !== "Gender") {
        searchFriends = searchFriends.filter(function(item) {
            if (req.body.searchValue.gender) {
                return (item.gender === req.body.searchValue.gender);
            } else {
                return true;
            }
        });
    }

    res.status(200).json(
        searchFriends
    );
});

router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
});

exports.router = router;