var browserSync = require('browser-sync');
var gulp        = require('gulp');
var pkg = require('../../package.json');
var gutil = require('gulp-util');
var config = require('../../config.js');

gulp.task('browserSync', function() {
  browserSync({
      server:gutil.env.production ? config.build.prod : config.build.dev
  });
});

