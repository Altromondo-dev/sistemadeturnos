// 	"transener/sistemadeturnos/services/LicenseService",
// 	FioriComponentHelper, LicenseService, FioriHelper, BusyDialogHelper, EquiposService, LegacyValidationHelper) {
// 		validURLToLicense: function (sUrlParam) {
// 		getURLLicenseData: function (sKey) {
// 				var oLicenseData = {
// 				return oLicenseData;
// 		setComments: function (oLicense) {
// 			if (oLicense.Comments === "") {
// 				sValue += oLicense.R500kv === "X" ? " Requiere calle 500 kV abierta: Si, " : "";
// 				sValue += oLicense.Bloqueo === "X" ? " Bloqueo de recierre: Si, " : "";
// 				sValue += oLicense.Barrafs === "X" ? " Requiere Barra F/S: Si, Barra Especificada: " + oLicense.Barrafstx + " " : "";
// 				let oDate = FormatHelper.formatDate(oLicense.Solend);
// 				sValue = sValue + " Equipo a Intervenir: " + oLicense.Equiinterv + " ";
// 				sValue = sValue + " Trabajo a realizar " + oLicense.Descripcion + " ";
// 				sValue = sValue + " Finaliza:" + oDate + " LT Nº " + oLicense.Id + " ";
// 				oLicense.Comments = sValue;
// 		getCommentsReports: function (oLicense) {
// 			if (oLicense.Comments === "") {
// 				sValue += oLicense.R500kv === "X" ? " Requiere calle 500 kV abierta: Si, " : "";
// 				sValue += oLicense.Bloqueo === "X" ? " Bloqueo de recierre: Si, " : "";
// 				sValue += oLicense.Barrafs === "X" ? " Requiere Barra F/S: Si, Barra Especificada: " + oLicense.Barrafstx + " " : "";
// 				let oDate = FormatHelper.formatDate(oLicense.Solend);
// 				sValue = sValue + " Equipo a Intervenir: " + oLicense.Equiinterv + " ";
// 				sValue = sValue + " Trabajo a realizar " + oLicense.Descripcion + " ";
// 				sValue = sValue + " Finaliza:" + oDate + " LT Nº " + oLicense.Id + " ";
// 				sValue = sValue + " / " + oLicense.Tdtcomments;
// 				return oLicense.Comments + " / " + oLicense.Tdtcomments;
// 		isLicense: function () {
// 			var oLicense = AppManagementHelper.getModel("LicenseJsonModel").getData();
// 			return (oLicense.Solbeg !== null && oLicense.Timend !== null && oLicense.Solend !== null && oLicense.Timbeg !== null && oLicense.Arbpl !==
// 				"" && oLicense.Solicitante !== "" &&
// 				oLicense.Equstatnocam !== "" && oLicense.Jobcond !== "" && oLicense.Equiinterv !== "" && oLicense.Descripcion !== "" && oLicense.R500kv !==
// 				"" && oLicense.Barrafs !== "" && oLicense.Bloqueo !==
// 				"" && oLicense.Werks !== "" && oLicense.Aufnr !== "" && oLicense.SolSuplente !== "" && oLicense.Jefe !== "" && oLicense.JefeSuplente !==
// 				"" && oLicense.Tipinterv !== "" && oLicense.Perestac !==
// 				"" && oLicense.Solictext !== "");
// 			var oLicense = AppManagementHelper.getModel("LicenseJsonModel").getData();
// 			return (oLicense.Solbeg !== null && oLicense.Timend !== null && oLicense.Solend !== null && oLicense.Timbeg !== null && oLicense.Arbpl !==
// 				"" && oLicense.Solicitante !== "" &&
// 				oLicense.Equstatnocam !== "" && oLicense.Jobcond !== "" && oLicense.Equiinterv !== "" && oLicense.Descripcion !== "" && oLicense.R500kv !==
// 				"" && oLicense.Barrafs !== "" && oLicense.Bloqueo !==
// 		generateSuspentionReanudation: function (oLicense) {
// 			if (oLicense.SuspensionLicencia_nav.length > 0) {
// 				this.formatUTCDates(oLicense.SuspensionLicencia_nav)
// 				aSuspention = aSuspention.concat(oLicense.SuspensionLicencia_nav)
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					//	Datelicencia: new Date() > FormatHelper.formatDatesGMT(oLicense.Solbeg) && new Date() < FormatHelper.formatDatesGMT(oLicense.Solend) ?
// 					//		new Date() : oLicense.Solend, //oLicense.Solbeg,
// 					Id: oLicense.Id,
// 					Tecnicoet: this.getDeliveryLastPerson(oLicense.Period, oLicense.EntregasLicencia_nav),
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "S")
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					//	Datelicencia: new Date() > FormatHelper.formatDatesGMT(oLicense.Solbeg) && new Date() < FormatHelper.formatDatesGMT(oLicense.Solend) ?
// 					//	new Date() : oLicense.Solend, //oLicense.Solbeg,
// 					Id: oLicense.Id,
// 					Tecnicoet: this.getDeliveryLastPerson(oLicense.Period, oLicense.EntregasLicencia_nav),
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "S")
// 			if (oLicense.ReanudacionLicencia_nav.length > 0) {
// 				this.formatUTCDates(oLicense.ReanudacionLicencia_nav)
// 				aReanudation = aReanudation.concat(oLicense.ReanudacionLicencia_nav)
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					//Datelicencia: new Date() > FormatHelper.formatDatesGMT(oLicense.Solbeg) && new Date() < FormatHelper.formatDatesGMT(oLicense.Solend) ?
// 					//	new Date() : oLicense.Solend, //oLicense.Solbeg,
// 					Id: oLicense.Id,
// 					Tecnicoet: this.getDeliveryLastPerson(oLicense.Period, oLicense.EntregasLicencia_nav),
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "R")
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					//	Datelicencia: new Date() > FormatHelper.formatDatesGMT(oLicense.Solbeg) && new Date() < FormatHelper.formatDatesGMT(oLicense.Solend) ?
// 					//		new Date() : oLicense.Solend, //oLicense.Solbeg,
// 					Id: oLicense.Id,
// 					Tecnicoet: this.getDeliveryLastPerson(oLicense.Period, oLicense.EntregasLicencia_nav),
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "R")
// 			LegacyValidationHelper.validateLegaciesFromSuspentionReanudation(oLicense, aSuspention);
// 			LegacyValidationHelper.validateLegaciesFromSuspentionReanudation(oLicense, aReanudation);
// 		generateDeliveryDevolution: function (oLicense) {
// 			if (oLicense.Period === "C") {
// 				if (oLicense.EntregasLicencia_nav.length > 0) {
// 					let aCloneEntregas = jQuery.extend(true, [], oLicense.EntregasLicencia_nav);
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					Datelicencia: new Date() > FormatHelper.formatDatesGMT(oLicense.Solbeg) && new Date() < FormatHelper.formatDatesGMT(oLicense.Solend) ?
// 						new Date() : oLicense.Solend,
// 					Id: oLicense.Id,
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "E"),
// 				var oDevolutionFromService = oLicense.DevolucionLicencia_nav.length ? oLicense.DevolucionLicencia_nav.shift() : null;
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					Datelicencia: new Date() > FormatHelper.formatDatesGMT(oLicense.Solbeg) && new Date() < FormatHelper.formatDatesGMT(oLicense.Solend) ?
// 						new Date() : oLicense.Solend,
// 					Id: oLicense.Id,
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "D"),
// 				if (oLicense.EntregasLicencia_nav.length > 0) {
// 					let aCloneEntregas = jQuery.extend(true, [], oLicense.EntregasLicencia_nav);
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					Datelicencia: new Date() > oLicense.Solbeg && new Date() < oLicense.Solend ? new Date() : oLicense.Solend,
// 					Id: oLicense.Id,
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "E") && oLicense.Licstat !== "11",
// 				if (oLicense.DevolucionLicencia_nav.length > 0) {
// 					let aCloneDevoluciones = jQuery.extend(true, [], oLicense.DevolucionLicencia_nav);
// 					Anio: oLicense.Anio,
// 					Empresa: oLicense.Empresa,
// 					Datelicencia: new Date().getTime() < oLicense.Solbeg.getTime() ? oLicense.Solbeg : new Date(), //null,
// 					Id: oLicense.Id,
// 					enabled: this.getEnabledEstatusDelivery(oLicense.Period, oLicense.Substatus, "D"),
// 			LegacyValidationHelper.validateLegaciesFromDeliveryDevolution(oLicense, aDelivery);
// 			LegacyValidationHelper.validateLegaciesFromDeliveryDevolution(oLicense, aDevolution);
// 				fd: oLicense.Period === "C" ? !aDelivery.some(e => e.Entindex && e.Entindex !== "" && e.Motivono === "") : true
// 		setPersonalHabilitadoParaCboEntraga: function (oLicense) {
// 			var oJefe = aDataTODOS.find(oItem => oItem.Legajo === oLicense.Jefe);
// 			var oJefeSuplente = aDataTODOS.find(oItem => oItem.Legajo === oLicense.JefeSuplente);
// 			if (oLicense.TransferenciaJefeTrabajo_nav.length > 0) {
// 				var oLastTranfer = oLicense.TransferenciaJefeTrabajo_nav[oLicense.TransferenciaJefeTrabajo_nav.length - 1];
// 		setPersonalHabilitadoParaCboDevolucion: function (oLicense) {
// 			if (oLicense.EntregasLicencia_nav.length > 0) {
// 				var oLastEntrega = oLicense.EntregasLicencia_nav[oLicense.EntregasLicencia_nav.length - 1];
// 			if (oLicense.TransferenciaJefeTrabajo_nav.length > 0) {
// 				var oLastTranfer = oLicense.TransferenciaJefeTrabajo_nav[oLicense.TransferenciaJefeTrabajo_nav.length - 1];
// 		setPersonalHabilitadoParaCboCancelacion: function (oLicense) {
// 			if (oLicense.EntregasLicencia_nav.length > 0) {
// 				var oLastEntrega = oLicense.EntregasLicencia_nav[oLicense.EntregasLicencia_nav.length - 1];
// 			if (oLicense.TransferenciaJefeTrabajo_nav.length > 0) {
// 				var oLastTranfer = oLicense.TransferenciaJefeTrabajo_nav[oLicense.TransferenciaJefeTrabajo_nav.length - 1];
// 		cloneLicense: function (license) {
// 			let clone = {... license
// 			clone.Gdate = new Date(license.Gdate);
// 			clone.Solbeg = new Date(license.Solbeg);
// 			clone.Timbeg = new Date(license.Timbeg);
// 			clone.Solend = new Date(license.Solend);
// 			clone.Timend = new Date(license.Timend);
// 			if (license.HorariosPorLicencia_nav && license.HorariosPorLicencia_nav.length) {
// 				license.HorariosPorLicencia_nav.forEach((horario) => {
// 			if (license.ObservacionesLicencia_nav && license.ObservacionesLicencia_nav.length) {
// 				license.ObservacionesLicencia_nav.forEach((observacion) => {
// 			if (license.CoordinacionesLicencia_nav && license.CoordinacionesLicencia_nav.length) {
// 				license.CoordinacionesLicencia_nav.forEach((coordinacion) => {
// 			/*		if (license.TramitacionesLicencia_nav && license.TramitacionesLicencia_nav.length) {
// 						license.TramitacionesLicencia_nav.forEach((tramitacion) => {
// 			if (license.TramitacionesLicencia_nav && license.TramitacionesLicencia_nav.length) {
// 				license.TramitacionesLicencia_nav.forEach((tramitacion) => {
// 			if (license.EntregasLicencia_nav && license.EntregasLicencia_nav.length) {
// 				license.EntregasLicencia_nav.forEach((entrega) => {
// 			if (license.DevolucionLicencia_nav && license.DevolucionLicencia_nav.length) {
// 				license.DevolucionLicencia_nav.forEach((devolucion) => {
// 			if (license.SuspensionLicencia_nav && license.SuspensionLicencia_nav.length) {
// 				license.SuspensionLicencia_nav.forEach((suspension) => {
// 			if (license.ReanudacionLicencia_nav && license.ReanudacionLicencia_nav.length) {
// 				license.ReanudacionLicencia_nav.forEach((reanudacion) => {
// 			if (license.TransferenciaJefeTrabajo_nav && license.TransferenciaJefeTrabajo_nav.length) {
// 				license.TransferenciaJefeTrabajo_nav.forEach((transferencia) => {
// 			var oLicense = AppManagementHelper.getModel("LicenseJsonModel").getData();
// 		attributeIsValidForLicense: function (attribute, value, aRequiredFields) {
// 			var oLicense = AppManagementHelper.getModel("LicenseJsonModel").getData();
// 					if (oLicense.Perestac !== "") {
// 					if (oLicense.Bloqueorecierretxt === '') {
// 					if (oLicense.Intnooperar === '') {
// 				if (value === "" && oLicense.Senalninguna === "") {
// 				if (oLicense.Barrafs === "X" && value === "") {
// 			var oModel = AppManagementHelper.getModel("LicenseJsonModel");
// 		getLicenseRequiredFields: function () {
// 			var oLicense = AppManagementHelper.getModel("LicenseJsonModel").getData();
// 			for (let attribute in oLicense) {
// 				this.attributeIsValidForLicense(attribute, oLicense[attribute], aRequiredFields)
// 			var oModel = AppManagementHelper.getModel("LicenseJsonModel");
// 			var oLicense = AppManagementHelper.getModel("LicenseJsonModel").getData();
// 			for (let attribute in oLicense) {
// 				this.attributeIsValidForRequest(attribute, oLicense[attribute], aRequiredFields)
