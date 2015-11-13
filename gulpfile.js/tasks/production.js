var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig'),
  	useminOptions = {}
;
$.runSequence 	= require('run-sequence');


gulp.task('production', function (callback) {
	$.runSequence(
		'remove:js', // removing all the js we don't need on production
		'useminPrepare',
		'usemin',
		'minify-html',
		'move:prod', // moving from .tmp/ to public/
		'clean:assets',
		'assets:fonts',
		'clean:bower',
	callback);
});




gulp.task('useminPrepare', function () {
	// Looking for "build:x"
	var reg = /<!--\s*build:([a-z=]+)(?:(?:\(([^\)]+?)\))?\s+(\/?([^\s]+?))?)?\s*-->/gim;
	useminOptions = {};
	return gulp.src(config.folder.tmp + '/*.html')
		.pipe($.replace(reg, function(s, res) {
			if( res.indexOf("=") > -1 ){
				var div = res.split("=");
				var name = div[0];
				var type = div[1];

				switch(type){
					case "js":
						useminOptions[name] = [$.uglify(), $.rev()];
					break;
					case "css":
						useminOptions[name] = [$.minifyCss(), $.rev()];
					break;
				}
				return s.replace(res,name);
			}
		}) )
		.pipe( gulp.dest(config.folder.tmp) );
});

gulp.task('usemin', function () {
	return gulp.src(config.folder.tmp + '/*.html')
		.pipe( $.usemin(useminOptions) )
		.pipe( $.data(function (dada) {
			console.log(dada)
		}))
		.pipe( gulp.dest(config.folder.tmp) );
});

gulp.task('revAppend', function () {
	return gulp.src(config.folder.tmp + '/*.html')
	    .pipe($.revAppend())
	    .pipe(gulp.dest(config.folder.tmp));
});

gulp.task('remove:js', function () {
	return gulp.src(config.folder.tmp + '/*.html')
		.pipe($.removeCode({ production: true }))
		.pipe(gulp.dest(config.folder.tmp));
});

gulp.task('minify-html', function() {
	var opts = {
		conditionals: true,
		spare:true
	};
	return gulp.src(config.folder.tmp + '/*.html')
		.pipe($.minifyHtml(opts))
		.pipe(gulp.dest(config.folder.tmp));
});






