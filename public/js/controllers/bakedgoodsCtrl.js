angular
		.module('myApp')
		.controller(
				'bakedGoodsCtrl',
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
							$scope.name;
							$scope.cost;
							$scope.unitofmeasure;
							$scope.vendor;
							$scope.inventory;
							$scope.selected = [];
							$scope.nameU;
							$scope.costU;
							$scope.unitofmeasureU;
							$scope.vendorU;
							$scope.inventoryU;
							$scope.idU;
							$scope.error;
							$scope.allergensArr = [];
							$scope.allergensPush = [];
							$scope.selectedC;
							$scope.selectedG;

							$scope.add = function() {
								$scope.adding = true;
								$scope.updating = false;
								$scope.deleting = false;
								$scope.viewing = false;
							}

							$scope.update = function() {
								$scope.adding = false;
								$scope.updating = true;
								$scope.deleting = false;
								$scope.viewing = false;
							}

							$scope.remove = function() {
								$scope.adding = false;
								$scope.updating = false;
								$scope.deleting = true;
								$scope.viewing = false;
							}

							$scope.view = function() {
								$scope.adding = false;
								$scope.updating = false;
								$scope.deleting = false;
								$scope.viewing = true;
							}
							$scope.allergens = function(allergens) {
								var str = "";
								for (var i = 0; i < allergens.length; i++) {
									str += allergens[i].name + ", ";
								}
								return str;
							}
							$scope.getGoodsInitially = entitiesFactory
									.getGoods().then(function(success) {
										$scope.goods = success.data;
									}, function(error) {
										$scope.goodsError = error;
									});

							$scope.getGoods = function() {
								entitiesFactory.getGoods().then(
										function(success) {
											$scope.goods = success.data;
										}, function(error) {
											$scope.goodsError = error;
										});
							}
							$scope.getCategories = function() {
								entitiesFactory.getCategories().then(
										function(success) {
											$scope.categories = success.data;
										}, function(error) {
											$scope.categorieError = error;
                                            console.log("error in getting entities");
										});
							}
							$scope.getCategories();

							$scope.getAllergens = function() {
								entitiesFactory.getAllergens().then(
										function(success) {
											$scope.allergens = success.data;
										}, function(error) {
											$scope.allergensError = error;
                                            console.log("error in getting entities");
										});
							}
                            $scope.getAllergens();

							$scope.deleteGood = function(id) {
								entitiesFactory
										.deleteGood(id)
										.then(
												function(success) {
													$scope.error = success.data;
													$scope.getGoods();
													toastr
															.success('Success',
																	'Baked Good has been Removed');
												},
												function(error) {
													$scope.goodError = error;
												});
							}

							$scope.clearForm = function() {
								$scope.name = "";
								$scope.cost = "";
								$scope.vendor = "";
								$scope.inventory = "";
								$scope.nameU = "";
								$scope.costU = "";
								$scope.vendorU = "";
								$scope.inventoryU = "";
								$scope.idU = "";
								$scope.allergensArr = [];
								$scope.allergensPush = [];
								
							}

							$scope.postGood = function() {
								$scope.good = {};
								$scope.good.name = $scope.name;
								$scope.good.cost = $scope.cost;
								$scope.good.vendor = $scope.vendor;
								$scope.good.category = $scope.selectedC;
								$scope.good.inventory = $scope.inventory;
								$scope.good.allergen = $scope.selectedA;
								$scope.good.allergens = $scope.allergensPush;
								entitiesFactory.postGood($scope.good).then(
										function(success) {
											console.log('success');
											$scope.error = success.data;
											$scope.getGoods();
											$scope.clearForm();
										}, function(error) {
											console.log('success');
											$scope.goodsError = error;
										});
							}

							$scope.putGood = function(id) {
								$scope.good = {};
								$scope.good.name = $scope.nameU;
								$scope.good.vendor = $scope.vendorU;
								$scope.good.category = $scope.selectedC;
								$scope.good.inventory = $scope.inventoryU;
								$scope.good.allergen = $scope.selectedA;
								entitiesFactory.putGood(
										$scope.good, id).then(
										function(success) {
											$scope.error = success.data;
											$scope.getGoods();
											$scope.clearForm();
										}, function(error) {
											$scope.ingredientError = error;
										});
							}

							$scope.setGood = function(id) {
								entitiesFactory
										.getGood(id)
										.then(
												function(success) {
													$scope.good = success.data;
													$scope.idU = $scope.good._id;
													$scope.nameU = $scope.good.name;
													$scope.costU = $scope.good.cost;
													$scope.inventoryU = $scope.good.inventory;
												},
												function(error) {
													$scope.goodError = error;
												});
							}
							$scope.addAllergen = function() {
								$scope.allergensArr.push({
									id : ""
								});
								$scope.getAllergens();
							}
							$scope.clearAllergens = function() {
								$scope.allergensArr = [];
							}

						} ]);