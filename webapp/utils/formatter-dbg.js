sap.ui.define(["sap/ui/core/format/NumberFormat"], function (NumberFormat) {
	"use strict";
	return {
		setStatusColor: function (status, substatus) {
			this.toggleStyleClass("acceptedStatus", status == "01" || status === "28");
			this.toggleStyleClass("cancelledStatus", status == "04" || status == "10" || status == "11");
			this.toggleStyleClass("rejectedStatus", status == "06");
			this.toggleStyleClass("disabledStatus", status == "03");
			this.toggleStyleClass("observedStatus", status == "02");
			this.toggleStyleClass("deliveredStatus", status == "08" || status == "30" || status == "05");
			this.toggleStyleClass("inTransit", status == "23");
			this.toggleStyleClass("toCoordinateStatus", status == "09");
			this.toggleStyleClass("toTramitacion", status == "07");

			if (status === "01") {
				this.toggleStyleClass("deliveredStatusAutorized", substatus === "E");
				this.toggleStyleClass("cancelledStatus", substatus === "F");
				return FormatterHelper.getApprovalSubstatus(status, substatus)
			} else {
				return FormatterHelper.getStatusName(status);
			}

		}

	}
});