var app = angular.module('myApp', ['ngRoute']);

// ROUTING
app.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/home', {
			templateUrl: "views/home.html",
			controller: "HomeController"
		})
		.when('/shopping-list/:id', {
			templateUrl: "views/shopping-list.html",
			controller: 'ShoppingListController'
		})
		.otherwise({
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
  	}, function errorCallback(response) {
  		console.log('it did not work');
		console.log(response.statusText);
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


app.controller('ShoppingListController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	
	$scope.list = [];
	var id = $routeParams.id;
	console.log(id);

	$http({
  		method: 'GET',
  		url: 'http://localhost:5000/api/shopping-list/' + id
	}).then(function successCallback(response) {
		console.log('you got your list');
		$scope.list = response.data[0];
		console.log($scope.list);
  	}, function errorCallback(response) {
  		console.log('it did not work');
		console.log(response.statusText);
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