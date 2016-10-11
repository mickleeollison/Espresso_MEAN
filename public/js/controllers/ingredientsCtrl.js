angular.module('myApp').controller(
		'ingredientsCtrl',
		[
				'$scope',
				'$compile',
				'$element',
				'entitiesFactory',
				'toastr',
				function($scope, $compile, $element, entitiesFactory, toastr) {

					$scope.adding = false;
					$scope.updating = false;
					$scope.deleting = false;
					$scope.viewing = true;
					$scope.name;
					$scope.cost;
					$scope.unitofmeasure;
					$scope.inventory;
					$scope.selected;
					$scope.nameU;
					$scope.costU;
					$scope.unitofmeasureU;
					$scope.inventoryU;
					$scope.idU;
					$scope.error;
					
					$scope.add = function() {
						$scope.adding = true;
						$scope.updating = false;
						$scope.deleting = false;
						$scope.viewing = false;
						$scope.clearForm();
					}

					$scope.update = function() {
						$scope.adding = false;
						$scope.updating = true;
						$scope.deleting = false;
						$scope.viewing = false;
						$scope.clearForm();
					}

					$scope.remove = function() {
						$scope.adding = false;
						$scope.updating = false;
						$scope.deleting = true;
						$scope.viewing = false;
						$scope.clearForm();
					}

					$scope.view = function() {
						$scope.adding = false;
						$scope.updating = false;
						$scope.deleting = false;
						$scope.viewing = true;
						$scope.clearForm();
					}

					$scope.getIngredientsInitially = entitiesFactory
							.getIngredients().then(function(success) {
								$scope.ingredients = success.data;
							}, function(error) {
								$scope.ingredientError = error;
							});
					
					$scope.getIngredients = function() {
						entitiesFactory.getIngredients().then(
								function(success) {
									$scope.ingredients = success.data;
								}, function(error) {
									$scope.ingredientError = error;
								});
					}
					
					$scope.deleteIngredients = function(id) {
						entitiesFactory.deleteIngredients(id).then(
								function(success) {
									$scope.getIngredients();
									toastr.success('Success', 'Your Report Has Been Saved');
									$scope.clearForm();
								}, function(error) {
									$scope.error = error.data;
									$scope.ingredientError = error;
								});
					}
					
					$scope.clearForm = function(){
						$scope.name="";
						$scope.cost="";
						$scope.unitofmeasure="";
						$scope.inventory="";
						$scope.nameU="";
						$scope.costU="";
						$scope.unitofmeasureU="";
						$scope.inventoryU="";
						$scope.idU="";
						$scope.error = "";

					}

					$scope.postIngredient = function() {
						$scope.ingredient = {};
						$scope.ingredient.name = $scope.name;
						$scope.ingredient.cost = $scope.cost;
						$scope.ingredient.unitOfMeasure = $scope.unitofmeasure;
						$scope.ingredient.inventory = $scope.inventory;
						entitiesFactory.postIngredient($scope.ingredient).then(
								function(success) {
									$scope.getIngredients();
									$scope.clearForm();
								}, function(error) {
									$scope.error = error.data;
									$scope.ingredientError = error;
								});
					}
					
					$scope.putIngredient = function(id) {
						$scope.ingredient = {};
						$scope.ingredient.name = $scope.nameU;
						$scope.ingredient.cost = $scope.costU;
						$scope.ingredient.unitOfMeasure = $scope.unitofmeasureU;
						$scope.ingredient.inventory = $scope.inventoryU;
						entitiesFactory.putIngredient($scope.ingredient, id).then(
								function(success) {
									$scope.getIngredients();
									$scope.clearForm();
								}, function(error) {
									$scope.error = error.data;
									$scope.ingredientError = error;
								});
					}
					
					$scope.setIngredient = function(id){
						entitiesFactory.getIngredient(id).then(
								function(success) {
									$scope.ingredient = success.data;
									$scope.idU = $scope.ingredient._id;
									$scope.nameU = $scope.ingredient.name;
									$scope.costU = $scope.ingredient.cost;
									$scope.unitofmeasureU = $scope.ingredient.unitOfMeasure;
									$scope.inventoryU = $scope.ingredient.inventory;
								}, function(error) {
									$scope.ingredientError = error;
								});
					}
					
					
					
					

				} ]);