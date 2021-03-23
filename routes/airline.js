const express = require('express');
let app = express();
let Airline = require('../models/airline');

app.get('/airlines', (req, res) => {

});

app.get('./airline/:id', (req, res) => {

});

app.post('/airlines', (req, res) => {

});

app.delete('./ailine/:id', (req, res) => {

});


module.exports = app;