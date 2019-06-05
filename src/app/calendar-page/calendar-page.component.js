"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var EventService_1 = require("../services/EventService");
var FeedBack_1 = require("../utils/FeedBack");
var EventMapper_1 = require("../mapper/EventMapper");
var Event_1 = require("../model/Event");
var app = require("tns-core-modules/application");
var CalendarPageComponent = /** @class */ (function () {
    function CalendarPageComponent(_page, routerExtensions, _eventService) {
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this._eventService = _eventService;
        this.sideDrawer = app.getRootView();
        this.calendarEvents = [];
        this.modoVista = true;
    }
    CalendarPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this.sideDrawer.gesturesEnabled = true;
        this._eventService.getEvents().subscribe(function (ok) {
            if (ok["events"] !== "null") {
                _this.calendarEvents = EventMapper_1.EventMapper.eventstoCalendarEvent(EventMapper_1.EventMapper.eventsJSONtoEvent(ok));
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    CalendarPageComponent.prototype.onDateSelected = function (args) {
        console.log("onDateSelected: " + args.date);
    };
    CalendarPageComponent.prototype.onDateDeselected = function (args) {
        console.log("onDateDeselected: " + args.date);
    };
    CalendarPageComponent.prototype.onNavigatedToDate = function (args) {
        console.log("onNavigatedToDate: " + args.date);
    };
    CalendarPageComponent.prototype.onNavigatingToDateStarted = function (args) {
        console.log("onNavigatingToDateStarted: " + args.date);
    };
    CalendarPageComponent.prototype.onViewModeChanged = function (args) {
        console.log("onViewModeChanged: " + args.newValue);
    };
    CalendarPageComponent.prototype.selectedEvent = function (args) {
        var event = args.eventData;
        var evento = new Event_1.Event();
        evento.fecha = event.startDate;
        evento.titulo = event.title;
        evento.periodo.empiezaHora = event.startDate.getHours();
        evento.periodo.empiezaMinuto = event.startDate.getMinutes();
        evento.periodo.acabaHora = event.endDate.getHours();
        evento.periodo.acabaMinuto = event.endDate.getMinutes();
        console.log(evento);
    };
    CalendarPageComponent.prototype.addPersonalEvent = function () {
        this.routerExtensions.navigateByUrl("newEvent");
    };
    CalendarPageComponent = __decorate([
        core_1.Component({
            selector: 'ns-calendar-page',
            templateUrl: './calendar-page.component.html',
            styleUrls: ['./calendar-page.component.css'],
            moduleId: module.id,
            providers: [EventService_1.EventService]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions, EventService_1.EventService])
    ], CalendarPageComponent);
    return CalendarPageComponent;
}());
exports.CalendarPageComponent = CalendarPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxlbmRhci1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELHlEQUF3RDtBQUN4RCw4Q0FBNkM7QUFDN0MscURBQW9EO0FBQ3BELHdDQUF1QztBQUV2QyxrREFBb0Q7QUFTcEQ7SUFPRSwrQkFBb0IsS0FBVyxFQUFVLGdCQUFrQyxFQUFVLGFBQTJCO1FBQTVGLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFMaEgsZUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFOUMsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFDcEIsY0FBUyxHQUFHLElBQUksQ0FBQztJQUdqQixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUN0QyxVQUFDLEVBQUU7WUFDRCxJQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLEVBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxjQUFjLEdBQUcseUJBQVcsQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDNUY7aUJBQUk7Z0JBQ0gsbUJBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLEVBQ0QsVUFBQyxJQUFJO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FDRixDQUFDO0lBRUosQ0FBQztJQUVELDhDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELGdEQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpREFBaUIsR0FBakIsVUFBa0IsSUFBSTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQseURBQXlCLEdBQXpCLFVBQTBCLElBQUk7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELGlEQUFpQixHQUFqQixVQUFrQixJQUFJO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCw2Q0FBYSxHQUFiLFVBQWMsSUFBSTtRQUNoQixJQUFNLEtBQUssR0FBaUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzRCxJQUFJLE1BQU0sR0FBVSxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMvQixNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVELE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxnREFBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUEvRFUscUJBQXFCO1FBUGpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7WUFDNUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLDJCQUFZLENBQUM7U0FDMUIsQ0FBQzt5Q0FRMkIsV0FBSSxFQUE0Qix5QkFBZ0IsRUFBeUIsMkJBQVk7T0FQckcscUJBQXFCLENBZ0VqQztJQUFELDRCQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgY2FsZW5kYXJNb2R1bGUgZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1jYWxlbmRhclwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEV2ZW50U2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9FdmVudFNlcnZpY2VcIjtcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSBcIi4uL3V0aWxzL0ZlZWRCYWNrXCI7XG5pbXBvcnQgeyBFdmVudE1hcHBlciB9IGZyb20gXCIuLi9tYXBwZXIvRXZlbnRNYXBwZXJcIjtcbmltcG9ydCB7IEV2ZW50IH0gZnJvbSBcIi4uL21vZGVsL0V2ZW50XCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtY2FsZW5kYXItcGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW0V2ZW50U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG5cbiAgY2FsZW5kYXJFdmVudHMgPSBbXTtcbiAgbW9kb1Zpc3RhID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgX2V2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5zaWRlRHJhd2VyLmdlc3R1cmVzRW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmdldEV2ZW50cygpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZihva1tcImV2ZW50c1wiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXJFdmVudHMgPSBFdmVudE1hcHBlci5ldmVudHN0b0NhbGVuZGFyRXZlbnQoRXZlbnRNYXBwZXIuZXZlbnRzSlNPTnRvRXZlbnQob2spKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuXG4gIH1cblxuICBvbkRhdGVTZWxlY3RlZChhcmdzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uRGF0ZVNlbGVjdGVkOiBcIiArIGFyZ3MuZGF0ZSk7XG4gIH1cblxuICBvbkRhdGVEZXNlbGVjdGVkKGFyZ3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25EYXRlRGVzZWxlY3RlZDogXCIgKyBhcmdzLmRhdGUpO1xuICB9XG5cbiAgb25OYXZpZ2F0ZWRUb0RhdGUoYXJncykge1xuICAgICAgY29uc29sZS5sb2coXCJvbk5hdmlnYXRlZFRvRGF0ZTogXCIgKyBhcmdzLmRhdGUpO1xuICB9XG5cbiAgb25OYXZpZ2F0aW5nVG9EYXRlU3RhcnRlZChhcmdzKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIm9uTmF2aWdhdGluZ1RvRGF0ZVN0YXJ0ZWQ6IFwiICsgYXJncy5kYXRlKTtcbiAgfVxuXG4gIG9uVmlld01vZGVDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwib25WaWV3TW9kZUNoYW5nZWQ6IFwiICsgYXJncy5uZXdWYWx1ZSk7XG4gIH1cblxuICBzZWxlY3RlZEV2ZW50KGFyZ3Mpe1xuICAgIGNvbnN0IGV2ZW50OiBjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50ID0gYXJncy5ldmVudERhdGE7XG4gICAgbGV0IGV2ZW50bzogRXZlbnQgPSBuZXcgRXZlbnQoKTtcbiAgICBldmVudG8uZmVjaGEgPSBldmVudC5zdGFydERhdGU7XG4gICAgZXZlbnRvLnRpdHVsbyA9IGV2ZW50LnRpdGxlO1xuICAgIGV2ZW50by5wZXJpb2RvLmVtcGllemFIb3JhID0gZXZlbnQuc3RhcnREYXRlLmdldEhvdXJzKCk7XG4gICAgZXZlbnRvLnBlcmlvZG8uZW1waWV6YU1pbnV0byA9IGV2ZW50LnN0YXJ0RGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgZXZlbnRvLnBlcmlvZG8uYWNhYmFIb3JhID0gZXZlbnQuZW5kRGF0ZS5nZXRIb3VycygpO1xuICAgIGV2ZW50by5wZXJpb2RvLmFjYWJhTWludXRvID0gZXZlbnQuZW5kRGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgY29uc29sZS5sb2coZXZlbnRvKTtcbiAgfVxuXG4gIGFkZFBlcnNvbmFsRXZlbnQoKXtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcIm5ld0V2ZW50XCIpO1xuICB9XG59XG4iXX0=