var Categories = require('mongoose').model('Categories');

exports.getCategories = function(req, res) {
  Categories.find({}).exec(function(err, categories) {
    res.send(categories);
  })
};
