var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('./errorHandling.js');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var config = require('../../config.js');
var buildInfo = require('./buildInfo.js');

var pkg = require('../../package.json');

gulp.task('sass', function () {
    var src = config.build.src;
    return gulp.src([src+"/**/*.scss", "!"+src+"/**/_*.scss"])
        .pipe(gulpif(gutil.env.production, gutil.noop(), sourcemaps.init()))
        .pipe(sass({
            indentedSyntax:false,
            imagePath:'images',
            outputStyle: gutil.env.production ? 'compressed' : 'expanded'
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer({ browsers: ['last 2 version'] }))
        .pipe(gulpif(config.build.concatSass, concat("main.css"), gutil.noop()))
        .pipe(gulpif(gutil.env.production, gutil.noop(), sourcemaps.write()))
        .pipe(gulpif(gutil.env.production,buildInfo(), gutil.noop()))
        .pipe(gulp.dest((gutil.env.production ? config.build.prod : config.build.dev)+"/"))
        .pipe(browserSync.reload({stream:true}));
});
