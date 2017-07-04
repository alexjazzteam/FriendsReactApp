const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes/routes");
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.json());
app.use('/', routes.router);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});