angular
		.module('myApp')
		.controller(
				'registerCtrl',
				[
						'$scope',
						'entitiesFactory',
						function($scope, entitiesFactory) {

							// Sets variables
							$scope.username;
							$scope.password;
							$scope.user = {};
							$scope.user.userPassword;
							$scope.user.userEmail;
							$scope.confirmUserPassword;

							// Gets the current logged in user Id.
							$scope.getUsers = function() {
								entitiesFactory.getUsers().then(function(results) {
									$scope.results = results;
								}, function(error) {
									console.log(error);
								});
							};

							// Adds a user to the database upon validation is
							// passed.
							$scope.addUser = function() {
								
								entitiesFactory
										.addUser($scope.user)
										.then(
												function(results) {
													window.location.href = "/login.html";
												}, function(error) {
													console.log(error);
												});
							};

						} ]);