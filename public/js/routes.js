(function(){
	angular.module("myApp")
	.config(appConfig)
	.run(['$state', function($state){
		$state.transitionTo('home');
	}]);
	
	// Create Project page.
	function appConfig($stateProvider){		       
        var home = {
            name:'home',
            url:'/home',
            templateUrl:'/templates/home.html'
        };
        $stateProvider.state(home);
        
        // bakedGoods page.
        var bakedGoods = {
                name:'bakedGoods',
                url:'/bakedGoods',
                templateUrl:'/templates/baked_good.html',
                controller: 'bakedGoodsCtrl'
         };
         $stateProvider.state(bakedGoods);
         
         // Create Report page.
         var ingredients = {
        		 name: 'ingredients',
        		 url: '/ingredients',
        		 templateUrl: '/templates/ingredient.html',
        		 controller: 'ingredientsCtrl'
         };
         $stateProvider.state(ingredients);
         
         var recipes = {
        		 name: 'recipes',
        		 url: '/recipes',
        		 templateUrl: '/templates/drink.html',
        		 controller: 'drinksCtrl'
         };
         $stateProvider.state(recipes);
	}
})();