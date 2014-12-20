'use strict';

function Weather() {
  var weatherService = require('./weather.service.js'),
      weatherDb      = require('./weather.persist.js'),
      defer          = require("node-promise/promise").defer;

  function getForecast(req, res) {

    weatherDb.getForecast()
      .then(function(forecastJson) {

        console.log('Retrieving cached forecast ...');

        res.json(forecastJson);
      }, function() {

        console.log('Updating forecast ...');

        _updateForecast()
          .then(function(forecastJson) {
            res.json(forecastJson);
          });
      });
  }

  function getConditions(req, res) {
    weatherDb.getConditions()
      .then(function(conditionsJson) {

        console.log('Retrieving cached conditions ...');

        res.json(conditionsJson);
      }, function() {
        _updateConditions()
          .then(function(conditionsJson) {

            console.log('Updating conditions ...');

            res.json(conditionsJson);
          });
      });
  }

  function _updateForecast() {
    var deferred = defer();

    weatherService.getForecast()
      .then(function(forecastJson) {
        weatherDb.updateForecast(forecastJson);
        deferred.resolve(forecastJson);
      });

    return deferred.promise;
  }

  function _updateConditions() {
    var deferred = defer();

    weatherService.getConditions()
      .then(function(conditionsJson) {
        weatherDb.updateConditions(conditionsJson);
        deferred.resolve(conditionsJson);
      });

    return deferred.promise;
  }

  return {
    getForecast:   getForecast,
    getConditions: getConditions
  };
}

module.exports = exports = new Weather();
