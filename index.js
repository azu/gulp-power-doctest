var es = require("event-stream");
var power = require("power-doctest");
var gutil = require('gulp-util');
module.exports = function (options) {
    options = options || {};
    return es.map(function (file, callback) {
        var contents = String(file.contents);
        if (!contents || contents.length === 0) {
            return callback(null, file);
        }
        options.filePath = file.path;
        power.runDocTestAsPromise(contents, options)
            .then(function (result) {
                gutil.log(result + " PASSED");
                callback(null, file);
            }).catch(function (error) {
                callback(power.printTestResult(error), file);
            });
    });
};
module.exports.runDocTestAsPromise = power.runDocTestAsPromise;