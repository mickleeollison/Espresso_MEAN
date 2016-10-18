# README #

### Motivation ###

This project is a coffee shop application which allows users to register and login and
once logged in create, update, remove, and view baked goods, ingredients, and drink recipes.
There is also inventory tracking of ingredents through the amount of ingredents used in drink recipies.

### Technologies used and dependencies ###

Written in Node.js using ExpressJS, Passport.js, Mongoose.js, AngularJS, Less, Gulp, and HTML

Frontend dependencies are listed in bower.json placed in the directory specified by .bowerrc; also, backend dependencies are listed in paclage.json

### Installation ###

In order to run the project you must first have a local running instance of MongoDB and have Node.js and Bower

To run, first open the command line cd into the project's root directory and type "bower install" and "npm install"; then run the project with "node server.js"

### Tests ###

There are no applicable tests with this project at this time

### Additional Notes ###

Initial Data is loaded if there is no data in the database 

Run "gulp watch" in the command line to minify frontend javascript and compile and minify css from less