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
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBK0Q7QUFDL0QsbUVBQXFFO0FBR3JFO0lBRUUscUJBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO0lBQUUsQ0FBQztJQUU5Qix5Q0FBbUIsR0FBM0I7UUFDRSxJQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUM7WUFDaEMsT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNsSDthQUFLO1lBQ0osT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxLQUFZLEVBQUUsSUFBVztRQUMvQixJQUFJLFNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRyxLQUFLLEVBQUUsVUFBVSxFQUFHLElBQUksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBZlUsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUdjLGlCQUFVO09BRnhCLFdBQVcsQ0FnQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztBQWhCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6SHR0cENsaWVudCl7fVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XHJcbiAgICBpZihhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiKSl7XHJcbiAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsJ0F1dGhvcml6YXRpb24nOiBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJ0b2tlblwiLCBcIlwiKX0pO1xyXG4gICAgfSBlbHNleyBcclxuICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTsgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbG9nVXNlcihlbWFpbDpzdHJpbmcsIHBhc3M6c3RyaW5nKXtcclxuICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvbG9naW5cIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChzZXJ2ZXJVcmwsIHsnZW1haWwnIDogZW1haWwsIFwicGFzc3dvcmRcIiA6IHBhc3N9LCB7aGVhZGVyczogdGhpcy5jcmVhdGVSZXF1ZXN0SGVhZGVyKCl9KTtcclxuICB9XHJcbn0iXX0=