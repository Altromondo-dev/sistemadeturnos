jQuery.sap.require("transener/sistemadeturnos/libs/xlsx");
jQuery.sap.require("transener/sistemadeturnos/libs/jszip");
sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment", "transener/sistemadeturnos/utils/NavigationHelper",
	"transener/sistemadeturnos/utils/FormatHelper", "transener/sistemadeturnos/utils/FioriComponentHelper",
	"transener/sistemadeturnos/utils/MailHelper", "transener/sistemadeturnos/utils/ValidateHelper",
	"transener/sistemadeturnos/utils/MessageBoxHelper", "transener/sistemadeturnos/utils/i18nTranslationHelper",
	"transener/sistemadeturnos/utils/AppManagementHelper", "transener/sistemadeturnos/utils/DateHelper",
	"transener/sistemadeturnos/utils/ExportLicenseHelper", "transener/sistemadeturnos/utils/formatter",
	"transener/sistemadeturnos/model/HardCodeModel", "transener/sistemadeturnos/model/models",
	"transener/sistemadeturnos/services/LicenseService", "transener/sistemadeturnos/services/RegionesService",
	"transener/sistemadeturnos/services/PersonalHabilitadoService", "transener/sistemadeturnos/services/WorkPlaceService",
	"transener/sistemadeturnos/services/oDataService", "transener/sistemadeturnos/services/EmpresaTramitacionService",
	"transener/sistemadeturnos/services/TipoEquipoService", "transener/sistemadeturnos/services/EquiposService",
	"transener/sistemadeturnos/services/OrdenesService", "transener/sistemadeturnos/services/EstacionesService",
	"transener/sistemadeturnos/services/RepositionTimeService", "transener/sistemadeturnos/services/InterventionTypesService",
	"transener/sistemadeturnos/services/TipoOfEstacionalListService", "transener/sistemadeturnos/services/StatusService",
	"transener/sistemadeturnos/services/GrupoPlanificadorService", "transener/sistemadeturnos/services/ReportesService",
	"transener/sistemadeturnos/services/UserService", "transener/sistemadeturnos/view/Main/ExcelDownloadHelper",
	"transener/sistemadeturnos/utils/BusyDialogHelper", "transener/sistemadeturnos/utils/FioriHelper",
	"transener/sistemadeturnos/utils/LicenseHelper", "transener/sistemadeturnos/utils/RolAuthorizationHelper",
	"transener/sistemadeturnos/utils/FormatterHelper", "transener/sistemadeturnos/utils/LegacyValidationHelper",
	"transener/sistemadeturnos/utils/UnifilarHelper", "transener/sistemadeturnos/services/checkAlternativeLabelService"
], function (e, t, a, o, i, s, r, n, l, c, d, u, p, g, m, f, h, v, S, T, M, y, D, b, E, L, C, F, w, x, P, A, R, O, I, J, B, N, q, j, k) {
	"use strict";
	var H = null;
	return e.extend("transener.sistemadeturnos.controller.Main", {
		FormatterHelper: N,
		_url: "",
		validURLToLicense: null,
		_oLicenseTable: "auditTable",
		localFilters: {},
		fastSearch: function (e) {
			var t = e.getParameter("value");
			var a = this.byId("auditTable").getBinding("items");
			a.filter(J.getFastSearchFilters(t, this))
		},
		onInit: function () {
			var e = f.getJobCond();
			A.getUser();
			c.getModel("OrderNumberJsonModel").setData({
				Odering: "down"
			});
			c.getModel("vistaSeleccionada");
			c.getModel("vistaSeleccionada").setProperty("/vista", 0);
			g.getModel();
			c.getModel("LocalFilterJsonModel");
			c.getModel("filtrosAplicadosTextVisibleModel");
			c.getModel("filtrosAplicadosTextVisibleModel").setData({
				Data: false
			});
			c.getModel("EnabledFilterLicstat").setData({
				enabled: true
			});
			c.getModel("ColorModel").setProperty("/Color", "white");
			c.getModel("CheckAdvancedFiltersModel").setData({
				Aro: false,
				Bloqueo: false,
				Rdisparo: false
			});
			this.setApplicationModels()
		},
		setApplicationModels: function () {
			var e = I.getAppPath();
			var t = c.getModel("permisosModel");
			t.loadData(e + "conf/permisos.json", "", false);
			var a = c.getModel("statusModel");
			a.loadData(e + "conf/permisosPorEstado.json", "", false);
			T.getModel("SelectModel");
			c.getModel("RapidSearchJsonModel").setData({
				searchCriteria: ""
			});
			c.getModel("SelectedTipoLicenciaModel").setData({
				SelectedLic: ""
			});
			c.getModel("FilterSelectionJsonModel").setData({
				checkedSol: false,
				checkedLic: true,
				id: "",
				visible: true,
				textFlow: "",
				textFlowSol: "",
				enabledCausa: false,
				finalCancelation: false,
				enabledEspecifyBarra: false,
				visibleFiles: false,
				enabledEquipos: false,
				enabledComboEQUIPO: false,
				weekChanger: true
			});
			this.getView().setModel(m.createFiltersModel(), "FiltersJsonModel");
			c.getModel("TramitacionListJsonModel").setData({
				Tramitaciones: []
			});
			c.getModel("TramitacionMasivaListJsonModel").setData({
				Tramitaciones: []
			});
			c.getModel("TransferListJsonModel").setData({
				Transfers: []
			});
			c.getModel("CoordinationTableJsonModel").setData({
				Coordinations: []
			});
			c.getModel("ObservationTableJsonModel").setData({
				Observations: []
			});
			c.getModel("DeliveryTableJsonModel").setData({
				Deliveries: []
			});
			c.getModel("DevolutionTableJsonModel").setData({
				Devolutions: []
			});
			c.getModel("SuspensionTableJsonModel").setData({
				Suspensions: []
			});
			c.getModel("ReanudationTableJsonModel").setData({
				Reanudations: []
			})
		},
		cleanLicstatFilterProperties: function () {
			var e = $.extend({}, c.getModel("LocalFilterJsonModel").getData());
			var t = e.Solbeg ? e.Solbeg : new Date((new Date).setDate((new Date).getDate() - 7));
			c.getModel("LocalFilterJsonModel").setProperty("/Solbeg", t);
			var a = e.Solend ? e.Solend : new Date((new Date).setDate((new Date).getDate() + 7));
			c.getModel("LocalFilterJsonModel").setProperty("/Solend", a);
			var o = c.getModel("FiltersJsonModel");
			var i = o.getData();
			var s = $.extend({}, true, i);
			var r = I.getAppPath();
			o.loadData(r + "model/FiltersJsonModel.json", "", false);
			o.setProperty("/Licstat", s.Licstat);
			o.setProperty("/Tplnr", s.Tplnr);
			o.setProperty("/Equstat", s.Equstat);
			o.setProperty("/Werks", s.Werks)
		},
		blockFilters: function () {
			var e = c.getModel("FiltersJsonModel").getData().Licstat.value;
			if (e.length > 0) {
				this.cleanLicstatFilterProperties();
				c.getModel("EnabledFilterLicstat").setData({
					enabled: false
				})
			} else {
				c.getModel("EnabledFilterLicstat").setData({
					enabled: true
				})
			}
		},
		cleanLicenceInformation: function () {
			c.getModel("LicenseJsonModel").setProperty("/HorariosPorLicencia_nav", []);
			c.getModel("TransferListJsonModel").setData({
				Transfers: []
			});
			c.getModel("CoordinationTableJsonModel").setData({
				Coordinations: []
			});
			c.getModel("ObservationTableJsonModel").setData({
				Observations: []
			});
			c.getModel("DeliveryTableJsonModel").setData({
				Deliveries: []
			});
			c.getModel("DevolutionTableJsonModel").setData({
				Devolutions: []
			});
			c.getModel("SuspensionTableJsonModel").setData({
				Suspensions: []
			});
			c.getModel("ReanudationTableJsonModel").setData({
				Reanudations: []
			})
		},
		_routePatternMatched: function (e) {
			var t = e.getParameter("arguments").url;
			var a = c.getModel("UserJsonModel").getProperty("/roles");
			console.log(a);
			if (a.indexOf("Visualizador") == -1) {
				if (!this._oAlternativeLabelProm) {
					this._oAlternativeLabelProm = k.getPromise()
				}
				this._oAlternativeLabelProm.then(e => {
					this.getView().setModel(new sap.ui.model.json.JSONModel(e.results[0]), "AlternativeLabel");
					if (e.results[0].Status === "ER") {
						sap.m.MessageBox.error(e.results[0].Mensaje, {
							onClose: () => {
								if (sap.ushell && sap.ushell.Container && sap.ushell.Container.getService) {
									var e = sap.ushell.Container.getService("CrossApplicationNavigation");
									e.toExternal({
										target: {
											semanticObject: "#"
										}
									})
								}
							}
						})
					}
				})
			} else {
				this.cleanLicenceInformation();
				this.validURLToLicense = J.validURLToLicense(t);
				if (this.validURLToLicense) {
					this._url = t
				}
				var o = c.getModel("refreshSearch").getData().data;
				if (o) {
					this.makeFilters(0)
				}
			}
			this._oAlternativeLabelProm.then(e => {
				if (e.results[0].Status === "OK") {
					this.cleanLicenceInformation();
					this.validURLToLicense = J.validURLToLicense(t);
					if (this.validURLToLicense) {
						this._url = t
					}
					var a = c.getModel("refreshSearch").getData().data;
					if (a) {
						this.makeFilters(0)
					}
				}
			})
		},
		formatCurrency: function (e, t) {
			return o.formatCurrency(e, t)
		},
		formatDateTime: function (e, t) {
			if (!(e instanceof Date) || !(t instanceof Date)) return "";
			if (e !== null && t) {
				var a = o.formatDate(e);
				var i = o.getTimeStringWithoutUTC(t.getTime());
				return a + " " + i
			}
		},
		onFilter: function (e) {
			var t = this.getView().byId("auditTable");
			var a = t.getBinding("rows");
			var o = [];
			var i = this.byId("Estaciones").getSelectedKey();
			o.push(new sap.ui.model.Filter("Tplnr", sap.ui.model.FilterOperator.EQ, "CE"));
			var s = new sap.ui.model.Filter({
				filters: o,
				and: false
			});
			a.filter(s)
		},
		onSearch: function () {
			this.closeDialog();
			var e = this.byId("auditTable");
			e.setBusy(true);
			var t = this.getView();
			var a = [];
			var o = this.getView().byId("initDate").getValue();
			var i = this.getView().byId("initDate").getValue();
			console.log(o, i);
			var s = t.getModel("Operaciones");
			if (o) {
				console.log(o);
				a.push(new sap.ui.model.Filter({
					path: "Solend",
					operator: sap.ui.model.FilterOperator.GT,
					value1: o
				}))
			}
			a.push(new sap.ui.model.Filter({
				path: "Empresa",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: 100
			}));
			a.push(new sap.ui.model.Filter({
				path: "Tipo",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: "L"
			}));
			s.setUseBatch(false);
			s.read("/LicenciaTrabajoSet", {
				filters: a,
				success: a => {
					var o = new sap.ui.model.json.JSONModel(a.results);
					this.onCountItems(a);
					t.setModel(o, "LicencesListJsonModel");
					e.setBusy(false)
				},
				error: e => {
					console.log(e)
				}
			})
		},
		formatTime: function (e) {
			if (e) {
				var t = o.getTimeStringWithoutUTC(e.getTime());
				return t
			}
			return ""
		},
		formatTimes: function (e) {
			if (e && e > 0) {
				var t = o.getTimeString(e);
				return t
			}
		},
		formatTimeWithoutUtc: function (e) {
			if (e && e > 0) {
				var t = o.getTimeStringWithoutUTC(e);
				return t
			}
		},
		onDownloadReport: function () {
			return 1
		},
		// 	var pageName = "transener.sistemadeturnos.views.Main.Dialogs.RequestLicense";
		// 	var oLicenseJsonModel = models.createLicenseJsonModel();
		// 	oLicenseJsonModel.setProperty("/Gdate", new Date());
		// 			isLicenseGenerated: false,
		// 		oDialog.setModel(oLicenseJsonModel, "LicenseJsonModel");
		// 			this.requestDialog.setModel(oLicenseJsonModel, "LicenseJsonModel");
		handleComments: function (e) {
			var t = "";
			if (e.R500kv !== "N") {
				var a = " Requiere calle 500 kV abierta: Si, ";
				t = t + a
			}
			if (e.Bloqueo !== "N") {
				var i = " Bloqueo de recierre: Si," + " ";
				t = t + i
			}
			if (e.Barrafs !== "N") {
				var s = " Requiere Barra F/S: Si, Barra Especificada: " + e.Barrafstx + " ";
				t = t + s
			}
			var r = o.formatDate(e.Solend);
			t = t + " Equipo a Intervenir: " + e.Equiinterv + " ";
			t = t + " Trabajo a realizar " + e.Descripcion + " ";
			t = t + " Finaliza:" + r + "LT Nº " + e.Id + " ";
			e.Comments = t
		},
		getLicenseButtonText: function (e, t) {
			return (e === "N" || e === "EM" || e === "TE") && t === "02" ? "Enviar a tramitar." : "Guardar Cambios"
		},
		goToEdit: function (e, t) {
			O.open();
			var a = c.getModel("FilterSelectionJsonModel");
			var o = c.getModel("DisableControlsJsonModel");
			o.setProperty("/DaysDeleteVisible", false);
			a.setProperty("/textFlowSol", "Guardar Cambios");
			a.setProperty("/visible", true);
			var i = t ? e : e.getSource().getParent();
			var s = $.extend(true, {}, t ? i : i.getBindingContext("LicencesListJsonModel").getObject());
			a.setProperty("/textFlow", this.getLicenseButtonText(s.Tipolicencia, s.Licstat));
			a.setProperty("/annulateCreatedStatus", !!s.Id);
			var r = s.Tipo === "L";
			var n = s.Licstat !== "03";
			let l = s.Licstat !== "30";
			let d = s.Licstat;
			o.setProperty("/tabVisibility", l);
			if (d === "07" || d === "30") {
				o.setProperty("/weekChanger", false)
			} else {
				o.setProperty("/weekChanger", true)
			}
			if (r) {
				o.setProperty("/visibleLic", true);
				o.setProperty("/visibleSol", false)
			} else {
				o.setProperty("/visibleLic", true);
				o.setProperty("/visibleSol", true);
				a.setProperty("/textFlow", "Crear Licencia")
			}
			if (s.AttachmentXLicencia_nav.length > 0) {
				a.setProperty("/visibleFiles", true)
			} else {
				a.setProperty("/visibleFiles", false)
			}
			if (s.Period === "D") {
				o.setProperty("/HorariosSemanaEnabled", true)
			} else if (s.Period === "C") {
				o.setProperty("/HorariosSemanaEnabled", false)
			}
			c.setNavigationProperties(s);
			J.generateDeliveryDevolution(s);
			this.findEstacionCode(s.Tplnr);
			this.loadCatalogData(s.Werks).then(e => {
				c.getModel("PuestoTrabajoJsonModel");
				c.getModel("PuestoTrabajoJsonModel").setData({
					PuestosTrabajo: e.PuestosTrabajo
				})
			}).catch(e => {
				console.log(e)
			});
			E.filterPorRegion(s.Werks || "");
			f.getCammesaComments(s);
			this.findOrden(s.Empresa, s.Werks);
			var u = N.getLicenseUrl(s);
			if (this.isProgrammerRol(s.Licstat)) {
				o.setProperty("/enabledForProgrammer", false)
			} else {
				o.setProperty("/enabledForProgrammer", true)
			}
			if (r) {
				localStorage.setItem("type", "Licencia");
				c.getAppRouter().navTo("Licencia", {
					id: u
				})
			} else {
				localStorage.setItem("type", "Solicitud");
				c.getAppRouter().navTo("Solicitud", {
					id: u
				})
			}
		},
		isProgrammerRol: function (e) {
			var t = c.getModel("UserJsonModel").getData().roles;
			var a = ["Programacion_COT", "Programacion_COTDT"];
			return t.some(e => a.includes(e)) && e === "30"
		},
		findEstacionCode: function (e) {
			c.getModel("SelectModel").read("/EstacionesSet", {
				success: function (t) {
					var a = t.results.find(function (t) {
						return t.Codigo === e
					});
					D.loadEquipos(a.Estacion)
				},
				error: function (e) {
					console.log("error")
				}
			})
		},
		findOrden: function (e, t) {
			b.loadOrdenes(e, t)
		},
		handleViewType: function (e) {
			var t = e.getSource().getCustomData()[0].getValue();
			var a = {};
			if (t === "S") {
				localStorage.setItem("type", "Solicitud");
				this.goToRequest(a)
			} else {
				localStorage.setItem("type", "Licencia");
				this.goToLicense(a)
			}
		},
		goToRequest: function (e) {
			this.handleLicenseInformation(e);
			c.getAppRouter().navTo("Solicitud", {
				id: "CREACION"
			})
		},
		goToLicense: function (e) {
			this.handleLicenseInformation(e);
			c.getAppRouter().navTo("Licencia", {
				id: "CREACION"
			})
		},
		handleLicenseInformation: function (e) {
			q.createLegacyComboStateModel();
			var t = c.getModel("PermisosJsonModel");
			var a = c.getModel("DisableControlsJsonModel");
			var o = c.getModel("UserJsonModel");
			var i = o.getProperty("/roles");
			a.setProperty("/DaysDeleteVisible", true);
			a.setProperty("/visibleLic", true);
			a.setProperty("/visibleSol", true);
			a.setProperty("/visibleAnulacion", false);
			var s = c.getModel("DisableControlsJsonModel");
			s.setProperty("/enabledTechLoc", false);
			s.setProperty("/enabledEquipment", false);
			s.setProperty("/enabled", true);
			s.setProperty("/tabVisibility", false);
			s.setProperty("/enabledForProgrammer", true);
			s.setProperty("/HorariosSemanaEnabled", e.Period === "D");
			//oLicense.Period = "D" ? oDisableControlsJsonModel.setProperty("/HorariosSemanaEnabled", true) : oDisableControlsJsonModel.setProperty("/HorariosSemanaEnabled", false);
			t.setProperty("/UsuarioEncontrado", true);
			var r = "Crear Licencia";
			if (i.includes("Solicitante_Lic") || i.includes("Solicitante_Lic_S") || i.includes("Solicitante_Lic_TBA")) {
				r = "Crear Borrador de Licencia"
			}
			c.getModel("FilterSelectionJsonModel").setProperty("/textFlow", r);
			c.getModel("FilterSelectionJsonModel").setProperty("/textFlowSol", "Crear Solicitud");
			c.getModel("FilterSelectionJsonModel").setProperty("/enabledComboEQUIPO", false);
			var n = I.getAppPath();
			c.getModel("LicenseJsonModel").loadData(n + "model/LicenseJsonModel.json", "", false);
			var l = (new Date).valueOf().toString(36) + Math.random().toString(36).substr(2);
			var d = l.substr(1, 18);
			c.getModel("LicenseJsonModel").setProperty("/Idunifilar", d);
			var u = c.getModel("UtilsJsonModel").getProperty("/empresa");
			c.getModel("LicenseJsonModel").setProperty("/Empresa", u);
			c.getModel("LicenseJsonModel").setProperty("/Anio", (new Date).getFullYear() + "");
			var p = c.getModel("CurrentUser").getData().Region;
			c.getModel("LicenseJsonModel").setProperty("/Werks", p);
			c.getModel("LicenseJsonModel").setProperty("/Gdate", new Date);
			c.getModel("FilterSelectionJsonModel").setProperty("/visible", false);
			c.getModel("FilterSelectionJsonModel").setProperty("/enabledEspecifyBarra", false);
			c.getModel("FilterSelectionJsonModel").setProperty("/annulateCreatedStatus", !!e.Id);
			var g = i.find(e => e === "Jefe_Turno_COT" || e === "Jefe_Turno_COTDT");
			var m = i.find(e => e === "Operador_COT" || e === "Operador_COTDT");
			if (g || m) {
				c.getModel("LicenseJsonModel").setProperty("/Tipolicencia", "EM")
			}
			var f = i.find(e => e === "Programacion_COT" || e === "Programacion_COTDT");
			if (f) {
				c.getModel("LicenseJsonModel").setProperty("/Tipolicencia", "TE")
			}
			var h = i.find(e => e === "Solicitante_Lic_TBA");
			if (h) {
				c.getModel("LicenseJsonModel").setProperty("/Tipolicencia", "N")
			}
		},
		duplicateLicense: function (e) {
			O.open();
			var t = e.getSource().getParent();
			let a = t.getBindingContext("LicencesListJsonModel").getObject();
			f.getPromise(a, "HorariosPorLicencia_nav").then(e => {
				if (a.Tipo === "L") {
					localStorage.setItem("type", "Licencia");
					this.goToLicense(a)
				} else {
					localStorage.setItem("type", "Solicitud");
					this.goToRequest(a)
				}
				this.findEstacionCode(a.Tplnr);
				E.filterPorRegion(a.Werks || "");
				let t = c.getModel("LicenseJsonModel").getData();
				let o = ["Solbeg", "Solend", "Timbeg", "Timend", "Period", "Arbpl", "Solicitante", "Equstatnocam", "Jobcond", "Tplnr", "Equstat",
					"Equnr", "Tiemporep", "R500kv", "Barrafs", "Barrafstx", "Bloqueo", "Werks", "SolSuplente", "Jefe", "JefeSuplente", "Tipinterv",
					"Perestac", "Descripcion", "Solictext", "Aro", "Sindivi", "Senalninguna", "Precaucionesok", "Senalestados", "Senalalarmas",
					"Senalmedicion", "Senalafect", "Fstensionret", "Intnooperar", "Precauciones", "Rdisparo", "Equiinterv", "Aufnr",
					"Bloqueorecierretxt", "Tipolicencia", "Estacional", "Capex", "SolSuplenteAux"
				];
				o.forEach(e => {
					t[e] = a[e]
				});
				t.Timbeg = new Date(t.Timbeg);
				t.Timbeg = new Date(t.Timbeg.getTime() + t.Timbeg.getTimezoneOffset() * 60 * 1e3);
				t.Timend = new Date(t.Timend);
				t.Timend = new Date(t.Timend.getTime() + t.Timend.getTimezoneOffset() * 60 * 1e3);
				t.Solbeg = new Date(t.Solbeg.getTime() + t.Solbeg.getTimezoneOffset() * 60 * 1e3);
				t.Solend = new Date(t.Solend.getTime() + t.Solend.getTimezoneOffset() * 60 * 1e3);
				c.getModel("DisableControlsJsonModel").setProperty("/enabled", t.Period === "D");
				E.filterPorRegion(t.Werks);
				S.filterWorkPlacesByRegion(t.Werks);
				let i = c.getModel("UtilsJsonModel").getProperty("/empresa");
				var s = [new sap.ui.model.Filter("Empresa", sap.ui.model.FilterOperator.EQ, i), new sap.ui.model.Filter("Region", sap.ui.model.FilterOperator
					.EQ, t.Werks)];
				b.loadOrdenes(i, t.Werks, () => {
					c.getModel("FilterSelectionJsonModel").setProperty("/enabledEspecifyBarra", t.Barrafs !== "N");
					c.getModel("FilterSelectionJsonModel").setProperty("/annulateCreatedStatus", false);
					t.Barrafstx = t.Barrafs !== "N" ? t.Barrafstx : "";
					if (e.Rdisparo === "") t.Rdisparo = "Y";
					//if (license.Equstat === "") copy.Equstat = "Y";
					if (t.Equstat === "Y") t.Rdisparo = "Y";
					var o = (new Date).valueOf().toString(36) + Math.random().toString(36).substr(2);
					var i = o.substr(1, 18);
					t.Idunifilar = i;
					c.getModel("LicenseJsonModel").setData(t);
					e.HorariosPorLicencia_nav = e.HorariosPorLicencia_nav.results;
					var s = e.HorariosPorLicencia_nav;
					var r = (new Date).getTimezoneOffset() * 60 * 1e3;
					s.forEach(function (e) {
						e.Fecha = new Date(e.Fecha.getTime() + r);
						var t = new Date(e.Horainicio.ms);
						var a = new Date(t.getTime() + t.getTimezoneOffset() * 60 * 1e3);
						e.Horainicio = a;
						var o = new Date(e.Horafin.ms);
						var i = new Date(o.getTime() + o.getTimezoneOffset() * 60 * 1e3);
						e.Horafin = i
					});
					c.getModel("LicenseJsonModel").setProperty("/HorariosPorLicencia_nav", e.HorariosPorLicencia_nav);
					this.loadCatalogData(a.Werks).then(e => {
						c.getModel("PuestoTrabajoJsonModel");
						c.getModel("PuestoTrabajoJsonModel").setData({
							PuestosTrabajo: e.PuestosTrabajo
						})
					}).catch(e => {
						console.log(e)
					});
					if (a.Tipo === "L") {
						f.getUnifilarCount(a).then(e => {
							O.open("", "Duplicando unifilares...");
							if (e > 0) {
								f.getUnifilares(a, e => {
									let a = [];
									var o = e.results;
									for (let e of o) {
										a.push(f.getUnifilarVersion(e))
									}
									Promise.all(a).then(e => {
										let a = this.getVersionesActualesArray(e);
										let i = this.validateUnifilarVersions(o, a);
										var s = t.Idunifilar;
										this.handleRecursiveUnifilarCreation(s, i, [])
									}).catch(e => {
										O.close();
										n.showAlert("Alerta", "Error al obtener unifilares")
									})
								}, () => {
									n.showAlert("Alerta", "Error al obtener unifilares")
								}, {
									$select: "Nombre,Idunifilar,NumVersion,Region,TipoUnifilar,Et,Empresa,Anio,Region,IntAbLe,SecAbBt,SecPatCr,PatAdic,Numerolicencia,Mapa,Doctype,Imagenunifilar"
								})
							} else {
								O.close()
							}
						}).catch(e => {
							O.close();
							n.showAlert("Alerta", "Error al obtener contador unifilar")
						})
					} else {
						O.close()
					}
				})
			}, e => {
				O.close();
				sap.m.MessageBox.alert("No se ha podido cargar la licencia a clonar.", {
					title: "Error al clonar"
				})
			})
		},
		getTipo: function (e) {
			if (e === "P") {
				return "Potencia"
			}
			if (e === "S") {
				return "Servicios Auxiliares"
			}
			if (e === "O") {
				return "Otro"
			}
			return ""
		},
		getRegiones: function (e) {
			if (e === "103" || e === "113") {
				return "Norte"
			} else if (e === "102") {
				return "Reg. Metropolitana"
			} else if (e === "104" || e === "114") {
				return "Sur"
			}
		},
		handleRecursiveUnifilarCreation: function (e, t, a) {
			let o = t.shift();
			if (o) {
				let i = o.data;
				let s = o.create;
				if (s) {
					let o = [];
					o.push(f.getIndividualUnifilar(i.Anio, i.Empresa, i.Idunifilar, i.Numerolicencia, "/marcadores_nav"));
					o.push(f.getIndividualUnifilar(i.Anio, i.Empresa, i.Idunifilar, i.Numerolicencia, "/marcadoresnorel_nav"));
					Promise.all(o).then(o => {
						i.marcadores_nav = o[0] ? o[0].results ? o[0].results : [] : [];
						i.marcadores_nav.forEach(t => {
							t.Numerolicencia = e
						});
						i.marcadoresnorel_nav = o[1] ? o[1].results ? o[1].results : [] : [];
						i.marcadoresnorel_nav.forEach(t => {
							t.Numerolicencia = e
						});
						i.areasseguras_nav = [];
						i.Numerolicencia = e;
						f.createUnifilar(i).then(o => {
							a.push({
								EsquemaUnifilar: `Esquema Unifilar: ${this.getTipo(i.TipoUnifilar)} / ${i.Et} - ${i.Nombre} / ${this.getRegiones(i.Region)}`,
								Text: "Creado Exitosamente"
							});
							this.handleRecursiveUnifilarCreation(e, t, a)
						}).catch(() => {
							a.push({
								EsquemaUnifilar: `Esquema Unifilar: ${this.getTipo(i.TipoUnifilar)} / ${i.Et} - ${i.Nombre} / ${this.getRegiones(i.Region)}`,
								Text: "Se Produjo un error de servicio al crear"
							});
							this.handleRecursiveUnifilarCreation(e, t, a)
						})
					}).catch(() => {
						this.handleRecursiveUnifilarCreation(e, t, a)
					})
				} else {
					a.push({
						EsquemaUnifilar: `Esquema Unifilar: ${this.getTipo(i.TipoUnifilar)} / ${i.Et} - ${i.Nombre} / ${this.getRegiones(i.Region)}`,
						Text: "Versiones diferentes, NO CREADO"
					});
					this.handleRecursiveUnifilarCreation(e, t, a)
				}
			} else {
				O.close();
				c.getModel("TextUnifilarCreationJsonModel");
				c.getModel("TextUnifilarCreationJsonModel").setData({
					Messages: a
				});
				var i = this.getDialogMessages();
				i.open()
			}
		},
		getDialogMessages: function () {
			var e = new sap.m.Dialog({
				afterClose: e => {
					j.refreshUnifilar();
					e.getSource().close();
					e.getSource().destroy(true)
				},
				title: "Alerta",
				contentWidth: "30%",
				modal: true,
				content: [new sap.m.VBox({
					items: {
						path: "TextUnifilarCreationJsonModel>/Messages",
						template: new sap.m.VBox({
							items: [new sap.m.Text({
								text: "{TextUnifilarCreationJsonModel>EsquemaUnifilar}"
							}).addStyleClass("sapUiTinyMarginBottom"), new sap.m.Text({
								text: "{TextUnifilarCreationJsonModel>Text}"
							})]
						}).addStyleClass("sapUiSmallMarginTopBottom")
					}
				}).addStyleClass("sapUiTinyMarginBeginEnd")],
				buttons: [new sap.m.Button({
					text: "Cerrar",
					icon: "sap-icon://decline",
					press: e => {
						j.refreshUnifilar();
						e.getSource().getParent().close();
						e.getSource().getParent().destroy(true)
					}
				}).addStyleClass("buttonInverted floatLeft")]
			});
			e.setModel(c.getModel("TextUnifilarCreationJsonModel"), "TextUnifilarCreationJsonModel");
			return e
		},
		validateUnifilarVersions: function (e, t) {
			let a = [];
			for (let o of e) {
				let e = t.find(e => e.Centro === o.Region && e.Et === o.Et && e.TipoUnifilar === o.TipoUnifilar);
				if (e) {
					if (o.NumVersion !== e.NumVersion) {
						a.push({
							data: o,
							create: false
						})
					} else {
						a.push({
							data: o,
							create: true
						})
					}
				}
			}
			return a
		},
		getVersionesActualesArray: function (e) {
			let t = [];
			for (let a of e) {
				let e = a.results;
				let o = e[0];
				if (o) {
					t.push(o)
				}
			}
			return t
		},
		freeRequestDialog: function () {
			this.requestDialog.close();
			f.POST()
		},
		closeRequestDialog: function () {
			this.requestDialog.close()
		},
		saveRequestDialog: function () {
			this.requestDialog.close()
		},
		clearRequestDialog: function () {
			c.getModel("LicenseJsonModel").loadData("model/LicenseJsonModel.json", "", false)
		},
		handleItemPress: function (e) {
			c.getModel("FilterSelectionJsonModel").setProperty("/busyData", true);
			f.FIND(e.getParameter("listItem").getBindingContext("LicencesListJsonModel").getObject());
			/*var aItemDays = oEvent.getParameter("listItem").getBindingContext("LicencesListJsonModel").getObject()["HorariosPorLicencia_nav"];
						AppManagementHelper.getModel("LicenseDaysJsonModel").setData({
							Days: aItemDays
						});*/
		},
		getMassiveTramitationsAvailability: function (e) {
			var t = e.some(function (e) {
				return e.Licstat === "30" || e.Licstat === "03" || e.Licstat === "02" || e.Licstat === "11" || e.Licstat === "09" || e.Licstat ===
					"08" || e.Licstat === "90" || e.Licstat === "" || e.Substatus === "E"
			});
			if (t === true) {
				return false
			} else {
				return true
			}
		},
		clearTramitMassiveModal: function () {
			c.getModel("TramitacionMasivaListJsonModel").getData().Tramitaciones = []
		},
		openMassiveTramitationAddCompanyDialog: function () {
			this.clearTramitMassiveModal();
			var e = this.getLicenseTable().getSelectedContexts().map(e => e.getObject());
			c.getModel("TramitacionesCatalogoJsonModel").setProperty("/Tramitaciones", e);
			if (this.checkIfAllAreLicences(e)) {
				if (this.getMassiveTramitationsAvailability(e) === false) {
					sap.m.MessageToast.show("Seleccione solo licencias en estado habilitadas para tramitación")
				} else {
					var t = "transener.sistemadeturnos.views.Main.Dialogs.MassiveTramitation";
					var a = this;
					var o = i.getComponent();
					var s = o.byId(t);
					if (!s) {
						var r = o.byId(t);
						s = sap.ui.jsview(r, t);
						var l = new sap.m.Dialog({
							title: "Tramitacion Masiva",
							contentWidth: "60%",
							modal: true,
							content: s,
							busy: "{TramitacionMasivaListJsonModel>/Busy}",
							buttons: [new sap.m.Button({
								text: "Cancelar",
								press: [a.closeMassiveTramitationDialog, a]
							}).addStyleClass("buttonInverted floatLeft"), new sap.m.Button({
								text: "Aceptar",
								press: [a.tramitMassiveLicenses, a]
							}).addStyleClass("buttonInverted floatRight")],
							customData: [new sap.ui.core.CustomData({
								key: "list",
								value: null
							})]
						}).addStyleClass("customDialog");
						this.massiveTramitationDialog = l;
						a.getView().addDependent(l);
						l.open();
						if (l) {
							return true
						}
					} else {
						if (this.massiveTramitationDialog) {
							this.disableDialog.open();
							return true
						}
					}
				}
			} else {
				n.showAlert("Alerta", "Operación inválida, debe seleccionar solo licencias")
			}
		},
		closeMassiveTramitationDialog: function () {
			this.massiveTramitationDialog.close()
		},
		bFinishTramitacion: true,
		validTramitaciones: function (e) {
			var t = true;
			if (this.bFinishTramitacion) {
				if (e.length > 0) {
					for (var a of e) {
						if (a.EmpTramita === "") {
							t = false;
							break
						}
						if (a.Estado === "01") {
							if (a.EmpTramita === "") {
								t = false;
								break
							}
						}
						if (a.Estado === "02") {
							if (a.EmpTramita === "" || a.CausaNo === "" || a.MotivoNo === "") {
								t = false;
								break
							}
						}
						if (a.Estado === "") {
							t = false;
							break
						}
					}
					return t
				} else {
					return false
				}
			} else {
				for (var a of e) {
					if (a.EmpTramita === "") {
						t = false;
						break
					}
				}
				return t
			}
		},
		_tramitarMasivamente: function (e, t) {
			O.open();
			let a = [];
			e.forEach(e => {
				e.Tramitador = c.getStringUserLegacy();
				e.Licstat = J.getTramitStatus(t);
				e.Timbeg = new Date(e.Timbeg.ms);
				e.Timend = new Date(e.Timend.ms);
				let o = J.cloneLicense(e);
				o.Solbeg = new Date(o.Solbeg.getTime() + o.Solbeg.getTimezoneOffset() * 60 * 1e3);
				o.Timbeg = new Date(o.Timbeg.getTime() + o.Timbeg.getTimezoneOffset() * 60 * 1e3);
				o.Solend = new Date(o.Solend.getTime() + o.Solend.getTimezoneOffset() * 60 * 1e3);
				o.Timend = new Date(o.Timend.getTime() + o.Timend.getTimezoneOffset() * 60 * 1e3);
				a.push(f.updateLicenciaPromise(o))
			});
			Promise.all(a).then(() => {
				let a = [];
				e.forEach(e => {
					t.forEach(t => {
						let o = jQuery.extend({}, true, t);
						o.Avisoprog = c.getStringUserLegacy();
						o.Id = e.Id;
						o.Empresa = e.Empresa;
						o.Anio = e.Anio;
						delete o.Enabled;
						a.push(o)
					})
				});
				let o = f.handleTramitePromises(a);
				Promise.all(o).then(t => {
					this._loopLicencias(e)
				}).catch(e => {
					console.error(e);
					O.close();
					n.showAlert("Alerta", "Se ha producido un error tramitar")
				})
			}).catch(e => {
				console.error(e);
				O.close();
				n.showAlert("Alerta", "Se ha producido un error tramitar")
			})
		},
		_loopLicencias: function (e) {
			let t = e.pop();
			if (t) {
				if (t.Licstat !== "23") {
					let a = jQuery.extend(true, {}, t);
					a.Timbeg = new Date(a.Timbeg.getTime() + a.Timbeg.getTimezoneOffset() * 60 * 1e3);
					a.Timend = new Date(a.Timend.getTime() + a.Timend.getTimezoneOffset() * 60 * 1e3);
					f.sendLicenciaEmail(a).then(() => {
						this._loopLicencias(e)
					}).catch(() => {
						this._loopLicencias(e)
					})
				} else {
					this._loopLicencias(e)
				}
			} else {
				this.closeMassiveTramitationDialog();
				c.getModel("LicencesListJsonModel").refresh(true);
				O.close();
				this.makeFilters(0)
			}
		},
		checkSiLicenciasTienenTramitaciones: function (e, t) {
			var a = [];
			return new Promise(function (o, i) {
				$.map(e, function (e, o) {
					if (e.TramitacionesLicencia_nav.results.length !== 0) {
						$.map(e.TramitacionesLicencia_nav.results, function (e, o) {
							$.map(t, function (t, o) {
								if (e.EmpTramita === t.EmpTramita) {
									a.push(true)
								}
							})
						})
					} else {
						a.push(false)
					}
				});
				if (a.some(e => e === true)) {
					o(true)
				} else {
					o(false)
				}
			})
		},
		checkIfAllAreLicences: function (e) {
			var t = e.some(function (e) {
				return e.Tipo === "S"
			});
			if (t) {
				return false
			} else {
				return true
			}
		},
		setModalTramitacionesMasivasBusyState: function (e) {
			this.getView().getModel("TramitacionMasivaListJsonModel").setProperty("/Busy", e)
		},
		tramitMassiveLicenses: function () {
			var e = c.getModel("TramitacionesCatalogoJsonModel").getData().Tramitaciones;
			var t = c.getModel("TramitacionMasivaListJsonModel").getData().Tramitaciones;
			var a = false;
			var o = this;
			if (this.validTramitaciones(t)) {
				this.setModalTramitacionesMasivasBusyState(true);
				P.getLicenciasFullData(e).then(e => {
					var a = e;
					this.checkSiLicenciasTienenTramitaciones(a, t).then(function (e) {
						o.setModalTramitacionesMasivasBusyState(false);
						if (e === true) {
							sap.m.MessageBox.show("Hay licencias con agentes cargados, desea sobrescribir?", {
								icon: sap.m.MessageBox.Icon.INFORMATION,
								title: "Alerta",
								actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
								onClose: function (e) {
									if (e == "YES") {
										o._tramitarMasivamente(a, t)
									}
								}
							})
						} else {
							o._tramitarMasivamente(a, t)
						}
					})
				})
			} else {
				n.showAlert("Alerta", "Debe completar los campos faltantes.")
			}
		},
		getLicenseStatusByOperationType: function (e) {
			switch (e) {
			case "Observar":
				return "02";
			case "Anular":
				return "03";
			default:
			}
		},
		onSelect: function (e) {
			this.formatAndShowData(e.getSource().getBindingContext("LicencesListJsonModel").getObject());
			var t = e.getSource().getBindingContext("LicencesListJsonModel").getObject().Id;
			var a = {
				Id: t
			};
			var o = new sap.ui.model.json.JSONModel(a);
			this.getView().setModel(o, "LicenseIdModel")
		},
		onAfterRendering: function () {
			var e = this;
			// 		LicenseService.FIND(data);
			if (!this.hasExported) {
				this.hasExported = true;
				this.loadSociety();
				this.loadTipoIntModel();
				this.loadStacionalListModel();
				this.loadStatusModel();
				this.loadMotivoNoAutorizacionModel()
			}
		},
		loadCatalogDataReports: async function () {
			let e = await f.getJobCond();
			return {
				JobConds: e,
				EstacionalData: c.getModel("EstacionalListSet").getData().EstacionalListSet
			}
		},
		loadCatalogData: async function (e) {
			let t = await f.getPuestoTrabajo(e);
			return {
				PuestosTrabajo: t
			}
		},
		loadMotivoNoAutorizacionModel: function () {
			var e = c.getModel("MotivoNoAutorizacionJsonModel");
			e.setData({
				Motivos: [{
					key: "COND",
					text: "COND - Condiciones climáticas adversas"
				}, {
					key: "FALT",
					text: "FALT - Falta de recursos operativos"
				}, {
					key: "CONV",
					text: "CONV - Conveniencia de Mantenimientos"
				}, {
					key: "ERRO",
					text: "ERRO - LLTT confeccionada por Error"
				}, {
					key: "ALTE",
					text: "ALTE -Trabajo alternativo"
				}, {
					key: "HLIM",
					text: "HLIM -Aviso de autorización fuera del horario de limite indicado"
				}]
			})
		},
		loadSociety: function () {
			console.log("entre");
			var e = this;
			var t = T.getModel("TransenerOperaciones");
			t.read("/EmpresaUsuarioSet", {
				success: function (t) {
					var a = t.results[0].Empresa;
					var o = t.results[0].Region;
					if (a === "999") {
						e.InitSociety()
					} else {
						e.society = a;
						e.werks = o;
						c.getModel("FiltersJsonModel").setProperty("/Werks/value", o);
						e.afterEmpresa()
					}
					c.getModel("CurrentUser").setData(t.results[0])
				},
				error: function (e) {}
			});
			t.read("/EstadoTramitacionCammesaSet", {
				success: e => {
					let t = c.getModel("EstadosModel");
					t.setData({
						estados: e.results
					})
				},
				error: e => {
					console.log("Error cargando estados")
				}
			})
		},
		changeUbicacion: function (e) {
			J.changeUbicacion(e)
		},
		InitSociety: function () {
			this.dialogSociety = new sap.m.Dialog({
				type: sap.m.DialogType.Message,
				title: "Selección de Empresa",
				escapeHandler: function (e) {
					e.reject()
				},
				content: [new sap.m.VBox({
					items: [new sap.m.Label({
						text: "Debe seleccionar la empresa:"
					}), new sap.m.Select({
						change: [this.ValidateCombo, this],
						selectedKey: "{Society>/Code}",
						items: [new sap.ui.core.Item({
							key: "",
							text: "Elija Uno"
						}), new sap.ui.core.Item({
							key: "100",
							text: "TRANSENER S.A."
						}), new sap.ui.core.Item({
							key: "300",
							text: "TRANSBA S.A."
						})]
					})]
				})],
				buttons: [new sap.m.Button({
					icon: "sap-icon://save",
					type: sap.m.ButtonType.Emphasized,
					text: "Guardar",
					press: [this.onSelectedSociety, this]
				})]
			});
			var e = new sap.ui.model.json.JSONModel;
			this.dialogSociety.setModel(e, "Society");
			this.dialogSociety.open()
		},
		onSelectedSociety: function () {
			var e = this.dialogSociety.getModel("Society").getData().Code;
			if (e !== "" && typeof e !== "undefined") {
				this.society = e;
				console.log(e);
				this.afterEmpresa();
				this.dialogSociety.close();
				this.dialogSociety.destroy()
			} else {
				sap.m.MessageBox.alert("Debe seleccionar una de empresa!", {
					title: "Selección de Empresa"
				})
			}
		},
		ValidateCombo: function (e) {
			var t = this.dialogSociety.getModel("Society").getData().Code;
			if (t !== "") {
				e.getSource().setValueState("None")
			} else {
				e.getSource().setValueState("Error")
			}
		},
		afterEmpresa: function () {
			var e = [];
			let t = [];
			let a = new sap.ui.model.Filter({
				path: "Empresa",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: this.society
			});
			let o = new sap.ui.model.Filter({
				path: "Werks",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: this.werks
			});
			if (this.werks) {
				e.push(o)
			}
			e.push(a);
			t.push(a);
			let i = c.getModel("UserJsonModel").getProperty("/roles");
			t.push(new sap.ui.model.Filter({
				path: "Rol",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: i.includes("Solicitante_Lic") ? "Solicitante_Lic" : i[0]
			}));
			e.push(new sap.ui.model.Filter({
				path: "Solbeg",
				operator: sap.ui.model.FilterOperator.GE,
				value1: new Date((new Date).setDate((new Date).getDate() - 7))
			}));
			var s = this.getView();
			this.getView().getModel("LocalFilterJsonModel").setProperty("/Solbeg", new Date((new Date).setDate((new Date).getDate() - 7)));
			e.push(new sap.ui.model.Filter({
				path: "Solend",
				operator: sap.ui.model.FilterOperator.LE,
				value1: new Date((new Date).setDate((new Date).getDate() + 7))
			}));
			this.getView().getModel("LocalFilterJsonModel").setProperty("/Solend", new Date((new Date).setDate((new Date).getDate() + 7)));
			S.loadWorkPlaces(this.society, () => {});
			c.getModel("UtilsJsonModel").setData({
				empresa: this.society
			});
			if (this.werks) {
				this.loadCatalogData(this.werks).then(e => {
					c.getModel("PuestoTrabajoJsonModel");
					c.getModel("PuestoTrabajoJsonModel").setData({
						PuestosTrabajo: e.PuestosTrabajo
					})
				}).catch(e => {
					console.log(e)
				})
			}
			//LicenseService.GETTramitaciones(this.society);
			h.loadRegiones(this.society, this.loadAllOrdenes.bind(this));
			M.loadTramitacion(this.society);
			v.getPersonalPromise(this.society);
			E.loadEstaciones(t);
			this.loadRepositionTimeModel();
			f.GETTipoLicenciaCatalog();
			this.getImageUrl();
			if (this.validURLToLicense) {
				this.getView().setBusy(true);
				var r = J.getURLLicenseData(this._url);
				setTimeout(() => {
					/*var aTableItems = this.byId("auditTable").getItems();
										var oLicenseItem = aTableItems.find(oItem => {
											var oItemData = oItem.getBindingContext("LicencesListJsonModel").getObject()
											return oDataUrl.Id === oItemData.Id && oDataUrl.Empresa === oItemData.Empresa && oDataUrl.Tipo === oItemData.Tipo &&
												oDataUrl.Anio === oItemData.Anio
										});*/
					f.FIND(r, e => {
						this.getView().setBusy(false);
						this.goToEdit(e, true)
					})
				}, 5e3)
			}
			var n = I.getAppPath();
			var l = c.getModel("centroToRegion");
			l.loadData(n + "/conf/centroToRegion.json", "", false)
		},
		loadAllOrdenes: function (e) {
			return;
			c.getModel("TiposOrdenes").setProperty("/Busy", true);
			let t = [];
			e.forEach(e => {
				let a = [new sap.ui.model.Filter("Empresa", sap.ui.model.FilterOperator.EQ, this.society), new sap.ui.model.Filter("Region", sap
					.ui.model.FilterOperator.EQ, e.Werks)];
				t.push(b.getOrdenesPromise(a))
			});
			Promise.all(t).then(t => {
				let a = {};
				e.forEach((e, o) => {
					a[e.Werks] = t[o].results
				});
				c.getModel("TiposOrdenes").setProperty("/TiposOrdenes", a);
				c.getModel("TiposOrdenes").setProperty("/Busy", false)
			}).catch(e => {
				console.log(e);
				c.getModel("TiposOrdenes").setProperty("/Busy", false)
			})
		},
		getImageUrl: function () {
			var e = this;
			var t = new XMLHttpRequest;
			if (e.society === "100") {
				t.open("GET", "./images/transener.png", true)
			} else {
				t.open("GET", "./images/TRANSBA.png", true)
			}
			t.responseType = "blob";
			t.onload = function (t) {
				if (t.srcElement.status >= 400) {
					e.imageUrl = false;
					return
				}
				var a = new FileReader;
				a.onload = function (t) {
					var a = t.target.result;
					e.imageUrl = a;
					var o = c.getModel("ImageModel");
					o.setProperty("/Image", a)
				};
				var o = this.response;
				a.readAsDataURL(o)
			};
			t.send()
		},
		generateSolicitudAcuerdoData: function (e, t) {
			for (var a of e) {
				t.push(a.getBindingContext("LicencesListJsonModel").getObject())
			}
			return t
		},
		solicitudAcuerdoExport: function () {
			var e = [];
			var t = this.byId("auditTable").getSelectedItems();
			if (t.length > 0) {
				var e = this.generateSolicitudAcuerdoData(t, e);
				ReportesHelper.exportSolicitudAcuerdo(e, this.society)
			} else {
				sap.m.MessageBox.alert("Necesita seleccionar al menos una licencia para generar el reporte.", {
					title: "Alerta"
				})
			}
		},
		comparacionReporte: function () {
			var e = [];
			var t = this.byId("auditTable").getSelectedItems();
			if (t.length > 0) {
				var e = this.generateSolicitudAcuerdoData(t, e);
				ReportesHelper.comparacionLicencia(e)
			} else {
				sap.m.MessageBox.alert("Necesita seleccionar al menos una licencia para generar el reporte.", {
					title: "Alerta"
				})
			}
		},
		handleSemanalCammesa: function () {
			var e = new Date;
			e.setDate(e.getDate() + 1);
			var t = c.getModel("CammesaSemanal");
			t.setData({
				fechadesde: e,
				fechahasta: e
			});
			this.dialogSemanalCamesa = new sap.m.Dialog({
				type: sap.m.DialogType.Message,
				title: "Programación Semanal (reunion CAMMESA)",
				escapeHandler: function (e) {
					e.reject()
				},
				content: [new sap.m.VBox({
					items: [new sap.m.Label({
						text: "Fecha desde:"
					}), new sap.m.DatePicker({
						dateValue: "{CammesaSemanal>/fechadesde}"
					})]
				}), new sap.m.VBox({
					items: [new sap.m.Label({
						text: "Fecha hasta:"
					}), new sap.m.DatePicker({
						dateValue: "{CammesaSemanal>/fechahasta}"
					})]
				})],
				buttons: [new sap.m.Button({
					icon: "sap-icon://save",
					type: sap.m.ButtonType.Emphasized,
					text: "Realizar Reporte ",
					press: [this.downloadSemanalCamesa, this]
				}), new sap.m.Button({
					icon: "sap-icon://decline",
					type: sap.m.ButtonType.Emphasized,
					text: "Cerrar",
					press: [this.closeDialogSemanalCammesa, this]
				})]
			});
			this.dialogSemanalCamesa.setModel(t, "CammesaSemanal");
			this.dialogSemanalCamesa.open()
		},
		closeDialogSemanalCammesa: function () {
			this.dialogSemanalCamesa.close();
			this.dialogSemanalCamesa.destroy()
		},
		downloadSemanalCamesa: function () {
			let e = c.getModel("CammesaSemanal").getData();
			var t = e.fechadesde.toISOString().split("T")[0].replace(/-/g, "");
			var a = e.fechahasta.toISOString().split("T")[0].replace(/-/g, "");
			let o = e;
			ReportesHelper.reporteSemanalCammesa(t, a, this.society, o).then(e => {
				O.close();
				sap.m.MessageBox.alert(e.message, {
					title: "Descarga Excel"
				})
			}).catch(e => {
				console.log(e)
			})
		},
		handleDiaryPartLT: function () {
			var e = new Date;
			e.setDate(e.getDate() + 1);
			var t = c.getModel("DiaryPartFilterModel");
			t.setData({
				fecha: e
			});
			this.dialogDiaryPart = new sap.m.Dialog({
				type: sap.m.DialogType.Message,
				title: "Parte Diaria",
				escapeHandler: function (e) {
					e.reject()
				},
				content: [new sap.m.VBox({
					items: [new sap.m.Label({
						text: "Fecha:"
					}), new sap.m.DatePicker({
						dateValue: "{DiaryPartFilterModel>/fecha}"
					})]
				})],
				buttons: [new sap.m.Button({
					icon: "sap-icon://save",
					type: sap.m.ButtonType.Emphasized,
					text: "Realizar Reporte ",
					press: [this.downloadReportDiaryPart, this]
				}), new sap.m.Button({
					icon: "sap-icon://decline",
					type: sap.m.ButtonType.Emphasized,
					text: "Cerrar",
					press: [this.closeDialogDiaryPart, this]
				})]
			});
			this.dialogDiaryPart.setModel(t, "DiaryPartFilterModel");
			this.dialogDiaryPart.open()
		},
		closeDialogDiaryPart: function () {
			this.dialogDiaryPart.close();
			this.dialogDiaryPart.destroy()
		},
		downloadReportDiaryPart: function () {
			var e = c.getModel("DiaryPartFilterModel").getProperty("/fecha");
			var t = e.toISOString().split("T")[0].replace(/-/g, "");
			this.sSolbeg = o.formatDateLicense(e);
			this.sDay = o.getDayName(e);
			var a = this.society;
			f.diaryPartReport(t, a).then($.proxy(this.createPDFReportDiaryPart, this)).catch($.proxy(this.errorPDFReportDiaryPart, this))
		},
		handleWorkReportCammesa: function () {
			var e = c.getModel("ReportFilterModel");
			e.setData({
				Semanal: true
			});

			function t(t) {
				if (!e.getProperty("/Semanal")) {
					e.setProperty("/Hasta", e.getProperty("/Desde"))
				}
			}
			this.reportDialog = new sap.m.Dialog({
				type: sap.m.DialogType.Message,
				title: "Exportar a EXCEL",
				escapeHandler: function (e) {
					e.reject()
				},
				content: [new sap.m.VBox({
					items: [new sap.m.Label({
						text: "Desde:"
					}), new sap.m.DatePicker({
						dateValue: "{ReportFilterModel>/Desde}",
						change: t
					}), new sap.m.Label({
						text: "Hasta:"
					}), new sap.m.DatePicker({
						dateValue: "{ReportFilterModel>/Hasta}",
						enabled: "{ReportFilterModel>/Semanal}"
					}), new sap.m.CheckBox({
						selected: "{ReportFilterModel>/Anul}",
						text: "Informar LLTT Anuladas"
					}), new sap.m.RadioButtonGroup({
						columns: 2,
						buttons: [new sap.m.RadioButton({
							text: "Semanal",
							selected: "{ReportFilterModel>/Semanal}"
						}), new sap.m.RadioButton({
							text: "Diario",
							selected: "{= !${ReportFilterModel>/Semanal}}"
						})],
						select: t
					})]
				})],
				buttons: [new sap.m.Button({
					icon: "sap-icon://save",
					type: sap.m.ButtonType.Emphasized,
					text: "Aceptar",
					press: [this.downloadWorkReportCammesa, this]
				}), new sap.m.Button({
					icon: "sap-icon://decline",
					type: sap.m.ButtonType.Emphasized,
					text: "Cerrar",
					press: [this.closeReportDialog, this]
				})]
			});
			this.reportDialog.setModel(e, "ReportFilterModel");
			this.reportDialog.open()
		},
		downloadWorkReportCammesa: function () {
			let e = c.getModel("ReportFilterModel").getData();
			if (!e.Desde) {
				sap.m.MessageBox.alert("Debe cargar la fecha Desde", {
					title: "Error"
				});
				return
			}
			if (!e.Hasta) {
				sap.m.MessageBox.alert("Debe cargar la fecha Hasta", {
					title: "Error"
				});
				return
			}
			O.open();
			ReportesHelper.workReportCammesa(this.society, e.Desde, e.Hasta, e.Anul).then(e => {
				O.close();
				sap.m.MessageBox.alert("Reporte completado satisfactoriamente", {
					title: "Descarga Excel"
				})
			}, e => {
				let t = new Set;
				e.forEach(e => {
					if (e.responseText) {
						let a;
						try {
							a = JSON.parse(e.responseText).error
						} catch (e) {
							a = {}
						}
						if (a.message && a.message.value) {
							t.add(a.message.value)
						}
					}
				});
				let a = Array.from(t).join("\n");
				if (!a) a = "Error";
				sap.m.MessageBox.alert(a, {
					title: "Error al descargar el excel"
				});
				O.close()
			})
		},
		closeReportDialog: function () {
			this.reportDialog.close();
			this.reportDialog.destroy()
		},
		registerJSPdfModules: function () {
			jQuery.sap.registerModulePath("index", "https://unpkg.com/jspdf@1.4.1/dist/");
			jQuery.sap.require({
				modName: "index.jspdf",
				type: "debug"
			});
			jQuery.sap.registerModulePath("index", "https://unpkg.com/jspdf-autotable@3.0.4/dist/");
			jQuery.sap.require({
				modName: "index.jspdf",
				type: "plugin.autotable"
			})
		},
		registerDefine: function () {
			if (window.define) {
				var e = define.amd;
				define.amd = false
			}
			jQuery.sap.registerModulePath("index", "https://unpkg.com/jspdf@1.4.1/dist/");
			jQuery.sap.require({
				modName: "index.jspdf",
				type: "debug"
			});
			jQuery.sap.registerModulePath("index", "https://unpkg.com/jspdf-autotable@3.0.4/dist/");
			jQuery.sap.require({
				modName: "index.jspdf",
				type: "plugin.autotable"
			});
			if (window.define) define.amd = e
		},
		setImageToDocument: function (e) {
			var t = this.imageUrl;
			var a = this.society === "100" ? "TRANSENER" : "TRANSBA";
			if (this.imageUrl) {
				if (this.society === "100") {
					e.addImage(t, "PNG", 10, 5, 40, 15)
				} else {
					e.addImage(t, "PNG", 10, 5, 60, 12)
				}
			}
		},
		formatFecha: function (e) {
			var t = e.substr(0, 4);
			var a = e.substr(4, 2);
			var o = e.substr(6);
			return o + "-" + a + "-" + t
		},
		getLicStat: function (e) {
			if (e == "06") {
				return "Aprobada"
			} else if (e == "04") {
				return "Cancelada"
			} else if (e == "01") {
				return "NO Autorizada"
			} else if (e == "03") {
				return "Anulada"
			} else if (e == "02") {
				return "Observada"
			} else if (e == "08") {
				return "Entregada"
			} else if (e == "09") {
				return "Generada"
			} else if (e == "10") {
				return "Suspendida"
			} else if (e == "05") {
				return "Tramitada"
			} else if (e == "07") {
				return "Coordinada"
			} else if (e == "11") {
				return "Cancelada"
			} else if (e == "11") {
				return "Cancelada"
			}
			return e
		},
		setSubstatusFilter: function (e) {
			var t = "";
			if (e === "90") {
				t = "E"
			}
			if (e === "91") {
				t = "D"
			}
			if (e === "92") {
				t = "R"
			}
			if (e === "10") {
				t = "S"
			}
			c.getModel("FiltersJsonModel").setProperty("/Substatus/value", t)
		},
		changeStatus: function (e) {
			var t = e.getSource().getSelectedKey();
			if (t === "90" || t === "91" || t === "92" || t === "10") {
				this.setSubstatusFilter(t)
			} else {
				c.getModel("FiltersJsonModel").setProperty("/Licstat/value", t);
				c.getModel("FiltersJsonModel").setProperty("/Substatus/value", "")
			}
		},
		getPDFLicenseFormattedData: function (e) {
			var t = this;
			var a = $.extend([], e);
			a.forEach(function (e) {
				e.Empresa = e.Empresa === "100" ? "TRANSENER" : "TRANSBA";
				e.Barrafs = e.Barrafs === "N" ? "NO" : "SI";
				e.Aro = e.Aro === "X" ? "SI" : "NO";
				e.Bloqueo = e.Bloqueo === "N" ? "NO" : "SI";
				e.Equstat = e.Equstat === "" ? "FUERA DE SERVICIO" : "EN SERVICIO";
				e.Gdate = typeof e.Gdate === "object" ? t.formatDate(e.Gdate) : e.Gdate;
				e.Tipo = e.Tipo === "S" ? "SOLICITUD" : "LICENCIA";
				e.Licstat = t.getLicStat(e.Licstat);
				e["R500kv"] = e["R500kv"] === "N" ? "NO" : "SI"
			});
			return a
		},
		getTimeFormat: function (e) {
			var t = e.getHours();
			var a = e.getMinutes();
			var o = t >= 12 ? "pm" : "am";
			t = t % 12;
			t = t ? t : 12;
			a = a < 10 ? "0" + a : a;
			var i = t + ":" + a + " HS";
			return i
		},
		formatDate: function (e) {
			let t = new Date(e.getTime() + e.getTimezoneOffset() * 60 * 1e3);
			let a = new Date(t);
			let o = "" + (a.getMonth() + 1);
			let i = "" + a.getDate();
			let s = a.getFullYear();
			if (o.length < 2) o = "0" + o;
			if (i.length < 2) i = "0" + i;
			return [i, o, s].join("/")
		},
		createPDFLicencias: function (e) {
			var t = this.formatDate(new Date);
			var a = this.getPDFLicenseFormattedData(e);
			this.registerDefine();
			var o = new jsPDF({
				format: "a3",
				orientation: "l",
				unit: "mm"
			});
			this.setImageToDocument(o);
			o.setFontSize(14);
			o.setFontType("bold");
			o.text(70, 10, "LISTADO DE LICENCIAS DE TRABAJO");
			o.setFontSize(8);
			o.text(70, 15, "Fecha del reporte: " + t);
			var i = [{
				Anio: "Año",
				Arbpl: "Puesto de trabajo",
				Aro: "Coordinado ARO",
				Aufnr: "Orden de trabajo",
				Barrafs: "Barra",
				Bloqueo: "Bloqueo",
				Descripcion: "Descripción",
				Empresa: "Empresa",
				Equnr: "Equipo",
				Equstat: "Estado del equipo",
				Licstat: "Estado de la licencia",
				R500kv: "500 kv",
				Rdisparo: "Riesgo de disparo",
				Tipo: "Tipo"
			}];
			var s = [{
				dataKey: "Anio"
			}, {
				dataKey: "Arbpl"
			}, {
				dataKey: "Aro"
			}, {
				dataKey: "Aufnr"
			}, {
				dataKey: "Barrafs"
			}, {
				dataKey: "Bloqueo"
			}, {
				dataKey: "Descripcion"
			}, {
				dataKey: "Empresa"
			}, {
				dataKey: "Equipo"
			}, {
				dataKey: "Estado del equipo"
			}, {
				dataKey: "Licstat"
			}, {
				dataKey: "R500kv"
			}, {
				dataKey: "Rdisparo"
			}, {
				dataKey: "Tipo"
			}];
			o.autoTable({
				head: i,
				columns: s,
				body: a,
				startY: 25,
				margin: {
					horizontal: 7,
					top: 30,
					bottom: 60
				},
				bodyStyles: {
					valign: "top"
				},
				styles: {
					overflow: "linebreak",
					cellWidth: "wrap",
					tableWidth: 200
				},
				columnStyles: {
					text: {
						cellWidth: "auto"
					}
				}
			});
			o.save("LICENCIAS DE TRABAJO.pdf")
		},
		getPDFFormattedData: function (e) {
			var t = this;
			var a = $.extend([], e);
			a.forEach(function (e) {
				e.LT = e.Anio + "\n" + e.Id.slice(5);
				e.Empresa = e.Empresa === "100" ? "TRANSENER" : "TRANSBA";
				e.Solbeg = t.formatFecha(e.Solbeg);
				e.Solend = t.formatFecha(e.Solend);
				e.TrabajoFS = e.Equstat === "X" ? "" : "X";
				e.Equstat = e.Equstat === "" ? "FUERA DE SERVICIO" : "EN SERVICIO";
				e.Timbeg = o.getTimeString(e.Timbeg.ms) || "00:00" + "HS";
				e.Timend = o.getTimeString(e.Timend.ms) || "00:00" + "HS";
				e.EntregaLT = "";
				e.CancelaLT = "";
				e.HPD = e.Solbeg + " / " + e.Timbeg;
				e.HPH = e.Solend + " / " + e.Timend;
				e.Comentarios = o.getCommentsFromLicence(e)
			});
			return a
		},
		formatJobCond: function (e) {},
		getEstacional: function (e) {
			let t = this.estacionaldata.find(t => t.Codigo === e);
			return t ? t.Descripcion : ""
		},
		getJobCond: function (e) {
			let t = this.jobconds.find(t => t.Valkey === e);
			return t ? t.Valtext : ""
		},
		getJefe: function (e) {
			var t = c.getModel("PersonalHabilitadoModel").getData().JefeDeTrabajo;
			let a = t.find(t => t.Legajo === e);
			return a ? a.Nombre : ""
		},
		getPDFFormattedDataTRANSBA: function (e) {
			var t = this;
			var a = $.extend([], e);
			a.forEach(e => {
				e.LT = e.Anio + "\n" + e.Id.slice(5);
				e.Empresa = e.Empresa === "100" ? "TRANSENER" : "TRANSBA";
				e.TrabajoRealizar = `${e.Tipinterv} /  ${this.getEstacional(e.Estacional)}`;
				e.Solbeg = t.formatFecha(e.Solbeg);
				e.Solend = t.formatFecha(e.Solend);
				e.TrabajoFS = e.Equstat === "X" ? "" : "X";
				e.Equstat = e.Equstat === "" ? "" : "X";
				e.EquipoFS = e.Equstat === "" ? "X" : "";
				e.EquipoES = e.Equstat === "X" ? "X" : "";
				e.Timbeg = o.getTimeString(e.Timbeg.ms) || "00:00" + "HS";
				e.Timend = o.getTimeString(e.Timend.ms) || "00:00" + "HS";
				e.EntregaLT = "";
				e.CancelaLT = "";
				e.HPD = e.Solbeg + " / " + e.Timbeg;
				e.HPH = e.Solend + " / " + e.Timend;
				e.Jobcond = this.getJobCond(e.Jobcond);
				e.Comentarios = o.getCommentsFromLicence(e);
				e.ComentariosOperativos = this.getComentOper(e);
				e.MedidasSeguridadTot = "xx";
				e.Jefe = this.getJefe(e.Jefe)
			});
			return a
		},
		getComentOper: function (e) {
			return `Trabajo a realizar: ${e.Descripcion} - Base de programacion COT/COTDT: ${e.Tdtcomments} - Comentarios Programación: ${e.Prgcomments}`
		},
		getMedidasSeguridad: function () {
			return `Condiciones de trabajo`
		},
		getFullComments: function (e) {
			let t = e.Prgcomments ? `${e.Prgcomments} /` : "";
			let a = e.Interabier ? `${e.Interabier} /` : "";
			let o = e.Seleccionad ? `${e.Seleccionad} /` : "";
			let i = e.Intercerr ? `${e.Intercerr} /` : "";
			let s = e.Patadic ? `${e.Patadic} /` : "";
			let r = e.Equimov ? `${e.Equimov} /` : "";
			let n = e.Bloqueorecierretxt ? `${e.Bloqueorecierretxt} /` : "";
			let l = e.Intnooperar ? `${e.Intnooperar} /` : "";
			let c = e.Precauciones ? `${e.Precauciones} /` : "";
			let d = e.Solictext ? `${e.Solictext} /` : "";
			let u = "-Coment. Oper: \n" + "--- \n";
			return u
		},
		createPDF: function (e) {
			let t = e.map(e => e.Tplnr);
			f.getEstacionesCodes(t).then(t => {
				let a = t.map(e => ({
					Estacion: e.Estacion,
					CodigoTplnr: e.Codigo
				}));
				D.getEquipos(a).then(t => {
					e.forEach(e => {
						let a = t.find(t => t.CodigoTplnr === e.Tplnr);
						if (a) {
							let t = a.Equipos.find(t => t.CodigoEquipo === e.Equnr);
							if (t) {
								e.DescripcionEq = t.DescEquipo
							} else {
								e.DescripcionEq = ""
							}
						} else {
							e.DescripcionEq = ""
						}
					});
					this.loadCatalogDataReports().then(t => {
						this.jobconds = t.JobConds;
						this.estacionaldata = t.EstacionalData;
						if (this.society === "100") {
							var a = this.getPDFFormattedData(e);
							this.getReporteTransener(a)
						} else {
							var a = this.getPDFFormattedDataTRANSBA(e);
							this.getReporteTransba(a)
						}
					}).catch(() => {
						n.showAlert("Alerta", "Error al descarga parte diario")
					})
				}).catch(e => {
					console.log(e)
				})
			}).catch(e => {
				n.showAlert("Alerta", "Error al descarga parte diario")
			})
		},
		getReporteTransba: function (e) {
			const t = ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9", "SAL"];
			let a = [];
			let i = [];
			for (let o of e) {
				let e = t.find(e => e === o.TipoEquipo);
				if (e) {
					a.push(o)
				} else {
					i.push(o)
				}
			}
			var s = o.formatDateLicenseWithoutUtc(new Date);
			var r = o.getTimeStringWithoutUTC((new Date).getTime());
			this.registerDefine();
			var n = new jsPDF({
				format: "a3",
				orientation: "l",
				unit: "mm"
			});
			n.page = 1;
			this.setImageToDocument(n);
			n.setFontSize(14);
			n.setFontType("bold");
			n.text(140, 15, `Licencias de trabajo del dia ${this.sDay} (${this.sSolbeg})`);
			n.setFontSize(8);
			n.text(360, 15, `Fecha de Impresión ${s} ${r} `);
			n.setFontType("italic");
			n.text(15, 20, `Gerencia de operaciones COT-COTDT`);
			n.setFontType("normal");
			n.setFontSize(12);
			n.text(160, 50, `Estaciones Transformadoras`);
			let l = _.groupBy(i, e => e.Tplnr);
			let c = 0;
			for (let e in l) {
				if (c > 0) {
					n.addPage({
						format: "a3",
						orientation: "l",
						unit: "mm"
					})
				}
				let t = l[e][0] ? l[e][0].Pltxt : "";
				n.autoTable({
					headStyles: {
						fontSize: 16,
						halign: "center"
					},
					head: [{
						Estacion: {
							content: t,
							rowSpan: 2
						}
					}],
					columns: [{
						dataKey: "Estacion"
					}],
					columnStyles: {
						Estacion: {
							columnWidth: 80,
							fontSize: 20
						},
						text: {
							cellWidth: "auto",
							fontSize: 20
						}
					},
					body: [],
					startY: c > 0 ? 40 : 60,
					margin: {
						horizontal: 7,
						top: 30,
						bottom: 60
					},
					styles: {
						overflow: "linebreak",
						cellWidth: "wrap",
						tableWidth: 300
					}
				});
				let a = l[e];
				for (var d = 0; d < a.length; d++) {
					let e = a[d];
					n.autoTable({
						theme: "grid",
						head: [{
							FS: {
								content: "F/S",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							ES: {
								content: "E/S",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							LTN: {
								content: "LT N°",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							ET: {
								content: "ET",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							EQUIPOS: {
								content: "Equipo",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							TRABAJOREALIZAR: {
								content: "Trabajo a realizar",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							SEGURIDAD: {
								content: "Seguridad",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							JEFETRABAJO: {
								content: "Jefe de Trabajo",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							Fsllenaut: {
								content: "F/S",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							Esllenaut: {
								content: "E/S",
								rowSpan: 2,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							Period: {
								content: "Horarios",
								colSpan: 6,
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							}
						}, {
							Period: {
								content: "Periodo",
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							HPD: {
								content: "Desde",
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							EntregaLT: {
								content: "Entregado",
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							HPH: {
								content: "Hasta",
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							CancelaLT: {
								content: "Cancelado",
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							},
							Folio: {
								content: "Folio",
								styles: {
									valign: "center",
									fillColor: [255, 255, 255],
									lineColor: [0, 0, 0],
									textColor: [0, 0, 0],
									lineWidth: .4
								}
							}
						}],
						columns: [{
							dataKey: "FS"
						}, {
							dataKey: "ES"
						}, {
							dataKey: "LTN"
						}, {
							dataKey: "ET"
						}, {
							dataKey: "EQUIPOS"
						}, {
							dataKey: "TRABAJOREALIZAR"
						}, {
							dataKey: "SEGURIDAD"
						}, {
							dataKey: "JEFETRABAJO"
						}, {
							dataKey: "Fsllenaut"
						}, {
							dataKey: "Esllenaut"
						}, {
							dataKey: "Period"
						}, {
							dataKey: "HPD"
						}, {
							dataKey: "EntregaLT"
						}, {
							dataKey: "HPH"
						}, {
							dataKey: "CancelaLT"
						}, {
							dataKey: "Folio"
						}],
						body: [{
							FS: {
								content: "",
								styles: {
									cellWidth: 4,
									lineColor: [0, 0, 0]
								}
							},
							ES: {
								content: "",
								rowSpan: 1,
								styles: {
									cellWidth: 4,
									lineColor: [0, 0, 0]
								}
							},
							LTN: {
								content: e.Id,
								rowSpan: 2,
								styles: {
									cellWidth: 6,
									fontStyle: "bold",
									fontSize: 8,
									lineColor: [0, 0, 0]
								}
							},
							ET: {
								content: e.Tplnr,
								rowSpan: 2,
								styles: {
									cellWidth: 4,
									lineColor: [0, 0, 0]
								}
							},
							EQUIPOS: {
								content: `${e.Equnr} - ${e.DescripcionEq}`,
								rowSpan: 3,
								styles: {
									cellWidth: 8,
									fontSize: 8,
									lineColor: [0, 0, 0]
								}
							},
							TRABAJOREALIZAR: {
								content: e.TrabajoRealizar,
								rowSpan: 3,
								styles: {
									cellWidth: 12,
									minCellHeight: 12,
									lineColor: [0, 0, 0]
								}
							},
							SEGURIDAD: {
								content: e.Jobcond,
								rowSpan: 1,
								styles: {
									cellWidth: 12,
									lineColor: [0, 0, 0]
								}
							},
							JEFETRABAJO: {
								content: e.Jefe,
								rowSpan: 1,
								styles: {
									cellWidth: 11,
									lineColor: [0, 0, 0]
								}
							},
							Fsllenaut: {
								content: e.EquipoFS,
								rowSpan: 1,
								styles: {
									cellWidth: 4,
									lineColor: [0, 0, 0]
								}
							},
							Esllenaut: {
								content: e.EquipoES,
								rowSpan: 1,
								styles: {
									cellWidth: 4,
									lineColor: [0, 0, 0]
								}
							},
							Period: {
								content: e.Period === "D" ? "Diario" : "Continuo",
								rowSpan: 1,
								styles: {
									cellWidth: 7,
									lineColor: [0, 0, 0]
								}
							},
							HPD: {
								content: e.HPD,
								rowSpan: 1,
								styles: {
									cellWidth: 7,
									lineColor: [0, 0, 0]
								}
							},
							EntregaLT: {
								content: "",
								rowSpan: 1,
								styles: {
									cellWidth: 7,
									lineColor: [0, 0, 0]
								}
							},
							HPH: {
								content: e.HPH,
								rowSpan: 1,
								styles: {
									cellWidth: 7,
									lineColor: [0, 0, 0]
								}
							},
							CancelaLT: {
								content: "",
								rowSpan: 1,
								styles: {
									cellWidth: 7,
									lineColor: [0, 0, 0]
								}
							},
							Folio: {
								content: "",
								rowSpan: 1,
								styles: {
									cellWidth: 6,
									lineColor: [0, 0, 0]
								}
							}
						}],
						margin: {
							horizontal: 7,
							top: 30,
							bottom: 60
						},
						bodyStyles: {
							valign: "top"
						},
						styles: {
							overflow: "linebreak",
							cellWidth: "wrap",
							tableWidth: 300
						},
						columnStyles: {
							Comentarios: {
								columnWidth: 80
							},
							text: {
								cellWidth: "auto"
							}
						}
					});
					n.autoTable({
						theme: "plain",
						body: [
							["Coment.Oper:"],
							[e.ComentariosOperativos],
							["Condiciones Trabajo"],
							[" -Equipos a mover: " + e.Equimov],
							[" -Riesgo disparo: " + (e.Rdisparo === "X" ? "SI" : "NO")],
							[" --- "],
							["Medidas de Seguridad"],
							[" -Interruptores abiertos y en local/extr: " + e.Interabier],
							[" -Secc. abiertos, bloq y trab: " + e.Seleccionad],
							[" -Secc. de PAT cerrados: " + e.Intercerr],
							[" -Bloqueo de recierres: " + e.Bloqueorecierretxt],
							[" -Int. que no deben operarse: " + e.Intnooperar],
							[" -Otras precauciones PAT portatiles: " + e.Patadic + " / " + e.Precauciones],
							[" --- "],
							[" Barra F/S " + e.Barrafstx],
							[" Comentarios del solicitante " + e.Solictext]
						],
						columnStyles: {
							0: {
								columnWidth: 80
							},
							text: {
								cellWidth: "auto"
							}
						},
						startY: n.lastAutoTable.finalY,
						margin: {
							horizontal: 7,
							top: 30,
							bottom: 60
						},
						bodyStyles: {
							valign: "top"
						},
						styles: {
							overflow: "linebreak",
							cellWidth: "auto",
							tableWidth: 300
						}
					});
					if (d !== a.length - 1) {
						n.addPage({
							format: "a3",
							orientation: "l",
							unit: "mm"
						})
					}
				}
				c++
			}
			var u = n.internal.getNumberOfPages();
			for (var d = 1; d <= u; d++) {
				n.setPage(d);
				n.text(375, 10, `Hoja: ${d}   De: ${n.internal.getNumberOfPages()}`)
			}
			n.save("PARTE DIARIA LT.pdf")
		},
		getReporteTransener: function (e) {
			e = _.sortBy(e, ["Tplnr"]);
			var t = o.formatDateLicenseWithoutUtc(new Date);
			var a = o.getTimeStringWithoutUTC((new Date).getTime());
			this.registerDefine();
			var i = new jsPDF({
				format: "a3",
				orientation: "l",
				unit: "mm"
			});
			i.page = 1;
			this.setImageToDocument(i);
			i.setFontSize(14);
			i.setFontType("bold");
			i.text(120, 15, `PARTE DIARIA DE LICENCIAS DE TRABAJO AUTORIZADAS (${this.sSolbeg})`);
			i.setFontSize(8);
			i.text(360, 15, `Fecha del Impresion ${t} ${a} `);
			var s;
			var r = i.internal.pages;
			var n;
			if (this.society == "100") {
				s = [{
					dataKey: "LT"
				}, {
					dataKey: "Tplnr"
				}, {
					dataKey: "Equnr"
				}, {
					dataKey: "DescripcionEq"
				}, {
					dataKey: "TrabajoFS"
				}, {
					dataKey: "EntregaLT"
				}, {
					dataKey: "CancelaLT"
				}, {
					dataKey: "HPD"
				}, {
					dataKey: "HPH"
				}, {
					dataKey: "Comentarios"
				}];
				n = [{
					LT: "L.T",
					Tplnr: "E.T",
					Equnr: "Código de Equipo",
					DescripcionEq: "Descripción",
					TrabajoFS: "Trabajo con equipo F/S",
					EntregaLT: "Entrega LT",
					CancelaLT: "Cancela LT",
					HPD: "Horario previsto (Desde)",
					HPH: "Horario previsto (Hasta)",
					Comentarios: "Observaciones Cammesa"
				}]
			} else {
				s = [{
					dataKey: "LT"
				}, {
					dataKey: "Equnr"
				}, {
					dataKey: "Descripcion"
				}, {
					dataKey: "TrabajoFS"
				}, {
					dataKey: "HPD"
				}, {
					dataKey: "EntregaLT"
				}, {
					dataKey: "HPH"
				}, {
					dataKey: "CancelaLT"
				}, {
					dataKey: "Comentarios"
				}];
				n = [{
					LT: {
						content: "L.T.",
						rowSpan: 2,
						styles: {
							valign: "center"
						}
					},
					Equnr: {
						content: "Equipo",
						rowSpan: 1,
						styles: {
							valign: "center"
						}
					},
					Descripcion: {
						content: "Descripción",
						rowSpan: 1,
						styles: {
							valign: "center"
						}
					},
					TrabajoFS: {
						content: "Trabajo a realizar",
						rowSpan: 1,
						styles: {
							valign: "center"
						}
					},
					HPD: {
						content: "Horarios",
						colSpan: 4,
						styles: {
							halign: "center"
						}
					},
					Comentarios: {
						content: "Observaciones Cammesa",
						rowSpan: 2,
						styles: {
							valign: "center"
						}
					}
				}, {
					HPD: "Desde",
					EntregaLT: "Entregado",
					HPH: "Hasta",
					CancelaLT: "Cancelado"
				}]
			}
			i.autoTable({
				head: n,
				columns: s,
				body: e,
				startY: 25,
				margin: {
					horizontal: 7,
					top: 30,
					bottom: 60
				},
				bodyStyles: {
					valign: "top"
				},
				styles: {
					overflow: "linebreak",
					cellWidth: "wrap",
					tableWidth: 300
				},
				columnStyles: {
					Comentarios: {
						columnWidth: 80
					},
					text: {
						cellWidth: "auto"
					}
				}
			});
			var l = i.internal.getNumberOfPages();
			for (var c = 1; c <= l; c++) {
				i.setPage(c);
				i.text(392, 10, `Hoja: ${c}   De: ${i.internal.getNumberOfPages()}`)
			}
			i.save("PARTE DIARIA LT.pdf")
		},
		createPDFReportDiaryPart: function (e) {
			this.society === "100" ? "TRANSENER" : "TRANSBA";
			this.createPDF(e)
		},
		errorPDFReportDiaryPart: function (e) {},
		loadDeliveryDevolucionModelData: function (e) {
			c.getModel()
		},
		formatAndShowData: function (e) {
			this.loadDeliveryDevolucionModelData(e);
			var t = [];
			if (e.Descripcion) {
				t.push({
					text: "Descripción del trabajo: " + e.Descripcion,
					growFactor: 3
				})
			}
			if (e.Solictext) {
				t.push({
					text: "Comentarios del solicitante: " + e.Solictext
				})
			}
			if (e.Equiinterv) {
				t.push({
					text: "Equipo a Intervenir: " + e.Equiinterv
				})
			}
			if (e.interventionType) {
				t.push({
					text: "Intervenir: " + e.interventionType
				})
			}
			if (e.Tiemporep) {
				t.push({
					text: "Tiempo de Reposición: " + N.FormatTiempoRepText(e.Tiemporep)
				})
			}
			var a = e.Rdisparo === "X" ? "SI" : "NO";
			t.push({
				text: "Riesgo de Disparo: " + a
			});
			if (t.length) {
				this.getView().setModel(new sap.ui.model.json.JSONModel(e.dias), "preVisualization");
				this.showMsgStrip(t)
			}
		},
		showMsgStrip: function (e) {
			var t = this.byId("jobDescriptionPanelHBox");
			if (t.getItems().length) {
				t.destroyItems()
			}
			if (e.length) {
				this._generateMsgStrip(e)
			} else {
				this.getView().getModel("preVisualization").setData([])
			}
		},
		destroyMsgStrip: function () {
			var e = this.byId("msgStrip");
			if (e) {
				e.destroy()
			}
		},
		_generateMsgStrip: function (e) {
			var t = this.getView().byId("jobDescriptionPanelHBox");
			var a = this;
			e.forEach(function (e, o) {
				var i = new sap.m.MessageStrip({
					height: "100%",
					id: a.getView().createId("msgStrip" + o),
					text: e.text,
					showIcon: false,
					type: "Information",
					showCloseButton: false,
					layoutData: new sap.m.FlexItemData({
						baseSize: "0",
						growFactor: e.growFactor || 1
					})
				}).addStyleClass("customMessageStrip");
				t.addItem(i)
			})
		},
		decline: function () {},
		finishedBinding: function (e) {
			console.log("aja");
			var t = [];
			var a = null;
			var o = c.getModel("FilterSelectionJsonModel").getProperty("/checkedLic");
			var i = c.getModel("FilterSelectionJsonModel").getProperty("/checkedSol");
			if (o && i) {
				a = null
			} else if (o) {
				a = new sap.ui.model.Filter("Tipo", sap.ui.model.FilterOperator.Contains, "L")
			} else if (i) {
				a = new sap.ui.model.Filter("Tipo", sap.ui.model.FilterOperator.Contains, "S")
			}
			if (a) this.getLicenseTable().getBinding("items").filter([a])
		},
		changedChecks: function (e) {
			this.makeFilters(e)
		},
		loadEquipmentsModel: function () {
			var e = new sap.ui.model.json.JSONModel;
			var t = {};
			t.Equipos = [{
				key: 0,
				text: "Seleccione Estación"
			}];
			e.setData(t);
			this.getView().setModel(e, "Equipos")
		},
		loadStationsModel: function () {
			StationService.load(jQuery.proxy(this.onSuccessLoad("Estaciones"), this), jQuery.proxy(this.onErrorLoad("Estaciones"), this))
		},
		loadPersonsModel: function () {
			PersonsService.load(jQuery.proxy(this.onSuccessLoad("Persons"), this), jQuery.proxy(this.onErrorLoad("Persons"), this))
		},
		loadRepositionTimeModel: function () {
			L.getPromise().then(this.onSuccessLoad("RepositionTimes").bind(this), this.onErrorLoad("RepositionTimes").bind(this))
		},
		loadTipoIntModel: function () {
			C.getPromise().then(this.onSuccessLoad("TiposIntervencion").bind(this), this.onErrorLoad("TiposIntervencion").bind(this))
		},
		loadStacionalListModel: function () {
			F.getPromise().then(this.onSuccessLoad("EstacionalListSet").bind(this), this.onErrorLoad("EstacionalListSet").bind(this))
		},
		getEquiposModel: function () {
			var e = this.getView().getModel("Equipos");
			if (!e) {
				e = new sap.ui.model.json.JSONModel;
				e.setSizeLimit(9999);
				this.getView().setModel(e, "Equipos")
			}
			return e
		},
		onStationChanged: function (e) {
			var t = this.getEquiposModel();
			var a = e.getParameter("selectedItem").getBindingContext("Estaciones").getProperty("Equipos");
			a.unshift({
				key: "0",
				text: "Seleccione uno"
			});
			t.setData({
				Equipos: a
			})
		},
		loadRegionsModel: function () {
			RegionService.load(jQuery.proxy(this.onSuccessLoad("Regiones"), this), jQuery.proxy(this.onErrorLoad("Regiones"), this))
		},
		onSuccessLoad: function (e) {
			return function (t) {
				var a = t.results;
				var o = new sap.ui.model.json.JSONModel;
				var i = {};
				i[e] = a;
				c.getModel(e).setData(i)
			}
		},
		onErrorLoad: function (e) {
			return function (e) {}
		},
		onDetailOpen: function (e) {
			this.requestDialog = null;
			this.processingDialog = null;
			var t = e.getSource().getParent();
			var o = this.getView().getModel("LicenciaData").getData().LicenciaData[t.getParent().indexOfItem(t)];
			var i = o;
			i.type = o.tipo;
			i.principalTab = true;
			i.securityTab = false;
			i.commentsTab = false;
			i.tramitationTab = false;
			i.transferenceTab = false;
			i.deliveryAndNormlizationTab = false;
			i.observationsTab = false;
			var s = new sap.ui.model.json.JSONModel(i);
			a.to({
				pageId: "transener.sistemadeturnos.views.Main.Details.Details",
				model: s
			})
		},
		downloadLicenses: function () {
			O.open();
			var e = [];
			var t = this.getLicenseTable().getSelectedItems();
			if (t.length !== 0) {
				for (var a of t) {
					e.push(a.getBindingContext("LicencesListJsonModel").getObject())
				}
			} else {
				e = this.getView().getModel("LicencesListJsonModel").getData().Licenses
			}
			ReportesHelper.createExcelLicencias(e)
		},
		/*onDisableLicenses: function () {
					var items = this.byId("auditTable").getSelectedContexts();
				},*/
		/*onCancelledLicenses: function () {
					var items = this.byId("auditTable").getSelectedContexts();
				},*/
		clearAdvancedFilters: function () {
			m.createFiltersModel()
		},
		openAdvancedFilters: function () {
			var e = c.getModel("FiltersJsonModel");
			var t = c.getModel("HardCodeModel");
			var a = c.getModel("PersonalHabilitadoModel");
			var o = c.getModel("RepositionTimes");
			var s = "transener.sistemadeturnos.views.Main.Dialogs.advancedFilters";
			var r = this;
			var n = i.getComponent();
			var l = n.byId("App").byId(s);
			var d = c.getModel("SelectModel");
			var u = this.society;
			y.loadTipoEquipo(u);
			C.getPromise();
			if (!l) {
				var p = n.byId("App").createId(s);
				l = sap.ui.jsview(p, s);
				var g = new sap.m.Dialog({
					title: "Filtros Avanzados",
					contentWidth: "60%",
					modal: true,
					content: l,
					buttons: [new sap.m.Button({
						text: "Cancelar",
						icon: "sap-icon://decline",
						press: [r.closeAdvancedFilters, r]
					}).addStyleClass("buttonInverted floatLeft"), new sap.m.Button({
						text: "Limpiar",
						icon: "sap-icon://document",
						press: [r.clearAdvancedFilters, r]
					}).addStyleClass("buttonInverted floatLeft"), new sap.m.Button({
						text: "Aplicar",
						icon: "sap-icon://search",
						press: [r.makeFilters, r]
					}).addStyleClass("buttonInverted floatRight")]
				}).addStyleClass("customDialog");
				g.open();
				g.setModel(c.getModel("WorkPlacesJsonModel"), "WorkPlacesJsonModel");
				g.setModel(this.getView().getModel("GrupoPlanificador"), "GrupoPlanificador");
				g.setModel(c.getModel("TiposIntervencion"), "TiposIntervencion");
				g.setModel(c.getModel("TipoEquipoJsonModel"), "TipoEquipoJsonModel");
				g.setModel(d, "SelectModel");
				g.setModel(e, "FiltersJsonModel");
				g.setModel(t, "HardCodeModel");
				g.setModel(a, "PersonalHabilitadoModel");
				g.setModel(o, "RepositionTimes");
				g.setModel(this.getView().getModel("RepositionTimes"), "RepositionTimes");
				g.setModel(c.getModel("TipoLicFiltersModel"), "TipoLicFiltersModel");
				g.setModel(c.getModel("CheckAdvancedFiltersModel"), "CheckAdvancedFiltersModel");
				this.advancedFilters = g;
				if (g) {
					return true
				}
			} else {
				if (this.advancedFilters) {
					this.advancedFilters.setModel(a, "PersonalHabilitadoModel");
					this.advancedFilters.setModel(d, "SelectModel");
					this.advancedFilters.setModel(t, "HardCodeModel");
					this.advancedFilters.setModel(e, "FiltersJsonModel");
					this.advancedFilters.setModel(o, "RepositionTimes");
					this.advancedFilters.setModel(this.getView().getModel("RepositionTimes"), "RepositionTimes");
					this.advancedFilters.setModel(c.getModel("WorkPlacesJsonModel"), "WorkPlacesJsonModel");
					this.advancedFilters.setModel(this.getView().getModel("GrupoPlanificador"), "GrupoPlanificador");
					this.advancedFilters.setModel(c.getModel("TipoLicFiltersModel"), "TipoLicFiltersModel");
					this.advancedFilters.setModel(c.getModel("CheckAdvancedFiltersModel"), "CheckAdvancedFiltersModel");
					this.advancedFilters.open();
					return true
				}
			}
		},
		closeAdvancedFilters: function () {
			this.advancedFilters.close()
		},
		getFilterObject: function (e, t) {
			var a = {};
			switch (t) {
			case "0":
				a.attribute = "Senalestados";
				a.value = "X";
				break;
			case "1":
				a.attribute = "Senalalarmas";
				a.value = "X";
				break;
			case "2":
				a.attribute = "Senalmedicion";
				a.value = "X";
				break;
			case "3":
				a.attribute = "Precauciones";
				a.value = "X";
				break;
			case "4":
				a.attribute = "Senalninguna";
				a.value = "X";
				break;
			default:
				a.attribute = e;
				a.value = t;
				break
			}
			return a
		},
		generateAdvancedFilters: function () {
			var e = c.getModel("FiltersJsonModel");
			var t = e.getData();
			var a = [];
			for (var o in t) {
				if (t[o]["value"] !== null && t[o]["value"].constructor === Array) {
					var i = t[o]["value"];
					if (i.length !== 0) {
						var s = [];
						for (var r in i) {
							var n = this.getFilterObject(o, i[r]);
							s.push(new sap.ui.model.Filter(n.attribute, sap.ui.model.FilterOperator[t[o]["operator"]], n.value))
						}
						var l = new sap.ui.model.Filter({
							filters: s,
							and: true
						});
						a.push(l)
					}
				} else {
					if (this.acceptEmptyValues(o, t[o])) {
						if (t[o]["value"] !== null) {
							a.push(new sap.ui.model.Filter(o, sap.ui.model.FilterOperator[t[o]["operator"]], t[o]["value"]))
						}
					}
				}
			}
			var u = c.getModel("LocalFilterJsonModel").getData();
			if (u.WeekNumber) {
				let e = d.getDateOfWeek(u.WeekNumber, t.Anio.value || (new Date).getFullYear());
				let o = new Date(e.getTime() + 6 * 24 * 60 * 60 * 1e3);
				a.push(new sap.ui.model.Filter({
					path: "Solbeg",
					operator: sap.ui.model.FilterOperator.LE,
					value1: e
				}));
				a.push(new sap.ui.model.Filter({
					path: "Solend",
					operator: sap.ui.model.FilterOperator.GE,
					value1: o
				}));
				a.push(new sap.ui.model.Filter({
					path: "Idfinal",
					operator: sap.ui.model.FilterOperator.GE,
					value1: "X"
				}))
			} else {
				if (u.Solbeg) {
					a.push(new sap.ui.model.Filter({
						path: "Solbeg",
						operator: sap.ui.model.FilterOperator.LE,
						value1: u.Solbeg
					}))
				}
				if (u.Solend) {
					a.push(new sap.ui.model.Filter({
						path: "Solend",
						operator: sap.ui.model.FilterOperator.GE,
						value1: u.Solend
					}))
				}
			}
			if (u.Solbeg2) {
				a.push(new sap.ui.model.Filter({
					path: "Fechainicio",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: u.Solbeg2
				}))
			}
			return a
		},
		acceptEmptyValues: function (e, t) {
			switch (e) {
			case "Substatus":
				var a = c.getModel("FiltersJsonModel").getData();
				var o = a.Licstat.value;
				if (t.value === "" && o === "01") {
					t.value = "Z";
					return true
				} else {
					if (t.value !== "") {
						return true
					} else {
						return false
					}
				}
				return true;
			case "Equstatnocam":
			case "Equstat":
				return true;
			case "Bloqueo":
				return true;
			case "Rdisparo":
				return true;
			default:
				return t.value !== ""
			}
		},
		onClearFilter: function () {
			var e = this.getView().byId("auditTable");
			var t = e.getBinding("rows");
			var a = [];
			t.filter(a)
		},
		onCleanFilters: function () {
			c.getModel("EnabledFilterLicstat").setData({
				enabled: true
			});
			var e = I.getAppPath();
			c.getModel("LocalFilterJsonModel").setData({});
			var t = c.getModel("FiltersJsonModel");
			t.loadData(e + "model/FiltersJsonModel.json", "", false);
			var a = [];
			a.push(new sap.ui.model.Filter({
				path: "Empresa",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: this.society
			}));
			f.GET(a);
			this.localFiltering();
			c.getModel("filtrosAplicadosTextVisibleModel").setProperty("/Data", false);
			this.cleanSelections()
		},
		validateLicenseStatus: function () {
			var e = c.getModel("FiltersJsonModel").getData();
			var t = e.Licstat.value;
			if (t === "90" || t === "91" || t === "92" || t === "10") {
				e.Licstat.value = "01"
			}
		},
		makeFilters: function (e) {
			this._oActGrowInfo = this.getView().byId("auditTable").getGrowingInfo().actual;
			if (typeof e === "number") {
				var t = c.getModel("vistaSeleccionada").getData().vista;
				if (t === "undefined") {
					t = 0
				}
			} else {
				t = e.getSource().mProperties.key !== undefined ? e.getSource().getProperty("key") : "0"
			}
			c.getModel("vistaSeleccionada").setData({
				vista: t
			});
			this.validateLicenseStatus();
			if (this.advancedFilters) {
				this.advancedFilters.close()
			}
			var a = this.generateAdvancedFilters();
			a.push(new sap.ui.model.Filter({
				path: "Empresa",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: this.society
			}));
			a.push(new sap.ui.model.Filter({
				path: "Vista",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: t
			}));
			if (t === "2" || t === "1") {
				var o = true
			} else {
				o = false
			}
			f.GETWithFilters(a, o);
			this.localFiltering();
			this.cleanSelections()
		},
		cleanSelections: function () {
			this.getView().byId("auditTable").removeSelections(true)
		},
		getEval: function (e) {
			var t = e;
			var a = c.getModel("LocalFilterJsonModel").getData();
			var o = [];
			for (var i in t) {
				if (i === "Tplnr" && t["Tplnr"].values !== undefined) {
					o.push({
						attribute: i,
						value: t[i].values[0]
					})
				}
				o.push({
					attribute: i,
					value: t[i].value
				})
			}
			for (var i in a) {
				o.push({
					attribute: i,
					value: a[i]
				})
			}
			var s = o.some(function (e) {
				if (e.attribute === "Equstat" || e.attribute === "Equstatnocam") {
					return e.value === "" || e.value === "X"
				} else if (e.attribute === "Aro") {
					return e.value !== "Z"
				} else {
					return e.value !== undefined && e.value !== null && e.value !== "" && e.value !== " " && e.value.length !== 0 && e.value !==
						"N"
				}
			});
			if (s) {
				return true
			} else {
				return false
			}
		},
		setColor: function () {
			var e = c.getModel("FiltersJsonModel").getData();
			var t = e.Werks.value !== "";
			var a = $.extend({}, c.getModel("FiltersJsonModel").getData());
			delete a.Werks;
			if (t && !this.getEval(a)) {
				return "yellow"
			}
			if (!t && this.getEval(a)) {
				return "red"
			}
			if (t && this.getEval(a)) {
				return "red"
			}
			if (!t && !this.getEval(a)); {
				return "white"
			}
			return "white"
		},
		localFiltering: function () {
			var e = c.getModel("FiltersJsonModel").getData();
			var t = c.getModel("LocalFilterJsonModel").getData();
			var a = [];
			for (var o in e) {
				if (o === "Tplnr" && e["Tplnr"].values !== undefined) {
					a.push({
						attribute: o,
						value: e[o].values[0]
					})
				}
				a.push({
					attribute: o,
					value: e[o].value
				})
			}
			for (var o in t) {
				a.push({
					attribute: o,
					value: t[o]
				})
			}
			var i = a.some(function (e) {
				if (e.attribute === "Equstat" || e.attribute === "Equstatnocam") {
					return e.value === "" || e.value === "X"
				} else if (e.attribute === "Aro") {
					return e.value !== "Z"
				} else {
					return e.value !== undefined && e.value !== null && e.value !== "" && e.value !== " " && e.value.length !== 0 && e.value !==
						"N"
				}
			});
			if (i) {
				c.getModel("filtrosAplicadosTextVisibleModel").setProperty("/Data", true)
			} else {
				c.getModel("filtrosAplicadosTextVisibleModel").setProperty("/Data", false)
			}
			c.getModel("ColorModel").setProperty("/Color", this.setColor());
			let s = e.Tipoequipo.values;
			let r = [];
			if (s && s.length) {
				let e = [];
				s.forEach(t => {
					e.push(new sap.ui.model.Filter({
						path: "Tipoequipo",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: t
					}))
				});
				let t = new sap.ui.model.Filter(e, false);
				r.push(t);
				this.tipoEquiposFilter = t
			} else {
				this.tipoEquiposFilter = null
			}
			let n = e.Tplnr.values;
			if (n && n.length) {
				let e = [];
				n.forEach(t => {
					e.push(new sap.ui.model.Filter({
						path: "Tplnr",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: t
					}))
				});
				let t = new sap.ui.model.Filter(e, false);
				r.push(t);
				this.estacionesFilter = t
			} else {
				this.estacionesFilter = null
			}
			let l = (new Date).getTimezoneOffset() * 60 * 1e3;
			if (t.WeekNumber) {
				var u = e.Anio.value ? e.Anio.value : (new Date).getFullYear();
				var p = d.getDateOfWeek(t.WeekNumber, u);
				var g = new Date(new Date(p).setDate(p.getDate() + 7));
				this.localFilters.fechaInicio = p ? new sap.ui.model.Filter({
					path: "Solbeg",
					operator: sap.ui.model.FilterOperator.GE,
					value1: new Date(p - l)
				}) : null;
				this.localFilters.fechaFin = g ? new sap.ui.model.Filter({
					path: "Solend",
					operator: sap.ui.model.FilterOperator.LE,
					value1: new Date(g - l)
				}) : null
			} else {
				this.localFilters.fechaInicio = t.Solbeg ? new sap.ui.model.Filter({
					path: "Solbeg",
					operator: sap.ui.model.FilterOperator.LE,
					value1: new Date(t.Solbeg)
				}) : null;
				this.localFilters.fechaFin = t.Solend ? new sap.ui.model.Filter({
					path: "Solend",
					operator: sap.ui.model.FilterOperator.GE,
					value1: new Date(t.Solend)
				}) : null
			}
			if (this.textSearchFilter) r.push(this.textSearchFilter);
			if (this.tipoLicenciaFilter) r.push(this.tipoLicenciaFilter);
			this.getView().byId("auditTable").getBinding("items").filter(r)
		},
		//AppManagementHelper.getModel("LicenseJsonModel").setData(oLicense);
		//LicenseService.FIND(licencia);
		setLicenseType: function (e) {
			if (e === "licencia") {
				this.addStyleClass("isLicense");
				this.removeStyleClass("isRequest");
				return "sap-icon://form"
			} else {
				this.addStyleClass("isRequest");
				this.removeStyleClass("isLicense");
				return "sap-icon://request"
			}
		},
		setStatusColor: function (e, t) {
			this.toggleStyleClass("acceptedStatus", e == "01" || e === "28");
			this.toggleStyleClass("cancelledStatus", e == "04" || e == "10" || e == "11");
			this.toggleStyleClass("rejectedStatus", e == "06");
			this.toggleStyleClass("disabledStatus", e == "03");
			this.toggleStyleClass("observedStatus", e == "02");
			this.toggleStyleClass("deliveredStatus", e == "08" || e == "30" || e == "05");
			this.toggleStyleClass("inTransit", e == "23");
			this.toggleStyleClass("toCoordinateStatus", e == "09");
			this.toggleStyleClass("toTramitacion", e == "07");
			if (e === "01") {
				this.toggleStyleClass("deliveredStatusAutorized", t === "E");
				this.toggleStyleClass("cancelledStatus", t === "F");
				return N.getApprovalSubstatus(e, t)
			} else {
				return N.getStatusName(e)
			}
		},
		dateToDayMonthYear: function (e) {
			return e ? e.toISOString().slice(0, 10) : ""
		},
		dateRangeTime: function (e, t) {
			return (e ? e.toISOString().slice(11, 16) : "") + " - " + (t ? t.toISOString().slice(11, 16) : "")
		},
		setLicenseTable: function (e) {
			this._oLicenseTable = e
		},
		getLicenseTable: function () {
			return this._oLicenseTable
		},
		cleanInputSearch: function (e) {
			var t = [];
			if (e.getParameter("value") === "") {
				if (!sap.ui.getCore().byId("licenseFilter").getSelected()) {
					t.push(new sap.ui.model.Filter("Tipo", sap.ui.model.FilterOperator.Contains, "S"))
				}
				if (!sap.ui.getCore().byId("requestFilter").getSelected()) {
					t.push(new sap.ui.model.Filter("Tipo", sap.ui.model.FilterOperator.Contains, "L"))
				}
				this.getLicenseTable().getBinding("items").filter(t)
			}
		},
		downloadNegreo: function (e) {
			if (window.define) {
				var t = define.amd;
				define.amd = false
			}
			jQuery.sap.registerModulePath("index", "https://unpkg.com/jspdf@1.5.3/dist/");
			jQuery.sap.require({
				modName: "index.jspdf",
				type: "debug"
			});
			if (window.define) define.amd = t;
			var a = new jsPDF("p", "pt", [595, 1600], true);
			console.log(a);
			a.rect(20, 50, 550, 1500);
			a.rect(20, 50, 550, 60);
			a.setLineWidth(.5);
			a.line(205, 50, 205, 110);
			a.line(380, 50, 380, 110);
			a.text(30, 80, "LOGO TRANSENER.");
			a.setFontSize(12);
			a.text(250, 75, "SOLICITUD DE");
			a.text(220, 100, "LICENCIA DE TRABAJO");
			a.setFontSize(20);
			a.text(400, 90, "N°: 2019-1546");
			a.setFontSize(10);
			a.text(30, 130, "Fecha:");
			a.text(70, 130, "27/02/2019");
			a.setFontSize(10);
			a.text(30, 150, "Solicitante:");
			a.text(80, 150, "GARRIDO, Roberto Raúl ");
			a.setFontSize(10);
			a.text(250, 150, "Jefe de Trabajo:");
			a.text(330, 150, " ANGELONI, Julio César");
			a.setFontSize(10);
			a.text(250, 170, "Jefe de Trabajo Suplente:");
			a.text(365, 170, "MONACO, Antonio");
			a.setFontSize(10);
			a.text(250, 190, "Recibio:");
			a.text(350, 190, "Recibio");
			a.setFontSize(10);
			a.text(250, 210, "ET:");
			a.text(280, 210, "Recibio");
			a.setFontSize(10);
			a.text(30, 190, "Transmitio:");
			a.text(80, 190, "ANGELONI, Julio César");
			a.setFontSize(10);
			a.text(30, 210, "Equipo");
			a.text(80, 210, "5EZHE1");
			a.setFontSize(10);
			a.text(30, 230, "Trabajos a Realizar");
			a.text(120, 230, "5EZHE1");
			a.setFontSize(10);
			a.text(30, 310, "Del Día:");
			a.text(80, 310, "Jueves");
			a.setFontSize(10);
			a.text(30, 330, "Al Día:");
			a.text(80, 330, "Viernes");
			a.setFontSize(10);
			a.text(200, 310, "Fecha:");
			a.text(240, 310, "28/02/2019");
			a.setFontSize(10);
			a.text(200, 330, "Fecha:");
			a.text(240, 330, "15/03/2019");
			a.setFontSize(10);
			a.text(350, 310, "Hora:");
			a.text(390, 310, "16:00");
			a.setFontSize(10);
			a.text(350, 330, "Hora:");
			a.text(390, 330, "16:00");
			a.rect(20, 355, 250, 20);
			a.text(30, 370, "CONDICIONES DEL TRABAJO");
			a.setLineWidth(1);
			a.line(270, 360, 580, 360);
			a.text(30, 390, "Seguridad:");
			a.text(90, 390, "Respuesta");
			a.text(30, 410, "Tierras Adicionales:");
			a.text(120, 410, "Respuesta");
			a.text(220, 410, "Tiempo de Reposición:");
			a.text(330, 410, "Respuesta");
			a.rect(20, 425, 250, 20);
			a.text(30, 440, "MEDIDAS DE SEGURIDAD");
			a.setLineWidth(1);
			a.line(270, 430, 580, 430);
			a.setFontSize(10);
			a.setFont("times");
			a.text(30, 470, "Condiciones especiales");
			a.text(30, 485, "Riesgo de Disparo");
			a.text(30, 515, "Interruptores abiertos y en local");
			a.text(30, 530, "Seccionadores Abiertos Bloqueados y");
			a.text(30, 545, "Trabados");
			a.text(30, 560, "Sec. de Puesta a Tierra Cerrados");
			a.text(30, 575, "Bloqueo de Recierres");
			a.text(30, 590, "Interruptores que no deben operarse");
			a.text(30, 605, "Otras Precauciones de Seguridad /");
			a.text(30, 620, "Puestas a Tierra Adicionales");
			a.text(30, 635, "Se maniobraran equipos");
			a.text(30, 650, "/ Pruebas Funcionales");
			a.setFont("helvetica");
			a.rect(30, 670, 110, 20);
			a.text(40, 685, "SEÑALES");
			a.setLineWidth(1);
			a.line(140, 680, 580, 680);
			a.setFont("times");
			a.text(40, 710, "Estados");
			a.text(90, 710, "NO");
			a.text(40, 725, "Alarmas");
			a.text(90, 725, "SI");
			a.text(130, 710, "Mediciones");
			a.text(180, 710, "NO");
			a.text(130, 725, "Desmarca");
			a.text(180, 725, "NO");
			a.rect(20, 740, 250, 20);
			a.setFont("helvetica");
			a.text(30, 750, "AUTORIZACION");
			a.setLineWidth(1);
			a.line(270, 745, 580, 745);
			a.setFont("times");
			a.text(30, 780, "Autorización");
			a.text(30, 795, "Fecha");
			a.text(30, 810, "Autorizado por");
			a.text(30, 825, "Recibió");
			a.rect(20, 840, 550, 60);
			a.rect(20, 840, 150, 20);
			a.setFont("helvetica");
			a.setFontSize(9);
			a.text(50, 850, "COORDINACION");
			a.rect(420, 840, 150, 20);
			a.setFont("helvetica");
			a.setFontSize(9);
			a.text(450, 850, "sin limitacion");
			a.setFont("times");
			a.setFontSize(9);
			a.text(30, 880, "Empresa");
			a.text(80, 880, "Fecha");
			a.text(130, 880, "Hora");
			a.text(180, 880, "Aviso");
			a.text(230, 880, "Recibio");
			a.text(280, 880, "Fecha");
			a.text(330, 880, "Aut Hora");
			a.text(380, 880, "Autorizo");
			a.text(430, 880, "Recibio");
			a.text(480, 880, "Autorizado");
			a.rect(20, 920, 550, 50);
			a.text(30, 935, "Sector");
			a.text(130, 935, "Sector");
			a.text(380, 935, "Fecha");
			a.text(480, 935, "Usuario");
			a.rect(30, 990, 530, 90);
			a.rect(40, 1e3, 150, 25);
			a.line(195, 1010, 560, 1010);
			a.setFont("helvetica");
			a.setFontSize(8);
			a.text(55, 1010, "ENTREGAS Y NORMALIZACIONES");
			a.text(55, 1020, "DIARIAS DEL EQUIPO");
			a.text(60, 1040, "Numero Licencia");
			a.text(180, 1040, "Año:");
			a.text(100, 1055, "ENTREGADO");
			a.text(60, 1065, "Fecha/Hora");
			a.text(110, 1065, "CC");
			a.text(160, 1065, "Tecnico/JT/JTG");
			a.text(240, 1065, "Folio");
			a.text(290, 1065, "Licencia");
			a.text(345, 1065, "Fecha/Hora");
			a.text(395, 1065, "CC");
			a.text(440, 1065, "Tecnico/JT/JTG");
			a.line(330, 1010, 330, 1080);
			a.rect(40, 1090, 150, 25);
			a.rect(30, 1090, 530, 60);
			a.line(195, 1100, 560, 1100);
			a.text(40, 1105, "TRANSFERENCIA");
			a.text(40, 1130, "Nuevo jefe de Trabaj");
			a.text(240, 1130, "Fecha");
			a.text(380, 1130, "Hora");
			a.rect(40, 1170, 150, 25);
			a.setFontSize(8);
			a.text(50, 1190, "OBSERVACIONES");
			a.line(195, 1180, 570, 1180);
			a.line(195, 1210, 550, 1210);
			a.line(195, 1230, 550, 1230);
			a.output("dataurlnewwindow")
		},
		removeJump: function (e) {
			return e.replace(/(\r\n|\n|\r)/gm, " ")
		},
		rolEdition: function (e, t) {
			return B.rolEdition(e, t)
		},
		rolVisualization: function (e, t) {
			return B.rolVisualization(e, t)
		},
		setDupState: function (e) {
			return e === "L"
		},
		loadStatusModel: function () {
			let e = new sap.ui.model.json.JSONModel({
				statuses: w.get()
			});
			this.getView().setModel(e, "StatusModel")
		},
		reportLicenseComparison: function () {
			let e = this.getLicenseTable().getSelectedContexts().map(e => e.getObject());
			if (e.length === 0) {
				new sap.m.MessageToast.show("No ha seleccionado solicitudes/Licencias");
				return
			}
			for (var t of e) {
				if (t.Tipo === "S") {
					new sap.m.MessageToast.show("No es posible comparar solicitudes con licencias");
					return
				}
			}
			ReportesHelper.licenseComparison(e)
		},
		exportMultipleLics: function () {
			var e = this.getLicenseTable().getSelectedContexts().map(e => e.getObject());
			$.map(e => e.getObject());
			if (e.length === 0) {
				new sap.m.MessageToast.show("No ha seleccionado Solicitudes/Licencias");
				O.close();
				return
			}
			var t = c.getModel("ExportMultiLicsModel");
			t.setData({
				ExportType: true
			});
			this.reportDialog = new sap.m.Dialog({
				type: sap.m.DialogType.Message,
				title: "Exportar",
				escapeHandler: function (e) {
					e.reject()
				},
				content: [new sap.m.VBox({
					items: [new sap.m.RadioButtonGroup({
						columns: 2,
						buttons: [new sap.m.RadioButton({
							text: "Normal",
							selected: "{ExportMultiLicsModel>/ExportType}"
						}), new sap.m.RadioButton({
							text: "Simplificado",
							selected: "{= !${ExportMultiLicsModel>/ExportType}}"
						})]
					})]
				})],
				buttons: [new sap.m.Button({
					icon: "sap-icon://save",
					type: sap.m.ButtonType.Emphasized,
					text: "Aceptar",
					press: [this.downloadExportMultipleLics, this]
				}), new sap.m.Button({
					icon: "sap-icon://decline",
					type: sap.m.ButtonType.Emphasized,
					text: "Cerrar",
					press: [this.closeReportDialog, this]
				})]
			});
			this.reportDialog.setModel(t, "ExportMultiLicsModel");
			this.reportDialog.open()
		},
		downloadExportMultipleLics: function () {
			var e = this.getLicenseTable().getSelectedContexts().map(e => e.getObject());
			let t = c.getModel("ExportMultiLicsModel").getData();
			if (t.ExportType) {
				O.open();
				P.getLicenciasFullData(e).then(e => {
					var a = e;
					a.map(function (e) {
						var a = {
							results: []
						};
						var o = e;
						var i = e.EntregasLicencia_nav.results;
						var s = e.DevolucionLicencia_nav.results;
						var r = e.SuspensionLicencia_nav.results;
						var n = e.ReanudacionLicencia_nav.results;
						var l = e.ObservacionesLicencia_nav.results;
						var d = e.CoordinacionesLicencia_nav.results;
						var p = e.TramitacionesLicencia_nav.results;
						var g = e.TransferenciaJefeTrabajo_nav.results;
						o.Timbeg = new Date(new Date(e.Timbeg.ms).getTime() + new Date(e.Timbeg.ms).getTimezoneOffset() * 60 * 1e3);
						o.Timend = new Date(new Date(e.Timend.ms).getTime() + new Date(e.Timend.ms).getTimezoneOffset() * 60 * 1e3);
						f.getUnifilares(o, e => {
							if (o.Id === undefined) {
								o.Id = c.getModel("LicenciaClonadaID").getData().IdClonada
							}
							var a = {
								TipintervText: o.Tipinterv ? c.getModel("TiposIntervencion").getData().TiposIntervencion.filter(e => e.Clave === o.Tipinterv)[
									0].Descripcion : ""
							};
							var m = u.createPdfLicense(e, o, i, s, r, n, l, d, p, g, a, t.ExportType)
						}, e => {
							console.log(e)
						}, {
							$select: "Nombre,Idunifilar,NumVersion,Region,TipoUnifilar,Et,Empresa,Anio,Region,IntAbLe,SecAbBt,SecPatCr,PatAdic,Numerolicencia,Imagenunifilar,Doctype"
						})
					})
				})
			} else {
				this._donwloadPfdSimplificado()
			}
		},
		_donwloadPfdSimplificado: function () {
			var e = this.getLicenseTable().getSelectedContexts().map(e => e.getObject());
			let t = c.getModel("ExportMultiLicsModel").getData();
			O.open();
			P.getLicenciasFullData(e).then(e => {
				var a = e;
				var o = [];
				a.map(function (e) {
					var a = e;
					var i = e.EntregasLicencia_nav.results;
					var s = e.DevolucionLicencia_nav.results;
					var r = e.SuspensionLicencia_nav.results;
					var n = e.ReanudacionLicencia_nav.results;
					var l = e.ObservacionesLicencia_nav.results;
					var c = e.CoordinacionesLicencia_nav.results;
					var d = e.TramitacionesLicencia_nav.results;
					var p = e.TransferenciaJefeTrabajo_nav.results;
					var g = {
						TipintervText: ""
					};
					a.Timbeg = new Date(new Date(e.Timbeg.ms).getTime() + new Date(e.Timbeg.ms).getTimezoneOffset() * 60 * 1e3);
					a.Timend = new Date(new Date(e.Timend.ms).getTime() + new Date(e.Timend.ms).getTimezoneOffset() * 60 * 1e3);
					var m = u.createPdfLicense([], a, i, s, r, n, l, c, d, p, g, t.ExportType);
					o.push(m)
				});
				for (let e = 0; e < o.length; e++) {
					if (e < o.length - 1) {
						o[e][o[e].length - 1]["pageBreak"] = "after"
					}
				}
				var i = {
					content: o
				};
				var s = "Reporte simplificado";
				pdfMake.createPdf(i).download(s);
				O.close()
			})
		},
		sorterLicenses: function () {
			var e = c.getModel("OrderNumberJsonModel").getData().Odering;
			var t = e !== "up" ? "asc" : "desc";
			var a = c.getModel("LicencesListJsonModel").getData().Licenses;
			var o = _.orderBy(a, ["Anio", "Id"], [t, t]);
			c.getModel("LicencesListJsonModel").setData({
				Licenses: o
			});
			if (e === "up") {
				c.getModel("OrderNumberJsonModel").setData({
					Odering: "down"
				})
			} else {
				c.getModel("OrderNumberJsonModel").setData({
					Odering: "up"
				})
			}
		},
		loadGrupoPlanificador: function (e) {
			let t = c.getModel("FiltersJsonModel").getData().Werks.value;
			if (t === "") {
				c.getModel("FiltersJsonModel").setProperty("/Werks/value", "")
			}
			x.loadModel(t)
		},
		goToGantt: function () {
			window.open("#" + "Gantt_Licencias-Display?Empresa=" + this.society)
		},
		onCreateShiftPress: function () {
			this.openDialog("transener.sistemadeturnos.fragments.newShift")
		},
		openDialog: function (e) {
			if (H) {
				H.destroy()
			}
			t.load({
				name: e,
				controller: this
			}).then(function (e) {
				H = e;
				this.getView().addDependent(H);
				H.open()
			}.bind(this))
		},
		closeDialog: function () {
			if (H) {
				H.close()
			}
		},
		onCountItems: function (e) {
			let t = 0;
			let a = 0;
			let o = 0;
			e.results.forEach(e => {
				if (e.Jobcond === "01" || e.Jobcond === "02" || e.Jobcond === "04") {
					t++
				} else if (e.Jobcond === "05") {
					a++
				} else if (e.Jobcond === "03" || e.Jobcond === "06") {
					o++
				}
			});
			const i = t + a + o;
			const s = {
				LTWithManouvers: t,
				LTWithoutManouvers: a,
				TCT: o,
				Total: i
			};
			console.log(s);
			const r = new sap.ui.model.json.JSONModel(s);
			this.getView().setModel(r, "countsModel")
		}
	})
});