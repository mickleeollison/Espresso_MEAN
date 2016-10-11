angular
		.module('myApp')
		.controller(
				'drinksCtrl',
				[
						'$scope',
						'$compile',
						'$element',
						'entitiesFactory',
						'toastr',
						function($scope, $compile, $element, entitiesFactory,
								toastr) {
							$scope.adding = false;
							$scope.updating = false;
							$scope.deleting = false;
							$scope.viewing = true;
							$scope.name ="";
							$scope.cost="";
							$scope.description="";
							$scope.items="";
							$scope.inventory="";
							$scope.selectedD = [];
							$scope.selectedI = [];
							$scope.selectedQ = [];
							$scope.nameU="";
							$scope.costU="";
							$scope.descriptionU="";
							$scope.idU="";
							$scope.error="";
							$scope.drinksArr = [];
							$scope.drinksPush = [];
							$scope.thisRecipe="";
							
							$scope.reset = function(){
								$scope.name ="";
								$scope.cost="";
								$scope.description="";
								$scope.items="";
								$scope.inventory="";
								$scope.selectedD = [];
								$scope.selectedI = [];
								$scope.selectedQ = [];
								$scope.nameU="";
								$scope.costU="";
								$scope.descriptionU="";
								$scope.idU="";
								$scope.error="";
								$scope.drinksArr = [];
								$scope.drinksPush = [];
								$scope.thisRecipe="";
								$scope.total= null;
							}

							$scope.add = function() {
								$scope.adding = true;
								$scope.updating = false;
								$scope.deleting = false;
								$scope.viewing = false;
								$scope.reset();
							}

							$scope.update = function() {
								$scope.adding = false;
								$scope.updating = true;
								$scope.deleting = false;
								$scope.viewing = false;
								$scope.reset();
							}

							$scope.remove = function() {
								$scope.adding = false;
								$scope.updating = false;
								$scope.deleting = true;
								$scope.viewing = false;
								$scope.reset();
							}

							$scope.view = function() {
								$scope.adding = false;
								$scope.updating = false;
								$scope.deleting = false;
								$scope.viewing = true;
								$scope.reset();
							}
							$scope.recipe = function(ingrds, amts) {
								var str = "";
								for (var i = 0; i < ingrds.length; i++) {
									str += amts[i] + " " + ingrds[i].unitOfMeasure + " of " + ingrds[i].name + ", ";
								}
								return str;
							}
							$scope.getDrinksInitially = entitiesFactory
									.getDrinks().then(function(success) {
										$scope.drinks = success.data;
									}, function(error) {
										$scope.drinksError = error;
									});

							$scope.getDrinks = function() {
								entitiesFactory.getDrinks().then(
										function(success) {
											$scope.drinks = success.data;
										}, function(error) {
											$scope.drinksError = error;
										});
							}

							$scope.getIngredients = function() {
								entitiesFactory.getIngredients().then(
										function(success) {
											$scope.ingredients = success.data;
										}, function(error) {
											$scope.ingredientsError = error;
										});
							}

							$scope.deleteDrink = function(id) {
								entitiesFactory
										.deleteDrink(id)
										.then(
												function(success) {
													$scope.reset();
													$scope.getDrinks();
													toastr
														.success('Success','Baked Good has been Removed');
												},
												function(error) {
													$scope.drinkError = error;
												});
							}
							

							$scope.postDrink = function() {
								$scope.drink = {};
								$scope.drink.name = $scope.name;
								$scope.drink.cost = $scope.cost;
								$scope.drink.description = $scope.description;
								$scope.drink.amounts = [];
								$scope.drink.ingredients = [];
								for (i = 0; i < $scope.selectedQ.length; i++) {
									$scope.drink.amounts.push($scope.selectedQ[i]);
									$scope.drink.ingredients.push($scope.selectedI[i]);
								}
								entitiesFactory.postDrink($scope.drink).then(
										function(success) {
											$scope.getDrinks();
											$scope.reset();
										}, function(error) {
											alert(error.data);
											$scope.error = error.data;
											$scope.drinkError = error;
										});
							} 

							$scope.putDrink = function(id) {
								$scope.drink = {};
								$scope.drink.name = $scope.nameU;
								$scope.drink.description = $scope.descriptionU;
								$scope.drink.cost = $scope.costU;
								for (i = 0; i < $scope.selectedQ.length; i++) {
									$scope.drinksPush.push({
										amount : $scope.selectedQ[i], ingredient:{id:$scope.selectedI[i]}
									})
								}
								$scope.drink.items = $scope.drinksPush;
								entitiesFactory.putDrink(
										$scope.drink, id).then(
										function(success) {
											$scope.getDrinks();
											$scope.reset();										
										}, function(error) {
											$scope.error = error.data;
											$scope.ingredientError = error;
										});
							}

							$scope.setDrink = function(id) {
								entitiesFactory
										.getDrink(id)
										.then(
												function(success) {
													$scope.drink = success.data;
													$scope.idU = $scope.drink.id;
									 				$scope.nameU = $scope.drink.name;
													$scope.costU = $scope.drink.cost;
													$scope.descriptionU = $scope.drink.description;
													$scope.thisRecipe = $scope.recipe($scope.drink.items);
												},
												function(error) {
													$scope.drinkError = error;
												});
							}
							var n =0;
							$scope.addIngredient = function() {
								n++;
								$scope.drinksArr.push(n);
								$scope.getIngredients();
							}
							

						} ]);