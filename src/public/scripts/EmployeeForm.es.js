'use strict';

import core from 'bower_components/metal/src/core';
import dom from 'bower_components/metal/src/dom/dom';
import Component from 'bower_components/metal/src/component/Component';
import 'bower_components/metal/src/dom/events';

/**
 * Employee Form Component.
 */
class EmployeeForm extends Component {
	constructor(opt_config) {
		super(opt_config);

		let self = this;

		this.dropZone = this._createDropZone();

		this.formNavigator = new site.FormNavigator({
			node: this.form
		});
	}

	attached() {
		this.formNavigator.render();

		this.dropZone.on('success', this._onFileSuccess.bind(this));
		this.dropZone.on('removedfile', this._onRemovedFile.bind(this));
	}

	detached() {
		this.dropZone.destroy();
		this.formNavigator.detach();
	}

	_createDropZone() {
		Dropzone.autoDiscover = false;

		return new Dropzone(
			this.uploadContainer,
			{
				addRemoveLinks: true,
				clickable: '.dropzone .add, .dropzone',
				url: '/upload/image'
			}
		);
	}

	_onFileSuccess(file, payload) {
		var input = '<input type="hidden" name="images" value="' + payload.uuid + '" />';

		$(this.form).append(input);

		file.uuid = payload.uuid;
	}

	_onRemovedFile(file) {
		$('[value=' + file.uuid + ']').remove();
	}
}

/**
 * Default carousel elementClasses.
 * @default carousel
 * @type {string}
 * @static
 */
EmployeeForm.ELEMENT_CLASSES = 'sell-form';

/**
 * EmployeeForm attributes definition.
 * @type {Object}
 * @static
 */
EmployeeForm.ATTRS = {
	form: {
		setter: dom.toElement
	},

	uploadContainer: {
		setter: dom.toElement
	}
};

export default EmployeeForm;