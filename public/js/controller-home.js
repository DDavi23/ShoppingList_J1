(function () {
    'use strict';
 
    var app = angular.module('myApp');

	app.controller('HomeController', ['$scope', '$http', function($scope, $http){
		
		$scope.lists = [];

		$http({
	  		method: 'GET',
	  		url: 'http://localhost:5000/api/shopping-lists'
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