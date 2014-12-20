'use strict';

function Weather() {
  var weatherService = require('./weather.service.js'),
      weatherDb      = require('./weather.persist.js'),
      defer          = require("node-promise/promise").defer;

  function getForecast(req, res) {
    weatherDb.getWeatherForecast()
      .then(function(forecastJson) {

        if (forecastJson) {

          if (_isDataOld(forecastJson)) {
            _updateForecast()
              .then(function() {
                weatherDb.getWeatherForecast()
                  .then(function(forecastJson) {
                    res.json(forecastJson);
                  });
              });
          } else {
            res.json(forecastJson);
          }
        } else {
          _updateForecast()
            .then(function() {
              weatherDb.getWeatherForecast()
                .then(function(forecastJson) {
                  res.json(forecastJson);
                });
            });
        }
      });
  }

  function getCurrentConditions(req, res) {
    weatherDb.getWeatherConditions()
      .then(function(conditionsJson) {

        if (conditionsJson) {

          if (_isDataOld(conditionsJson)) {
            _updateCurrentConditions()
              .then(function() {
                weatherDb.getWeatherConditions()
                  .then(function(conditionsJson) {
                    res.json(conditionsJson);
                  });
              });
          } else {
            res.json(conditionsJson);
          }
        } else {
          _updateCurrentConditions()
            .then(function() {
              weatherDb.getWeatherConditions()
                .then(function(conditionsJson) {
                  res.json(conditionsJson);
                });
            });
        }
      });
  }

  function _isDataOld(jsonData) {
    return (Date.now() - jsonData.fetchDate) > 900000;
  }

  function _updateForecast() {
    var deferred = defer();

    console.log('Updating forecast data ...');

    weatherService.getForecast()
      .then(function(forecastJson) {
        weatherDb.updateWeatherForecast(JSON.parse(forecastJson));
        deferred.resolve();
      });

    return deferred.promise;
  }

  function _updateCurrentConditions() {
    var deferred = defer();

    console.log('Updating current conditions data ...');

    weatherService.getCurrentConditions()
      .then(function(conditionsJson) {
        weatherDb.updateWeatherConditions(JSON.parse(conditionsJson));
        deferred.resolve();
      });

    return deferred.promise;
  }

  return {
    getForecast:          getForecast,
    getCurrentConditions: getCurrentConditions
  };
}

module.exports = new Weather();
