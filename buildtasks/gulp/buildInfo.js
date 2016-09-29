/**
 * Created by thomasspringborg on 20/09/15.
 */
var es = require('event-stream');
var config = require('../../config.js');

module.exports = function () {
    // you're going to receive Vinyl files as chunks
    function transform(file, cb) {
        // read and modify file contents
        var buildTime = new Date().toString();
        var version = config.build.version;
        file.contents = new Buffer(

            "/* BUILD TIME:"+buildTime+" ### VERSION:"+ version+ " */\n"+
                String(file.contents)
        );

        // if there was some error, just pass as the first parameter here
        cb(null, file);
    }
    return es.map(transform);
}
