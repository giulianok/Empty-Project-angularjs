
/* Config
--------------------------------------------------- */
var folder = {
	app: 'app/',
	dest: 'public/',
	tmp: '.tmp/',
	bower: 'bower_components/',
	database: './app/database/'
};

var technologies = {
	views: 'jade', // availables: jade
	styles: 'scss', // availables: scss
	javascript: 'js', // availables: js
	javascriptVersion: 'es6' // availables: es5, es6
};

module.exports = {

	// Merging...
	folder: folder,
	technologies: technologies,

	connect: {
		server: {
			base: folder.tmp,
			src: folder.tmp + '**/*',
		},
		prod: {
			base: folder.dest,
			src: folder.dest + '**/*',
		},
		port: 5005,
		open: false,
		notify: true,
		directory: true
	},

	assets: {

		fonts: {
			src: folder.app + 'styles/fonts/*',
			listening: folder.app + 'styles/fonts/*',
			tmp: folder.tmp + 'styles/fonts/',
			dest: folder.dest + 'styles/fonts/'
		},

		images: {
			base: "assets/images/",
			src: folder.app + 'assets/images/**/*.{jpg,jpeg,png,gif,svg}',
			tmp: folder.tmp + 'assets/images/',
			dest: folder.dest + 'assets/images/'
		},

		database: {
			src: folder.app + 'assets/database/*.json',
			folder: folder.app + 'assets/database/',
			dest: folder.tmp + 'assets/database/'
		}

	},

	styles: {
		base: 'styles/',
		src: folder.app + 'styles/*.scss',
		listening: folder.app + 'styles/**/*.scss',
		dest: folder.tmp + 'styles/',
		fonts: folder.app + 'styles/fonts/*',
		fontsDest: folder.tmp + 'styles/fonts/'
	},

	vendor: {
		src: folder.app + 'vendor/**/*',
		dest: folder.tmp + 'vendor/'
	},

	javascript: {
		base: folder.app + 'scripts/',
		src: [
			folder.app + 'scripts/**/*.js',
			folder.app + 'views/**/*.js'
		],
		listening: folder.app + 'scripts/**/*',
		dest: folder.tmp + 'scripts/'
	},

	templates: {
		src: [
			folder.app + 'views/**/*.' + technologies.views,
			folder.app + 'directives/**/*.' + technologies.views
		],
		base: folder.app + 'views/',
		listen: folder.app + 'views/**/*.' + technologies.views,
		dest: folder.tmp
	}

}


