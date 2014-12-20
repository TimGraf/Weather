'use strict';

function WeatherService() {
  var request = require('request'),
      defer   = require("node-promise/promise").defer,
      wuKey   = process.env.WU_KEY;

  function getForecast() {
    var deferred = defer();

    request({
      method: 'GET',
      url: 'http://api.wunderground.com/api/' + wuKey + '/forecast10day/q/CA/San_Francisco.json'
    }, function(err, wuRes, body) {
      deferred.resolve(JSON.parse(body));
    });

    return deferred.promise;
  }

  function getConditions() {
    var deferred = defer();

    request({
      method: 'GET',
      url: 'http://api.wunderground.com/api/' + wuKey + '/conditions/q/CA/San_Francisco.json'
    }, function(err, wuRes, body) {
      deferred.resolve(JSON.parse(body));
    });

    return deferred.promise;
  }

  return {
    getForecast:   getForecast,
    getConditions: getConditions
  };
}

module.exports = exports = new WeatherService();
