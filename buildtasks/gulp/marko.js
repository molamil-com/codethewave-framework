/**
 * Created by ts on 06/10/15.
 */

var marko = require('gulp-marko');
var gulp = require('gulp');
var browserSync  = require('browser-sync');
var error = require('./errorHandling.js');
var through = require('through2');
var gutil = require('gulp-util');
var config = require('../../config.js');
var rename = require('gulp-rename');
var es = require('event-stream');
var merge = require('merge-stream');
var changed = require('gulp-changed');

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}


gulp.task('marko', function(){
    var reload = gulp.src(config.build.src+'/**/*.marko')
        .pipe(changed(config.build.src+'/**/*.marko'))
        .pipe(through.obj(function (file, enc, cb) {
            require('marko/hot-reload').handleFileModified(file.path);
            cb(null, file);
        }))
    var build = gulp.src(['!'+config.build.src+'/**/_*.marko',config.build.src+'/**/*.marko'])
        .pipe(marko({
            renderParams: (function(){
                var src = config.build.data;
                var params = {};
                switch(typeof(src)){
                    case 'string':
                        params = requireUncached(process.cwd()+src);
                        break;
                    case 'function':
                        params = src();
                        break;
                    case 'object':
                        params = src;
                        break;
                }
                //console.log(params);
                return params;
            })()
        }))
        .on('error', error)
        .pipe(rename(function(path){
            path.basename = path.basename.replace('.marko', '')
        }))
        .pipe(gulp.dest((gutil.env.production ? config.build.prod : config.build.dev)+'/'));
    //.pipe(browserSync.reload({stream:true}));
    return merge(reload,build)
});



gulp.task('watch-marko', ['marko']);
