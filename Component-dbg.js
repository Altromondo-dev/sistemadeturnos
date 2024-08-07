sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/Device",
	"transener/sistemadeturnos/model/models",
	"transener/sistemadeturnos/utils/FioriComponentHelper"
], function (UIComponent, ResourceModel, Device, models,FioriComponentHelper) {
	"use strict";

	return UIComponent.extend("transener.sistemadeturnos.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			FioriComponentHelper.setComponent(this);
			UIComponent.prototype.init.apply(this, arguments);
			
			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			//	DeviceModelHelper.loadModel();
		}
	});
});
