'use strict';

/**
 * @ngdoc function
 * @name diaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the diaApp
 */
angular.module('diaApp')
  .controller('LoginCtrl', function ($scope, $http) {

  	$scope.auth = {
  		email: "ramfis@email.com",
  		pass: "12345"
  	}

  	$scope.login2 = function() {
        console.log("http://104.236.201.101",$scope.auth);
        $http.post('http://104.236.201.101',$scope.auth);
    };
  });
