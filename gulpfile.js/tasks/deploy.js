var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({lazy:false}),
  	config      = require('../gulpconfig')
;

/* Deploy Operation
--------------------------------------------------- */
gulp.task('deploy:development', function() {
	//config.folder.dest+'.htaccess'
	return gulp.src([config.folder.dest+'**/*', config.folder.dest+'.htaccess'])
		.pipe($.sftp({
			host: 'sauzatequila.dev.miamistudio.org', 
			auth: 'development',
			remotePath: '/public_html/'
		}));
});

gulp.task('deploy:uat', function() {
	return gulp.src([config.folder.dest+'**/*', config.folder.dest+'.htaccess'])
		.pipe($.sftp({
			host: 'sauzatequila.uat.miamistudio.org', 
			auth: 'uat',
			remotePath: '/public_html/'
		}));
});

gulp.task('deploy:production', ['deploy:production2'], function() {
	return gulp.src([config.folder.dest+'**/*', config.folder.dest+'.htaccess'])
		.pipe($.sftp({
			host: 'azjbbteqpw1.cloudapp.net', 
			auth: 'production',
			remotePath: '/public_html/'
		}));
});

gulp.task('deploy:production2', function() {
	return gulp.src([config.folder.dest+'**/*', config.folder.dest+'.htaccess'])
		.pipe($.sftp({
			host: 'azjbbteqpw2.cloudapp.net', 
			auth: 'production',
			remotePath: '/public_html/'
		}));
});
