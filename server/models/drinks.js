var mongoose = require('mongoose'),
	Ingredients = require('mongoose').model('Ingredients'),
	Schema = mongoose.Schema;

var drinksSchema = mongoose.Schema({
  name: {type:String},
  cost: {type:Number},
  description: {type: String},
  ingredients:  [{ type: Number, ref: 'Ingredients' }],
  amounts: [{type: Number}]
});

var Drinks = mongoose.model('Drinks', drinksSchema);

function createDefaultDrinks() {
  Drinks.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Drinks.create({name:'Americano',cost:2.50,description:'smooth and bitter', ingredients: [1,2,3], amounts: [1,2,3]});
      Drinks.create({name:'Mocha',cost:3.50,description:'smooth and chocolatly', ingredients: [1,2,3], amounts: [1,2,3]});
      Drinks.create({name:'Frapachino',cost:4.50,description:'smooth and creamy', ingredients: [1,2,3], amounts: [1,2,3]});
    } Math.floor((Math.random() * 10) + 1);
  })
};

exports.createDefaultDrinks = createDefaultDrinks; 