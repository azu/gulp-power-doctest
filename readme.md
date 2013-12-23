# gulp-power-doctest

[azu/power-doctest](https://github.com/azu/power-doctest "azu/power-doctest") for [gulp](http://gulpjs.com/ "gulp").

## Installation

``` sh
npm install gulp-power-doctest --save-dev
```

## Usage

`gulpfile.js`

``` js
var gulp = require('gulp');
var powerDoctest = require("gulp-power-doctest");
gulp.task('tests', function () {
    gulp.src("tests/**/*.js")
        .pipe(powerDoctest());
});
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT