/**
 * Created by thomasspringborg on 20/09/15.
 */

var buildversion = "1";

var pkg = require('./package.json');
module.exports = (function(){


    var build = {
        "version":buildversion,
        "src": "www-src",
        "dev": "www",
        "prod": "www",
        "static":"www-static",
        "bundlescripts": [
            "sp-framework.js"
        ],
        "retinaSprites":true,
        "fontName":"font-icons",
        "concatScss":true //whether to concat all scss files not starting with "_" together in to a main.css file or compile them all seperately.
    };


    //shim for browserify-shim
    ///see https://github.com/thlorenz/browserify-shim for documentation.
    var shim = {};


    //set as true to use browserify transform babelify for ecma6 js
    build.babel = false;


    /// data for markojs. Can be a string(which will be required each build), a function(which will be invoked) or an object.
    // string is preferable as it we will be able to require an uncached version each time it is needed.
    build.data = "/build-data.json"




    return {
        build:build,
        shim:shim
    };

})();