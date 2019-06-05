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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJNYXBzU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBK0Q7QUFJL0Q7SUFFSSxxQkFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFJLENBQUM7SUFFekMsa0NBQVksR0FBWixVQUFhLFFBQVEsRUFBRSxTQUFTO1FBQzVCLElBQUksU0FBUyxHQUFHLDREQUE0RCxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLDhDQUE4QyxDQUFDO1FBQzNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksa0JBQVcsQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFRCxvQ0FBYyxHQUFkLFVBQWUsU0FBUztRQUNwQixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUvQyxJQUFJLFNBQVMsR0FBRyw0REFBNEQsR0FBRyxZQUFZLEdBQUcsOENBQThDLENBQUM7UUFDN0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxrQkFBVyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUcsQ0FBQztJQWRRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FHaUIsaUJBQVU7T0FGM0IsV0FBVyxDQWtCdkI7SUFBRCxrQkFBQztDQUFBLEFBbEJELElBa0JDO0FBbEJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNYXBzU2VydmljZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7IH1cclxuXHJcbiAgICBnZXREaXJlY3Rpb24obGF0aXR1ZGUsIGxvbmdpdHVkZSkge1xyXG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/JmxhdGxuZz1cIiArIGxhdGl0dWRlICsgXCIsXCIgKyBsb25naXR1ZGUgKyBcIiZrZXk9QUl6YVN5Q1YwQWpvcV94X1FZWW1IZ2FIS2hERGNHY0dFWDlFNTZVXCI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoc2VydmVyVXJsLCB7IGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q29vcmRpbmF0ZXMoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIHVybERpcmVjdGlvbiA9IGRpcmVjdGlvbi5yZXBsYWNlKFwiIFwiLCBcIitcIik7XHJcblxyXG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vbWFwcy5nb29nbGVhcGlzLmNvbS9tYXBzL2FwaS9nZW9jb2RlL2pzb24/YWRkcmVzcz1cIiArIHVybERpcmVjdGlvbiArIFwiJmtleT1BSXphU3lDVjBBam9xX3hfUVlZbUhnYUhLaEREY0djR0VYOUU1NlVcIjtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHsgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KSB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxufSJdfQ==