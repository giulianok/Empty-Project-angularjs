var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({lazy:false}),
  	config      = require('../gulpconfig'),
  	mode		= 'dev'
;
$.argv 			= require('yargs').argv;
$.browserSync 	= require('browser-sync');
$.runSequence 	= require('run-sequence');

/* Development Tasks
--------------------------------------------------- */
gulp.task('watch', function () {

	// $.watch(config.templates.dynamic.listen, function () {
	//     gulp.start('templates:dynamic');
	// });

	$.watch(config.templates.listen, function () {
		console.log('Watching templates');
	    gulp.start('templates', function () {
			console.log('templates compiled');
	    	gulp.start('javascript:angularjs', function () {
				console.log('templates angularjs compiled');
	    	});
	    });
	});

	$.watch(config.styles.listening, function () {
	    gulp.start('styles');
	});

	$.watch(config.javascript.listening, function () {
	    gulp.start('javascript', function () {
	    	
	    });
	});

	$.watch(config.assets.images.src, function () {
	    gulp.start('assets:images');
	});
});
gulp.task('connect', function() {

	if( mode === 'dev' ){
		var src = config.connect.server.src;
		var base = config.connect.server.base;
	}else if( mode === 'prod' && $.argv.sync === true || $.argv.sync === 'true' ){
		var src = config.connect.prod.src;
		var base = config.connect.prod.base;
	}else{
		return;
	}

	var settings = {
		files: src,
		port: config.connect.port,
		open: config.connect.open,
		notify: config.connect.notify,
		startPath: '/index.html',
		injectChanges: true,
		server: {
			baseDir: base,
			port: config.connect.port,
			directory: config.connect.directory
		},
		//proxy: 'http://localhost:80',
		ghostMode: false
	};

	console.log($.argv);
	console.log(settings);

	if( $.argv.open === true || $.argv.open === 'true' ){
		settings.open = true;
	}

	$.browserSync(settings);
});





/* Running...
--------------------------------------------------- */
gulp.task('default', function () {
	console.log('working');
});

gulp.task('build', function(callback) {
	$.runSequence(
		'clean:server',
		'styles',
		'templates',
		'javascript',
		'bower',
		'assets:images',
		'database',
		callback);
});
gulp.task('serve', function(callback) {
	$.runSequence(
		'build',
		'assets:fonts:dev',
		//'check',
		'move:dev',
		'watch',
		'connect',
	callback);
});
gulp.task('prod', function(callback) {
	mode = 'prod';
	$.runSequence(
		'clean:build',
		'build',
		'production',
		'connect',
	callback);
});



