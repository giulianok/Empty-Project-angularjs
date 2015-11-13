var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;
$.path 			= require('path');
$.requireDir    = require('require-dir');
var fs 			= require('fs');

    
gulp.task('templates', function() {

	var filesToInject = {};
	var files = fs.readdirSync(config.assets.database.folder);

	for( var i in files ){
		var file = files[i];
		if( file && file !== undefined && file.indexOf('.json') > -1 ){
			var name = file.replace('.json', '');
			filesToInject[name] = require('../../' + config.assets.database.folder + file);
		}
	}

	return gulp.src(config.templates.src)
		//.pipe(watch(config.templates.src))
		.pipe($.plumber())
		.pipe($.data(function(file) {
			return filesToInject;
		}))
	    .pipe($.jade({
	    	//pretty: (mode=='dev') ? true : false
			pretty: true
	    }))
	    .pipe($.flatten()) // To move the files without folders
	    .pipe(gulp.dest(config.templates.dest));
	
});

// Generating dynamic files
// gulp.task('templates:dynamic', function() {

// 	var generating = function (file, newFile, obj) {
// 		var src = config.templates.dynamic.src_empty + file + '.' + config.technologies.views;
// 		var dest = config.templates.dynamic.dest + file;
// 		return gulp.src(src)
// 			.pipe($.plumber())
// 			.pipe($.data(function(file) {
// 				return obj;
// 		    }))
// 		    .pipe($.jade({
// 		    	//pretty: (mode=='dev') ? true : false
// 		    	pretty: true
// 		    }))
// 		    .pipe($.rename(newFile+'.html'))
// 		    .pipe(gulp.dest(dest));
// 	};

// 	return gulp.src(config.templates.dynamic.src)
// 		.pipe($.data(function(file) {
// 			var file = $.path.basename(file.path).replace('.'+config.technologies.views, '');
// 			var jsonData;
// 			var single = config.folder.database+file+'.json';
// 			var plural = config.folder.database+file+'s.json';

// 			if( fs.existsSync(single) ) { 
// 				jsonData = require('../../'+single);
// 			}else if( fs.existsSync(plural) ) { 
// 				jsonData = require('../../'+plural);
// 			}else{
// 				return;
// 			}

// 			if( jsonData.length ){
// 				for(var i = 0; i < jsonData.length; i++){
// 					var data = jsonData[i];
// 					//var fileName = data.name.replace(/([^a-z0-9]+)/gi, ' ');
// 					//fileName = fileName.trim();
// 					//fileName = fileName.split(' ').join('-');
// 					//fileName = fileName.toLowerCase();
// 					generating(file, data.slug, data);
// 				}
// 			}
// 	    }))
// 	    .pipe(gulp.dest(config.folder.tmp));
// });

