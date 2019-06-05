"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var appSettings = require("tns-core-modules/application-settings");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.createRequestHeader = function () {
        if (appSettings.getString("token")) {
            return new http_1.HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': appSettings.getString("token", "") });
        }
        else {
            return new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        }
    };
    UserService.prototype.logUser = function (email, pass) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/login";
        return this.http.post(serverUrl, { 'email': email, "password": pass }, { headers: this.createRequestHeader() });
    };
    UserService.prototype.registerUser = function (user) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/register";
        return this.http.post(serverUrl, user, { headers: this.createRequestHeader() });
    };
    UserService.prototype.verificarCodigo = function (email, codigo) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/verify";
        return this.http.post(serverUrl, { 'email': email, "codigo_verificacion": codigo }, { headers: this.createRequestHeader() });
    };
    UserService.prototype.getAllUserEmpresa = function () {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getAllUserEmpresa/" + appSettings.getString("tokenUser", "");
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    UserService.prototype.getInfoNewEventEmpresa = function (id) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getInfoNewEventEmpresa/" + appSettings.getString("tokenUser", "") + "/" + id;
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    UserService.prototype.getUser = function () {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getUser/" + appSettings.getString("tokenUser", "");
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    UserService.prototype.getInfoUserEmpresa = function (id) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getInfoUserEmpresa/" + appSettings.getString("tokenUser", "") + "/" + id;
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    UserService.prototype.getUsersEmpresaByCategory = function (idCategory) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getUsersEmpresaByCategory/" + appSettings.getString("tokenUser", "") + "/" + idCategory;
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBK0Q7QUFDL0QsbUVBQXFFO0FBTXJFO0lBRUUscUJBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO0lBQUUsQ0FBQztJQUU5Qix5Q0FBbUIsR0FBM0I7UUFDRSxJQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUM7WUFDaEMsT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNsSDthQUFLO1lBQ0osT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxLQUFZLEVBQUUsSUFBVztRQUMvQixJQUFJLFNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRyxLQUFLLEVBQUUsVUFBVSxFQUFHLElBQUksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLElBQUk7UUFDZixJQUFJLFNBQVMsR0FBRyw2Q0FBNkMsQ0FBQztRQUM5RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFFRCxxQ0FBZSxHQUFmLFVBQWdCLEtBQVksRUFBRSxNQUFhO1FBQ3pDLElBQUksU0FBUyxHQUFHLDJDQUEyQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFHLEtBQUssRUFBRSxxQkFBcUIsRUFBRyxNQUFNLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDN0gsQ0FBQztJQUVELHVDQUFpQixHQUFqQjtRQUNFLElBQUksU0FBUyxHQUFHLHVEQUF1RCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsNENBQXNCLEdBQXRCLFVBQXVCLEVBQUU7UUFDdkIsSUFBSSxTQUFTLEdBQUcsNERBQTRELEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNqSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDRSxJQUFJLFNBQVMsR0FBRyw2Q0FBNkMsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELHdDQUFrQixHQUFsQixVQUFtQixFQUFFO1FBQ25CLElBQUksU0FBUyxHQUFHLHdEQUF3RCxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUM7UUFDekgsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCwrQ0FBeUIsR0FBekIsVUFBMEIsVUFBVTtRQUNsQyxJQUFJLFNBQVMsR0FBRywrREFBK0QsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsR0FBQyxHQUFHLEdBQUMsVUFBVSxDQUFDO1FBQ3hJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBbERVLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FHYyxpQkFBVTtPQUZ4QixXQUFXLENBbUR2QjtJQUFELGtCQUFDO0NBQUEsQUFuREQsSUFtREM7QUFuRFksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vbW9kZWwvVXNlckRhdGFcIjtcbmltcG9ydCB7IFVzZXJFbXByZXNhIH0gZnJvbSBcIi4uL21vZGVsL1VzZXJFbXByZXNhXCI7XG5pbXBvcnQgeyBVc2VyTm9ybWFsIH0gZnJvbSBcIi4uL21vZGVsL1VzZXJOb3JtYWxcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCl7fVxuXG4gIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcbiAgICBpZihhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiKSl7XG4gICAgICByZXR1cm4gbmV3IEh0dHBIZWFkZXJzKHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLCdBdXRob3JpemF0aW9uJzogYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIiwgXCJcIil9KTtcbiAgICB9IGVsc2V7IFxuICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTsgICAgIFxuICAgIH1cbiAgfVxuXG4gIGxvZ1VzZXIoZW1haWw6c3RyaW5nLCBwYXNzOnN0cmluZyl7XG4gICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9sb2dpblwiO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIHsnZW1haWwnIDogZW1haWwsIFwicGFzc3dvcmRcIiA6IHBhc3N9LCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgfVxuXG4gIHJlZ2lzdGVyVXNlcih1c2VyKXtcbiAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL3JlZ2lzdGVyXCI7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgdXNlciwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gIH1cblxuICB2ZXJpZmljYXJDb2RpZ28oZW1haWw6c3RyaW5nLCBjb2RpZ286c3RyaW5nKXtcbiAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL3ZlcmlmeVwiO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIHsnZW1haWwnIDogZW1haWwsIFwiY29kaWdvX3ZlcmlmaWNhY2lvblwiIDogY29kaWdvfSwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gIH1cblxuICBnZXRBbGxVc2VyRW1wcmVzYSgpe1xuICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZ2V0QWxsVXNlckVtcHJlc2EvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgfVxuXG4gIGdldEluZm9OZXdFdmVudEVtcHJlc2EoaWQpe1xuICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvZ2V0SW5mb05ld0V2ZW50RW1wcmVzYS9cIiArIGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuVXNlclwiLCBcIlwiKSArIFwiL1wiICsgaWQ7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgfVxuXG4gIGdldFVzZXIoKXtcbiAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL2dldFVzZXIvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIik7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgfVxuXG4gIGdldEluZm9Vc2VyRW1wcmVzYShpZCl7XG4gICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9nZXRJbmZvVXNlckVtcHJlc2EvXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblVzZXJcIiwgXCJcIikrXCIvXCIraWQ7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgfVxuXG4gIGdldFVzZXJzRW1wcmVzYUJ5Q2F0ZWdvcnkoaWRDYXRlZ29yeSl7XG4gICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9zdHVjb20uZmx4LmNhdC9hbHUvZGFtMnQwMS9nZXRVc2Vyc0VtcHJlc2FCeUNhdGVnb3J5L1wiICsgYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpK1wiL1wiK2lkQ2F0ZWdvcnk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcbiAgfVxufSJdfQ==