const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.json());

app.post('/auth', (req, res) => {
    if (req.body.email === 'hello@test.com' && req.body.password === 'test') {
        res.status(200)
            .json("ok");
    } else {
        res.sendStatus(403);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});