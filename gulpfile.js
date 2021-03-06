var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var bourbon     = require('node-bourbon');
var reload      = browserSync.reload;

var src = {
	scss: ['**/[^_]*.scss','!Skeletor.sass/**/skeletor.sass.*.scss','!node_modules/**/*.scss'],
	css:  '.',
	html: 'Skeletor.*/**/*.{html,js}'
};

var config = {
	sass: {
		outputStyle: 'expanded',
		importer: require('node-sass-globbing'),
		includePaths:[].concat(
				bourbon.includePaths,
				'./node_modules/susy/sass',
				'./node_modules/breakpoint-sass/stylesheets')
	}
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: ".",
		directory: true
	});

	gulp.watch('Skeletor.*/**/*.scss', ['sass']);
	gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
	return gulp.src(src.scss)
		.pipe(sass(config.sass))
		.pipe(gulp.dest(src.css))
		.pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);