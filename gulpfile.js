var gulp = require('gulp');
var gutil = require('gulp-util');
var greplace = require('gulp-replace');

var services = 'public/app/src/services';
var devUrl = 'http://localhost:3001';
var prodUrl = 'https://' + process.env.SALES_URL + '.herokuapp.com';

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
    .pipe(gulp.dest(services));
});

gulp.task('prep-dev', ['dev-url-service']);

gulp.task('env', function() {
  gutil.log("Heroku URL: " + process.env.SALES_URL);
  gutil.log(prodUrl);
});
