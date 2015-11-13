var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;


gulp.task('check', function(){
	if( $.argv.check === true || $.argv.check === 'true' ){
	    $.runSequence(
			'check:jshint',
			'check:csslint',
		callback);
	}
});

// JS Lint
gulp.task('check:jshint', function(){
    return gulp.src(config.assets.javascript.src)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

// CSS Lint
gulp.task('check:csslint', function(){
	if( config.technologies.styles === 'scss' && $.argv.report !== 'false' ){
		return gulp.src(config.assets.styles.src)
    		.pipe($.scsslint({ 'config': 'lint.yml'}));
	}
});

