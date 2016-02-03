'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var util = require('./lib/util');
var config = require('./lib/ProductFlavors').generateFlavoredConfig();
var less = require('gulp-less-sourcemap');

gulp.task('build-compass', function() {
	return gulp.src(config.globScss)
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.compass({
		config_file: 'src/styles/.compass',
		css: 'dist/styles',
		image: 'dist/images',
		logging: true,
		sass: 'src/styles'
	}))
	.pipe(plugins.if(config.optimizeStyle, util.buildCss()))
	.pipe(gulp.dest('dist/public/styles'));
});

gulp.task('build-less', function() {
	return gulp.src('src/public/styles/less/*.less')
	.pipe(plugins.plumber(util.logError))
	.pipe(less({
		sourceMap: {
			sourceMapRootpath: 'src/public/styles/less'
		}
	}))
	.pipe(plugins.if(config.optimizeStyle, util.buildCss()))
	.pipe(gulp.dest('dist/public/styles'));
});

gulp.task('build-copy', function() {
	return gulp.src([
		'src/**',
		'!src/public/styles/less',
		'!src/public/styles/less/**/*'
	]).pipe(gulp.dest('dist'));
});

gulp.task('build-styles', function() {
	return gulp.src(config.globStyle)
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.if(config.optimizeStyle, util.buildCss()))
	.pipe(gulp.dest('dist/public'));
});

gulp.task('build-html', function() {
	return gulp.src(config.globHtml)
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.if(config.optimizeHtmlResource, util.buildHtmlResources()))
	.pipe(plugins.if(config.optimizeHtml, util.buildHtml()))
	.pipe(gulp.dest('dist'));
});

gulp.task('build-icons', function() {
	return gulp.src(config.globIcon)
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.iconfontCss({
		fontName: 'icons',
		fontPath: '../images/icons/',
		path: 'src/public/styles/.icons',
		targetPath: '../../styles/icons.css'
	}))
	.pipe(plugins.iconfont({
		fontName: 'icons',
		normalize: true
	}))
	.pipe(plugins.if(config.optimizeStyle, util.buildCss()))
	.pipe(gulp.dest('dist/public/images/icons'));
});

gulp.task('build-images', function() {
	return gulp.src(config.globImage)
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.if(config.optimizeImage, plugins.imagemin({
			interlaced: true,
			progressive: true
	})))
	.pipe(gulp.dest('dist/public'));
});

gulp.task('build-scripts', function() {
	return gulp.src([
		config.globScript,
		'!src/public/scripts/**/*.es.js'
	])
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.if(config.optimizeScript, util.buildJavaScript()))
	.pipe(gulp.dest('dist/public'));
});

var babelGlobals = require('gulp-babel-globals');

gulp.task('build-babel', function() {
	return gulp.src('src/public/scripts/**/*.es.js')
	.pipe(babelGlobals({
		babel: {
			presets: ['es2015']
		},
		globalName: 'site',
		bundleFileName: 'es6.js'
	}))
	.pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('build-templates', function() {
	return gulp.src(config.globTemplate)
	.pipe(plugins.plumber(util.logError))
	.pipe(plugins.soynode({
		loadCompiledTemplates: true,
		renderSoyWeb: config.outputTemplateAsHtml,
		renderSoyWebContext: {
			config: config
		}
	}))
	.pipe(plugins.if(config.optimizeHtmlResource, util.buildHtmlResources()))
	.pipe(plugins.if(config.optimizeHtml, util.buildHtml()))
	.pipe(gulp.dest('dist'));
});

gulp.task('copy-bower', function () {
	return gulp.src('bower_components/**')
	.pipe(gulp.dest('dist/public/bower'));
});

gulp.task('build', ['clean'], function(cb) {
	runSequence('build-copy', 'build-images', 'build-icons', 'build-scripts', 'build-babel', 'build-styles', 'build-compass', 'build-less', 'build-html', 'build-templates', 'copy-bower', cb);
});
