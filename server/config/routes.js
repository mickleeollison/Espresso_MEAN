var express = require('express'),
    router = express.Router(),
	ingredients = require('./../controllers/ingredients'),
    allergens = require('./../controllers/allergens'),
    categories = require('./../controllers/categories')
	goods = require('./../controllers/goods'),
	drinks = require('./../controllers/drinks'),
	passport = require('passport');

module.exports = function(app, config) {
    app.use(function(req, res, next) {
        if (!req.user)
            res.header('Cache-Control', 'no-cache');
        next();
    });
	app.use(express.static(config.rootPath + '/public'));
	app.get('/index', isLoggedIn, function(req,res){
		res.sendfile(config.rootPath + '/public/indexpage.html');
        console.log(req.user.local.email);
	});
    app.get('/',function(req,res){
		res.sendfile(config.rootPath + '/public/loginpage.html');
	});
	app.get('/login',function(req,res){
		res.sendfile(config.rootPath + '/public/loginpage.html');
	});
	app.get('/register',function(req,res){
		res.sendfile(config.rootPath + '/public/registerPage.html');
	});
	app.get('/logout', function(req, res) {
        console.log(req.user);
        req.logout();
        console.log(req.user);
        res.redirect('/login');
    });
	 
	app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', 
        failureRedirect : '/register',
        failureFlash : true 
    }));
	
	app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/index', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

		
    app.get('/categories', categories.getCategories);
    
    app.get('/allergens', allergens.getAllergens);
    
    app.get('/goods', goods.getGoods);
	app.get('/good/:id', goods.getGood);
    app.post('/goods', goods.createGood);
    app.put('/goods/:id', goods.updateGood);
    app.delete('/goods/:id', goods.removeGood);
    
    app.get('/ingredients', ingredients.getIngredients);
    app.post('/ingredients', ingredients.createIngredient);
    app.get('/ingredient/:id', ingredients.getIngredient);
	app.put('/ingredients/:id', ingredients.putIngredient);
    app.delete('/ingredients/:id', ingredients.removeIngredient);
    
    app.get('/drinks', drinks.getDrinks);
	app.get('/drink/:id', drinks.getDrink);
    app.post('/drinks', drinks.createDrink);
    app.put('/drinks/:id', drinks.putDrink);
    app.delete('/drinks/:id', drinks.removeDrink);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
	}
    res.redirect('/login');
}