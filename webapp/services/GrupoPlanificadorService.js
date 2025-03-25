sap.ui.define([
	//helpers
	"transener/sistemadeturnos/utils/FioriHelper",
	"transener/sistemadeturnos/utils/FioriComponentHelper",
	"transener/sistemadeturnos/utils/FormatHelper",
	"transener/sistemadeturnos/utils/i18nTranslationHelper",
	"transener/sistemadeturnos/utils/MessageBoxHelper",
	"transener/sistemadeturnos/services/oDataService"
], function (FioriHelper, FioriComponentHelper, FormatHelper, i18nTranslationHelper, MessageBoxHelper, oDataService) {
	"use strict";

	return {
		_entitySet: "/LTGrupoPlanificacionSet",

		_getEstacion: function () {
			//gets component
			var oComponent = FioriComponentHelper.getComponent();
			var oApp = oComponent.getAggregation("rootControl");
			//gets model
			var jsonModel = oApp.getModel("GrupoPlanificador");
			//checks if the model exists
			if (!jsonModel) {
				jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setSizeLimit(99999);
				oApp.setModel(jsonModel, "GrupoPlanificador");
				//initilializing
				jsonModel.setData({
					Busy: false,
					Equipo: []
				});
			}
			return jsonModel;
		},

		_readODataOnSuccess: function (data) {
			//toma modelo
			var jsonModel = this._getEstacion();
			//setea busy
			jsonModel.setProperty("/Busy", false);
			//setea datos
			jsonModel.setProperty("/LTGrupoPlanificacionSet", data.results);
			//updates model
			jsonModel.updateBindings(true);
			jsonModel.refresh();
		},

		_readODataOnError: function (error) {
			//gets model
			var jsonModel = this._getEstacion();
			//sets busy
			jsonModel.setProperty("/Busy", false);
			//verifies if session is still active
			var sessionTimeoutResponseCode = 503;
			if (error.response.statusCode === sessionTimeoutResponseCode) {
				//session timeout
				FioriHelper.showSessionTimeoutMessageBox();
				return;
			}

			//gets error
			var errorText = error.response.body;
			//parses error
			var contentType = error.response.headers["Content-Type"];
			if (contentType.indexOf("text/html") >= 0) {
				//HTML
				errorText = $(error.response.body).text();
			} else if (contentType.indexOf("application/json") >= 0) {
				//JSON
				try {
					var oError = JSON.parse(errorText);
					errorText = oError.error.message.value;
				} catch (ex) {
					//error in parsing
					errorText = error.response.body;
				}
			}

			//error
			errorText = i18nTranslationHelper.getTranslation("ErrorLoadingInstruccionesOperativas") + ". \n\n" + errorText;
			MessageBoxHelper.showAlert("Error", errorText);
		},

		loadModel: function (region) {
			//busy
			var filter = [new sap.ui.model.Filter({
				path: "Iwerk",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: region
			})];
			var model = this._getEstacion();
			model.setProperty("/Busy", true);
			model.setProperty("/LTGrupoPlanificacionSet", []);
			//gets master Firmantes
			var odataModel = oDataService.getModel("TransenerOperaciones");
			odataModel.setUseBatch(false);
			odataModel.read(this._entitySet, {
				filters: filter,
				success: jQuery.proxy(this._readODataOnSuccess, this),
				error: jQuery.proxy(this._readODataOnError, this)
			});
		}

	};
});