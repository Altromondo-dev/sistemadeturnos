sap.ui.define([
	//helpers
	"transener/sistemadeturnos/utils/FormatHelper",
	"transener/sistemadeturnos/services/oDataService",
	"transener/sistemadeturnos/utils/AppManagementHelper"
], function (FormatHelper, oDataService, AppManagementHelper) {
	"use strict";

	return {
		_entitySet: "/EstacionalListSet",
		
		getPromise: function () {
			return new Promise((resolve, reject) => {
				oDataService.getModel("TransenerOperaciones").read(this._entitySet, {
					success: function (data) {
						resolve(data);

						var model = AppManagementHelper.getModel("TransenerIntervention");
						model.setData({
							EstacionList: data.results
						});
					},
					error: function (error) {
						reject(error);
					}
				});
			});
		}

	};
});