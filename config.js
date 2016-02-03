'use strict';

module.exports = {
	/**
	 * The defaultConfig provides the base configuration for all flavors and
	 * each flavor can override any value.
	 */
	defaultConfig: {
		/**
		 * Autoprefixer parses CSS files and adds vendor prefixes to CSS rules.
		 */
		autoprefixer: [
			'android >= 4.4',
			'bb >= 10',
			'chrome >= 34',
			'ff >= 30',
			'ie >= 8',
			'ie_mob >= 10',
			'ios >= 7',
			'opera >= 23',
			'safari >= 7'
		],

		/**
		 * Build pattern matching for action files.
		 */
		globActions: 'src/actions/*.js',

		/**
		 * Build pattern matching for HTML files.
		 */
		globHtml: 'src/**/*.html',

		/**
		 * Build pattern matching for icon files.
		 */
		globIcon: 'src/public/images/icons/**/*.svg',

		/**
		 * Build pattern matching for image files.
		 */
		globImage: 'src/public/**/*.{gif,jpeg,jpg,png,svg}',

		/**
		 * Build pattern matching for LESS files.
		 */
		globLess: 'src/public/styles/less/**/*.less',

		/**
		 * Build pattern matching for markdown files.
		 */
		globMarkdown: 'src/**/*.md',

		/**
		 * Build pattern matching for JavaScript files.
		 */
		globScript: 'src/public/**/*.js',

		/**
		 * Build pattern matching for SASS files.
		 */
		globScss: 'src/public/styles/**/*.scss',

		/**
		 * Build pattern matching for CSS files.
		 */
		globStyle: 'src/public/**/*.css',

		/**
		 * Build pattern matching for Soy template files.
		 */
		globTemplate: 'src/**/*.soy',

		/**
		 * Reduces payload size of HTML document.
		 */
		optimizeHtml: true,

		/**
		 * Parses build blocks in HTML files to replace references.
		 */
		optimizeHtmlResource: true,

		/**
		 * Minifies images.
		 */
		optimizeImage: false,

		/**
		 * Minifies JavaScript files.
		 */
		optimizeScript: true,

		/**
		 * Minifies CSS files.
		 */
		optimizeStyle: false,

		/**
		 * Outputs rendered template files.
		 */
		outputTemplateAsHtml: true
	},

	/***
	 * A product flavor defines a customized version of the application build by
	 * the project. A single project can have different flavors which change the
	 * generated application.
	 *
	 * Example:
	 * gulp build --flavor production
	 * gulp watch --flavor production
	 */
	productFlavors: {
		production: {
			optimizeHtml: true,
			optimizeHtmlResource: true,
			optimizeImage: true,
			optimizeScript: false,
			optimizeStyle: true
		}
	}
};
