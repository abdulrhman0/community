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
import constants from '../../../utils/constants';

export default Ember.Route.extend({
    appMeta: Ember.inject.service(),

	beforeModel() {
		if (this.get('appMeta.authProvider') === constants.AuthProvider.Keycloak) {
			this.transitionTo('auth.login');
		}
	},

	setupController(controller, model) {
		controller.set('model', model);
		controller.set('sayThanks', false);
	},

	activate() {
		$('body').addClass('background-color-off-white');
	},

	deactivate() {
		$('body').removeClass('background-color-off-white');
	}	
});