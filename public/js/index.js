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

	function makeid()
	{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 20; i++ ){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		text += Date.now();

		return text;
	}

	$http({
		method: 'GET',
		url: 'http://localhost:5000/api/shopping-lists/' + id
	}).then(function successCallback(response) {
		$scope.list = response.data[0];
	}, function errorCallback(response) {
		console.log('it did not work');
		console.log(response.statusText);
	});


	$scope.addItem = function(){
		var created = new Date();
		var newID = makeid();
		$scope.list.items.push({
			name : $scope.newItem.name,
			priority : $scope.newItem.priority,
			note: $scope.newItem.note,
			isChecked: false,
			listId: $scope.list.id,
			created: created,
			id: newID
		});
		// console.log($scope.list.items);
		$http.put('http://localhost:5000/api/shopping-lists', $scope.list)
			.success(function (data, status, headers, config) {
            })
            .error(function (data, status, header, config) {
            });
	};

	$scope.clearItems = function(){
		$scope.list.items.length = 0;

		$http.put('http://localhost:5000/api/shopping-lists', $scope.list)
			.success(function (data, status, headers, config) {
            })
            .error(function (data, status, header, config) {
            });
	};

	$scope.checkItem = function(value){

		var result = 0;
		for (var i = 0; i < $scope.list.items.length; i++) {
			if ($scope.list.items[i].id === value) {
			result = i;
			}
		}

		if($scope.list.items[result].isChecked === false){
		$scope.list.items[result].isChecked = true;
		} else if ($scope.list.items[result].isChecked === true){
		$scope.list.items[result].isChecked = false;
		}

		$http.put('http://localhost:5000/api/shopping-lists', $scope.list)
			.success(function (data, status, headers, config) {
            })
            .error(function (data, status, header, config) {
            });
            
            console.log($scope.list.items);
	};

}]);