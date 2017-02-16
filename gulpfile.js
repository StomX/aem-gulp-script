const $ = require( 'gulp-load-plugins' )( {
        pattern: [ 'gulp*', 'gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'fs' ]
    } ),
    init = JSON.parse( $.fs.readFileSync( './setting.json' ) );

$.gulp.task( 'default', function () {} );

$.gulp.task( 'compile:js', function () {
    // return $.gulp.src( init.source.path.js )
    //     .pipe( $.sourcemaps.init() )
    //     .pipe( $.recursiveConcat( 'main.js' ) )
    //     //.pipe( $.uglify() )
    //     .pipe( $.sourcemaps.write() )
    //     .pipe( $.rename( function ( path ) {
    //         var dirname = path.dirname;
    //         path.dirname = dirname.replace( 'devjs', 'js/' );
    //         path.basename = init.output.basename;
    //         path.extname = '.js';
    //     } ) )
    //     .pipe( $.gulp.dest( 'jcr_root/' ) );
    return $.gulp.src( '**/devjs/{*,}/', {
            base: 'jcr_root/'
        } )
        .pipe( $.flatmap( function ( stream, dir ) {
            return $.gulp.src( dir.path + '/*.js' )
                .pipe( $.sourcemaps.init() )
                .pipe( $.concat( 'main.js' ) )
                .pipe( $.uglify() )
                .pipe( $.rename( function ( path ) {
                    var dirname = dir.path.split( 'jcr_root\\' )[ 1 ];
                    path.dirname = 'jcr_root/' + dirname.replace( 'devjs', 'js/' );
                } ) )
                .pipe( $.sourcemaps.write() )
                .pipe( $.gulp.dest( './' ) );
        } ) );
} );

$.gulp.task( 'compile:sass', function () {
    return $.gulp.src( init.source.path.scss )
        .pipe( $.sourcemaps.init() )
        .pipe( $.sass() )
        .pipe( $.cleanCss( {
            format: {
                breaks: { // controls where to insert breaks
                    afterBlockEnds: true, // controls if a line break comes after a block ends, defaults to `false`
                    afterRuleEnds: true, // controls if a line break comes after a rule ends; defaults to `false`
                }
            }
        } ) )
        .pipe( $.sourcemaps.write() )
        .pipe( $.rename( function ( path ) {
            var dirname = path.dirname;
            path.dirname = dirname.replace( 'scss', 'css/' );
            path.basename = init.output.basename;
        } ) )
        .pipe( $.gulp.dest( 'jcr_root/' ) );
} );

$.gulp.task( 'compile:less', function () {
    return $.gulp.src( init.source.path.less )
        .pipe( $.sourcemaps.init() )
        .pipe( $.less() )
        .pipe( $.cleanCss( {
            format: {
                breaks: { // controls where to insert breaks
                    afterBlockEnds: true, // controls if a line break comes after a block ends, defaults to `false`
                    afterRuleEnds: true, // controls if a line break comes after a rule ends; defaults to `false`
                }
            }
        } ) )
        .pipe( $.sourcemaps.write() )
        .pipe( $.rename( function ( path ) {
            var dirname = path.dirname;
            path.dirname = dirname.replace( 'scss', 'css/' );
            path.basename = init.output.basename;
        } ) )
        .pipe( $.gulp.dest( 'jcr_root/' ) );
} );

$.gulp.task( 'clean:js', function () {
    return $.gulp.src( init.source.path.root + init.clean.path.js )
        .pipe( $.clean() );
} );

$.gulp.task( 'clean:css', function () {
    return $.gulp.src( init.source.path.root + init.clean.path.css )
        .pipe( $.clean() );
} );

$.gulp.task( 'compile:all', [ 'compile:js', 'compile:sass' ] );
$.gulp.task( 'clean:all', [ 'clean:js', 'clean:css' ] )

