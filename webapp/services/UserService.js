sap.ui.define([
	"transener/sistemadeturnos/utils/AppManagementHelper",
	"transener/sistemadeturnos/utils/FioriHelper"
], function (AppManagementHelper, FioriHelper) {
	"use strict";
	return {
		loadModel: function (callback) {
			var UserDataService = this;
			this.callback = callback;

			const url = sap.ui.getCore().getModel("appCurrentInfo").appUrl + "/user-api/currentUser";

			var oModel = new sap.ui.model.json.JSONModel();
			var mock = {
				firstname: "Dummy",
				lastname: "User",
				email: "dummy.user@com",
				name: "dummy.user@com",
				displayName: "Dummy User (dummy.user@com)",
				roles: ["Mantenimiento_GerRegional",
					"Examinadores_PT15",
					"Selector_evaluadores_PT15",
					"seguridadH_PT15",
					"Rep_Direccion_PT15",
					"MedicinaLaboral_PT15",
					"Gestion_Calidad_PT152",
					"Direccion_TecnicaPT15",
					"Auditor_Externo",
					"Gestion_habilitaciones",
					"Solicitante_PT15",
					"Mantenimiento_Secretaria",
					"Director_Tecnico",
					"Ger_Operaciones",
					"Aprobacion_Habilitaciones"
				]


			};
			
			// PARA PASAR ROLES CON API USER// DESCOMENTAR PARA DEPLOY
			// 			oModel.loadData(url);
			// 			var that = this;  
			//             oModel.dataLoaded()
			//                 .then(() => {
			//                     //check if data has been loaded
			//                     //for local testing, set mock data
			//                     if (oModel.getData().email) {

			// 						var cUrl = sap.ui.getCore().getModel("appCurrentInfo").appUrl + '/IAS/scim/Users?filter=emails.value eq "' + oModel.getData().email + '"' 

			// 						//Llamar a API del IAS
			// 						$.ajax({

			// 							type: "GET",
			// 							contentType: "application/scim+json",
			// 							url: cUrl,
			// 							xhrFields: { withCredentials: false },
			// 							dataType: "json",
			// 							async: false,

			// 							success:  (data, textStatus, jqXHR) => {

			// 								//window.alert("success");
			// 								console.log("It works");
			// 								var oModelUser = new sap.ui.model.json.JSONModel();
			// 								oModelUser.setData(data.Resources);

			// 								// debugger;
			// 								var  aDatosUsuario = that.armarDatos(data.Resources);
			// 								this.onReadUserApiSuccess(aDatosUsuario)
			// 								oModel.setData(aDatosUsuario);
			// //								oView.getView().setModel(oModel, "users");

			// 							},
			// 							error:  (data, xhr, textStatus) =>{ 
			// 								this.onReadUserApiError()
			// 								console.log(data);
			// 								console.log(xhr);
			// 								console.log(textStatus);
			// 								// debugger;
			// 								window.alert("error"); 
			// 							}
			// 						});


			// 						// Fin llamar a API del IAS
			// 					}
			// 					else{	
			//                         oModel.setData(mock);
			//                     }


			//                     // this.setModel(oModel, "userInfo");

			//                 })
			//                 .catch(() => {
			//                     oModel.setData(mock);      

			//                 });

			// PARA PASAR ROLES SIN API USER// COMENTAR PARA DEPLOY
			AppManagementHelper.getModel("UserJsonModel").setData(mock);

		},
		armarDatos: function (datos) {

			var aGroupsTemporal = datos[0].groups;

			var aGroups = aGroupsTemporal.map(function (fila) {
				return fila.display;
			});

			var aUserData = {
				firstname: datos[0].displayName,
				lastname: datos[0].displayName,
				email: datos[0].emails[0].value,
				name: datos[0].emails[0].value,
				displayName: datos[0].displayName,
				groups: aGroups


			};

			return aUserData;

		},
		getRoles: function (groupData) {
			var aData = [];
			if (groupData.constructor === Array) {
				aData = aData.concat(groupData);
			} else {
				if (groupData !== "") {
					aData.push(groupData);
				}
			}
			return aData;
		},

		onReadUserApiSuccess: function (data, textStatus, jqXHR) {

			AppManagementHelper.getModel("UserJsonModel").setData({
				nombre: data.firstName,
				apellido: data.lastName,
				login_name: data.login_name,
				email: data.email,
				// roles: ["Supervisor_MantenimienTto"],

				// Paso 1 para creacion de licencias.
				// roles: ["Solicitante_Lic", "Solicitante_Lic_S"],
				// (Nuevo rol Solicitante_Lic_TBA Issue #518).
				// roles: ["Solicitante_Lic_TBA"],

				// Paso 2 Coordinador.
				// roles: ["Coordinador_Mantenimiento"],
				// roles: ["Coordinador_Mantenimiento"],

				// Paso 3 Tramitado -> tramita u observa.
				//roles: ["Tramitador"],

				// Paso 4 Entraga, devolución y cancelación definitiva.
				roles: ["Jefe_Turno_COT"],
				// roles: ["Programacion_COTDT"],
				// roles: ["Operador_COT"],

				// IMPORTANTE: deployear siempre con este descomentado.
				// ##########################################################################
				// ############################## IMPORTANTE ################################
				// ##########################################################################
				//roles: this.getRoles(data.groups)
				// ##########################################################################
				// ##########################################################################
			});
		},

		onReadUserApiError: function (jqXHR, textStatus, error) {
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
		},



	};
});