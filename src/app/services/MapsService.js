"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var MapsService = /** @class */ (function () {
    function MapsService(http) {
        this.http = http;
    }
    MapsService.prototype.getDirection = function (latitude, longitude) {
        var serverUrl = "https://maps.googleapis.com/maps/api/geocode/json?&latlng=" + latitude + "," + longitude + "&key=AIzaSyCV0Ajoq_x_QYYmHgaHKhDDcGcGEX9E56U";
        return this.http.get(serverUrl, { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) });
    };
    MapsService.prototype.getCoordinates = function (direction) {
        var urlDirection = direction.replace(" ", "+");
        var serverUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + urlDirection + "&key=AIzaSyCV0Ajoq_x_QYYmHgaHKhDDcGcGEX9E56U";
        return this.http.get(serverUrl, { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) });
    };
    MapsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], MapsService);
    return MapsService;
}());
exports.MapsService = MapsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNYXBzU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBK0Q7QUFJL0Q7SUFFSSxxQkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFekMsa0NBQVksR0FBWixVQUFhLFFBQVEsRUFBRSxTQUFTO1FBQzVCLElBQUksU0FBUyxHQUFHLDREQUE0RCxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLDhDQUE4QyxDQUFDO1FBQzNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksa0JBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCxvQ0FBYyxHQUFkLFVBQWUsU0FBUztRQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUvQyxJQUFJLFNBQVMsR0FBRyw0REFBNEQsR0FBRyxZQUFZLEdBQUcsOENBQThDLENBQUM7UUFDN0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxrQkFBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQWRRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FHaUIsaUJBQVU7T0FGM0IsV0FBVyxDQWtCdkI7SUFBRCxrQkFBQztDQUFBLEFBbEJELElBa0JDO0FBbEJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hcHNTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkgeyB9XG5cbiAgICBnZXREaXJlY3Rpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xuICAgICAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uPyZsYXRsbmc9XCIgKyBsYXRpdHVkZSArIFwiLFwiICsgbG9uZ2l0dWRlICsgXCIma2V5PUFJemFTeUNWMEFqb3FfeF9RWVltSGdhSEtoRERjR2NHRVg5RTU2VVwiO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSB9KTtcbiAgICB9XG5cbiAgICBnZXRDb29yZGluYXRlcyhkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIHVybERpcmVjdGlvbiA9IGRpcmVjdGlvbi5yZXBsYWNlKFwiIFwiLCBcIitcIik7XG5cbiAgICAgICAgbGV0IHNlcnZlclVybCA9IFwiaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPVwiICsgdXJsRGlyZWN0aW9uICsgXCIma2V5PUFJemFTeUNWMEFqb3FfeF9RWVltSGdhSEtoRERjR2NHRVg5RTU2VVwiO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSB9KTtcbiAgICB9XG5cblxuXG59Il19