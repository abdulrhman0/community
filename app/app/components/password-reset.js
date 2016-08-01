// Copyright 2016 Documize Inc. <legal@documize.com>. All rights reserved.
//
// This software (Documize Community Edition) is licensed under
// GNU AGPL v3 http://www.gnu.org/licenses/agpl-3.0.en.html
//
// You can operate outside the AGPL restrictions by purchasing
// Documize Enterprise Edition and obtaining a commercial license
// by contacting <sales@documize.com>.
//
// https://documize.com

import Ember from 'ember';

const {
	isEmpty,
	isEqual,
	computed,
	set

} = Ember;

export default Ember.Component.extend({
	password: "",
	passwordConfirm: "",
	mustMatch: false,
	passwordEmpty: computed.empty('password'),
	confirmEmpty: computed.empty('passwordConfirm'),
	hasPasswordError: computed.and('passwordEmpty', 'passwordIsEmpty'),
	hasConfirmError: computed.and('confirmEmpty', 'passwordConfirmIsEmpty'),

	actions: {
		reset() {
			let password = this.get('password');
			let passwordConfirm = this.get('passwordConfirm');

			if (isEmpty(password)) {
				set(this, 'passwordIsEmpty', true);
				return $("#newPassword").focus();
			}

			if (isEmpty(passwordConfirm)) {
				set(this, 'passwordConfirmIsEmpty', true);
				return $("#passwordConfirm").focus();
			}

			if (!isEqual(password, passwordConfirm)) {
				set(this, 'hasPasswordError', true);
				set(this, 'hasConfirmError', true);
				set(this, 'mustMatch', true);
				return;
			}

			this.get('reset')(password).then(() => {
				set(this, 'passwordIsEmpty', false);
				set(this, 'passwordConfirmIsEmpty', false);
			});
		}
	}
});
