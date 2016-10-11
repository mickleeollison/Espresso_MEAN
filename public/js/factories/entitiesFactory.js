angular.module('myApp').factory('entitiesFactory',['$http','url', function($http,url){
    return{
    	
        getIngredients: function(){
            return $http.get(url+'ingredients');
        },
        
        getIngredient: function(id){
            return $http.get(url+'ingredient/'+id);
        },
        
        deleteIngredients: function(id){
            return $http.delete(url+'ingredients/' + id);
        },
        
    	postIngredient: function(ingredient){
    		return $http.post(url+"ingredients", ingredient)
    	},
    	
    	putIngredient: function(ingredient, id){
            alert(JSON.stringify(ingredient));
    		return $http.put(url+"ingredients/"+id, ingredient)
    	},
    	
        getGoods: function(){
            return $http.get(url+'goods');
        },
        
        getGood: function(id){
            return $http.get(url+'good/'+id);
        },
        
        deleteGood: function(id){
            return $http.delete(url+'goods/' + id);
        },
        
    	postGood: function(good){
    		return $http.post(url+"goods", good)
    	},
    	
    	putGood: function(good, id){
    		return $http.put(url+"goods/"+id, good)
    	},
    	
    	 getCategories: function(){
             return $http.get(url+'categories');
         },
         
         getAllergens: function(){
             return $http.get(url+'allergens');
         },
         
         getDrinks: function(){
             return $http.get(url+'drinks');
         },
         
         getDrink: function(id){
             return $http.get(url+'drink/'+id);
         },
         
         deleteDrink: function(id){
             return $http.delete(url+'drinks/' + id);
         },
         
     	postDrink: function(drink){
     		return $http.post(url+"drinks", drink)
     	},
     	
     	putDrink: function(drink, id){
     		return $http.put(url+"drinks/"+id, drink)
     	},
    	user: function(){
    		return $http.get(url+"currentuser")
    	},

		getUsers: function(){
			return $http.get(url+'users');
		},
		
		addUser: function(user){
			return $http.post(url+'users', user);
		}

    	
    }
}])