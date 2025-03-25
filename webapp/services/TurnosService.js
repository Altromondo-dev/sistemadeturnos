sap.ui.define([
    "transener/sistemadeturnos/services/oDataService",
    "transener/sistemadeturnos/utils/MessageBoxHelper",
    "transener/sistemadeturnos/utils/AppManagementHelper",
], function (oDataService, MessageBoxHelper,AppManagementHelper) {
    "use strict";

    return {

        search: function (aFilters, FechaTurno) {
            var oDataModel = oDataService.getModel('TransenerOperaciones');

            return new Promise((resolve, reject) => {
                oDataModel.setUseBatch(false);
                oDataModel.read('/LicenciaTrabajoSet', {
                    filters: aFilters,
                    success: (data) => {
                        const datosFiltrados = this.filtrarFechasTipo(data.results, FechaTurno);
                        let resultadoFinal = datosFiltrados;

                        if (datosFiltrados.length > 0) {
                            // Ordenar y agrupar los datos si existen
                            resultadoFinal = this.encontrarGrupo(this.ordenarPorEqunr(datosFiltrados));
                            this.assignShiftsToLicences(resultadoFinal);
                        }

                        resolve(resultadoFinal);
                    },
                    error: (error) => {
                        console.error("Error en la consulta:", error);
                        MessageBoxHelper.showAlert("Alerta", "No se encontraron datos en las fechas seleccionadas");
                        reject(error);
                    }
                });
            });
        },
        filtrarFechasTipo: function (datos, fechaSeleccionada) {
            if (!Array.isArray(datos)) {
                throw new Error("El parámetro 'datos' debe ser un array.");
            }

            if (typeof fechaSeleccionada !== "string") {
                throw new Error("El parámetro 'fechaSeleccionada' debe ser un string con formato de fecha.");
            }

            const estadosPermitidos = ["01", "08", "10", "07", "02", "23"];

            const datosFiltrados = datos.filter(dato => {
                if (!estadosPermitidos.includes(dato.Licstat)) {
                    return false; // Excluir si Licstat no está en la lista permitida
                }

                // Convertimos las fechas si vienen en string
                const fechaSolbeg = dato.Solbeg instanceof Date ? dato.Solbeg : new Date(dato.Solbeg);
                const fechaSolend = dato.Solend instanceof Date ? dato.Solend : new Date(dato.Solend);

                if (dato.Period === "C" && !isNaN(fechaSolbeg)) {
                    return fechaSolbeg.toISOString().split('T')[0] === fechaSeleccionada;
                }

                if (dato.Period === "D" && !isNaN(fechaSolend)) {
                    return fechaSolend.toISOString().split('T')[0] === fechaSeleccionada;
                }

                return false;
            });

            return datosFiltrados;
        },
        encontrarGrupo: function (licencias) {
            const consolasModel = AppManagementHelper.getModel("consolasModel").getData();

            if (!consolasModel || typeof consolasModel !== "object") {
                return "Modelo no encontrado o no es válido";
            }

            licencias.forEach((licencia) => {
                for (const grupo in consolasModel) {
                    const consolas = consolasModel[grupo];

                    if (Array.isArray(consolas)) {
                        const consolaEncontrada = consolas.find((consola) => consola === licencia.Tplnr);

                        if (consolaEncontrada) {
                            licencia.Consola = grupo;
                        }
                    } else {
                        console.warn(`El grupo '${grupo}' no es un array. Se ignorará.`);
                    }
                }
            });
            licencias.sort((a, b) => {
                if (a.Consola < b.Consola) return -1;
                if (a.Consola > b.Consola) return 1;
                return 0;
            });

            console.log(licencias);

            return licencias;
        }, ordenarPorEqunr: function (data) {
            // Ordenar los elementos por el campo 'Equnr'
            data.sort((a, b) => {
                if (a.Equnr === b.Equnr) {
                    // Si las consolas son iguales, no cambiar el orden
                    return 0;
                }
                return a.Equnr < b.Equnr ? -1 : 1;
            });
            return data;
        },

        assignShiftsToLicences: function (licences) {
            let initialTime = 7 * 60; // 7:00 AM en minutos
            let currentTime = initialTime;
            let previousConsola = "";
            let previousGrupo = "";
            let firstShiftInGroup = "";

            licences.forEach((license) => {
                if (!license.Grupo) {
                    license.Grupo = license.Equnr;
                }
            });

            let groupedByConsola = {};

            licences.forEach((license) => {
                if (!groupedByConsola[license.Consola]) {
                    groupedByConsola[license.Consola] = [];
                }
                groupedByConsola[license.Consola].push(license);
            });

            Object.keys(groupedByConsola).forEach((consola) => {
                let currentTime = initialTime;
                let previousGrupo = "";
                let firstShiftInGroup = "";

                groupedByConsola[consola].forEach((license) => {
                    // Si tiene TurnosLicencias_nav con datos, tomar el Turno directamente
                    if (Array.isArray(license.TurnosLicencias_nav?.results) && license.TurnosLicencias_nav.results.length > 0) {
                        license.TurnoAsignado = license.TurnosLicencias_nav.results[0].Turno;
                        return;
                    }

                    if (license.Grupo.startsWith("_")) {
                        license.TurnoAsignado = this._formatTime(currentTime);
                        currentTime += 15; // Duración estándar
                        return;
                    }

                    if (license.Grupo !== previousGrupo) {
                        previousGrupo = license.Grupo;
                        let shiftDuration = license.Jobcond === "04" ? 30 : 15;
                        firstShiftInGroup = this._formatTime(currentTime);
                        license.TurnoAsignado = firstShiftInGroup;
                        currentTime += shiftDuration;
                    } else {
                        license.TurnoAsignado = firstShiftInGroup;
                    }
                });

                // Ordenar solo dentro de la consola por TurnoAsignado
                groupedByConsola[consola].sort((a, b) => this._convertTimeToMinutes(a.TurnoAsignado) - this._convertTimeToMinutes(b.TurnoAsignado));
            });

            // Reconstruir el array manteniendo el orden de las consolas originales
            licences.length = 0;
            Object.keys(groupedByConsola).forEach((consola) => {
                licences.push(...groupedByConsola[consola]);
            });
        }
        ,
        _formatTime: function (iMinutes) {
            // Convertir los minutos de nuevo a formato HH:mm
            var iHours = Math.floor(iMinutes / 60);
            var iRemainderMinutes = iMinutes % 60;

            // Asegurarse de que siempre tenga 2 dígitos
            return (iHours < 10 ? "0" : "") + iHours + ":" + (iRemainderMinutes < 10 ? "0" : "") + iRemainderMinutes;
        },
        _convertTimeToMinutes: function (timeString) {
            if (!timeString) return 0;
            let [hours, minutes] = timeString.split(":").map(Number);
            return hours * 60 + minutes;
        },

    };
});
