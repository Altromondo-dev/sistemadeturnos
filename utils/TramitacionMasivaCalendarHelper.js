sap.ui.define(["transener/sistemadeturnos/utils/AppManagementHelper","transener/sistemadeturnos/utils/FormatHelper","transener/sistemadeturnos/utils/RolAuthorizationHelper","transener/sistemadeturnos/utils/MessageBoxHelper","transener/sistemadeturnos/utils/FormatterHelper","transener/sistemadeturnos/services/LicenseService"],function(e,a,t,s,o,i){"use strict";return{_oDialog:null,_oModelPath:null,_bHasTraindex:null,getTramitacionCalendarView:function(e,a,t){this._bHasTraindex=t;this._oModelPath=a;var s=new sap.m.Dialog({title:"Calendario Tramitación",contentWidth:"60%",content:[new sap.m.VBox({items:[new sap.m.HBox({items:[new sap.m.VBox({items:[new sap.m.Label({text:"Fecha"}),new sap.m.DatePicker({
/*
												enabled: {
													parts: ["LicenseJsonModel>/Licstat", "UserJsonModel>/roles", "statusModel>/", "LicenseJsonModel>/Werks",
														"DisableControlsJsonModel>/visibleLic",
														"PermisosJsonModel>/UsuarioEncontrado"
													],
													formatter: this.rolStatusEdition("tramitacion/")
												},
												*/
dateValue:"{CalendarFormModel>/Fecha}",valueState:"{CalendarFormModel>/ValueStateFecha}"})]}),new sap.m.VBox({items:[new sap.m.Label({text:"Estado forma de entrega diaria"}),new sap.m.ComboBox({
/*
												enabled: {
													parts: ["LicenseJsonModel>/Licstat", "UserJsonModel>/roles", "statusModel>/",
														"LicenseJsonModel>/Werks",
														"DisableControlsJsonModel>/visibleLic",
														"PermisosJsonModel>/UsuarioEncontrado"
													],
													formatter: this.rolStatusEdition("tramitacion/")
												},
												*/
width:"230px",selectedKey:"{CalendarFormModel>/Estado}",valueState:"{CalendarFormModel>/ValueStateEstado}",items:[new sap.ui.core.Item({key:"NA",text:"No Autorizada"}),new sap.ui.core.Item({key:"CC",text:"Condicionada"}),new sap.ui.core.Item({key:"AS",text:"Anulada por el solicitante"})]})]}).addStyleClass("sapUiTinyMarginBeginEnd"),new sap.m.VBox({width:"51%",items:[new sap.m.Label({text:"Observación"}),new sap.m.TextArea({
/*
												enabled: {
													parts: ["LicenseJsonModel>/Licstat", "UserJsonModel>/roles", "statusModel>/", "LicenseJsonModel>/Werks",
														"DisableControlsJsonModel>/visibleLic",
														"PermisosJsonModel>/UsuarioEncontrado"
													],
													formatter: this.rolStatusEdition("tramitacion/")
												},
												*/
width:"100%",value:"{CalendarFormModel>/Observaciones}"})]}).addStyleClass("sapUiSmallMarginEnd"),new sap.m.VBox({items:[new sap.m.Label({text:""}),new sap.m.Button({
/*
												enabled: {
													parts: ["LicenseJsonModel>/Licstat", "UserJsonModel>/roles", "statusModel>/", "LicenseJsonModel>/Werks",
														"DisableControlsJsonModel>/visibleLic",
														"PermisosJsonModel>/UsuarioEncontrado"
													],
													formatter: this.rolStatusEdition("tramitacion/")
												},
												*/
text:"Agregar",press:[this.addNewDate,this]}).addStyleClass("buttonInverted")]})]}),new sap.m.Table({inset:false,fixedLayout:false,enableBusyIndicator:true,noDataText:"No hay dias agregados...",columns:[new sap.m.Column({width:"10%",header:new sap.m.Text({text:"Fecha"})}),new sap.m.Column({width:"30%",header:new sap.m.Text({text:"Estado"})}),new sap.m.Column({width:"50%",header:new sap.m.Text({text:"Observación"})}),new sap.m.Column({width:"10%",header:new sap.m.Text({text:""})})],items:{sorter:new sap.ui.model.Sorter("Fecha",false,false),path:"TramitacionMasivaListJsonModel>"+this._oModelPath+"/CalendarDates",template:new sap.m.ColumnListItem({cells:[new sap.m.Text({text:{path:"TramitacionMasivaListJsonModel>Fecha",formatter:$.proxy(this.formatDate,this)}}),new sap.m.Text({text:{path:"TramitacionMasivaListJsonModel>Estado",formatter:$.proxy(this.formatStatus,this)}}),new sap.m.Text({text:"{TramitacionMasivaListJsonModel>Observaciones}"}),new sap.m.HBox({items:[new sap.m.Button({
/*
														enabled: {
															parts: ["LicenseJsonModel>/Licstat", "UserJsonModel>/roles", "statusModel>/", "LicenseJsonModel>/Werks",
																"DisableControlsJsonModel>/visibleLic",
																"PermisosJsonModel>/UsuarioEncontrado"
															],
															formatter: this.rolStatusEdition("tramitacion/")
														},
														*/
icon:"sap-icon://delete",press:[this._deleteCalendarDate,this]}).addStyleClass("buttonInverted")]})]})}}).addStyleClass("sapUiTinyMarginTop")]}).addStyleClass("sapUiSmallMarginBeginEnd sapUiTinyMarginTop")],buttons:[new sap.m.Button({text:"Cerrar",press:[this.closeTramitacionCalendar,this]}).addStyleClass("buttonInverted")]});this._oDialog=s;this.createFormModel();e.addDependent(s);return this._oDialog},cleanFormModel:function(){this._oDialog.getModel("CalendarFormModel").setData({Fecha:null,Observacion:"",Estado:"",ValueStateFecha:"None",ValueStateEstado:"None"})},formatDate:function(e){return a.formatDateLicenseWithoutUtc(e)},formatStatus:function(e){return a.getEstadoTramitacion(e)},createFormModel:function(){var e=new sap.ui.model.json.JSONModel;e.setData({Fecha:null,Observaciones:"",Estado:"",ValueStateFecha:"None",ValueStateEstado:"None"});this._oDialog.setModel(e,"CalendarFormModel")},rolStatusEdition:function(e,a){return t.rolStatusEdition(e,a)},payloadValid:function(e){if(e.Fecha===null){this._oDialog.getModel("CalendarFormModel").setProperty("/ValueStateFecha","Error")}else{this._oDialog.getModel("CalendarFormModel").setProperty("/ValueStateFecha","None")}if(e.Estado===""){this._oDialog.getModel("CalendarFormModel").setProperty("/ValueStateEstado","Error")}else{this._oDialog.getModel("CalendarFormModel").setProperty("/ValueStateEstado","None")}var a=this._oDialog.getModel("CalendarFormModel").getData();return a.ValueStateEstado==="None"&&a.ValueStateFecha==="None"},addNewDate:function(){var e=this._oDialog.getModel("CalendarFormModel").getData();if(this.payloadValid(e)){if(!this.dateHasBeenAdded(e.Fecha)){this.saveDate(e);this.cleanFormModel()}else{s.showConfirm("Alerta","Esta fecha ya ha sido agregada, ¿desea reemplazarla?",()=>{if(this._bHasTraindex){this.saveDate(e);this.cleanFormModel()}else{this.replaceDate(e);this.cleanFormModel()}})}}},replaceDate:function(e){var a=this._oDialog.getModel("TramitacionMasivaListJsonModel");var t=a.getProperty(this._oModelPath+"/CalendarDates");var s=_.findIndex(t,a=>a.Fecha.getTime()===e.Fecha.getTime());t[s]=e;a.refresh(true)},handleCalendarData:function(e){e.forEach(e=>{delete e.Tramitaciones;delete e.__metadata;e.Fecha=a.formatDatesGMT(e.Fecha)})},saveDate:function(e){var a=this._oDialog.getModel("TramitacionMasivaListJsonModel");if(this._bHasTraindex){var t=a.getProperty(this._oModelPath);i.getCalendarPostTramitacion(t,e,e.Fecha).then(()=>{i.getDatesFromTramitacion(t).then(e=>{this.handleCalendarData(e.results);this._oDialog.getModel("TramitacionMasivaListJsonModel").setProperty(this._oModelPath+"/CalendarDates",e.results);this._oDialog.setBusy(false)})})}else{var s=a.getProperty(this._oModelPath+"/CalendarDates");s.push(e);a.refresh(true)}},_deleteCalendarDate:function(e){var a=e.getSource().getParent().getParent();var t=a.getBindingContext("TramitacionMasivaListJsonModel").getObject();s.showConfirm("Alerta","¿Está seguro que desea eliminar esta fecha?",()=>{if(t.Traindex){this._oDialog.setBusy(true);var e=t;var a=[{Fecha:e.Fecha}];i.removeDates(e,a).then(a=>{i.getDatesFromTramitacion(e).then(e=>{this.handleCalendarData(e.results);this._oDialog.getModel("TramitacionMasivaListJsonModel").setProperty(this._oModelPath+"/CalendarDates",e.results);this._oDialog.setBusy(false)})}).catch(()=>{s.showAlert("Alerta","Error al borrar fecha");this._oDialog.setBusy(false)})}else{var o=this._oDialog.getModel("TramitacionMasivaListJsonModel");var r=o.getProperty(this._oModelPath+"/CalendarDates");var n=r.indexOf(t);r.splice(n,1);o.refresh(true)}})},dateHasBeenAdded:function(e){var a=this._oDialog.getModel("TramitacionMasivaListJsonModel");var t=a.getProperty(this._oModelPath+"/CalendarDates");var s=t.find(a=>a.Fecha.getTime()===e.getTime());if(s){return true}else{return false}},closeTramitacionCalendar:function(){this._oDialog.close();this._oDialog.destroy()}}});