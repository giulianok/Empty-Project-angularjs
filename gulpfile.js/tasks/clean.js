var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;


gulp.task('clean:server', function () {
    return gulp.src(config.folder.tmp, {
    	read: false
	})
    .pipe($.clean({
    	force:true
    }));
});
gulp.task('clean:build', function () {
    return gulp.src(config.folder.dest, {
    	read: false
	})
    .pipe($.clean({
    	force:true
    }));
});
gulp.task('clean:assets', function (args) {
    return gulp.src(config.folder.dest + '/{scripts,styles}/!(*.min*)', {
    	read: false
	})
    .pipe($.clean({
    	force:true
    }));
});
gulp.task('clean:bower', function (args) {
    return gulp.src(config.folder.dest + '/bower_components', {
    	read: false
	})
    .pipe($.clean({
    	force:true
    }));
});

