'use strict';

var express = require('express');
var weather = require('../../components/weather');

var router = express.Router();

router.get('/forecast', weather.getForecast);
router.get('/conditions', weather.getCurrentConditions);

module.exports = router;
