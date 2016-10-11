var Drinks = require('mongoose').model('Drinks');
var async = require('async');

exports.getDrinks = function(req, res) {
  Drinks.find({}).populate('ingredients').exec(function(err, drinks) {
	res.send(drinks);
  })
};

exports.getDrink = function(req, res) {
  	var id = req.params.id;
  Drinks.findById(id).populate('ingredients').exec(function(err, drink) {
	res.send(drink);
  })
};

exports.createDrink = function(req, res) {
  var drink = req.body;
  console.log(JSON.stringify(drink))
  async.parallel([
    function(callback) {
        Drinks.findOne({'name':drink.name}).select('name').exec(function(err, result){
			if (result != null) {
				err = new Error("Name Already in use");
                callback(err);
                return; 
            }
            callback();
        });
    },  function(callback){
		if(drink.name=='' || drink.cost==null || drink.description==null){
			err = new Error("All items are not filled out!");
            callback(err);
            return;
		}
		callback();
	}], function(err) {
		if (err) {
			console.log(err.message);
			res.status(500).send(err.message); 
		}else{
			Drinks.create(drink, function(err, response) {
				if (err) throw err; 
				else console.log('Drink created!');
				res.send(response);
			});
		}
	});
};

exports.putDrink = function(req, res){
	var id = req.params.id;
	var drink = req.body;
	async.parallel([
    function(callback) {
        Drinks.findOne({'name':drink.name}).where('_id').ne(id).select('name').exec(function(err, result){
			if (result != null) {
				err = new Error("Name Already in use");
                callback(err);
                return; //It's important to return so that the task callback isn't called twice
            }
            callback();
        });
    }, function(callback){
		if(drink.name=='' || drink.cost==null || drink.description==null){
			err = new Error("All items are not filled out!");
            callback(err);
            return;
		}
		callback();
	}], function(err) {
		if (err) {
			 res.status(500).send(err.message); //Or pass it on to an outer callback, log it or whatever suits your needs
		}
		else{
			Drinks.findByIdAndUpdate(id, drink, function(err, response) {
				if (err) throw err; 
				else console.log('Drink created!');
				res.send(response);
			});
		}
	});
}   

exports.removeDrink = function(req, res){
	var id = req.params.id;
	Drinks.findByIdAndRemove(id, function(err,Drink) {
		if (err) throw err;

	// we have deleted the user
	console.log('Drink deleted!');
	res.send(Drink);
	});
}