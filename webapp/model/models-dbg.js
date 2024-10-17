sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"transener/sistemadeturnos/services/LicenseService",
	"transener/sistemadeturnos/utils/AppManagementHelper",
	"transener/sistemadeturnos/utils/FioriHelper"
], function (JSONModel, Device, LicenseService, AppManagementHelper, FioriHelper) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		// createLicensesModel: function () {
		// 	// LicenseService.GET();
		// },

		createLicenseJsonModel: function () {
			var sPath = FioriHelper.getAppPath();
			var oLicenseJsonModel = AppManagementHelper.getModel("LicenseJsonModel");
			oLicenseJsonModel.loadData(sPath + "model/LicenseJsonModel.json", "", false);
			return oLicenseJsonModel;
		},

		//tipos de filtro
		//duales, para permutaciones duales ( (F1 eq V1) and (F2 eq V2) )
		//multiples, para permutaciones multiples (F1 eq V1 or F2 eq V2 or F3 eq V3)

		createFiltersModel: function () {
			var sPath = FioriHelper.getAppPath();
			var oFilterJsonModel = AppManagementHelper.getModel("FiltersJsonModel");
			var LocalFilterJsonModel = AppManagementHelper.getModel("LocalFilterJsonModel").setData({});
			oFilterJsonModel.loadData(sPath + "model/FiltersJsonModel.json", "", false);
			return oFilterJsonModel , LocalFilterJsonModel;
		}

	};
});