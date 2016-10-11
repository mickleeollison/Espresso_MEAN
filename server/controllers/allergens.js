var Allergens = require('mongoose').model('Allergens');

exports.getAllergens = function(req, res) {
  Allergens.find({}).exec(function(err, allergens) {
    res.send(allergens);
  })
};
