"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_1 = require("../modal");
var EstadoEventoService_1 = require("../services/EstadoEventoService");
var FeedBack_1 = require("../utils/FeedBack");
var EstadosEventosMapper_1 = require("../mapper/EstadosEventosMapper");
var EventService_1 = require("../services/EventService");
var EventMapper_1 = require("../mapper/EventMapper");
var UserLoged_1 = require("../utils/UserLoged");
var router_1 = require("nativescript-angular/router");
var DailyComponent = /** @class */ (function () {
    function DailyComponent(_estadoEventoService, _eventService, routerExtensions) {
        this._estadoEventoService = _estadoEventoService;
        this._eventService = _eventService;
        this.routerExtensions = routerExtensions;
        this.estadosNames = [];
        this.selectedEstado = 0;
        this.estados = [];
        this.events = [];
        this.maxTime = 100;
        this.time = 10;
    }
    DailyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userLoged = UserLoged_1.UserLoged.getInstance().getUserLoged();
        this._estadoEventoService.getAllEstados().subscribe(function (ok) {
            if (ok["estados"] !== "null") {
                _this.estados = EstadosEventosMapper_1.EstadosEventosMapper.estadosEventoJSONToEstadoEvento(ok["estados"]);
                _this.estadosNames.push("Todos los estados");
                var i_1 = 0;
                _this.estados.forEach(function (estado) {
                    i_1++;
                    if (estado.codigo == "PA")
                        _this.selectedEstado = i_1;
                    _this.estadosNames.push(estado.descripcion);
                });
                _this.buscarEventos();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    DailyComponent.prototype.cancelarCita = function (id) {
        var _this = this;
        this.motivoCancelacion = "";
        this.eventoSelected = this.events.filter(function (eve) { return eve.idEvento == id; })[0];
        if (this.eventoSelected.estado.codigo == "EP") {
            this._eventService.deleteEvent(id).subscribe(function (ok) {
                if (ok["response"] == "true") {
                    FeedBack_1.FeedBack.feedBackSucces("Evento eliminado correctamente");
                    _this.buscarEventos();
                }
                else {
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (erro) {
                console.log("ERROR PMV");
                console.log(erro);
            });
        }
        else {
            this.modalCancelarCita.show();
        }
    };
    DailyComponent.prototype.confirmacionCancelarCita = function () {
        var _this = this;
        this._eventService.cancelarEvento(this.eventoSelected.idEvento, this.motivoCancelacion).subscribe(function (ok) {
            if (ok["response"] == "true") {
                FeedBack_1.FeedBack.feedBackSucces("Evento cancelado correctamente");
                _this.buscarEventos();
                _this.modalCancelarCita.hide();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    DailyComponent.prototype.aceptarCita = function (id) {
        this.eventoSelected = this.events.filter(function (eve) { return eve.idEvento == id; })[0];
        var empieza = new Date();
        empieza.setHours(this.eventoSelected.periodo.empiezaHora);
        empieza.setMinutes(this.eventoSelected.periodo.empiezaMinuto);
        empieza.setSeconds(0);
        var acaba = new Date();
        acaba.setHours(this.eventoSelected.periodo.acabaHora);
        acaba.setMinutes(this.eventoSelected.periodo.acabaMinuto);
        acaba.setSeconds(0);
        this.maxTime = ((acaba.getTime() - empieza.getTime()) / 1000) / 60;
        this.modalDuracion.show();
    };
    DailyComponent.prototype.confirmacionCita = function () {
        var _this = this;
        var horaFin = new Date();
        horaFin.setHours(this.eventoSelected.periodo.empiezaHora);
        horaFin.setMinutes(this.eventoSelected.periodo.empiezaMinuto);
        horaFin.setSeconds(0);
        horaFin.setTime(horaFin.getTime() + ((this.time * 60) * 1000));
        this.eventoSelected.periodo.acabaHora = horaFin.getHours();
        this.eventoSelected.periodo.acabaMinuto = horaFin.getMinutes();
        this._eventService.aceptarEvento(this.eventoSelected).subscribe(function (ok) {
            if (ok["response"] == "true") {
                FeedBack_1.FeedBack.feedBackSucces("Evento aceptado correctamente");
                _this.buscarEventos();
                _this.modalDuracion.hide();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    DailyComponent.prototype.buscarEventos = function () {
        var _this = this;
        this._eventService.getEventsPorEstado(this.selectedEstado == 0 ? null : this.estados[this.selectedEstado - 1]).subscribe(function (ok) {
            _this.events = EventMapper_1.EventMapper.eventsJSONtoEvent(ok);
            _this.events.forEach(function (eve) {
                eve.estado = _this.estados.filter(function (est) { return est.idEstado == eve.estado.idEstado; })[0];
            });
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    DailyComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
        }
    };
    DailyComponent.prototype.tapInEvent = function (args) {
        var idEvento = {
            queryParams: {
                "idEvento": this.events[args.index].idEvento,
                "rutaAnterior": "daily"
            },
            clearHistory: true
        };
        this.routerExtensions.navigate(["/infoDaily"], idEvento);
    };
    __decorate([
        core_1.ViewChild("modalChoseEstado"),
        __metadata("design:type", modal_1.ModalComponent)
    ], DailyComponent.prototype, "modalChoseEstado", void 0);
    __decorate([
        core_1.ViewChild("modalCancelarCita"),
        __metadata("design:type", modal_1.ModalComponent)
    ], DailyComponent.prototype, "modalCancelarCita", void 0);
    __decorate([
        core_1.ViewChild("modalDuracion"),
        __metadata("design:type", modal_1.ModalComponent)
    ], DailyComponent.prototype, "modalDuracion", void 0);
    DailyComponent = __decorate([
        core_1.Component({
            selector: 'ns-daily',
            templateUrl: './daily.component.html',
            styleUrls: ['./daily.component.css'],
            moduleId: module.id,
            providers: [EstadoEventoService_1.EstadoEventoService, EventService_1.EventService]
        }),
        __metadata("design:paramtypes", [EstadoEventoService_1.EstadoEventoService, EventService_1.EventService, router_1.RouterExtensions])
    ], DailyComponent);
    return DailyComponent;
}());
exports.DailyComponent = DailyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpbHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFpbHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBRTdELGtDQUEwQztBQUMxQyx1RUFBc0U7QUFDdEUsOENBQTZDO0FBRTdDLHVFQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQscURBQW9EO0FBRXBELGdEQUErQztBQUMvQyxzREFBK0Q7QUFTL0Q7SUFpQkUsd0JBQW9CLG9CQUF5QyxFQUFVLGFBQTJCLEVBQVUsZ0JBQWtDO1FBQTFILHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFaOUksaUJBQVksR0FBa0IsRUFBRSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLFlBQU8sR0FBbUIsRUFBRSxDQUFDO1FBTTdCLFdBQU0sR0FBWSxFQUFFLENBQUM7UUFDckIsWUFBTyxHQUFXLEdBQUcsQ0FBQztRQUN0QixTQUFJLEdBQVcsRUFBRSxDQUFDO0lBRWdJLENBQUM7SUFFbkosaUNBQVEsR0FBUjtRQUFBLGlCQXVCQztRQXRCQyxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FDakQsVUFBQyxFQUFFO1lBQ0QsSUFBRyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssTUFBTSxFQUFDO2dCQUMxQixLQUFJLENBQUMsT0FBTyxHQUFHLDJDQUFvQixDQUFDLCtCQUErQixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLEdBQUMsR0FB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QkFDWCxVQUFVLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUTtnQkFDN0MsY0FBYyxFQUFHLE9BQU87YUFDekI7WUFDRCxZQUFZLEVBQUcsSUFBSTtTQUNwQixDQUFBO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFqSzhCO1FBQTlCLGdCQUFTLENBQUMsa0JBQWtCLENBQUM7a0NBQW1CLHNCQUFjOzREQUFDO0lBQ2hDO1FBQS9CLGdCQUFTLENBQUMsbUJBQW1CLENBQUM7a0NBQW9CLHNCQUFjOzZEQUFDO0lBQ3RDO1FBQTNCLGdCQUFTLENBQUMsZUFBZSxDQUFDO2tDQUFnQixzQkFBYzt5REFBQztJQUgvQyxjQUFjO1FBUDFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyx5Q0FBbUIsRUFBRSwyQkFBWSxDQUFDO1NBQy9DLENBQUM7eUNBa0IwQyx5Q0FBbUIsRUFBeUIsMkJBQVksRUFBNEIseUJBQWdCO09BakJuSSxjQUFjLENBbUsxQjtJQUFELHFCQUFDO0NBQUEsQUFuS0QsSUFtS0M7QUFuS1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgRXN0YWRvRXZlbnRvU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL0VzdGFkb0V2ZW50b1NlcnZpY2UnO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tICcuLi91dGlscy9GZWVkQmFjayc7XG5pbXBvcnQgeyBFc3RhZG9FdmVudG8gfSBmcm9tICcuLi9tb2RlbC9Fc3RhZG9FdmVudG8nO1xuaW1wb3J0IHsgRXN0YWRvc0V2ZW50b3NNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvRXN0YWRvc0V2ZW50b3NNYXBwZXInO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvRXZlbnRTZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL0V2ZW50TWFwcGVyJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vbW9kZWwvRXZlbnQnO1xuaW1wb3J0IHsgVXNlckxvZ2VkIH0gZnJvbSAnLi4vdXRpbHMvVXNlckxvZ2VkJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kYWlseScsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYWlseS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2RhaWx5LmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbRXN0YWRvRXZlbnRvU2VydmljZSwgRXZlbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYWlseUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbENob3NlRXN0YWRvXCIpIG1vZGFsQ2hvc2VFc3RhZG86IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxDYW5jZWxhckNpdGFcIikgbW9kYWxDYW5jZWxhckNpdGE6IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxEdXJhY2lvblwiKSBtb2RhbER1cmFjaW9uOiBNb2RhbENvbXBvbmVudDtcblxuICBlc3RhZG9zTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgc2VsZWN0ZWRFc3RhZG8gPSAwO1xuICBlc3RhZG9zOiBFc3RhZG9FdmVudG9bXSA9IFtdO1xuICB1c2VyTG9nZWQ7XG4gIG1vdGl2b0NhbmNlbGFjaW9uO1xuXG4gIGV2ZW50b1NlbGVjdGVkOiBFdmVudDtcblxuICBldmVudHM6IEV2ZW50W10gPSBbXTtcbiAgbWF4VGltZTogbnVtYmVyID0gMTAwO1xuICB0aW1lOiBudW1iZXIgPSAxMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lc3RhZG9FdmVudG9TZXJ2aWNlOiBFc3RhZG9FdmVudG9TZXJ2aWNlLCBwcml2YXRlIF9ldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7IH1cblxuICBuZ09uSW5pdCgpIHsgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdGhpcy51c2VyTG9nZWQgPSBVc2VyTG9nZWQuZ2V0SW5zdGFuY2UoKS5nZXRVc2VyTG9nZWQoKTtcbiAgICB0aGlzLl9lc3RhZG9FdmVudG9TZXJ2aWNlLmdldEFsbEVzdGFkb3MoKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYob2tbXCJlc3RhZG9zXCJdICE9PSBcIm51bGxcIil7XG4gICAgICAgICAgdGhpcy5lc3RhZG9zID0gRXN0YWRvc0V2ZW50b3NNYXBwZXIuZXN0YWRvc0V2ZW50b0pTT05Ub0VzdGFkb0V2ZW50byhva1tcImVzdGFkb3NcIl0pO1xuICAgICAgICAgIHRoaXMuZXN0YWRvc05hbWVzLnB1c2goXCJUb2RvcyBsb3MgZXN0YWRvc1wiKTtcbiAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgdGhpcy5lc3RhZG9zLmZvckVhY2goKGVzdGFkbykgPT4ge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaWYoZXN0YWRvLmNvZGlnbyA9PSBcIlBBXCIpIHRoaXMuc2VsZWN0ZWRFc3RhZG8gPSBpO1xuICAgICAgICAgICAgdGhpcy5lc3RhZG9zTmFtZXMucHVzaChlc3RhZG8uZGVzY3JpcGNpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuYnVzY2FyRXZlbnRvcygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjYW5jZWxhckNpdGEoaWQpe1xuICAgIHRoaXMubW90aXZvQ2FuY2VsYWNpb24gPSBcIlwiO1xuICAgIHRoaXMuZXZlbnRvU2VsZWN0ZWQgPSB0aGlzLmV2ZW50cy5maWx0ZXIoZXZlID0+IGV2ZS5pZEV2ZW50byA9PSBpZClbMF07XG4gICAgaWYodGhpcy5ldmVudG9TZWxlY3RlZC5lc3RhZG8uY29kaWdvID09IFwiRVBcIil7XG4gICAgICB0aGlzLl9ldmVudFNlcnZpY2UuZGVsZXRlRXZlbnQoaWQpLnN1YnNjcmliZShcbiAgICAgICAgKG9rKSA9PiB7XG4gICAgICAgICAgaWYob2tbXCJyZXNwb25zZVwiXSA9PSBcInRydWVcIil7XG4gICAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja1N1Y2NlcyhcIkV2ZW50byBlbGltaW5hZG8gY29ycmVjdGFtZW50ZVwiKTtcbiAgICAgICAgICAgIHRoaXMuYnVzY2FyRXZlbnRvcygpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLm1vZGFsQ2FuY2VsYXJDaXRhLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBjb25maXJtYWNpb25DYW5jZWxhckNpdGEoKXtcbiAgICB0aGlzLl9ldmVudFNlcnZpY2UuY2FuY2VsYXJFdmVudG8odGhpcy5ldmVudG9TZWxlY3RlZC5pZEV2ZW50bywgdGhpcy5tb3Rpdm9DYW5jZWxhY2lvbikuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wicmVzcG9uc2VcIl0gPT0gXCJ0cnVlXCIpe1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrU3VjY2VzKFwiRXZlbnRvIGNhbmNlbGFkbyBjb3JyZWN0YW1lbnRlXCIpO1xuICAgICAgICAgIHRoaXMuYnVzY2FyRXZlbnRvcygpO1xuICAgICAgICAgIHRoaXMubW9kYWxDYW5jZWxhckNpdGEuaGlkZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhY2VwdGFyQ2l0YShpZCl7XG4gICAgdGhpcy5ldmVudG9TZWxlY3RlZCA9IHRoaXMuZXZlbnRzLmZpbHRlcihldmUgPT4gZXZlLmlkRXZlbnRvID09IGlkKVswXTtcbiAgICBsZXQgZW1waWV6YTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgZW1waWV6YS5zZXRIb3Vycyh0aGlzLmV2ZW50b1NlbGVjdGVkLnBlcmlvZG8uZW1waWV6YUhvcmEpO1xuICAgIGVtcGllemEuc2V0TWludXRlcyh0aGlzLmV2ZW50b1NlbGVjdGVkLnBlcmlvZG8uZW1waWV6YU1pbnV0byk7XG4gICAgZW1waWV6YS5zZXRTZWNvbmRzKDApO1xuICAgIGxldCBhY2FiYTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgYWNhYmEuc2V0SG91cnModGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmFjYWJhSG9yYSk7XG4gICAgYWNhYmEuc2V0TWludXRlcyh0aGlzLmV2ZW50b1NlbGVjdGVkLnBlcmlvZG8uYWNhYmFNaW51dG8pO1xuICAgIGFjYWJhLnNldFNlY29uZHMoMCk7XG5cbiAgICB0aGlzLm1heFRpbWUgPSAoKGFjYWJhLmdldFRpbWUoKSAtIGVtcGllemEuZ2V0VGltZSgpKSAvIDEwMDApIC8gNjA7XG4gICAgdGhpcy5tb2RhbER1cmFjaW9uLnNob3coKTtcbiAgfVxuXG4gIGNvbmZpcm1hY2lvbkNpdGEoKXtcbiAgICBsZXQgaG9yYUZpbjogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgaG9yYUZpbi5zZXRIb3Vycyh0aGlzLmV2ZW50b1NlbGVjdGVkLnBlcmlvZG8uZW1waWV6YUhvcmEpO1xuICAgIGhvcmFGaW4uc2V0TWludXRlcyh0aGlzLmV2ZW50b1NlbGVjdGVkLnBlcmlvZG8uZW1waWV6YU1pbnV0byk7XG4gICAgaG9yYUZpbi5zZXRTZWNvbmRzKDApO1xuXG4gICAgaG9yYUZpbi5zZXRUaW1lKGhvcmFGaW4uZ2V0VGltZSgpICsgKCh0aGlzLnRpbWUqNjApKjEwMDApKTtcblxuICAgIHRoaXMuZXZlbnRvU2VsZWN0ZWQucGVyaW9kby5hY2FiYUhvcmEgPSBob3JhRmluLmdldEhvdXJzKCk7XG4gICAgdGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmFjYWJhTWludXRvID0gaG9yYUZpbi5nZXRNaW51dGVzKCk7XG5cbiAgICB0aGlzLl9ldmVudFNlcnZpY2UuYWNlcHRhckV2ZW50byh0aGlzLmV2ZW50b1NlbGVjdGVkKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYob2tbXCJyZXNwb25zZVwiXSA9PSBcInRydWVcIil7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tTdWNjZXMoXCJFdmVudG8gYWNlcHRhZG8gY29ycmVjdGFtZW50ZVwiKTtcbiAgICAgICAgICB0aGlzLmJ1c2NhckV2ZW50b3MoKTtcbiAgICAgICAgICB0aGlzLm1vZGFsRHVyYWNpb24uaGlkZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBidXNjYXJFdmVudG9zKCl7XG4gICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmdldEV2ZW50c1BvckVzdGFkbyh0aGlzLnNlbGVjdGVkRXN0YWRvID09IDAgPyBudWxsIDogdGhpcy5lc3RhZG9zW3RoaXMuc2VsZWN0ZWRFc3RhZG8gLSAxXSkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gRXZlbnRNYXBwZXIuZXZlbnRzSlNPTnRvRXZlbnQob2spO1xuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKChldmUpID0+IHtcbiAgICAgICAgICBldmUuZXN0YWRvID0gdGhpcy5lc3RhZG9zLmZpbHRlcihlc3QgPT4gZXN0LmlkRXN0YWRvID09IGV2ZS5lc3RhZG8uaWRFc3RhZG8pWzBdO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAoZXJybykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uRm9jdXMoYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMC45O1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDAuOTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuYWN0aW9uID09IFwidXBcIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDE7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMSA7XG4gICAgfVxuICB9XG5cbiAgdGFwSW5FdmVudChhcmdzKXtcbiAgICB2YXIgaWRFdmVudG8gPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcImlkRXZlbnRvXCIgOiB0aGlzLmV2ZW50c1thcmdzLmluZGV4XS5pZEV2ZW50byxcbiAgICAgICAgXCJydXRhQW50ZXJpb3JcIiA6IFwiZGFpbHlcIlxuICAgICAgfSxcbiAgICAgIGNsZWFySGlzdG9yeSA6IHRydWVcbiAgICB9XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9pbmZvRGFpbHlcIl0sIGlkRXZlbnRvKTtcbiAgfVxufVxuIl19