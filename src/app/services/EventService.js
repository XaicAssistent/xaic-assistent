"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var appSettings = require("tns-core-modules/application-settings");
var EventService = /** @class */ (function () {
    function EventService(http) {
        this.http = http;
    }
    EventService.prototype.createRequestHeader = function () {
        return new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    };
    EventService.prototype.addEvent = function (event) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/addEvent/" + appSettings.getString("tokenUser", "");
        return this.http.post(serverUrl, event, { headers: this.createRequestHeader() });
    };
    EventService.prototype.getEvents = function () {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getCalendar/" + appSettings.getString("tokenUser", "");
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    EventService.prototype.getEventsPorEstado = function (estadoEvento) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getCitasPorEstado/" + appSettings.getString("tokenUser", "") + "/" + (!estadoEvento ? "todos" : estadoEvento.codigo);
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    EventService.prototype.getHorasPorDia = function (fecha, idUserEmpresa) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getHorasPorDia/" + appSettings.getString("tokenUser", "") + "/" + fecha + "/" + idUserEmpresa;
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    EventService.prototype.cancelarEvento = function (idEvento, motivo) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/cancelarEvento/" + appSettings.getString("tokenUser", "") + "/" + idEvento;
        return this.http.post(serverUrl, { "motivo": motivo }, { headers: this.createRequestHeader() });
    };
    EventService.prototype.aceptarEvento = function (evento) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/aceptarEvento/" + appSettings.getString("tokenUser", "");
        return this.http.post(serverUrl, evento, { headers: this.createRequestHeader() });
    };
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUErRDtBQUUvRCxtRUFBcUU7QUFJckU7SUFFSSxzQkFBb0IsSUFBZTtRQUFmLFNBQUksR0FBSixJQUFJLENBQVc7SUFBRSxDQUFDO0lBRTlCLDBDQUFtQixHQUEzQjtRQUNJLE9BQU8sSUFBSSxrQkFBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLEtBQVk7UUFDakIsSUFBSSxTQUFTLEdBQUcsOENBQThDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksU0FBUyxHQUFHLGlEQUFpRCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQseUNBQWtCLEdBQWxCLFVBQW1CLFlBQTBCO1FBQ3pDLElBQUksU0FBUyxHQUFHLHVEQUF1RCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6SyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELHFDQUFjLEdBQWQsVUFBZSxLQUFLLEVBQUUsYUFBYTtRQUMvQixJQUFJLFNBQVMsR0FBRyxvREFBb0QsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxhQUFhLENBQUM7UUFDbEosT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxxQ0FBYyxHQUFkLFVBQWUsUUFBUSxFQUFFLE1BQWE7UUFDbEMsSUFBSSxTQUFTLEdBQUcsb0RBQW9ELEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUMvSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFFBQVEsRUFBRyxNQUFNLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBYyxNQUFhO1FBQ3ZCLElBQUksU0FBUyxHQUFHLG1EQUFtRCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQXBDUSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBR2dCLGlCQUFVO09BRjFCLFlBQVksQ0FxQ3hCO0lBQUQsbUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL21vZGVsL0V2ZW50XCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgRXN0YWRvRXZlbnRvIH0gZnJvbSBcIi4uL21vZGVsL0VzdGFkb0V2ZW50b1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXZlbnRTZXJ2aWNlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCl7fVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVSZXF1ZXN0SGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pOyAgICAgXG4gICAgfVxuXG4gICAgYWRkRXZlbnQoZXZlbnQ6IEV2ZW50KXtcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9hZGRFdmVudC9cIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgZXZlbnQsIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cblxuICAgIGdldEV2ZW50cygpe1xuICAgICAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL2dldENhbGVuZGFyL1wiICsgYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cblxuICAgIGdldEV2ZW50c1BvckVzdGFkbyhlc3RhZG9FdmVudG86IEVzdGFkb0V2ZW50byl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZ2V0Q2l0YXNQb3JFc3RhZG8vXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIikgKyBcIi9cIiArICghZXN0YWRvRXZlbnRvID8gXCJ0b2Rvc1wiIDogZXN0YWRvRXZlbnRvLmNvZGlnbyk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gICAgfVxuXG4gICAgZ2V0SG9yYXNQb3JEaWEoZmVjaGEsIGlkVXNlckVtcHJlc2Epe1xuICAgICAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL2dldEhvcmFzUG9yRGlhL1wiICsgYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpICsgXCIvXCIgKyBmZWNoYSArIFwiL1wiICsgaWRVc2VyRW1wcmVzYTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgICB9XG5cbiAgICBjYW5jZWxhckV2ZW50byhpZEV2ZW50bywgbW90aXZvOnN0cmluZyl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvY2FuY2VsYXJFdmVudG8vXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIikgKyBcIi9cIiArIGlkRXZlbnRvO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCB7XCJtb3Rpdm9cIiA6IG1vdGl2b30sIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cblxuICAgIGFjZXB0YXJFdmVudG8oZXZlbnRvOiBFdmVudCl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvYWNlcHRhckV2ZW50by9cIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgZXZlbnRvLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgICB9XG59Il19