var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var generateIconSass = require('./generateIconSass');
var gutil            = require('gulp-util');


var config = require('./config.js');

gulp.task('iconFont', function() {
  return gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('glyphs', generateIconSass)
    .pipe(gulp.dest((gutil.env.production ? config.destProd : config.destDev)));
});

