sap.ui.define([
	"sap/ui/Device",
	//utils
	"transener/sistemadeturnos/utils/FioriComponentHelper"
], function(Device, FioriComponentHelper) {
	"use strict";
	
	return {
	
	    loadModel: function ()
	    {
	    	//gets component
	    	var component = sap.ui.getCore().getComponent();
			// set device model
			var jsonModel = new sap.ui.model.json.JSONModel(Device);
			jsonModel.setDefaultBindingMode("OneWay");
			component.byId("App").setModel(jsonModel, "Device");
	    }
	    
	};
});