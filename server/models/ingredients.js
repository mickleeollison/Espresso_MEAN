var mongoose = require('mongoose');

var ingredientsSchema = mongoose.Schema({
  _id: {type:Number},
  name: {type:String},
  cost: {type:Number},
  unitOfMeasure: {type:String},
  inventory:{type: Number}
}); 

var Ingredients = mongoose.model('Ingredients', ingredientsSchema);

function createDefaultIngredients() {
  Ingredients.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Ingredients.create({ _id: 1, name: "espress", cost: 1.75, unitOfMeasure: "shot", inventory: 100});
      Ingredients.create({ _id: 2,name: "water", cost: 1.75, unitOfMeasure: "shot", inventory: 100});
      Ingredients.create({ _id: 3,name: "cream", cost: 1.75, unitOfMeasure: "tsp", inventory: 100});
	    Ingredients.create({ _id: 4,name: "caramal", cost: 1.75, unitOfMeasure: "tbs", inventory: 100});
      Ingredients.create({ _id: 5, name: "chocolate", cost: 1.75, unitOfMeasure: "tbs", inventory: 100});
    }
  })
};

exports.createDefaultIngredients = createDefaultIngredients;  