var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;

    
gulp.task('database', function () {
    return gulp.src(config.assets.database.src)
        .pipe(gulp.dest(config.assets.database.dest));
});

