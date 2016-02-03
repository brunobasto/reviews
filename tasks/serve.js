'use strict';

var App = require('./lib/App');
var bodyParser = require('body-parser')
var busboy = require('connect-busboy');
var compress = require('compression');
var Docker = require('dockerode');
var express = require('express');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var madvoc = require('madvoc-route');
var path = require('path');
var SoyTemplateEngine = require('./lib/SoyTemplateEngine');

gulp.task('serve-http', ['build'], function() {
	var app = new App(),
		engine = app.getEngine();

	engine.use(compress());
	engine.use(bodyParser.json());
	engine.use(bodyParser.urlencoded({extended: true}));
	engine.use(busboy());

	app.setTemplateEngine(new SoyTemplateEngine());

	gutil.log('Routing', gutil.colors.cyan('routes.txt'));
	app.setRouteConfigurator(new madvoc.RouteConfigurator('dist/routes.txt'));

	gutil.log('Serving static', gutil.colors.cyan('templates/'));
	var templatesPath = path.normalize(path.join(process.cwd(), 'dist/templates'));
	app.serveStatic('/templates', templatesPath);

	gutil.log('Serving static', gutil.colors.cyan('public/'));
	var publicPath = path.normalize(path.join(process.cwd(), 'dist/public'));
	app.serveStatic('/static', publicPath);

	gutil.log('Compiling templates in', gutil.colors.cyan('dist/'));
	app.getTemplateEngine().precompileTemplates('dist', {}, function() {
		app.start();
		gutil.log('Serving', gutil.colors.cyan('http://localhost:' + app.getServerPort()));
	});
});

gulp.task('serve', ['serve-http']);