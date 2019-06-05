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
var app = require("tns-core-modules/application");
var page_1 = require("tns-core-modules/ui/page/page");
var DailyComponent = /** @class */ (function () {
    function DailyComponent(_estadoEventoService, _eventService, page) {
        this._estadoEventoService = _estadoEventoService;
        this._eventService = _eventService;
        this.page = page;
        this.sideDrawer = app.getRootView();
        this.estadosNames = [];
        this.selectedEstado = 0;
        this.estados = [];
        this.events = [];
        this.maxTime = 100;
        this.time = 10;
    }
    DailyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        this.sideDrawer.gesturesEnabled = true;
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
        this.motivoCancelacion = "";
        this.eventoSelected = this.events.filter(function (eve) { return eve.idEvento == id; })[0];
        this.modalCancelarCita.show();
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
        console.log("You tapped: " + args.index);
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
        __metadata("design:paramtypes", [EstadoEventoService_1.EstadoEventoService, EventService_1.EventService, page_1.Page])
    ], DailyComponent);
    return DailyComponent;
}());
exports.DailyComponent = DailyComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpbHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFpbHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBRTdELGtDQUEwQztBQUMxQyx1RUFBc0U7QUFDdEUsOENBQTZDO0FBRTdDLHVFQUFzRTtBQUN0RSx5REFBd0Q7QUFDeEQscURBQW9EO0FBRXBELGdEQUErQztBQUMvQyxrREFBb0Q7QUFFcEQsc0RBQXFEO0FBU3JEO0lBbUJFLHdCQUFvQixvQkFBeUMsRUFBVSxhQUEyQixFQUFTLElBQVM7UUFBaEcseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjtRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBSztRQWRwSCxlQUFVLEdBQWtCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU5QyxpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFDakMsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFNN0IsV0FBTSxHQUFZLEVBQUUsQ0FBQztRQUNyQixZQUFPLEdBQVcsR0FBRyxDQUFDO1FBQ3RCLFNBQUksR0FBVyxFQUFFLENBQUM7SUFFc0csQ0FBQztJQUV6SCxpQ0FBUSxHQUFSO1FBQUEsaUJBeUJDO1FBeEJDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQ2pELFVBQUMsRUFBRTtZQUNELElBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLE1BQU0sRUFBQztnQkFDMUIsS0FBSSxDQUFD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Qyx5Q0FBbUIsRUFBRSwyQkFBWSxDQUFDO1NBQy9DLENBQUM7eUNBb0IwQyx5Q0FBbUIsRUFBeUIsMkJBQVksRUFBYyxXQUFJO09BbkJ6RyxjQUFjLENBK0kxQjtJQUFELHFCQUFDO0NBQUEsQUEvSUQsSUErSUM7QUEvSVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgRXN0YWRvRXZlbnRvU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL0VzdGFkb0V2ZW50b1NlcnZpY2UnO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tICcuLi91dGlscy9GZWVkQmFjayc7XG5pbXBvcnQgeyBFc3RhZG9FdmVudG8gfSBmcm9tICcuLi9tb2RlbC9Fc3RhZG9FdmVudG8nO1xuaW1wb3J0IHsgRXN0YWRvc0V2ZW50b3NNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvRXN0YWRvc0V2ZW50b3NNYXBwZXInO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvRXZlbnRTZXJ2aWNlJztcbmltcG9ydCB7IEV2ZW50TWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL0V2ZW50TWFwcGVyJztcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSAnLi4vbW9kZWwvRXZlbnQnO1xuaW1wb3J0IHsgVXNlckxvZ2VkIH0gZnJvbSAnLi4vdXRpbHMvVXNlckxvZ2VkJztcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWRhaWx5JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhaWx5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZGFpbHkuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtFc3RhZG9FdmVudG9TZXJ2aWNlLCBFdmVudFNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIERhaWx5Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcIm1vZGFsQ2hvc2VFc3RhZG9cIikgbW9kYWxDaG9zZUVzdGFkbzogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbENhbmNlbGFyQ2l0YVwiKSBtb2RhbENhbmNlbGFyQ2l0YTogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbER1cmFjaW9uXCIpIG1vZGFsRHVyYWNpb246IE1vZGFsQ29tcG9uZW50O1xuXG4gIHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcblxuICBlc3RhZG9zTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgc2VsZWN0ZWRFc3RhZG8gPSAwO1xuICBlc3RhZG9zOiBFc3RhZG9FdmVudG9bXSA9IFtdO1xuICB1c2VyTG9nZWQ7XG4gIG1vdGl2b0NhbmNlbGFjaW9uO1xuXG4gIGV2ZW50b1NlbGVjdGVkOiBFdmVudDtcblxuICBldmVudHM6IEV2ZW50W10gPSBbXTtcbiAgbWF4VGltZTogbnVtYmVyID0gMTAwO1xuICB0aW1lOiBudW1iZXIgPSAxMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lc3RhZG9FdmVudG9TZXJ2aWNlOiBFc3RhZG9FdmVudG9TZXJ2aWNlLCBwcml2YXRlIF9ldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxwcml2YXRlIHBhZ2U6UGFnZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5zaWRlRHJhd2VyLmdlc3R1cmVzRW5hYmxlZCA9IHRydWU7ICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHRoaXMudXNlckxvZ2VkID0gVXNlckxvZ2VkLmdldEluc3RhbmNlKCkuZ2V0VXNlckxvZ2VkKCk7XG4gICAgdGhpcy5fZXN0YWRvRXZlbnRvU2VydmljZS5nZXRBbGxFc3RhZG9zKCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wiZXN0YWRvc1wiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgIHRoaXMuZXN0YWRvcyA9IEVzdGFkb3NFdmVudG9zTWFwcGVyLmVzdGFkb3NFdmVudG9KU09OVG9Fc3RhZG9FdmVudG8ob2tbXCJlc3RhZG9zXCJdKTtcbiAgICAgICAgICB0aGlzLmVzdGFkb3NOYW1lcy5wdXNoKFwiVG9kb3MgbG9zIGVzdGFkb3NcIik7XG4gICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgIHRoaXMuZXN0YWRvcy5mb3JFYWNoKChlc3RhZG8pID0+IHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGlmKGVzdGFkby5jb2RpZ28gPT0gXCJQQVwiKSB0aGlzLnNlbGVjdGVkRXN0YWRvID0gaTtcbiAgICAgICAgICAgIHRoaXMuZXN0YWRvc05hbWVzLnB1c2goZXN0YWRvLmRlc2NyaXBjaW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmJ1c2NhckV2ZW50b3MoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY2FuY2VsYXJDaXRhKGlkKXtcbiAgICB0aGlzLm1vdGl2b0NhbmNlbGFjaW9uID0gXCJcIjtcbiAgICB0aGlzLmV2ZW50b1NlbGVjdGVkID0gdGhpcy5ldmVudHMuZmlsdGVyKGV2ZSA9PiBldmUuaWRFdmVudG8gPT0gaWQpWzBdO1xuICAgIHRoaXMubW9kYWxDYW5jZWxhckNpdGEuc2hvdygpO1xuICB9XG5cbiAgY29uZmlybWFjaW9uQ2FuY2VsYXJDaXRhKCl7XG4gICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmNhbmNlbGFyRXZlbnRvKHRoaXMuZXZlbnRvU2VsZWN0ZWQuaWRFdmVudG8sIHRoaXMubW90aXZvQ2FuY2VsYWNpb24pLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZihva1tcInJlc3BvbnNlXCJdID09IFwidHJ1ZVwiKXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja1N1Y2NlcyhcIkV2ZW50byBjYW5jZWxhZG8gY29ycmVjdGFtZW50ZVwiKTtcbiAgICAgICAgICB0aGlzLmJ1c2NhckV2ZW50b3MoKTtcbiAgICAgICAgICB0aGlzLm1vZGFsQ2FuY2VsYXJDaXRhLmhpZGUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgYWNlcHRhckNpdGEoaWQpe1xuICAgIHRoaXMuZXZlbnRvU2VsZWN0ZWQgPSB0aGlzLmV2ZW50cy5maWx0ZXIoZXZlID0+IGV2ZS5pZEV2ZW50byA9PSBpZClbMF07XG4gICAgbGV0IGVtcGllemE6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGVtcGllemEuc2V0SG91cnModGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmVtcGllemFIb3JhKTtcbiAgICBlbXBpZXphLnNldE1pbnV0ZXModGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmVtcGllemFNaW51dG8pO1xuICAgIGVtcGllemEuc2V0U2Vjb25kcygwKTtcbiAgICBsZXQgYWNhYmE6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGFjYWJhLnNldEhvdXJzKHRoaXMuZXZlbnRvU2VsZWN0ZWQucGVyaW9kby5hY2FiYUhvcmEpO1xuICAgIGFjYWJhLnNldE1pbnV0ZXModGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmFjYWJhTWludXRvKTtcbiAgICBhY2FiYS5zZXRTZWNvbmRzKDApO1xuXG4gICAgdGhpcy5tYXhUaW1lID0gKChhY2FiYS5nZXRUaW1lKCkgLSBlbXBpZXphLmdldFRpbWUoKSkgLyAxMDAwKSAvIDYwO1xuICAgIHRoaXMubW9kYWxEdXJhY2lvbi5zaG93KCk7XG4gIH1cblxuICBjb25maXJtYWNpb25DaXRhKCl7XG4gICAgbGV0IGhvcmFGaW46IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGhvcmFGaW4uc2V0SG91cnModGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmVtcGllemFIb3JhKTtcbiAgICBob3JhRmluLnNldE1pbnV0ZXModGhpcy5ldmVudG9TZWxlY3RlZC5wZXJpb2RvLmVtcGllemFNaW51dG8pO1xuICAgIGhvcmFGaW4uc2V0U2Vjb25kcygwKTtcblxuICAgIGhvcmFGaW4uc2V0VGltZShob3JhRmluLmdldFRpbWUoKSArICgodGhpcy50aW1lKjYwKSoxMDAwKSk7XG5cbiAgICB0aGlzLmV2ZW50b1NlbGVjdGVkLnBlcmlvZG8uYWNhYmFIb3JhID0gaG9yYUZpbi5nZXRIb3VycygpO1xuICAgIHRoaXMuZXZlbnRvU2VsZWN0ZWQucGVyaW9kby5hY2FiYU1pbnV0byA9IGhvcmFGaW4uZ2V0TWludXRlcygpO1xuXG4gICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmFjZXB0YXJFdmVudG8odGhpcy5ldmVudG9TZWxlY3RlZCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wicmVzcG9uc2VcIl0gPT0gXCJ0cnVlXCIpe1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrU3VjY2VzKFwiRXZlbnRvIGFjZXB0YWRvIGNvcnJlY3RhbWVudGVcIik7XG4gICAgICAgICAgdGhpcy5idXNjYXJFdmVudG9zKCk7XG4gICAgICAgICAgdGhpcy5tb2RhbER1cmFjaW9uLmhpZGUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgYnVzY2FyRXZlbnRvcygpe1xuICAgIHRoaXMuX2V2ZW50U2VydmljZS5nZXRFdmVudHNQb3JFc3RhZG8odGhpcy5zZWxlY3RlZEVzdGFkbyA9PSAwID8gbnVsbCA6IHRoaXMuZXN0YWRvc1t0aGlzLnNlbGVjdGVkRXN0YWRvIC0gMV0pLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IEV2ZW50TWFwcGVyLmV2ZW50c0pTT050b0V2ZW50KG9rKTtcbiAgICAgICAgdGhpcy5ldmVudHMuZm9yRWFjaCgoZXZlKSA9PiB7XG4gICAgICAgICAgZXZlLmVzdGFkbyA9IHRoaXMuZXN0YWRvcy5maWx0ZXIoZXN0ID0+IGVzdC5pZEVzdGFkbyA9PSBldmUuZXN0YWRvLmlkRXN0YWRvKVswXTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDAuOTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAxO1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDEgO1xuICAgIH1cbiAgfVxuXG4gIHRhcEluRXZlbnQoYXJncyl7XG4gICAgY29uc29sZS5sb2coXCJZb3UgdGFwcGVkOiBcIiArIGFyZ3MuaW5kZXgpO1xuICB9XG59XG4iXX0=