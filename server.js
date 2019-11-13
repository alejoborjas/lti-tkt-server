const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

// Programs
app.get('/api/programs', (req, res) => {
    db.Program.findAll()
    .then((programs) => res.send(programs))
    .catch((err) => {
        console.log('There was an error getting programs:', JSON.stringify(err));
        return res.send(err);
    });
});
app.post('/api/programs', (req, res) => {
    // TODO: insert program
});
app.delete('/api/programs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // TODO: delete item with id === id
});
app.put('/api/programs/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    // TODO: update item with id === id
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
