var gulp = require('gulp');
var gutil = require('gulp-util');
var greplace = require('gulp-replace');

var services = 'public/app/src/services';
var devUrl = 'http://localhost:3000';
var prodUrl = 'http://sales-seed.herokuapp.com';

gulp.task('prod-url-service', function() {
  return gulp.src([
      services + '/*.ts'
    ])
    .pipe(greplace(devUrl, prodUrl))
    .pipe(gulp.dest(services));
});

gulp.task('prep-ts', ['prod-url-service']);

gulp.task('dev-url-service', function() {
  return gulp.src([
      services + '/*.ts'
    ])
    .pipe(greplace(prodUrl, devUrl))
    .pipe(gulp.dest(services))
});
