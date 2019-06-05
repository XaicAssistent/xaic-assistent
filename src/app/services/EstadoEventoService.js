"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var appSettings = require("tns-core-modules/application-settings");
var EstadoEventoService = /** @class */ (function () {
    function EstadoEventoService(http) {
        this.http = http;
    }
    EstadoEventoService.prototype.createRequestHeader = function () {
        return new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    };
    EstadoEventoService.prototype.getAllEstados = function () {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getEstados/" + appSettings.getString("tokenUser", "");
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    EstadoEventoService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EstadoEventoService);
    return EstadoEventoService;
}());
exports.EstadoEventoService = EstadoEventoService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXN0YWRvRXZlbnRvU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVzdGFkb0V2ZW50b1NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQStEO0FBQy9ELG1FQUFxRTtBQUdyRTtJQUNJLDZCQUFvQixJQUFlO1FBQWYsU0FBSSxHQUFKLElBQUksQ0FBVztJQUFFLENBQUM7SUFFOUIsaURBQW1CLEdBQTNCO1FBQ0ksT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQ0ksSUFBSSxTQUFTLEdBQUcsZ0RBQWdELEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDMUcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFWUSxtQkFBbUI7UUFEL0IsaUJBQVUsRUFBRTt5Q0FFZ0IsaUJBQVU7T0FEMUIsbUJBQW1CLENBVy9CO0lBQUQsMEJBQUM7Q0FBQSxBQVhELElBV0M7QUFYWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRXN0YWRvRXZlbnRvU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpe31cblxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTsgICAgIFxuICAgIH1cbiAgICBcbiAgICBnZXRBbGxFc3RhZG9zKCl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZ2V0RXN0YWRvcy9cIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgICB9XG59Il19