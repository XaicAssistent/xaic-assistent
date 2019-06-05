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
    EventService.prototype.updateEvent = function (event) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/updateEvent/" + appSettings.getString("tokenUser", "");
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
    EventService.prototype.getEvent = function (idEvento) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getEventoById/" + appSettings.getString("tokenUser", "") + "/" + idEvento;
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    EventService.prototype.deleteEvent = function (idEvento) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/deleteEvent/" + appSettings.getString("tokenUser", "") + "/" + idEvento;
        return this.http.delete(serverUrl, { headers: this.createRequestHeader() });
    };
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXZlbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUErRDtBQUUvRCxtRUFBcUU7QUFJckU7SUFFSSxzQkFBb0IsSUFBZTtRQUFmLFNBQUksR0FBSixJQUFJLENBQVc7SUFBRSxDQUFDO0lBRTlCLDBDQUFtQixHQUEzQjtRQUNJLE9BQU8sSUFBSSxrQkFBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFTLEtBQVk7UUFDakIsSUFBSSxTQUFTLEdBQUcsOENBQThDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFZLEtBQVk7UUFDcEIsSUFBSSxTQUFTLEdBQUcsaURBQWlELEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDM0csT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNuRixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksU0FBUyxHQUFHLGlEQUFpRCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQseUNBQWtCLEdBQWxCLFVBQW1CLFlBQTBCO1FBQ3pDLElBQUksU0FBUyxHQUFHLHVEQUF1RCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6SyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELHFDQUFjLEdBQWQsVUFBZSxLQUFLLEVBQUUsYUFBYTtRQUMvQixJQUFJLFNBQVMsR0FBRyxvREFBb0QsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxhQUFhLENBQUM7UUFDbEosT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxxQ0FBYyxHQUFkLFVBQWUsUUFBUSxFQUFFLE1BQWE7UUFDbEMsSUFBSSxTQUFTLEdBQUcsb0RBQW9ELEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUMvSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLFFBQVEsRUFBRyxNQUFNLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVELG9DQUFhLEdBQWIsVUFBYyxNQUFhO1FBQ3ZCLElBQUksU0FBUyxHQUFHLG1EQUFtRCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdHLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxRQUFRO1FBQ2IsSUFBSSxTQUFTLEdBQUcsbURBQW1ELEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUM5SCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxRQUFRO1FBQ2hCLElBQUksU0FBUyxHQUFHLGlEQUFpRCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDNUgsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFuRFEsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQUdnQixpQkFBVTtPQUYxQixZQUFZLENBb0R4QjtJQUFELG1CQUFDO0NBQUEsQUFwREQsSUFvREM7QUFwRFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi9tb2RlbC9FdmVudFwiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IEVzdGFkb0V2ZW50byB9IGZyb20gXCIuLi9tb2RlbC9Fc3RhZG9FdmVudG9cIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEV2ZW50U2VydmljZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpe31cblxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTsgICAgIFxuICAgIH1cblxuICAgIGFkZEV2ZW50KGV2ZW50OiBFdmVudCl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvYWRkRXZlbnQvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIGV2ZW50LCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVFdmVudChldmVudDogRXZlbnQpe1xuICAgICAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL3VwZGF0ZUV2ZW50L1wiICsgYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBldmVudCwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gICAgfVxuXG4gICAgZ2V0RXZlbnRzKCl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZ2V0Q2FsZW5kYXIvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIik7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHNlcnZlclVybCwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gICAgfVxuXG4gICAgZ2V0RXZlbnRzUG9yRXN0YWRvKGVzdGFkb0V2ZW50bzogRXN0YWRvRXZlbnRvKXtcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9nZXRDaXRhc1BvckVzdGFkby9cIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKSArIFwiL1wiICsgKCFlc3RhZG9FdmVudG8gPyBcInRvZG9zXCIgOiBlc3RhZG9FdmVudG8uY29kaWdvKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgICB9XG5cbiAgICBnZXRIb3Jhc1BvckRpYShmZWNoYSwgaWRVc2VyRW1wcmVzYSl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZ2V0SG9yYXNQb3JEaWEvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIikgKyBcIi9cIiArIGZlY2hhICsgXCIvXCIgKyBpZFVzZXJFbXByZXNhO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cblxuICAgIGNhbmNlbGFyRXZlbnRvKGlkRXZlbnRvLCBtb3Rpdm86c3RyaW5nKXtcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9jYW5jZWxhckV2ZW50by9cIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKSArIFwiL1wiICsgaWRFdmVudG87XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIHtcIm1vdGl2b1wiIDogbW90aXZvfSwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gICAgfVxuXG4gICAgYWNlcHRhckV2ZW50byhldmVudG86IEV2ZW50KXtcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9hY2VwdGFyRXZlbnRvL1wiICsgYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCBldmVudG8sIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cblxuICAgIGdldEV2ZW50KGlkRXZlbnRvKXtcbiAgICAgICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9nZXRFdmVudG9CeUlkL1wiICsgYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpICsgXCIvXCIgKyBpZEV2ZW50bztcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgICB9XG5cbiAgICBkZWxldGVFdmVudChpZEV2ZW50byl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZGVsZXRlRXZlbnQvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIikgKyBcIi9cIiArIGlkRXZlbnRvO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmRlbGV0ZShzZXJ2ZXJVcmwsIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cbn0iXX0=