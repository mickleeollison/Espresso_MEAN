var Goods = require('mongoose').model('Goods');
var async = require('async');

exports.getGoods = function(req, res) {
  Goods.find({}).populate('allergen category').exec(function(err, goods) {
    res.send(goods);
  })
};

exports.getGood = function(req, res) {
  	var id = req.params.id;
  Goods.findById(id).populate('allergen category').exec(function(err, goods) {
    res.send(goods);
  })
  console.log("got good");
};

exports.createGood = function(req, res) {
  var good = req.body;
  async.parallel([
    function(callback) {
        Goods.findOne({'name':good.name}).select('name').exec(function(err, result){
			if (result != null) {
				err = new Error("Name Already in use");
                callback(err);
                return; 
            }
            callback();
        });
    }, function(callback){
		console.log(good);
		if(good.name=='' || good.cost==null || good.category=='Choose a Category' || good.inventory==''){
			err = new Error("All items are not filled out!");
            callback(err);
            return;
		}
		callback();
	}], function(err) {
		if (err) {
			 console.log(err); 
		}
		else{
			Goods.create(good, function(err, response) {
				if (err) throw err;
				else console.log('BakedGood '+good.name+' created!');
				res.send(response);
			});	
		}
	});
};

exports.updateGood = function(req, res){
	var id = req.params.id;
	var good = req.body;
	async.parallel([
    function(callback) {
        Goods.findOne({'name':good.name}).where('_id').ne(id).select('name').exec(function(err, result){
			if (result != null) {
				err = new Error("Name Already in use");
                callback(err);
                return; 
            }
            callback();
        });
    }, function(callback){
		console.log(good);
		if(good.name=='' || good.category=='Choose a Category' || good.inventory==''){
			err = new Error("All items are not filled out!");
            callback(err);
            return;
		}
		callback();
	}], function(err) {
		if (err) {
			 console.log(err); 
		}
		else{
			Goods.findByIdAndUpdate(id, good, function(err, response) {
				if (err) throw err;
				else console.log('BakedGood '+good.name+' updated!');
				res.send(response);
			});	
		}
	});
}   

exports.removeGood = function(req, res){
	var id = req.params.id;
	Goods.findByIdAndRemove(id, function(err,good) {
		if (err) throw err;

		console.log('Good deleted!');
		res.send(good);
	});
}