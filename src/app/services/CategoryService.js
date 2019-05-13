"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var CategoryService = /** @class */ (function () {
    function CategoryService(http) {
        this.http = http;
    }
    CategoryService.prototype.createRequestHeader = function () {
        return new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
    };
    CategoryService.prototype.addCategory = function (category) {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/addCategory";
        return this.http.post(serverUrl, category, { headers: this.createRequestHeader() });
    };
    CategoryService.prototype.getCategorys = function () {
        var serverUrl = "https://stucom.flx.cat/alu/dam2t01/getAllCategorys";
        return this.http.get(serverUrl, { headers: this.createRequestHeader() });
    };
    CategoryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2F0ZWdvcnlTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDZDQUErRDtBQUkvRDtJQUVJLHlCQUFvQixJQUFlO1FBQWYsU0FBSSxHQUFKLElBQUksQ0FBVztJQUFFLENBQUM7SUFFOUIsNkNBQW1CLEdBQTNCO1FBQ0ksT0FBTyxJQUFJLGtCQUFXLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQVksUUFBa0I7UUFDMUIsSUFBSSxTQUFTLEdBQUcsZ0RBQWdELENBQUM7UUFDakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNJLElBQUksU0FBUyxHQUFHLG9EQUFvRCxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBaEJRLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTt5Q0FHZ0IsaUJBQVU7T0FGMUIsZUFBZSxDQWlCM0I7SUFBRCxzQkFBQztDQUFBLEFBakJELElBaUJDO0FBakJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vbW9kZWwvQ2F0ZWdvcnlcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhdGVnb3J5U2VydmljZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOkh0dHBDbGllbnQpe31cblxuICAgIHByaXZhdGUgY3JlYXRlUmVxdWVzdEhlYWRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBIdHRwSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9KTsgICAgIFxuICAgIH1cblxuICAgIGFkZENhdGVnb3J5KGNhdGVnb3J5OiBDYXRlZ29yeSl7XG4gICAgICAgIGxldCBzZXJ2ZXJVcmwgPSBcImh0dHBzOi8vc3R1Y29tLmZseC5jYXQvYWx1L2RhbTJ0MDEvYWRkQ2F0ZWdvcnlcIjtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHNlcnZlclVybCwgY2F0ZWdvcnksIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cblxuICAgIGdldENhdGVnb3J5cygpe1xuICAgICAgICBsZXQgc2VydmVyVXJsID0gXCJodHRwczovL3N0dWNvbS5mbHguY2F0L2FsdS9kYW0ydDAxL2dldEFsbENhdGVnb3J5c1wiO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChzZXJ2ZXJVcmwsIHtoZWFkZXJzOiB0aGlzLmNyZWF0ZVJlcXVlc3RIZWFkZXIoKX0pO1xuICAgIH1cbn0iXX0=