"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var EventService_1 = require("../services/EventService");
var FeedBack_1 = require("../utils/FeedBack");
var EventMapper_1 = require("../mapper/EventMapper");
var Event_1 = require("../model/Event");
var CalendarPageComponent = /** @class */ (function () {
    function CalendarPageComponent(_page, routerExtensions, _eventService) {
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this._eventService = _eventService;
        this.calendarEvents = [];
        this.events = [];
        this.modoVista = true;
        this.date = new Date();
    }
    CalendarPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        this._eventService.getEvents().subscribe(function (ok) {
            if (ok["events"] !== "null") {
                _this.events = EventMapper_1.EventMapper.eventsJSONtoEvent(ok);
                _this.calendarEvents = EventMapper_1.EventMapper.eventstoCalendarEvent(_this.events);
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
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
        var id = (this.events.filter(function (eve) { return eve.titulo == event.title && eve.fecha.getDate() == evento.fecha.getDate() && eve.fecha.getFullYear() == evento.fecha.getFullYear() && eve.fecha.getMonth() == evento.fecha.getMonth() && eve.periodo.empiezaHora == evento.periodo.empiezaHora && eve.periodo.empiezaMinuto && evento.periodo.empiezaMinuto; })[0]).idEvento;
        var params = {
            queryParams: {
                "idEvento": id,
                "rutaAnterior": "calendar"
            },
            clearHistory: true
        };
        this.routerExtensions.navigate(["/infoDaily"], params);
    };
    CalendarPageComponent.prototype.addPersonalEvent = function () {
        var params = {
            queryParams: {
                "fecha": this.date
            },
            clearHistory: true
        };
        this.routerExtensions.navigate(["/newEvent"], params);
    };
    CalendarPageComponent.prototype.onDateSelected = function (args) {
        var now = new Date();
        this.date = args.date < now ? now : args.date;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxlbmRhci1wYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUdsRCxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELHlEQUF3RDtBQUN4RCw4Q0FBNkM7QUFDN0MscURBQW9EO0FBQ3BELHdDQUF1QztBQVN2QztJQU9FLCtCQUFvQixLQUFXLEVBQVUsZ0JBQWtDLEVBQVUsYUFBMkI7UUFBNUYsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUxoSCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixXQUFNLEdBQVksRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsU0FBSSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7SUFHeEIsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWxDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUN0QyxVQUFDLEVBQUU7WUFDRCxJQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxNQUFNLEVBQUM7Z0JBQ3pCLEtBQUksQ0FBQyxNQUFNLEdBQUcseUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEQsS0FBSSxDQUFDLGNBQWMsR0FBRyx5QkFBVyxDQUFDLHFCQUFxQixDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN0RTtpQkFBSTtnQkFDSCxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsRUFDRCxVQUFDLElBQUk7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsNkNBQWEsR0FBYixVQUFjLElBQUk7UUFDaEIsSUFBTSxLQUFLLEdBQWlDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0QsSUFBSSxNQUFNLEdBQVUsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDL0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFeEQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBNVMsQ0FBNFMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRS9WLElBQUksTUFBTSxHQUFHO1lBQ1gsV0FBVyxFQUFFO2dCQUNYLFVBQVUsRUFBRyxFQUFFO2dCQUNmLGNBQWMsRUFBRyxVQUFVO2FBQzVCO1lBQ0QsWUFBWSxFQUFHLElBQUk7U0FDcEIsQ0FBQTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsZ0RBQWdCLEdBQWhCO1FBQ0UsSUFBSSxNQUFNLEdBQUc7WUFDWCxXQUFXLEVBQUU7Z0JBQ1gsT0FBTyxFQUFHLElBQUksQ0FBQyxJQUFJO2FBQ3BCO1lBQ0QsWUFBWSxFQUFHLElBQUk7U0FDcEIsQ0FBQTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsOENBQWMsR0FBZCxVQUFlLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDaEQsQ0FBQztJQWhFVSxxQkFBcUI7UUFQakMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztZQUM1QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsMkJBQVksQ0FBQztTQUMxQixDQUFDO3lDQVEyQixXQUFJLEVBQTRCLHlCQUFnQixFQUF5QiwyQkFBWTtPQVByRyxxQkFBcUIsQ0FpRWpDO0lBQUQsNEJBQUM7Q0FBQSxBQWpFRCxJQWlFQztBQWpFWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBjYWxlbmRhck1vZHVsZSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWNhbGVuZGFyXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL0V2ZW50U2VydmljZVwiO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tIFwiLi4vdXRpbHMvRmVlZEJhY2tcIjtcbmltcG9ydCB7IEV2ZW50TWFwcGVyIH0gZnJvbSBcIi4uL21hcHBlci9FdmVudE1hcHBlclwiO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tIFwiLi4vbW9kZWwvRXZlbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtY2FsZW5kYXItcGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxlbmRhci1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FsZW5kYXItcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW0V2ZW50U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjYWxlbmRhckV2ZW50cyA9IFtdO1xuICBldmVudHM6IEV2ZW50W10gPSBbXTtcbiAgbW9kb1Zpc3RhID0gdHJ1ZTtcbiAgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBwcml2YXRlIF9ldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmdldEV2ZW50cygpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZihva1tcImV2ZW50c1wiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgIHRoaXMuZXZlbnRzID0gRXZlbnRNYXBwZXIuZXZlbnRzSlNPTnRvRXZlbnQob2spO1xuICAgICAgICAgIHRoaXMuY2FsZW5kYXJFdmVudHMgPSBFdmVudE1hcHBlci5ldmVudHN0b0NhbGVuZGFyRXZlbnQodGhpcy5ldmVudHMpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBzZWxlY3RlZEV2ZW50KGFyZ3Mpe1xuICAgIGNvbnN0IGV2ZW50OiBjYWxlbmRhck1vZHVsZS5DYWxlbmRhckV2ZW50ID0gYXJncy5ldmVudERhdGE7XG4gICAgbGV0IGV2ZW50bzogRXZlbnQgPSBuZXcgRXZlbnQoKTtcbiAgICBldmVudG8uZmVjaGEgPSBldmVudC5zdGFydERhdGU7XG4gICAgZXZlbnRvLnRpdHVsbyA9IGV2ZW50LnRpdGxlO1xuICAgIGV2ZW50by5wZXJpb2RvLmVtcGllemFIb3JhID0gZXZlbnQuc3RhcnREYXRlLmdldEhvdXJzKCk7XG4gICAgZXZlbnRvLnBlcmlvZG8uZW1waWV6YU1pbnV0byA9IGV2ZW50LnN0YXJ0RGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgZXZlbnRvLnBlcmlvZG8uYWNhYmFIb3JhID0gZXZlbnQuZW5kRGF0ZS5nZXRIb3VycygpO1xuICAgIGV2ZW50by5wZXJpb2RvLmFjYWJhTWludXRvID0gZXZlbnQuZW5kRGF0ZS5nZXRNaW51dGVzKCk7XG4gICAgXG4gICAgbGV0IGlkID0gKHRoaXMuZXZlbnRzLmZpbHRlcihldmUgPT4gZXZlLnRpdHVsbyA9PSBldmVudC50aXRsZSAmJiBldmUuZmVjaGEuZ2V0RGF0ZSgpID09IGV2ZW50by5mZWNoYS5nZXREYXRlKCkgJiYgZXZlLmZlY2hhLmdldEZ1bGxZZWFyKCkgPT0gZXZlbnRvLmZlY2hhLmdldEZ1bGxZZWFyKCkgJiYgZXZlLmZlY2hhLmdldE1vbnRoKCkgPT0gZXZlbnRvLmZlY2hhLmdldE1vbnRoKCkgJiYgZXZlLnBlcmlvZG8uZW1waWV6YUhvcmEgPT0gZXZlbnRvLnBlcmlvZG8uZW1waWV6YUhvcmEgJiYgZXZlLnBlcmlvZG8uZW1waWV6YU1pbnV0byAmJiBldmVudG8ucGVyaW9kby5lbXBpZXphTWludXRvKVswXSkuaWRFdmVudG87XG4gICAgXG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgIHF1ZXJ5UGFyYW1zOiB7XG4gICAgICAgIFwiaWRFdmVudG9cIiA6IGlkLFxuICAgICAgICBcInJ1dGFBbnRlcmlvclwiIDogXCJjYWxlbmRhclwiXG4gICAgICB9LFxuICAgICAgY2xlYXJIaXN0b3J5IDogdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2luZm9EYWlseVwiXSwgcGFyYW1zKTtcbiAgfVxuXG4gIGFkZFBlcnNvbmFsRXZlbnQoKXtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgcXVlcnlQYXJhbXM6IHtcbiAgICAgICAgXCJmZWNoYVwiIDogdGhpcy5kYXRlXG4gICAgICB9LFxuICAgICAgY2xlYXJIaXN0b3J5IDogdHJ1ZVxuICAgIH1cbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL25ld0V2ZW50XCJdLCBwYXJhbXMpO1xuICB9XG5cbiAgb25EYXRlU2VsZWN0ZWQoYXJncykge1xuICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMuZGF0ZSA9IGFyZ3MuZGF0ZSA8IG5vdyA/IG5vdyA6IGFyZ3MuZGF0ZTtcbiAgfVxufVxuIl19