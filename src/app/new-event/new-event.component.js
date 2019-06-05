"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var Event_1 = require("../model/Event");
var app = require("tns-core-modules/application");
var EventService_1 = require("../services/EventService");
var FeedBack_1 = require("../utils/FeedBack");
var modal_1 = require("../modal");
var NewEventComponent = /** @class */ (function () {
    function NewEventComponent(routerExtensions, _eventService) {
        this.routerExtensions = routerExtensions;
        this._eventService = _eventService;
        this.sideDrawer = app.getRootView();
        this.newEvent = new Event_1.Event();
    }
    NewEventComponent.prototype.ngOnInit = function () {
        this.sideDrawer.gesturesEnabled = false;
        this.horaInicio = this.angularhoraInicio.nativeElement;
        this.horaFin = this.angularhoraFin.nativeElement;
    };
    NewEventComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var now = new Date();
        datePicker.date = now;
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
        __metadata("design:paramtypes", [router_1.RouterExtensions, EventService_1.EventService])
    ], NewEventComponent);
    return NewEventComponent;
}());
exports.NewEventComponent = NewEventComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWV2ZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5ldy1ldmVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFHekUsc0RBQStEO0FBRS9ELHdDQUF1QztBQUN2QyxrREFBb0Q7QUFDcEQseURBQXdEO0FBQ3hELDhDQUE2QztBQUM3QyxrQ0FBMEM7QUFVMUM7SUFlRSwyQkFBb0IsZ0JBQWtDLEVBQVUsYUFBMkI7UUFBdkUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBUDNGLGVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBSzlDLGFBQVEsR0FBVSxJQUFJLGFBQUssRUFBRSxDQUFDO0lBRWlFLENBQUM7SUFFaEcsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFlLElBQUk7UUFDakIsSUFBSSxVQUFVLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXJCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHlDQUFhLEdBQWIsVUFBYyxJQUFJ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QUEyQixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywyQkFBWSxDQUFDO1NBQzFCLENBQUM7eUNBZ0JzQyx5QkFBZ0IsRUFBeUIsMkJBQVk7T0FmaEYsaUJBQWlCLENBbUc3QjtJQUFELHdCQUFDO0NBQUEsQUFuR0QsSUFtR0M7QUFuR1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgVGltZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvdGltZS1waWNrZXIvdGltZS1waWNrZXInO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vbW9kZWwvRXZlbnQnO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9FdmVudFNlcnZpY2UnO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tICcuLi91dGlscy9GZWVkQmFjayc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL21vZGFsJztcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLW5ldy1ldmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZXctZXZlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZXctZXZlbnQuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtFdmVudFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5ld0V2ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcImhvcmFJbmljaW9cIikgYW5ndWxhcmhvcmFJbmljaW86IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJob3JhRmluXCIpIGFuZ3VsYXJob3JhRmluOiBFbGVtZW50UmVmO1xuXG4gIEBWaWV3Q2hpbGQoXCJtb2RhbGZlY2hhXCIpIG1vZGFsZmVjaGE6IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxFbXBpZXphXCIpIG1vZGFsRW1waWV6YTogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbEFjYWJhXCIpIG1vZGFsQWNhYmE6IE1vZGFsQ29tcG9uZW50O1xuXG4gIHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgXG4gIGhvcmFJbmljaW86IFRpbWVQaWNrZXI7XG4gIGhvcmFGaW46IFRpbWVQaWNrZXI7XG5cbiAgbmV3RXZlbnQ6IEV2ZW50ID0gbmV3IEV2ZW50KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIF9ldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zaWRlRHJhd2VyLmdlc3R1cmVzRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuaG9yYUluaWNpbyA9IHRoaXMuYW5ndWxhcmhvcmFJbmljaW8ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmhvcmFGaW4gPSB0aGlzLmFuZ3VsYXJob3JhRmluLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBvblBpY2tlckxvYWRlZChhcmdzKSB7XG4gICAgbGV0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGRhdGVQaWNrZXIuZGF0ZSA9IG5vdztcbiAgICBkYXRlUGlja2VyLm1pbkRhdGUgPSBub3c7XG4gICAgZGF0ZVBpY2tlci5tYXhEYXRlID0gbmV3IERhdGUobm93LmdldEZ1bGxZZWFyKCkgKyAxNTAsIDEyLCAzMSk7XG4gIH1cbiAgXG4gIG9uRGF0ZUNoYW5nZWQoYXJncykge1xuICAgIHRoaXMubmV3RXZlbnQuZmVjaGEgPSBhcmdzLnZhbHVlO1xuICAgIHRoaXMubmV3RXZlbnQuZmVjaGEuc2V0SG91cnMoMik7XG4gIH1cblxuICBvblRpbWVDaGFuZ2VkSW5pY2lvKGFyZ3MpIHtcbiAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgdGhpcy5ob3JhRmluLmhvdXIgPSB0aW1lUGlja2VyLmhvdXIgPT0gMjMgPyAwIDogdGltZVBpY2tlci5ob3VyICsgMTtcbiAgICB0aGlzLmhvcmFGaW4ubWludXRlID0gdGltZVBpY2tlci5taW51dGU7XG5cbiAgICB0aGlzLnVwZGF0ZVBlcmlvZG8oKTtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZWRGaW4oYXJncykge1xuICAgIC8vZmFsdGEgdmFsaWRhciBxdWUgbm8gZGUgbGEgdnVlbHRhIGVsIGhvcmFyaW9cbiAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgaWYodGltZVBpY2tlci5ob3VyIDwgdGhpcy5ob3JhSW5pY2lvLmhvdXIgJiYgdGltZVBpY2tlci5ob3VyICE9IDApe1xuICAgICAgdGltZVBpY2tlci5ob3VyID0gdGhpcy5ob3JhSW5pY2lvLmhvdXI7XG4gICAgfVxuXG4gICAgaWYodGltZVBpY2tlci5ob3VyID09IHRoaXMuaG9yYUluaWNpby5ob3VyICYmICh0aW1lUGlja2VyLm1pbnV0ZSAtIDUpIDwgdGhpcy5ob3JhSW5pY2lvLm1pbnV0ZSl7XG4gICAgICB0aW1lUGlja2VyLm1pbnV0ZSA9IHRoaXMuaG9yYUluaWNpby5taW51dGUgKyA1O1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlUGVyaW9kbygpO1xuICB9XG5cbiAgdXBkYXRlUGVyaW9kbygpe1xuICAgIHRoaXMubmV3RXZlbnQucGVyaW9kby5lbXBpZXphSG9yYSA9IHRoaXMuaG9yYUluaWNpby5ob3VyO1xuICAgIHRoaXMubmV3RXZlbnQucGVyaW9kby5lbXBpZXphTWludXRvID0gdGhpcy5ob3JhSW5pY2lvLm1pbnV0ZTtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8uYWNhYmFIb3JhID0gdGhpcy5ob3JhRmluLmhvdXI7XG4gICAgdGhpcy5uZXdFdmVudC5wZXJpb2RvLmFjYWJhTWludXRvID0gdGhpcy5ob3JhRmluLm1pbnV0ZTtcbiAgfVxuXG4gIG9uRm9jdXMoYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMC45O1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDAuOTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuYWN0aW9uID09IFwidXBcIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDE7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMSA7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnQoKXtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8uZW1waWV6YUhvcmEgPSB0aGlzLmhvcmFJbmljaW8uaG91cjtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8uZW1waWV6YU1pbnV0byA9IHRoaXMuaG9yYUluaWNpby5taW51dGU7XG4gICAgdGhpcy5uZXdFdmVudC5wZXJpb2RvLmFjYWJhSG9yYSA9IHRoaXMuaG9yYUZpbi5ob3VyO1xuICAgIHRoaXMubmV3RXZlbnQucGVyaW9kby5hY2FiYU1pbnV0byA9IHRoaXMuaG9yYUZpbi5taW51dGU7XG5cbiAgICB0aGlzLl9ldmVudFNlcnZpY2UuYWRkRXZlbnQodGhpcy5uZXdFdmVudCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wicmVzcG9uc2VcIl0gPT0gXCJ0cnVlXCIpe1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrU3VjY2VzKFwiRXZlbnRvIGHDsWFkaWRvIGNvcnJlY3RhbWVudGVcIik7XG4gICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlQnlVcmwoJ2NhbGVuZGFyJywgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJybykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19