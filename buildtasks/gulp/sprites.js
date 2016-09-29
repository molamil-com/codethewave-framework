/**
 * Created by thomasspringborg on 04/10/15.
 */

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var config = require('../../config.js');
var rename     = require('gulp-rename');
var error = require('./errorHandling');

gulp.task('sprites', function () {
    // Generate our spritesheet


    var spriteData = gulp.src(config.build.src+'/images/sprites/*.png')
        .pipe(spritesmith({
            imgName: 'sprites.png',
            cssName: '_sprites.scss',
            imgPath:'images/sprites/sprites.png',
            retinaSrcFilter: (config.build.retinaSprites ? [config.build.src+'/images/sprites/*@2x.png'] : null),
            retinaImgPath: (config.build.retinaSprites ? 'images/sprites/sprites@2x.png' : null),
            retinaImgName: (config.build.retinaSprites ? 'sprites@2x.png' : null)})
        )
        .on('error', error);

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
        .pipe(imagemin())
        .pipe(gulp.dest((gutil.env.production ? config.build.prod : config.build.dev)+"/images/sprites"));

    var cssStream = spriteData.css
        .pipe(gulp.dest(config.build.src+"/images/sprites"));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});