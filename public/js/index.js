var app = angular.module('myApp', ['ngRoute']);

// ROUTING
app.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/home', {
			templateUrl: "views/home.html",
			controller: "HomeController"
		})
		.when('/shopping-list', {
			templateUrl: "views/shopping-list.html",
			controller: 'ShoppingListController'
		}).otherwise({
			redirectTo: '/home'
		});
}]);	


app.controller('HomeController', ['$scope', '$http', function($scope, $http){
	
	$scope.lists = [];

	$http({
  		method: 'GET',
  		url: 'http://localhost:5000/api/shopping-lists'
	}).then(function successCallback(response) {
		console.log('it worked');
		$scope.lists = response.data;
		console.log($scope.lists);
    // this callback will be called asynchronously
    // when the response is available
  	}, function errorCallback(response) {
  		console.log('it did not work');
		console.log(response.statusText);
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  	});

	$scope.addList = function(newItem){

		alert('hey');
		
		/* challenge answer
		var item = {};
		item = {
			name: $scope.newItem.name,
			qty: $scope.newItem.qty,
			priority: $scope.newItem.priority
		};
		console.log(item);
		*/

	};

}]);