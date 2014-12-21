'use strict';

function WeatherService() {
  var request = require('request'),
      defer   = require("node-promise/promise").defer,
      wuKey   = process.env.WU_KEY;

  function getForecast() {
    var deferred = defer();

    console.log('Getting new forecast ...');

    request({
      method: 'GET',
      url: 'http://api.wunderground.com/api/' + wuKey + '/forecast10day/q/CA/San_Francisco.json'
    }, function(err, wuRes, body) {
      deferred.resolve(_fixForecastImgUrls(JSON.parse(body)));
    });

    return deferred.promise;
  }

  function getConditions() {
    var deferred = defer();

    console.log('Getting new conditions ...');

    request({
      method: 'GET',
      url: 'http://api.wunderground.com/api/' + wuKey + '/conditions/q/CA/San_Francisco.json'
    }, function(err, wuRes, body) {
      deferred.resolve(_fixConditionsImgUrl(JSON.parse(body)));
    });

    return deferred.promise;
  }

  function _fixConditionsImgUrl(conditionsJson) {
    conditionsJson.current_observation.icon_url = conditionsJson.current_observation.icon_url.replace('/k/', '/v1/').replace('gif', 'svg');

    return conditionsJson;
  }

  function _fixForecastImgUrls(forecastJson) {
    forecastJson.forecast.txt_forecast.forecastday.forEach(function(forecastday, index) {
      forecastJson.forecast.txt_forecast.forecastday[index].icon_url = forecastday.icon_url.replace('/k/', '/v1/').replace('gif', 'svg');
    });

    return forecastJson;
  }

  return {
    getForecast:   getForecast,
    getConditions: getConditions
  };
}

module.exports = exports = new WeatherService();
