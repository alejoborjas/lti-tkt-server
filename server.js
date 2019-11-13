const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const bbRestApi = require('./server/routes/bb-rest-api');
const certRestApi = require('./server/routes/cert-rest-api');
const lti = require('./server/routes/lti');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

bbRestApi(app);
certRestApi(app, db);
lti(app);

app.listen(3001, () => {
    console.log('Server is up on port 3001');
});
