'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var spawn = require('child_process').spawn;

gulp.task('install-bower', function (cb) {
	spawn('bower', ['install'], {
		stdio: 'inherit'
	}).on('exit', cb);
});

gulp.task('copy-bower', function () {
	return gulp.src('bower_components/**')
	.pipe(gulp.dest('dist/public/bower'));
});

gulp.task('gh-pages', function () {
	return gulp.src("dist/public/**")
	.pipe(plugins.ghPages());
});

gulp.task('deploy', ['clean'], function(cb) {
	runSequence('build', 'install-bower', 'copy-bower', 'gh-pages', cb);
});
