(function () {
    'use strict';
 
    var app = angular.module('myApp');

	app.controller('headerController', ['$scope', '$http', 'API_BASE', function($scope, $http, API_BASE){

		$scope.lists = [];

		$http({
	  		method: 'GET',
	  		url: API_BASE + 'shopping-lists'
		}).then(function successCallback(response) {
			console.log('it worked');
			$scope.lists = response.data;
			console.log($scope.lists);
	  	}, function errorCallback(response) {
	  		console.log('it did not work');
			console.log(response.statusText);
	  	});

	}]);
 
}());