'use strict';

function WeatherDB() {
  var Db         = require('tingodb')().Db,
      defer      = require("node-promise/promise").defer,
      dataMaxAge = 900000,
      db,
      collection;

  _lazyInit();

  function getForecast() {
    var deferred = defer();

    collection.findOne({type: 'forecast'}, function(err, item) {

      if ((err) || (_dataIsOld(item))) {
        deferred.reject();
      } else {

        console.log('Retrieving cached forecast ...');

        deferred.resolve(item.data);
      }
    });

    return deferred.promise;
  }

  function getConditions() {
    var deferred = defer();

    collection.findOne({type: 'conditions'}, function(err, item) {

      if ((err) || (_dataIsOld(item))) {
        deferred.reject();
      } else {

        console.log('Retrieving cached conditions ...');

        deferred.resolve(item.data);
      }
    });

    return deferred.promise;
  }

  function updateForecast(forecastJson) {

    console.log('Updating forecast ...');

    collection.update(
      {type: 'forecast'},
      {
        type: 'forecast',
        fetchDate: Date.now(),
        data: forecastJson
      },
      {upsert: true});
  }

  function updateConditions(conditionsJson) {

    console.log('Updating conditions ...');

    collection.update(
      {type: 'conditions'},
      {
        type: 'conditions',
        fetchDate: Date.now(),
        data: conditionsJson
      },
      {upsert: true});
  }

  function _lazyInit() {

    if (!db || !collection) {

      console.log('Initializing weather database ...');

      db = new Db('dbData', {});
      collection = db.collection('weather_collection');
    }
  }

  function _dataIsOld(jsonData) {
    return (Date.now() - jsonData.fetchDate) > dataMaxAge;
  }

  return {
    getForecast:      getForecast,
    getConditions:    getConditions,
    updateForecast:   updateForecast,
    updateConditions: updateConditions
  }
}

module.exports = exports = new WeatherDB();
