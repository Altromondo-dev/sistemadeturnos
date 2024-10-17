sap.ui.define([
	//helpers
	"transener/sistemadeturnos/utils/FormatHelper",
	"transener/sistemadeturnos/services/oDataService",
	"transener/sistemadeturnos/utils/AppManagementHelper"
], function (FormatHelper, oDataService, AppManagementHelper) {
	"use strict";

	return {
		_entitySet: "/CheckAlternativeLabelSet",
		//
		getPromise: function () {
			let entity = this._entitySet;

			return new Promise((resolve, reject) => {
				oDataService.getModel("TransenerOperaciones").read(entity, {
					success: resolve,
					error: reject
				})
			})
		},

	};
});