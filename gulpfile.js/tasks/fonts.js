var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;


gulp.task('assets:fonts', function () {
    return gulp.src(config.assets.fonts.src)
        .pipe(gulp.dest(config.assets.fonts.dest));
});

gulp.task('assets:fonts:dev', function () {
    return gulp.src(config.assets.fonts.src)
        .pipe(gulp.dest(config.assets.fonts.tmp));
});

