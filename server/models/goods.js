var mongoose = require('mongoose'),
	Allergens = require('mongoose').model('Allergens'),
	Categories = require('mongoose').model('Categories'),
	ObjectId = mongoose.Schema.ObjectId;

var goodsSchema = mongoose.Schema({
  name: {type:String},
  cost: {type:Number},
  category: {type:Number, ref:'Categories'},
  allergen: {type:Number, ref:'Allergens'},
  inventory: {type:Number}
});

var Goods = mongoose.model('Goods', goodsSchema);


function createDefaultGoods() {
  Goods.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Goods.create({name:'Brownie',cost:'1.5',category: 1, allergen: 1, inventory: '20'});
	  Goods.create({name:'Tart',cost:'1.5',category: 2, allergen: 2, inventory: '20'});
	  Goods.create({name:'Sandwich',cost:'1.5',category: 3, allergen: 3, inventory: '20'});
	  Goods.create({name:'Cake',cost:'1.5',category: 4, allergen: 4, inventory: '20'});
	  Goods.create({name:'Apple',cost:'1.5',category: 1, allergen: 5, inventory: '20'});
    }
  }) 
}; 

exports.createDefaultGoods =  createDefaultGoods;  
