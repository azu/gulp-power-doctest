"use strict";
var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    powerDoctest = require('../index.js'),
    es = require('event-stream');
var assert = require("assert");
var gutil = require('gulp-util');

var out = process.stdout.write.bind(process.stdout);
var err = process.stderr.write.bind(process.stderr);

describe('gulp-power-doctest testing', function () {
    context("when passed testing", function () {
        var filePath = path.join(__dirname, './fixtures/example.js');
        it("should run power-doctest and pass", function (done) {
            process.stdout.write = function (str) {
                if (/PASS/.test(gutil.colors.stripColor(str))) {
                    assert(true);
                    process.stdout.write = out;
                    done();
                }
            };
            powerDoctest().write(new gutil.File({
                path: "./fixture/example.js",
                cwd: "./",
                base: "./fixture/",
                contents: fs.readFileSync(filePath)
            }));
        });
    });
    context("when failure testing", function () {
        var filePath = path.join(__dirname, './fixtures/failure.js');
        it("should run power-doctest and fail", function (done) {
            var stream = powerDoctest();
            process.stdout.write = function (str) {
                if (/Error/.test(gutil.colors.stripColor(str))) {
                    assert(true);
                    process.stdout.write = out;
                    done();
                }
            };

            stream.on('error', function () {
            });
            powerDoctest().write(new gutil.File({
                path: "./fixture/example.js",
                cwd: "./",
                base: "./fixture/",
                contents: fs.readFileSync(filePath)
            }));
        });
    });
});