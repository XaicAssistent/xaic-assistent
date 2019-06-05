"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserEmpresa_1 = require("./UserEmpresa");
var Perido_1 = require("./Perido");
var EstadoEvento_1 = require("./EstadoEvento");
var Event = /** @class */ (function () {
    function Event() {
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
        this.periodo = new Perido_1.Periodo();
        this.estado = new EstadoEvento_1.EstadoEvento();
    }
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZDQUE0QztBQUU1QyxtQ0FBbUM7QUFDbkMsK0NBQThDO0FBRTlDO0lBV0k7UUFUQSxnQkFBVyxHQUFnQixJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUs3QyxZQUFPLEdBQVksSUFBSSxnQkFBTyxFQUFFLENBQUM7UUFDakMsV0FBTSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUkxQyxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBYlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyTm9ybWFsIH0gZnJvbSBcIi4vVXNlck5vcm1hbFwiO1xuaW1wb3J0IHsgVXNlckVtcHJlc2EgfSBmcm9tIFwiLi9Vc2VyRW1wcmVzYVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi9Vc2VyRGF0YVwiO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gXCIuL1Blcmlkb1wiO1xuaW1wb3J0IHsgRXN0YWRvRXZlbnRvIH0gZnJvbSBcIi4vRXN0YWRvRXZlbnRvXCI7XG5cbmV4cG9ydCBjbGFzcyBFdmVudHtcbiAgICBpZEV2ZW50bzogbnVtYmVyO1xuICAgIHVzZXJFbXByZXNhOiBVc2VyRW1wcmVzYSA9IG5ldyBVc2VyRW1wcmVzYSgpO1xuICAgIHVzZXI6IFVzZXJEYXRhO1xuICAgIHRpdHVsbzogc3RyaW5nO1xuICAgIGRlc2NyaXBjaW9uOiBzdHJpbmc7XG4gICAgZmVjaGE6IERhdGU7XG4gICAgcGVyaW9kbzogUGVyaW9kbyA9IG5ldyBQZXJpb2RvKCk7XG4gICAgZXN0YWRvOiBFc3RhZG9FdmVudG8gPSBuZXcgRXN0YWRvRXZlbnRvKCk7XG4gICAgbW90aXZvQ2FuY2VsYWNpb246IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgfVxufSJdfQ==