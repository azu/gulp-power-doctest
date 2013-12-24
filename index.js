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
        var results;
        try {
            results = power.runDocTest({
                filePath: file.path,
                fileData: contents
            }, options);
        } catch (e) {
            gutil.log(e + " @ " + file.path);
        }
        if (results && results.length > 0) {
            return callback(power.printTestResult(results), file);
        }
        callback(null, file);
    });
};
module.exports.runDocTest = power.runDocTest;