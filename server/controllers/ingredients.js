var Ingredients = require('mongoose').model('Ingredients');
var Drinks = require('mongoose').model('Drinks');
var async = require('async');

exports.getIngredients = function(req, res) {
  Ingredients.find({}).exec(function(err, ingredients) {
    res.send(ingredients);
  })
};

exports.getIngredient = function(req, res) {
  	var id = req.params.id;
  Ingredients.findById(id).exec(function(err, ingredients) {
    res.send(ingredients);
  })
  console.log("got ingredient");
};

exports.createIngredient = function(req, res) {
  var ing = req.body;
  ing._id = Math.floor((Math.random()*10000)+1);
  async.parallel([
    function(callback) {
        Ingredients.findOne({'name':ing.name}).select('name').exec(function(err, result){ 
			if (result != null) {
				err = new Error("Name Already in use");
                callback(err);
                return; 
            }
            callback();
        });
    }, function(callback){
		if(ing.name=='' || ing.cost==null || ing.unitOfMeasure=='' || ing.inventory==null){
			err = new Error("All items are not filled out!");
            callback(err);
            return;
		}
		callback();
	}], function(err) {
		if (err) {
			console.log(err.message)
			res.status(500).send(err.message); 
		}
		else{
			Ingredients.create(ing, function(err, response) {
				if (err) throw err;
				else console.log('Ingredient '+ing.name+' created!');
				res.send(response);
			});	
		}
	});
};

exports.putIngredient = function(req, res){
	var id = req.params.id;
	var ing = req.body;
	async.parallel([
    function(callback) {
        Ingredients.findOne({'name':ing.name}).where('_id').ne(id).select('name').exec(function(err, result){
			if (result != null) {
				err = new Error("Name Already in use");
                callback(err);
                return; 
            }
            callback();
        });
    }, function(callback){
		if(ing.name=='' || ing.cost==null || ing.unitOfMeasure=='' || ing.inventory==null){
			err = new Error("All items are not filled out!");
            callback(err);
            return;
		}
		callback();
	}], function(err) {
		if (err) {
			 res.status(500).send(err.message); 
		}
		else{
			Ingredients.findByIdAndUpdate(id, ing, function(err, response) {
				if (err) throw err;
				else console.log('Ingredient '+ing.name+' created!');
				res.send(response);
			});
		}
	});
}   

exports.removeIngredient = function(req, res){
	var id = req.params.id;
	async.parallel([
    function(callback) {
        Drinks.find({}).populate('ingredients').select('ingredients').exec(function(err, drinks) {
			for(var i=0; i<drinks.length; i++ ){
				for(var j=0; j<drinks[i].ingredients.length; j++){
					if(id==drinks[i].ingredients[j]._id){
						err = new Error("This ingredient is being used in a drink and cannot be removed at this time");
						callback(err);
						return; 
					}
				}
			}
            callback();
        });
    }], function(err) {
		if (err) {
			 res.status(500).send(err.message); 
		}
		else{
			Ingredients.findByIdAndRemove(id, function(err,response) {
				if (err) throw err;
				else console.log('Ingredient removed!');
				res.send(response);
			});
		}
	});
}