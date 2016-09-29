/**
 * Created by thomasspringborg on 29/08/15.
 */
var requireDir = require('require-dir');
// Require all tasks in dir, including subfolders
requireDir('./buildtasks', { recurse: true });

var gulp = require('gulp');
var gutil = require('gulp-util');


gulp.task('set-environment-to-prod', function(cb){
    gutil.env.production = true;
    cb();
});


//these tasks generate some _scss files which are needed for other tasks
gulp.task('prebuild', ['sprites', 'iconFont'], function(cb){
    cb();
})

gulp.task('postbuild', [
    'images',
    'copyStaticAssets',
    'js',
    'sass',
    'marko'
])

gulp.task('build', ['prebuild'], function(){
    gulp.run('postbuild');
})
gulp.task('default', ['build','watch'], function(){
    gulp.run('browserSync');
});

gulp.task('build:prod', ['set-environment-to-prod'], function(){
    gulp.run('build');
});
