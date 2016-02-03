'use strict';

import core from 'bower_components/metal/src/core';
import dom from 'bower_components/metal/src/dom/dom';
import Component from 'bower_components/metal/src/component/Component';
import EventHandler from 'bower_components/metal/src/events/EventHandler';
import 'bower_components/metal/src/dom/events';

/**
 * Form Navigator component.
 */
class FormNavigator extends Component {
	constructor(opt_config) {
		super(opt_config);

		this.pageNodes = this.node.querySelectorAll('.pages > .page');
		this.wizardNodes = this.node.querySelectorAll('.multi-step-progress-bar li');

		this._eventHandler = new EventHandler();

		this.prevButton = this.node.querySelector('.prev');
		this.nextButton = this.node.querySelector('.next');
		this.submitButton = this.node.querySelector('.submit');
	}

	attached() {
		this.attachEvents();
	}

	detached() {
		this._eventHandler.removeAllListeners();
	}

	/**
	 * Attaches DOM events.
	 */
	attachEvents() {
		let node = this.node;

		this._eventHandler.add(
			dom.delegate(node, 'click', '.next', this.next.bind(this)),
			dom.delegate(node, 'click', '.prev', this.prev.bind(this))
		);
	}

	/**
	 * Returns currently active page from DOM
	 */
	getActivePage() {
		let index,
			items = this.wizardNodes;

		for (index = 0; index < items.length; index++) {
			if (dom.hasClass(items[index], 'active')) {
				break;
			}
		}

		return index + 1;
	}

	/**
	 * Navigates to the desired page.
	 */
	navigate(index) {
		this.activePage = index;
	}

	/**
	 * Shows next page.
	 */
	next() {
		this.activePage = Math.min(this.activePage + 1, this.wizardNodes.length);
	}

	/**
	 * Shows previous page.
	 */
	prev() {
		this.activePage = Math.max(1, this.activePage - 1);
	}

	/**
	 * Sets default value for active page.
	 */
	setActivePage(activePage) {
		if (!core.isNumber(activePage)) {
			activePage = this.getActivePage();
		}

		return activePage;
	}

	/**
	 * Syncs currently active page visibility
	 */
	syncActivePage(activePage) {
		let index;

		for (index = 0; index < this.wizardNodes.length; index++) {
			dom.removeClasses(this.wizardNodes[index], 'active');

			if (activePage > index + 1) {
				dom.addClasses(this.wizardNodes[index], 'complete');
			}
			else {
				dom.removeClasses(this.wizardNodes[index], 'complete');
			}
		}

		dom.addClasses(this.wizardNodes[activePage - 1], 'active');

		for (index = 0; index < this.pageNodes.length; index++) {
			dom.removeClasses(this.pageNodes[index], 'active');
		}

		dom.addClasses(this.pageNodes[activePage - 1], 'active');

		console.log('activePage', activePage);

		if (activePage === this.wizardNodes.length) {
			dom.addClasses(this.nextButton, 'hide');
			dom.removeClasses(this.prevButton, 'hide');
			dom.removeClasses(this.submitButton, 'hide');
		}
		else if (activePage === 1) {
			dom.addClasses(this.prevButton, 'hide');
			dom.addClasses(this.submitButton, 'hide');
			dom.removeClasses(this.nextButton, 'hide');
		}
		else {
			dom.addClasses(this.submitButton, 'hide');
			dom.removeClasses(this.nextButton, 'hide');
			dom.removeClasses(this.prevButton, 'hide');
		}
	}
}

/**
 * Default carousel elementClasses.
 * @default carousel
 * @type {string}
 * @static
 */
FormNavigator.ELEMENT_CLASSES = 'form-navigator';

/**
 * FormNavigator attributes definition.
 * @type {Object}
 * @static
 */
FormNavigator.ATTRS = {
	/**
	 * The currently active page.
	 * @type {String}
	 */
	activePage: {
		validator: core.isNumber,
		setter: 'setActivePage'
	},

	/**
	 * The form node.
	 * @type {String}
	 */
	node: {
		setter: dom.toElement
	}
};

export default FormNavigator;