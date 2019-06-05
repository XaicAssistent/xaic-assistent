"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var Event_1 = require("../model/Event");
var EventService_1 = require("../services/EventService");
var FeedBack_1 = require("../utils/FeedBack");
var modal_1 = require("../modal");
var router_2 = require("@angular/router");
var NewEventComponent = /** @class */ (function () {
    function NewEventComponent(routerExtensions, _eventService, route) {
        this.routerExtensions = routerExtensions;
        this._eventService = _eventService;
        this.route = route;
        this.newEvent = new Event_1.Event();
        this.date = new Date();
    }
    NewEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.date = params['fecha'];
        });
        this.horaInicio = this.angularhoraInicio.nativeElement;
        this.horaFin = this.angularhoraFin.nativeElement;
    };
    NewEventComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var now = new Date();
        datePicker.date = this.date;
        datePicker.minDate = now;
        datePicker.maxDate = new Date(now.getFullYear() + 150, 12, 31);
    };
    NewEventComponent.prototype.onDateChanged = function (args) {
        this.newEvent.fecha = args.value;
        this.newEvent.fecha.setHours(2);
    };
    NewEventComponent.prototype.onTimeChangedInicio = function (args) {
        var timePicker = args.object;
        this.horaFin.hour = timePicker.hour == 23 ? 0 : timePicker.hour + 1;
        this.horaFin.minute = timePicker.minute;
        this.updatePeriodo();
    };
    NewEventComponent.prototype.onTimeChangedFin = function (args) {
        //falta validar que no de la vuelta el horario
        var timePicker = args.object;
        if (timePicker.hour < this.horaInicio.hour && timePicker.hour != 0) {
            timePicker.hour = this.horaInicio.hour;
        }
        if (timePicker.hour == this.horaInicio.hour && (timePicker.minute - 5) < this.horaInicio.minute) {
            timePicker.minute = this.horaInicio.minute + 5;
        }
        this.updatePeriodo();
    };
    NewEventComponent.prototype.updatePeriodo = function () {
        this.newEvent.periodo.empiezaHora = this.horaInicio.hour;
        this.newEvent.periodo.empiezaMinuto = this.horaInicio.minute;
        this.newEvent.periodo.acabaHora = this.horaFin.hour;
        this.newEvent.periodo.acabaMinuto = this.horaFin.minute;
    };
    NewEventComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
        }
    };
    NewEventComponent.prototype.addEvent = function () {
        var _this = this;
        this.newEvent.periodo.empiezaHora = this.horaInicio.hour;
        this.newEvent.periodo.empiezaMinuto = this.horaInicio.minute;
        this.newEvent.periodo.acabaHora = this.horaFin.hour;
        this.newEvent.periodo.acabaMinuto = this.horaFin.minute;
        this._eventService.addEvent(this.newEvent).subscribe(function (ok) {
            if (ok["response"] == "true") {
                FeedBack_1.FeedBack.feedBackSucces("Evento añadido correctamente");
                _this.routerExtensions.navigateByUrl('calendar', { clearHistory: true });
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    __decorate([
        core_1.ViewChild("horaInicio"),
        __metadata("design:type", core_1.ElementRef)
    ], NewEventComponent.prototype, "angularhoraInicio", void 0);
    __decorate([
        core_1.ViewChild("horaFin"),
        __metadata("design:type", core_1.ElementRef)
    ], NewEventComponent.prototype, "angularhoraFin", void 0);
    __decorate([
        core_1.ViewChild("modalfecha"),
        __metadata("design:type", modal_1.ModalComponent)
    ], NewEventComponent.prototype, "modalfecha", void 0);
    __decorate([
        core_1.ViewChild("modalEmpieza"),
        __metadata("design:type", modal_1.ModalComponent)
    ], NewEventComponent.prototype, "modalEmpieza", void 0);
    __decorate([
        core_1.ViewChild("modalAcaba"),
        __metadata("design:type", modal_1.ModalComponent)
    ], NewEventComponent.prototype, "modalAcaba", void 0);
    NewEventComponent = __decorate([
        core_1.Component({
            selector: 'ns-new-event',
            templateUrl: './new-event.component.html',
            styleUrls: ['./new-event.component.css'],
            moduleId: module.id,
            providers: [EventService_1.EventService]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, EventService_1.EventService, router_2.ActivatedRoute])
    ], NewEventComponent);
    return NewEventComponent;
}());
exports.NewEventComponent = NewEventComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldy1ldmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFHekUsc0RBQStEO0FBRS9ELHdDQUF1QztBQUN2Qyx5REFBd0Q7QUFDeEQsOENBQTZDO0FBQzdDLGtDQUEwQztBQUMxQywwQ0FBaUQ7QUFTakQ7SUFjRSwyQkFBb0IsZ0JBQWtDLEVBQVUsYUFBMkIsRUFBVSxLQUFxQjtRQUF0RyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUgxSCxhQUFRLEdBQVUsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUM5QixTQUFJLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUVzRyxDQUFDO0lBRS9ILG9DQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDOUIsVUFBQyxNQUFNO1lBQ0wsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLElBQUk7UUFDakIsSUFBSSxVQUFVLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXJCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM1QixVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUN6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QUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLHNCQUFjO3lEQUFDO0lBTnpDLGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUN4QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsMkJBQVksQ0FBQztTQUMxQixDQUFDO3lDQWVzQyx5QkFBZ0IsRUFBeUIsMkJBQVksRUFBaUIsdUJBQWM7T0FkL0csaUJBQWlCLENBc0c3QjtJQUFELHdCQUFDO0NBQUEsQUF0R0QsSUFzR0M7QUF0R1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgVGltZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGltZS1waWNrZXIvdGltZS1waWNrZXInO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vbW9kZWwvRXZlbnQnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvRXZlbnRTZXJ2aWNlJztcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSAnLi4vdXRpbHMvRmVlZEJhY2snO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9tb2RhbCc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLW5ldy1ldmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZXctZXZlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZXctZXZlbnQuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtFdmVudFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5ld0V2ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcImhvcmFJbmljaW9cIikgYW5ndWxhcmhvcmFJbmljaW86IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJob3JhRmluXCIpIGFuZ3VsYXJob3JhRmluOiBFbGVtZW50UmVmO1xuXG4gIEBWaWV3Q2hpbGQoXCJtb2RhbGZlY2hhXCIpIG1vZGFsZmVjaGE6IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxFbXBpZXphXCIpIG1vZGFsRW1waWV6YTogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbEFjYWJhXCIpIG1vZGFsQWNhYmE6IE1vZGFsQ29tcG9uZW50O1xuICBcbiAgaG9yYUluaWNpbzogVGltZVBpY2tlcjtcbiAgaG9yYUZpbjogVGltZVBpY2tlcjtcblxuICBuZXdFdmVudDogRXZlbnQgPSBuZXcgRXZlbnQoKTtcbiAgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIF9ldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKFxuICAgICAgKHBhcmFtcykgPT4ge1xuICAgICAgICB0aGlzLmRhdGUgPSBwYXJhbXNbJ2ZlY2hhJ107XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmhvcmFJbmljaW8gPSB0aGlzLmFuZ3VsYXJob3JhSW5pY2lvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5ob3JhRmluID0gdGhpcy5hbmd1bGFyaG9yYUZpbi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgIGxldCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBkYXRlUGlja2VyLmRhdGUgPSB0aGlzLmRhdGU7XG4gICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbm93O1xuICAgIGRhdGVQaWNrZXIubWF4RGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpICsgMTUwLCAxMiwgMzEpO1xuICB9XG4gIFxuICBvbkRhdGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICB0aGlzLm5ld0V2ZW50LmZlY2hhID0gYXJncy52YWx1ZTtcbiAgICB0aGlzLm5ld0V2ZW50LmZlY2hhLnNldEhvdXJzKDIpO1xuICB9XG5cbiAgb25UaW1lQ2hhbmdlZEluaWNpbyhhcmdzKSB7XG4gICAgbGV0IHRpbWVQaWNrZXIgPSA8VGltZVBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgIHRoaXMuaG9yYUZpbi5ob3VyID0gdGltZVBpY2tlci5ob3VyID09IDIzID8gMCA6IHRpbWVQaWNrZXIuaG91ciArIDE7XG4gICAgdGhpcy5ob3JhRmluLm1pbnV0ZSA9IHRpbWVQaWNrZXIubWludXRlO1xuXG4gICAgdGhpcy51cGRhdGVQZXJpb2RvKCk7XG4gIH1cblxuICBvblRpbWVDaGFuZ2VkRmluKGFyZ3MpIHtcbiAgICAvL2ZhbHRhIHZhbGlkYXIgcXVlIG5vIGRlIGxhIHZ1ZWx0YSBlbCBob3JhcmlvXG4gICAgbGV0IHRpbWVQaWNrZXIgPSA8VGltZVBpY2tlcj5hcmdzLm9iamVjdDtcblxuICAgIGlmKHRpbWVQaWNrZXIuaG91ciA8IHRoaXMuaG9yYUluaWNpby5ob3VyICYmIHRpbWVQaWNrZXIuaG91ciAhPSAwKXtcbiAgICAgIHRpbWVQaWNrZXIuaG91ciA9IHRoaXMuaG9yYUluaWNpby5ob3VyO1xuICAgIH1cblxuICAgIGlmKHRpbWVQaWNrZXIuaG91ciA9PSB0aGlzLmhvcmFJbmljaW8uaG91ciAmJiAodGltZVBpY2tlci5taW51dGUgLSA1KSA8IHRoaXMuaG9yYUluaWNpby5taW51dGUpe1xuICAgICAgdGltZVBpY2tlci5taW51dGUgPSB0aGlzLmhvcmFJbmljaW8ubWludXRlICsgNTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVBlcmlvZG8oKTtcbiAgfVxuXG4gIHVwZGF0ZVBlcmlvZG8oKXtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8uZW1waWV6YUhvcmEgPSB0aGlzLmhvcmFJbmljaW8uaG91cjtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8uZW1waWV6YU1pbnV0byA9IHRoaXMuaG9yYUluaWNpby5taW51dGU7XG4gICAgdGhpcy5uZXdFdmVudC5wZXJpb2RvLmFjYWJhSG9yYSA9IHRoaXMuaG9yYUZpbi5ob3VyO1xuICAgIHRoaXMubmV3RXZlbnQucGVyaW9kby5hY2FiYU1pbnV0byA9IHRoaXMuaG9yYUZpbi5taW51dGU7XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDAuOTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAxO1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDEgO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50KCl7XG4gICAgdGhpcy5uZXdFdmVudC5wZXJpb2RvLmVtcGllemFIb3JhID0gdGhpcy5ob3JhSW5pY2lvLmhvdXI7XG4gICAgdGhpcy5uZXdFdmVudC5wZXJpb2RvLmVtcGllemFNaW51dG8gPSB0aGlzLmhvcmFJbmljaW8ubWludXRlO1xuICAgIHRoaXMubmV3RXZlbnQucGVyaW9kby5hY2FiYUhvcmEgPSB0aGlzLmhvcmFGaW4uaG91cjtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8uYWNhYmFNaW51dG8gPSB0aGlzLmhvcmFGaW4ubWludXRlO1xuXG4gICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmFkZEV2ZW50KHRoaXMubmV3RXZlbnQpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZihva1tcInJlc3BvbnNlXCJdID09IFwidHJ1ZVwiKXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja1N1Y2NlcyhcIkV2ZW50byBhw7FhZGlkbyBjb3JyZWN0YW1lbnRlXCIpO1xuICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKCdjYWxlbmRhcicsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==