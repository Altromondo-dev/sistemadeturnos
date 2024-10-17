sap.ui.define([
	//utils
	"transener/sistemadeturnos/utils/FioriComponentHelper"
], function (FioriComponentHelper) {
	"use strict";

	return {
		getTranslation: function (i18nMessage, parameterArray) {
			//gets component
			var component = FioriComponentHelper.getComponent();
			//model
			var i18nModel = component.getModel("i18n").getResourceBundle();
			var translation = i18nModel.getText(i18nMessage, parameterArray);
			if (translation) {
				return translation;
			}
			return i18nMessage;
		}

	};
})