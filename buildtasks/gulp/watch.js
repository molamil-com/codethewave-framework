/**
 * Created by thomasspringborg on 11/09/15.
 */

var gulp     = require('gulp');
var watch = require('gulp-watch');
var reload = require('browser-sync').reload;
var config = require('../../config.js');

gulp.task('watch', function() {
    var src = config.build.src;
    gulp.watch(src+"/**/*.scss", ['sass', reload]);
    gulp.watch([src+"/images","!"+src+"/images/sprites"], ['images', reload]);
    gulp.watch([src+"/images/sprites/*.png"], ['sprites', reload]);

    gulp.watch(['!'+config.build.src+"/**/_*.marko", config.build.src+"/**/*.marko"], ['watch-marko']);
    gulp.watch([config.build.static+"/**/*"], ['copyStaticAssets', reload]);
    //if data for marko is a file, watch it for changes.
    if(typeof(config.build.data) == 'string'){
        gulp.watch([process.cwd()+config.build.data], ['marko']);
    }
    gulp.watch([config.build.static+"/**/*"], ['copyStaticAssets', reload]);
    // browserify will watch and recompile our JS, so no need to gulp.watch it
});

