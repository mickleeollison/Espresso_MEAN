var mongoose = require('mongoose');

var allergensSchema = mongoose.Schema({
  _id: {type: Number},
  allergen: {type:String}
});

var Allergens = mongoose.model('Allergens', allergensSchema);

function createDefaultAllergens() {
  Allergens.find({}).exec(function(err, collection) {
    if(collection.length === 0) {
      Allergens.create({_id:1, 'allergen': 'fish'});
      Allergens.create({_id:2,'allergen': 'egg'});
      Allergens.create({_id:3,'allergen': 'milk'});
      Allergens.create({_id:4,'allergen': 'wheat'});
      Allergens.create({_id:5,'allergen': 'soy'});
      Allergens.create({_id:6,'allergen': 'nut'});
    }
  })
};
exports.allergensSchema = allergensSchema;
exports.createDefaultAllergens = createDefaultAllergens;