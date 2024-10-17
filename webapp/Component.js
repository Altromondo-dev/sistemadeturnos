sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/resource/ResourceModel", "sap/ui/Device", "transener/sistemadeturnos/model/models",
	"transener/sistemadeturnos/utils/FioriComponentHelper"
], function (e, t, i, s, n) {
	"use strict";
	return e.extend("transener.sistemadeturnos.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			e.prototype.init.apply(this, arguments);
			n.setComponent(this);
			this.getRouter().initialize();
			this.setModel(s.createDeviceModel(), "device")
		}
	})
});