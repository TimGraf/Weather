'use strict';

function WeatherService() {
  var request = require('request'),
      defer   = require("node-promise/promise").defer;

  function getForecast() {
    var deferred = defer();

    request({
      method: 'GET',
      url: 'http://api.wunderground.com/api/03b402efeddc201e/forecast10day/q/CA/San_Francisco.json'
    }, function(err, wuRes, body) {
      deferred.resolve(JSON.parse(body));
    });

    return deferred.promise;
  }

  function getCurrentConditions() {
    var deferred = defer();

    request({
      method: 'GET',
      url: 'http://api.wunderground.com/api/03b402efeddc201e/conditions/q/CA/San_Francisco.json'
    }, function(err, wuRes, body) {
      deferred.resolve(JSON.parse(body));
    });

    return deferred.promise;
  }

  return {
    getForecast:          getForecast,
    getCurrentConditions: getCurrentConditions
  };
}

module.exports = new WeatherService();
