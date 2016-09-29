/**
 * Created by thomasspringborg on 30/09/15.
 */


var config = require('../../config.js');


//unfortunately we cannot have this in the config.js file. So instead we just load the data from there!
module.exports = (function(){
    return config.shim
})();