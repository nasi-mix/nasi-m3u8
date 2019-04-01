var express = require('express');
var router = express.Router();

var Movie = require('../models/movie');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var responses = await Movie.find().sort('-createAt').exec();
  var finished = responses.filter(function (value, index, array) {
    return value.status == 'finished'
  }).length;
  var processing = responses.filter(function (value, index, array) {
    return value.status == 'converting'
  }).length;
  var waiting = responses.filter(function (value, index, array) {
    return value.status == 'waiting'
  }).length;
  var error = responses.filter(function (value, index, array) {
    return value.status == 'error'
  }).length;
  res.render('index', { total: responses.length, finished: finished, processing: processing, waiting: waiting, error: error });
});

router.get('/movies', async function (req, res, next) {
  var responses = await Movie.find().sort('-createAt').exec();
  res.json(responses);
});

module.exports = router;