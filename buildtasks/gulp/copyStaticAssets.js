/**
 * Created by ts on 13/10/15.
 */

var changed    = require('gulp-changed');
var gulp       = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var config = require('../../config.js');
var rename = require('gulp-rename');
var error = require('./errorHandling.js');


gulp.task('copyStaticAssets', function(){
    return gulp.src(config.build.static+'/**/*')
        .pipe(gulp.dest('./'+(gutil.env.production ? config.build.prod : config.build.dev)));
})