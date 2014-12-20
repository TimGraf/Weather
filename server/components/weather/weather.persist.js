'use strict';

function WeatherDB() {
  var Db     = require('tingodb')().Db,
      defer  = require("node-promise/promise").defer,
      assert = require('assert');

  var db = new Db('dbData', {});
  var collection = db.collection('weather_collection');

  function getWeatherForecast() {
    var deferred = defer();

    collection.findOne({type: 'forecast'}, function(err, item) {
      assert.equal(null, err);

      deferred.resolve(item);
    });

    return deferred.promise;
  }

  function getWeatherConditions() {
    var deferred = defer();

    collection.findOne({type: 'conditions'}, function(err, item) {
      assert.equal(null, err);

      deferred.resolve(item);
    });

    return deferred.promise;
  }

  function updateWeatherForecast(forecastJson) {
    collection.update(
      {type: 'forecast'},
      {
        type: 'forecast',
        fetchDate: Date.now(),
        data: forecastJson
      },
      {upsert: true});
  }

  function updateWeatherConditions(conditionsJson) {
    collection.update(
      {type: 'conditions'},
      {
        type: 'conditions',
        fetchDate: Date.now(),
        data: conditionsJson
      },
      {upsert: true});
  }

  return {
    getWeatherForecast: getWeatherForecast,
    getWeatherConditions: getWeatherConditions,
    updateWeatherForecast: updateWeatherForecast,
    updateWeatherConditions: updateWeatherConditions
  }
}

module.exports = new WeatherDB();
