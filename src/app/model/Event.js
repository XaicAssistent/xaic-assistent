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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZDQUE0QztBQUU1QyxtQ0FBbUM7QUFDbkMsK0NBQThDO0FBRTlDO0lBWUk7UUFWQSxnQkFBVyxHQUFnQixJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQU03QyxZQUFPLEdBQVksSUFBSSxnQkFBTyxFQUFFLENBQUM7UUFDakMsV0FBTSxHQUFpQixJQUFJLDJCQUFZLEVBQUUsQ0FBQztJQUkxQyxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBZFksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBVc2VyTm9ybWFsIH0gZnJvbSBcIi4vVXNlck5vcm1hbFwiO1xuaW1wb3J0IHsgVXNlckVtcHJlc2EgfSBmcm9tIFwiLi9Vc2VyRW1wcmVzYVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi9Vc2VyRGF0YVwiO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gXCIuL1Blcmlkb1wiO1xuaW1wb3J0IHsgRXN0YWRvRXZlbnRvIH0gZnJvbSBcIi4vRXN0YWRvRXZlbnRvXCI7XG5cbmV4cG9ydCBjbGFzcyBFdmVudHtcbiAgICBpZEV2ZW50bzogbnVtYmVyO1xuICAgIHVzZXJFbXByZXNhOiBVc2VyRW1wcmVzYSA9IG5ldyBVc2VyRW1wcmVzYSgpO1xuICAgIHVzZXI6IFVzZXJEYXRhO1xuICAgIHRpdHVsbzogc3RyaW5nO1xuICAgIGRlc2NyaXBjaW9uOiBzdHJpbmc7XG4gICAgZmVjaGE6IERhdGU7XG4gICAgbG9jYXRpb246IHN0cmluZztcbiAgICBwZXJpb2RvOiBQZXJpb2RvID0gbmV3IFBlcmlvZG8oKTtcbiAgICBlc3RhZG86IEVzdGFkb0V2ZW50byA9IG5ldyBFc3RhZG9FdmVudG8oKTtcbiAgICBtb3Rpdm9DYW5jZWxhY2lvbjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICB9XG59Il19