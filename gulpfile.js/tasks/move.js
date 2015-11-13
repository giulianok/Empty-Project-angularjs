var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;
$.mainBowerFiles = require('main-bower-files');


gulp.task('move:root', function () {
    return gulp.src([config.folder.app + 'root/*', config.folder.app + 'root/.htaccess'])
        .pipe(gulp.dest(config.folder.tmp));
});

gulp.task('move:prod', ['move:dev'], function () {
    return gulp.src([config.folder.tmp + '**/*', config.folder.tmp + '.htaccess'])
        .pipe(gulp.dest(config.folder.dest));
});

gulp.task('move:dev', ['move:root']);



/* Move all bower files to tmp (only for server)
--------------------------------------------------- */
gulp.task('bower', function () {
	return gulp.src($.mainBowerFiles())
		//.pipe(watch('/bower_components/'))
		.pipe(gulp.dest(config.folder.tmp + '/bower_components/'));
});

