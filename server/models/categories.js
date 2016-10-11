var mongoose = require('mongoose');

var categoriesSchema = mongoose.Schema({
  _id: {type: Number},
  category: {type:String}
});

var Categories = mongoose.model('Categories', categoriesSchema);

function createDefaultCategories() {
  Categories.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Categories.create({_id:1, 'category': 'cake'});
      Categories.create({_id:2, 'category': 'pastry'});
      Categories.create({_id:3, 'category': 'sandwich'});
      Categories.create({_id:4, 'category': 'fruit'});
    }
  })
}; 

exports.createDefaultCategories = createDefaultCategories;