sap.ui.define([
	//ui
	"sap/ui/core/mvc/Controller",
	//utils
	"Transener/sistemasdeturnos/utils/NavigationHelper",
	//services
	"Transener/sistemasdeturnos/utils/AppManagementHelper"
], function(Controller, NavigationHelper, AppManagementHelper) {
	"use strict";
	return Controller.extend("Transener.sistemasdeturnos.fragments.advancedFilters", {

		handleBlock: function(oEvent) {
			(oEvent.getParameter("selected")) ? AppManagementHelper.getModel("FiltersJsonModel").setProperty("/Bloqueo/value", "X"):
				AppManagementHelper.getModel("FiltersJsonModel").setProperty("/Bloqueo/value", "");
		},

		handleShoot: function(oEvent) {
			(oEvent.getParameter("selected")) ? AppManagementHelper.getModel("FiltersJsonModel").setProperty("/Rdisparo/value", "X"):
				AppManagementHelper.getModel("FiltersJsonModel").setProperty("/Rdisparo/value", "");
		},

		handleARO: function(oEvent) {
			(oEvent.getParameter("selected")) ? AppManagementHelper.getModel("FiltersJsonModel").setProperty("/Aro/value", "X"):
				AppManagementHelper.getModel("FiltersJsonModel").setProperty("/Aro/value", "N");
		}

	});
});