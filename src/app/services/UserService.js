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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBK0Q7QUFDL0QsbUVBQXFFO0FBR3JFO0lBRUUscUJBQW9CLElBQWU7UUFBZixTQUFJLEdBQUosSUFBSSxDQUFXO0lBQUUsQ0FBQztJQUU5Qix5Q0FBbUIsR0FBM0I7UUFDRSxJQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUM7WUFDaEMsT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztTQUNsSDthQUFLO1lBQ0osT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1NBQy9EO0lBQ0gsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxLQUFZLEVBQUUsSUFBVztRQUMvQixJQUFJLFNBQVMsR0FBRywwQ0FBMEMsQ0FBQztRQUMzRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRyxLQUFLLEVBQUUsVUFBVSxFQUFHLElBQUksRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNoSCxDQUFDO0lBZlUsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUdjLGlCQUFVO09BRnhCLFdBQVcsQ0FnQnZCO0lBQUQsa0JBQUM7Q0FBQSxBQWhCRCxJQWdCQztBQWhCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBVc2VyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpe31cblxuICBwcml2YXRlIGNyZWF0ZVJlcXVlc3RIZWFkZXIoKSB7XG4gICAgaWYoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIikpe1xuICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJywnQXV0aG9yaXphdGlvbic6IGFwcFNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIsIFwiXCIpfSk7XG4gICAgfSBlbHNleyBcbiAgICAgIHJldHVybiBuZXcgSHR0cEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSk7ICAgICBcbiAgICB9XG4gIH1cblxuICBsb2dVc2VyKGVtYWlsOnN0cmluZywgcGFzczpzdHJpbmcpe1xuICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvbG9naW5cIjtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Qoc2VydmVyVXJsLCB7J2VtYWlsJyA6IGVtYWlsLCBcInBhc3N3b3JkXCIgOiBwYXNzfSwge2hlYWRlcnM6IHRoaXMuY3JlYXRlUmVxdWVzdEhlYWRlcigpfSk7XG4gIH1cbn0iXX0=