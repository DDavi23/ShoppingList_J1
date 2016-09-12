(function () {
    'use strict';
 
    var app = angular.module('myApp');

	app.controller('ShoppingListController', ['$scope', '$http', '$routeParams', 'API_BASE', function($scope, $http, $routeParams, API_BASE){
		
		$scope.list = [];
		var id = $routeParams.id;
		var orderedGroups = ['High', 'Medium', 'Low'];

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
			url: API_BASE + 'shopping-lists/' + id
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

			$http.put(API_BASE + 'shopping-lists', $scope.list)
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

			$http.put(API_BASE + 'shopping-lists', $scope.list)
				.success(function (data, status, headers, config) {
	            })
	            .error(function (data, status, header, config) {
	            });
	            
	            console.log($scope.list.items);
		};
		$scope.sortBy = function(propertyName) {
	    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	    $scope.propertyName = propertyName;
		};

	}]);

}());