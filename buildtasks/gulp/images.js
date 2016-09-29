var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var config = require('../../config.js');
var browserSync  = require('browser-sync');


gulp.task('images', function() {
    var srcPath = config.build.compressImagesInput || [config.build.src + "/images/**","!"+config.build.src + "/images/sprites/**"];
    var outputPath = config.build.compressImagesOutput || "/images";
    var output = gutil.env.production ? config.build.prod + outputPath : config.build.dev + outputPath;
    var compressOptions = config.build.compressImagesOptions || {};

    return gulp.src(srcPath)
        .pipe(gulpif(gutil.env.production, gutil.noop(), changed(output))) // Ignore unchanged files on development build
        .pipe(imagemin(compressOptions)) // Optimize
        .pipe(gulp.dest(output))
        .pipe(browserSync.reload({stream:true}));
});

