/* file: gulpfile.js */

var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    less   = require('gulp-less'),
	  minifyCSS = require('gulp-minify-css'),
	  gutil = require('gulp-util');  
	  concat = require('gulp-concat');  
  	uglify = require('gulp-uglify');


gulp.task('build-css', function() {
  return gulp.src('public/css/*.less')
    .pipe(less())
	  .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'));
});

gulp.task('build-js', function() {  
  return gulp.src('public/js/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/build/vendor.js'))
    .on('error', gutil.log)
});

gulp.task('watch', function() {
  gulp.watch('public/js/*.js', ['build-js']);
  gulp.watch('public/css/*.less', ['build-css']);
});