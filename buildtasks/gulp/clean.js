/**
 * Created by thomasspringborg on 20/09/15.
 */

var gulp = require('gulp');
var del = require('del');
var config = require('../../config.js');

gulp.task('clean', function () {
    return del([
        config.build.prod
    ]);
});
