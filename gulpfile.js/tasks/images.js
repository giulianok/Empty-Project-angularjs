var
	gulp        = require('gulp'),
  	$		    = require('gulp-load-plugins')({ camelize: true }),
  	config      = require('../gulpconfig')
;

    
gulp.task('assets:images', function () {
	return gulp.src(config.assets.images.src)
		.pipe(gulp.dest(config.assets.images.tmp));
});

/*gulp.task('assets:images:compress', function () {
	console.log(config.assets.images.dest);
    return gulp.src(config.assets.images.src)
    	.pipe($.plumber())
    	.pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [
            	$.pngquant({quality: '65-80', speed: 4}),
            	$.optipng({ optimizationLevel: 3 }),
            	$.jpegoptim({max: 70}),
            	$.gifsicle({ interlaced: true }),
            	$.svgo()
            ]
        }))
		//.pipe( $.pngquant({quality: '65-80', speed: 4}) )
		//.pipe( $.optipng({ optimizationLevel: 3 }) )
		//.pipe( $.jpegoptim({max: 70}) )
		//.pipe( $.gifsicle({ interlaced: true }) )
		//.pipe( $.svgo() )
        .pipe(gulp.dest(config.assets.images.dest));
});*/

//gulp.task('assets:images:retina');

