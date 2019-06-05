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
var app = require("tns-core-modules/application");
var NewEventEmpresaComponent = /** @class */ (function () {
    function NewEventEmpresaComponent(route, _userService, _eventService, routerExtensions) {
        this.route = route;
        this._userService = _userService;
        this._eventService = _eventService;
        this.routerExtensions = routerExtensions;
        this.sideDrawer = app.getRootView();
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
        this.newEvent = new Event_1.Event();
        this.periodos = [];
        this.horasDisponibles = [];
        this.selectedHorario = 0;
    }
    NewEventEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sideDrawer.gesturesEnabled = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWV2ZW50LWVtcHJlc2EuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV3LWV2ZW50LWVtcHJlc2EuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBRTdELDBDQUFpRDtBQUNqRCx1REFBc0Q7QUFDdEQsb0RBQW1EO0FBQ25ELG1EQUFrRDtBQUNsRCw4Q0FBNkM7QUFDN0Msa0NBQTBDO0FBRTFDLHdDQUF1QztBQUN2Qyx5REFBd0Q7QUFFeEQseURBQXdEO0FBQ3hELHNEQUErRDtBQUMvRCxrREFBb0Q7QUFVcEQ7SUFZRSxrQ0FBb0IsS0FBcUIsRUFBVSxZQUF5QixFQUFVLGFBQTJCLEVBQVUsZ0JBQWtDO1FBQXpJLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFUN0osZUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFOUMsZ0JBQVcsR0FBZ0IsSUFBSSx5QkFBVyxFQUFFLENBQUM7UUFDN0MsYUFBUSxHQUFVLElBQUksYUFBSyxFQUFFLENBQUM7UUFDOUIsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUV6QixxQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO1FBQ3JDLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO0lBRTZJLENBQUM7SUFFbEssMkNBQVEsR0FBUjtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQ2xGLFVBQUMsRUFBRTtZQUNELElBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLE1BQU0sRUFBQztnQkFDM0IsS0FBSSxDQUFDLFdBQVcsR0FBRyx1QkFBVSxDQUFDLG9DQUFvQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUVuRixJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNyQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCO2lCQUFJO2dCQUNILG1CQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQzNDO1FBQ0gsQ0FBQyxFQUNELFVBQUMsSUFBSTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxpREFBYyxHQUFkLFVBQWUsSUFBSTtRQUNqQixJQUFJLFVBQVUsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFckIsVUFBVSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDdEIsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDekIsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsZ0RBQWEsR0FBYixVQUFjLElBQUk7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELG9EQUFpQixHQUFqQjtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVqSSxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFDO1lBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FDL0UsVUFBQyxFQUFFO2dCQUNELEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO29CQUN6QyxJQUFJLElBQUksR0FBWSw2QkFBYSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM1RCxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzVILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxFQUNELFVBQUMsSUFBSTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FDRixDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQsMENBQU8sR0FBUCxVQUFRLElBQTJCO1FBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUN4QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRTtTQUN2QjtJQUNILENBQUM7SUFFRCwyQ0FBUSxHQUFSO1FBQUEsaUJBY0M7UUFiQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQ2xELFVBQUMsRUFBRTtZQUNELElBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sRUFBQztnQkFDMUIsbUJBQVEsQ0FBQyxjQUFjLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDeEQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN2RTtpQkFBSTtnQkFDSCxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQWpHd0I7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEsc0JBQWM7Z0VBQUM7SUFEekMsd0JBQXdCO1FBUHBDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7WUFDaEQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLHlCQUFXLEVBQUUsMkJBQVksQ0FBQztTQUN2QyxDQUFDO3lDQWEyQix1QkFBYyxFQUF3Qix5QkFBVyxFQUF5QiwyQkFBWSxFQUE0Qix5QkFBZ0I7T0FabEosd0JBQXdCLENBbUdwQztJQUFELCtCQUFDO0NBQUEsQUFuR0QsSUFtR0M7QUFuR1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlcy9nZXN0dXJlcyc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJFbXByZXNhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckVtcHJlc2EnO1xuaW1wb3J0IHsgVXNlck1hcHBlciB9IGZyb20gJy4uL21hcHBlci9Vc2VyTWFwcGVyJztcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSAnLi4vdXRpbHMvRmVlZEJhY2snO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuLi9tb2RhbCc7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kYXRlLXBpY2tlci9kYXRlLXBpY2tlcic7XG5pbXBvcnQgeyBFdmVudCB9IGZyb20gJy4uL21vZGVsL0V2ZW50JztcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL0V2ZW50U2VydmljZSc7XG5pbXBvcnQgeyBQZXJpb2RvIH0gZnJvbSAnLi4vbW9kZWwvUGVyaWRvJztcbmltcG9ydCB7IFBlcmlvZG9NYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvUGVyaW9kb01hcHBlcic7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbmV3LWV2ZW50LWVtcHJlc2EnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmV3LWV2ZW50LWVtcHJlc2EuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZXctZXZlbnQtZW1wcmVzYS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlLCBFdmVudFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIE5ld0V2ZW50RW1wcmVzYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbGZlY2hhXCIpIG1vZGFsZmVjaGE6IE1vZGFsQ29tcG9uZW50O1xuXG4gIHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcblxuICB1c2VyRW1wcmVzYTogVXNlckVtcHJlc2EgPSBuZXcgVXNlckVtcHJlc2EoKTtcbiAgbmV3RXZlbnQ6IEV2ZW50ID0gbmV3IEV2ZW50KCk7XG4gIHBlcmlvZG9zOiBQZXJpb2RvW10gPSBbXTtcblxuICBob3Jhc0Rpc3BvbmlibGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHNlbGVjdGVkSG9yYXJpbyA9IDA7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBfZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zaWRlRHJhd2VyLmdlc3R1cmVzRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmdldEluZm9OZXdFdmVudEVtcHJlc2EodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXSkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wicmVzcG9uc2VcIl0gIT09IFwibnVsbFwiKXtcbiAgICAgICAgICB0aGlzLnVzZXJFbXByZXNhID0gVXNlck1hcHBlci51c2VyRW1wcmVzYUpTT05Ub1VzZXJFbXByZXNhSW5mb0NpdGEob2tbXCJyZXNwb25zZVwiXSk7XG4gICAgICAgICAgXG4gICAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgdGhpcy5uZXdFdmVudC5mZWNoYSA9IG5vdztcbiAgICAgICAgICB0aGlzLmRlc2NhcmdhclBlcmlvZG9zKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJybykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uUGlja2VyTG9hZGVkKGFyZ3MpIHtcbiAgICBsZXQgZGF0ZVBpY2tlciA9IDxEYXRlUGlja2VyPmFyZ3Mub2JqZWN0O1xuICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgZGF0ZVBpY2tlci5kYXRlID0gbm93O1xuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5vdztcbiAgICBkYXRlUGlja2VyLm1heERhdGUgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSArIDE1MCwgMTIsIDMxKTtcbiAgfVxuICBcbiAgb25EYXRlQ2hhbmdlZChhcmdzKSB7XG4gICAgdGhpcy5uZXdFdmVudC5mZWNoYSA9IGFyZ3MudmFsdWU7XG4gICAgdGhpcy5uZXdFdmVudC5mZWNoYS5zZXRIb3VycygyKTtcblxuICAgIHRoaXMuZGVzY2FyZ2FyUGVyaW9kb3MoKTtcbiAgfVxuXG4gIGRlc2NhcmdhclBlcmlvZG9zKCl7XG4gICAgdGhpcy5wZXJpb2RvcyA9IFtdO1xuICAgIHRoaXMuaG9yYXNEaXNwb25pYmxlcyA9IFtdO1xuXG4gICAgbGV0IGZlY2hhID0gdGhpcy5uZXdFdmVudC5mZWNoYS5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAodGhpcy5uZXdFdmVudC5mZWNoYS5nZXRNb250aCgpICsgMSkgKyBcIi1cIiArIHRoaXMubmV3RXZlbnQuZmVjaGEuZ2V0RGF0ZSgpO1xuXG4gICAgaWYodGhpcy51c2VyRW1wcmVzYS5pZFVzZXJFbXByZWEpe1xuICAgICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmdldEhvcmFzUG9yRGlhKGZlY2hhICx0aGlzLnVzZXJFbXByZXNhLmlkVXNlckVtcHJlYSkuc3Vic2NyaWJlKFxuICAgICAgICAob2spID0+IHtcbiAgICAgICAgICBva1sncmVzcG9uc2UnXVsnaG9yYXNQb3NpYmxlcyddLmZvckVhY2gocGVyID0+IHtcbiAgICAgICAgICAgIGxldCBwZXJpOiBQZXJpb2RvID0gUGVyaW9kb01hcHBlci5wZXJpb2RvSlNPTlRvUGVyaW9kbyhwZXIpO1xuICAgICAgICAgICAgdGhpcy5wZXJpb2Rvcy5wdXNoKHBlcmkpO1xuICAgICAgICAgICAgdGhpcy5ob3Jhc0Rpc3BvbmlibGVzLnB1c2gocGVyaS5lbXBpZXphSG9yYSArIFwiOlwiICsgcGVyaS5lbXBpZXphTWludXRvICsgXCIgLSBcIiArIHBlcmkuYWNhYmFIb3JhICsgXCI6XCIgKyBwZXJpLmFjYWJhTWludXRvKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDAuOTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAxO1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDEgO1xuICAgIH1cbiAgfVxuXG4gIGFkZEV2ZW50KCl7XG4gICAgdGhpcy5uZXdFdmVudC51c2VyRW1wcmVzYSA9IHRoaXMudXNlckVtcHJlc2E7XG4gICAgdGhpcy5uZXdFdmVudC5wZXJpb2RvID0gdGhpcy5wZXJpb2Rvc1t0aGlzLnNlbGVjdGVkSG9yYXJpb107XG5cbiAgICB0aGlzLl9ldmVudFNlcnZpY2UuYWRkRXZlbnQodGhpcy5uZXdFdmVudCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wicmVzcG9uc2VcIl0gPT0gXCJ0cnVlXCIpe1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrU3VjY2VzKFwiRXZlbnRvIGHDsWFkaWRvIGNvcnJlY3RhbWVudGVcIik7XG4gICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlQnlVcmwoJ3NlYXJjaCcsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19