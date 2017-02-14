const $ = require('gulp-load-plugins')({
        pattern: ['gulp*', 'gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'fs']
    }),
    init = JSON.parse($.fs.readFileSync('./setting.json'));

$.gulp.task('default', function() {});

$.gulp.task('compile:js', function() {
    var dirname = '';
    return $.gulp.src(init.source.path.js)
        .pipe($.rename(function(path) {
            dirname = path.dirname;
        }))
        .pipe($.sourcemaps.init())
        .pipe($.concat(dirname + 'main.js'))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe($.rename(function(path) {
            path.dirname = dirname.split('devjs')
                .join('js/');
        }))
        .pipe($.gulp.dest('jcr_root/'));
});

$.gulp.task('compile:sass', function() {
    var dirname = '';
    return $.gulp.src(init.source.path.scss)
        .pipe($.rename(function(path) {
            dirname = path.dirname;
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'compact'
        }))
        //.pipe($.uglifycss())
        .pipe($.removeEmptyLines())
        .pipe($.sourcemaps.write())
        .pipe($.rename(function(path) {
            path.dirname = dirname.split('scss')
                .join('css/');
            path.basename = init.output.basename;
        }))
        .pipe($.gulp.dest('jcr_root/'));
});

$.gulp.task('compile:less', function() {
    var dirname = '',
        task = [];
    return $.gulp.src(init.source.path.less)
        .pipe($.rename(function(path) {
            dirname = path.dirname;
        }))
        .pipe($.sourcemaps.init())
        .pipe($.less())
        .pipe($.uglifycss())
        .pipe($.sourcemaps.write())
        .pipe($.rename(function(path) {
            path.dirname = dirname.split('less')
                .join('css/');
            path.basename = init.output.basename;
        }))
        .pipe($.gulp.dest('jcr_root/'));
});

$.gulp.task('clean:js', function() {
    return $.gulp.src(init.source.path.root + init.clean.path.js)
        .pipe($.clean());
});

$.gulp.task('clean:css', function() {
    return $.gulp.src(init.source.path.root + init.clean.path.css)
        .pipe($.clean());
});

$.gulp.task('compile:all', ['compile:js', 'compile:sass']);
$.gulp.task('clean:all', ['clean:js', 'clean:css'])
