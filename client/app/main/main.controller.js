'use strict';

angular.module('weatherApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.forecast   = {};
    $scope.conditions = {};

    $http.get('/api/weather/forecast').success(function(forecast) {
      $scope.forecast = forecast;
    });

    $http.get('/api/weather/conditions').success(function(conditions) {
      $scope.conditions = JSON.stringify(conditions, null, '  ');
    });

  });
