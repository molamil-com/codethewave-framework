/**
 * Created by ts on 18/09/15.
 */

'use strict';

var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var rename     = require('gulp-rename');
var browserify = require('browserify');
var buffer     = require('vinyl-buffer');
var es         = require('event-stream');
var _          = require('lodash');
var sourcemaps = require('gulp-sourcemaps');
var watchify   = require('watchify');
var gutil = require('gulp-util');
var assign = require('lodash').assign;
var error = require('./errorHandling');
var browserSync = require('browser-sync');
var through = require('through');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var buildInfo = require('./buildInfo.js');
var config = require('../../config.js');
var markoify = require('markoify');
var babelify = require("babelify");
var stripDebug = require('gulp-strip-debug');


function compile(file, watch) {
    var bundler = browserify(file, { debug: true });
    bundler.transform(markoify);
    bundler.transform(require('browserify-shim'))
    if(config.build.babel){
        bundler.transform(babelify); //probably none of us are going to use this.
    }
    if(watch){
        bundler = watchify(bundler);
    }
    function rebundle() {

        bundler.bundle()
            .on('error', error)
            .pipe(source(file))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(rename(function(path){
                path.dirname = path.dirname.replace(config.build.src, (gutil.env.production) ? config.build.prod : config.build.dev);
            }))
            .pipe(gulpif(gutil.env.production, gutil.noop(), sourcemaps.write('./')))
            .pipe(gulpif(gutil.env.production, uglify(), gutil.noop()))
            .pipe(gulpif(gutil.env.production,buildInfo(), gutil.noop()))
            .pipe(gulpif(gutil.env.production,stripDebug(), gutil.noop()))
            .pipe(gulp.dest("./"))
            .pipe(browserSync.stream({once:true}));
    }

    if (watch) {
        bundler.on('update', function() {
            gutil.log('-> bundling '+file);
            rebundle();
        });

    }
    bundler.on('log', gutil.log);

    return rebundle();
}

function compileAll(watch){
    _.each(config.build.bundlescripts, function(file){
        compile(config.build.src+"/"+file, watch);
    })
}

gulp.task('js',function(){
    compileAll(!gutil.env.production);
});

