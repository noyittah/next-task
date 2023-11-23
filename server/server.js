'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const movies = require('./movies.json');

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(movies);
});

app.get('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.send(movies.filter(movie => movie.id === req.params.id));
});

app.listen(3000, function () {
    console.log(`app listening on port ${3000}!`);
});

module.exports = app;
