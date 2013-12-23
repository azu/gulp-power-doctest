var es = require("event-stream");
var power = require("power-doctest");
module.exports = function (options) {
    options = options || {};
    return es.map(function (file, callback) {
        var contents = String(file.contents);
        var results = power.runDocTest({
            filePath: file.path,
            fileData: contents
        }, options);
        if (results && results.length > 0) {
            return callback(power.printTestResult(results), file);
        }
        callback(null, file);
    });
};
module.exports.runDocTest = power.runDocTest;