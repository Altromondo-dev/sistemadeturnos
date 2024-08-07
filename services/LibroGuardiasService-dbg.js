sap.ui.define([
	//helpers
	"transener/sistemadeturnos/utils/FormatHelper",
	"transener/sistemadeturnos/services/oDataService",
	"transener/sistemadeturnos/utils/AppManagementHelper"
], function (FormatHelper, oDataService, AppManagementHelper) {
	"use strict";

	return {
		_entitySetLibroGuardias: "/GuardiasListSet",

		POSTLibroGuardia: function (oLibroGuardia) {
			return new Promise((resolve, reject) => {
				oDataService.getModel("LibroGuardias").create(this._entitySetLibroGuardias, oLibroGuardia, {
					success: resolve,
					error: reject
				});
			});
		}
	};
});