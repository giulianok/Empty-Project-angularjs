var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;

    
gulp.task('javascript', ['javascript:angularjs'], function () {
    return gulp.src(config.javascript.src)
    	.pipe($.plumber())
    	.pipe($.filelog())
    	.pipe($.ngAnnotate())
    	.pipe($.babel())
    	.pipe(gulp.dest(config.javascript.dest))

});

gulp.task('javascript:angularjs', function () {

	var sources = gulp.src([
		config.templates.base + '/**/*.js',
		config.javascript.base + 'services/**/*.js',
		config.javascript.base + 'directives/**/*.js'
	], {
		read: false
	});

	return gulp.src(config.templates.dest + '/*.html')
		.pipe($.inject(sources, {
			transform: function (filepath, file, i, length) {
				var filepath = filepath.replace('/app/','');
				var filepath = filepath.replace('views/','scripts/');
				// if (filepath.indexOf('views/') > -1) {
					// var paths = filepath.split('/');
					// var filename = paths[paths.length-1];
					// return '<script src="scripts/' + filename + '"></script>';
				// }
				return '<script src="' + filepath + '"></script>';
			}
		}))
		.pipe(gulp.dest(config.templates.dest));
});

