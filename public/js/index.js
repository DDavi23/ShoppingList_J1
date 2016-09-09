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
	Date.prototype.yyyymmdd = function() {
		var mm = this.getMonth() + 1; // getMonth() is zero-based
		var dd = this.getDate();

		return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
	};

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


	$scope.addItem = function(){
		var created = new Date();
		created.yyyymmdd();
		var itemarry = [];
		var newID = makeid();
		itemarry.push({
			name : $scope.newItem.name,
			priority : $scope.newItem.priority,
			note: $scope.newItem.note,
			isChecked: false,
			listId: $scope.list.id,
			created: created,
			id: newID
		});
		console.log(itemarry);
	};

}]);