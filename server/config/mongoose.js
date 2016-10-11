var mongoose = require('mongoose'),
    ingredientsModel = require('./../models/ingredients'),
    drinksModel = require('./../models/drinks')
    categoriesModel = require('./../models/categories'),
    allergensModel = require('./../models/allergens'),
	  goodsModel = require('./../models/goods'),
	  usersModel = require('./../models/user');


module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function callback() {
    console.log('expresso db opened');
  });

  allergensModel.createDefaultAllergens();
  categoriesModel.createDefaultCategories();
  goodsModel.createDefaultGoods();
  ingredientsModel.createDefaultIngredients();
  drinksModel.createDefaultDrinks();
}; 
