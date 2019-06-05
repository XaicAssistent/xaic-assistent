"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var UserService_1 = require("../services/UserService");
var UserEmpresa_1 = require("../model/UserEmpresa");
var UserMapper_1 = require("../mapper/UserMapper");
var FeedBack_1 = require("../utils/FeedBack");
var modal_1 = require("../modal");
var Event_1 = require("../model/Event");
var EventService_1 = require("../services/EventService");
var PeriodoMapper_1 = require("../mapper/PeriodoMapper");
var router_2 = require("nativescript-angular/router");
var NewEventEmpresaComponent = /** @class */ (function () {
    function NewEventEmpresaComponent(route, _userService, _eventService, routerExtensions) {
        this.route = route;
        this._userService = _userService;
        this._eventService = _eventService;
        this.routerExtensions = routerExtensions;
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
        this.newEvent = new Event_1.Event();
        this.periodos = [];
        this.horasDisponibles = [];
        this.selectedHorario = 0;
    }
    NewEventEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.getInfoNewEventEmpresa(this.route.snapshot.params["id"]).subscribe(function (ok) {
            if (ok["response"] !== "null") {
                _this.userEmpresa = UserMapper_1.UserMapper.userEmpresaJSONToUserEmpresaInfoCita(ok["response"]);
                var now = new Date();
                _this.newEvent.fecha = now;
                _this.descargarPeriodos();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    NewEventEmpresaComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var now = new Date();
        datePicker.date = now;
        datePicker.minDate = now;
        datePicker.maxDate = new Date(now.getFullYear() + 150, 12, 31);
    };
    NewEventEmpresaComponent.prototype.onDateChanged = function (args) {
        this.newEvent.fecha = args.value;
        this.newEvent.fecha.setHours(2);
        this.descargarPeriodos();
    };
    NewEventEmpresaComponent.prototype.descargarPeriodos = function () {
        var _this = this;
        this.periodos = [];
        this.horasDisponibles = [];
        var fecha = this.newEvent.fecha.getFullYear() + "-" + (this.newEvent.fecha.getMonth() + 1) + "-" + this.newEvent.fecha.getDate();
        if (this.userEmpresa.idUserEmprea) {
            this._eventService.getHorasPorDia(fecha, this.userEmpresa.idUserEmprea).subscribe(function (ok) {
                ok['response']['horasPosibles'].forEach(function (per) {
                    var peri = PeriodoMapper_1.PeriodoMapper.periodoJSONToPeriodo(per);
                    _this.periodos.push(peri);
                    _this.horasDisponibles.push(peri.empiezaHora + ":" + peri.empiezaMinuto + " - " + peri.acabaHora + ":" + peri.acabaMinuto);
                });
            }, function (erro) {
                console.log("ERROR PMV");
                console.log(erro);
            });
        }
    };
    NewEventEmpresaComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
        }
    };
    NewEventEmpresaComponent.prototype.addEvent = function () {
        var _this = this;
        this.newEvent.userEmpresa = this.userEmpresa;
        this.newEvent.periodo = this.periodos[this.selectedHorario];
        this._eventService.addEvent(this.newEvent).subscribe(function (ok) {
            if (ok["response"] == "true") {
                FeedBack_1.FeedBack.feedBackSucces("Evento añadido correctamente");
                _this.routerExtensions.navigateByUrl('search', { clearHistory: true });
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        });
    };
    __decorate([
        core_1.ViewChild("modalfecha"),
        __metadata("design:type", modal_1.ModalComponent)
    ], NewEventEmpresaComponent.prototype, "modalfecha", void 0);
    NewEventEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'ns-new-event-empresa',
            templateUrl: './new-event-empresa.component.html',
            styleUrls: ['./new-event-empresa.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService, EventService_1.EventService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, UserService_1.UserService, EventService_1.EventService, router_2.RouterExtensions])
    ], NewEventEmpresaComponent);
    return NewEventEmpresaComponent;
}());
exports.NewEventEmpresaComponent = NewEventEmpresaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWV2ZW50LWVtcHJlc2EuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LWV2ZW50LWVtcHJlc2EuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBRTdELDBDQUFpRDtBQUNqRCx1REFBc0Q7QUFDdEQsb0RBQW1EO0FBQ25ELG1EQUFrRDtBQUNsRCw4Q0FBNkM7QUFDN0Msa0NBQTBDO0FBRTFDLHdDQUF1QztBQUN2Qyx5REFBd0Q7QUFFeEQseURBQXdEO0FBQ3hELHNEQUErRDtBQVMvRDtJQVVFLGtDQUFvQixLQUFxQixFQUFVLFlBQXlCLEVBQVUsYUFBMkIsRUFBVSxnQkFBa0M7UUFBekksVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVA3SixnQkFBVyxHQUFnQixJQUFJLHlCQUFXLEVBQUUsQ0FBQztRQUM3QyxhQUFRLEdBQVUsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUM5QixhQUFRLEdBQWMsRUFBRSxDQUFDO1FBRXpCLHFCQUFnQixHQUFrQixFQUFFLENBQUM7UUFDckMsb0JBQWUsR0FBRyxDQUFDLENBQUM7SUFFNkksQ0FBQztJQUVsSywyQ0FBUSxHQUFSO1FBQUEsaUJBa0JDO1FBakJDLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNsRixVQUFDLEVBQUU7WUFDRCxJQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxNQUFNLEVBQUM7Z0JBQzNCLEtBQUksQ0FBQyxXQUFXLEdBQUcsdUJBQVUsQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFFbkYsSUFB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QUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyx5QkFBVyxFQUFFLDJCQUFZLENBQUM7U0FDdkMsQ0FBQzt5Q0FXMkIsdUJBQWMsRUFBd0IseUJBQVcsRUFBeUIsMkJBQVksRUFBNEIseUJBQWdCO09BVmxKLHdCQUF3QixDQWdHcEM7SUFBRCwrQkFBQztDQUFBLEFBaEdELElBZ0dDO0FBaEdZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgeyBVc2VyRW1wcmVzYSB9IGZyb20gJy4uL21vZGVsL1VzZXJFbXByZXNhJztcbmltcG9ydCB7IFVzZXJNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvVXNlck1hcHBlcic7XG5pbXBvcnQgeyBGZWVkQmFjayB9IGZyb20gJy4uL3V0aWxzL0ZlZWRCYWNrJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgRGF0ZVBpY2tlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXIvZGF0ZS1waWNrZXInO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuLi9tb2RlbC9FdmVudCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9FdmVudFNlcnZpY2UnO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gJy4uL21vZGVsL1Blcmlkbyc7XG5pbXBvcnQgeyBQZXJpb2RvTWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL1BlcmlvZG9NYXBwZXInO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLW5ldy1ldmVudC1lbXByZXNhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25ldy1ldmVudC1lbXByZXNhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmV3LWV2ZW50LWVtcHJlc2EuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZSwgRXZlbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBOZXdFdmVudEVtcHJlc2FDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwibW9kYWxmZWNoYVwiKSBtb2RhbGZlY2hhOiBNb2RhbENvbXBvbmVudDtcblxuICB1c2VyRW1wcmVzYTogVXNlckVtcHJlc2EgPSBuZXcgVXNlckVtcHJlc2EoKTtcbiAgbmV3RXZlbnQ6IEV2ZW50ID0gbmV3IEV2ZW50KCk7XG4gIHBlcmlvZG9zOiBQZXJpb2RvW10gPSBbXTtcblxuICBob3Jhc0Rpc3BvbmlibGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHNlbGVjdGVkSG9yYXJpbyA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBfZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fdXNlclNlcnZpY2UuZ2V0SW5mb05ld0V2ZW50RW1wcmVzYSh0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYob2tbXCJyZXNwb25zZVwiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgIHRoaXMudXNlckVtcHJlc2EgPSBVc2VyTWFwcGVyLnVzZXJFbXByZXNhSlNPTlRvVXNlckVtcHJlc2FJbmZvQ2l0YShva1tcInJlc3BvbnNlXCJdKTtcbiAgICAgICAgICBcbiAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICB0aGlzLm5ld0V2ZW50LmZlY2hhID0gbm93O1xuICAgICAgICAgIHRoaXMuZGVzY2FyZ2FyUGVyaW9kb3MoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgb25QaWNrZXJMb2FkZWQoYXJncykge1xuICAgIGxldCBkYXRlUGlja2VyID0gPERhdGVQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICBkYXRlUGlja2VyLmRhdGUgPSBub3c7XG4gICAgZGF0ZVBpY2tlci5taW5EYXRlID0gbm93O1xuICAgIGRhdGVQaWNrZXIubWF4RGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpICsgMTUwLCAxMiwgMzEpO1xuICB9XG4gIFxuICBvbkRhdGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICB0aGlzLm5ld0V2ZW50LmZlY2hhID0gYXJncy52YWx1ZTtcbiAgICB0aGlzLm5ld0V2ZW50LmZlY2hhLnNldEhvdXJzKDIpO1xuXG4gICAgdGhpcy5kZXNjYXJnYXJQZXJpb2RvcygpO1xuICB9XG5cbiAgZGVzY2FyZ2FyUGVyaW9kb3MoKXtcbiAgICB0aGlzLnBlcmlvZG9zID0gW107XG4gICAgdGhpcy5ob3Jhc0Rpc3BvbmlibGVzID0gW107XG5cbiAgICBsZXQgZmVjaGEgPSB0aGlzLm5ld0V2ZW50LmZlY2hhLmdldEZ1bGxZZWFyKCkgKyBcIi1cIiArICh0aGlzLm5ld0V2ZW50LmZlY2hhLmdldE1vbnRoKCkgKyAxKSArIFwiLVwiICsgdGhpcy5uZXdFdmVudC5mZWNoYS5nZXREYXRlKCk7XG5cbiAgICBpZih0aGlzLnVzZXJFbXByZXNhLmlkVXNlckVtcHJlYSl7XG4gICAgICB0aGlzLl9ldmVudFNlcnZpY2UuZ2V0SG9yYXNQb3JEaWEoZmVjaGEgLHRoaXMudXNlckVtcHJlc2EuaWRVc2VyRW1wcmVhKS5zdWJzY3JpYmUoXG4gICAgICAgIChvaykgPT4ge1xuICAgICAgICAgIG9rWydyZXNwb25zZSddWydob3Jhc1Bvc2libGVzJ10uZm9yRWFjaChwZXIgPT4ge1xuICAgICAgICAgICAgbGV0IHBlcmk6IFBlcmlvZG8gPSBQZXJpb2RvTWFwcGVyLnBlcmlvZG9KU09OVG9QZXJpb2RvKHBlcik7XG4gICAgICAgICAgICB0aGlzLnBlcmlvZG9zLnB1c2gocGVyaSk7XG4gICAgICAgICAgICB0aGlzLmhvcmFzRGlzcG9uaWJsZXMucHVzaChwZXJpLmVtcGllemFIb3JhICsgXCI6XCIgKyBwZXJpLmVtcGllemFNaW51dG8gKyBcIiAtIFwiICsgcGVyaS5hY2FiYUhvcmEgKyBcIjpcIiArIHBlcmkuYWNhYmFNaW51dG8pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICAoZXJybykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMC45O1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDAuOTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuYWN0aW9uID09IFwidXBcIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDE7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMSA7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnQoKXtcbiAgICB0aGlzLm5ld0V2ZW50LnVzZXJFbXByZXNhID0gdGhpcy51c2VyRW1wcmVzYTtcbiAgICB0aGlzLm5ld0V2ZW50LnBlcmlvZG8gPSB0aGlzLnBlcmlvZG9zW3RoaXMuc2VsZWN0ZWRIb3JhcmlvXTtcblxuICAgIHRoaXMuX2V2ZW50U2VydmljZS5hZGRFdmVudCh0aGlzLm5ld0V2ZW50KS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYob2tbXCJyZXNwb25zZVwiXSA9PSBcInRydWVcIil7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tTdWNjZXMoXCJFdmVudG8gYcOxYWRpZG8gY29ycmVjdGFtZW50ZVwiKTtcbiAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybCgnc2VhcmNoJywgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXX0=