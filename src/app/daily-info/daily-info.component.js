"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var Event_1 = require("../model/Event");
var EventService_1 = require("../services/EventService");
var EventMapper_1 = require("../mapper/EventMapper");
var FeedBack_1 = require("../utils/FeedBack");
var router_2 = require("nativescript-angular/router");
var DailyInfoComponent = /** @class */ (function () {
    function DailyInfoComponent(route, _eventService, routerExtensions) {
        this.route = route;
        this._eventService = _eventService;
        this.routerExtensions = routerExtensions;
        this.evento = new Event_1.Event();
        this.ruta = "";
    }
    DailyInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.ruta = params['rutaAnterior'];
            _this._eventService.getEvent(params['idEvento']).subscribe(function (ok) {
                if (ok["evento"] !== "null") {
                    _this.evento = EventMapper_1.EventMapper.infoEventJSONtoEvent(ok);
                }
                else {
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (erro) {
                console.log("ERROR PMV");
                console.log(erro);
            });
        });
    };
    DailyInfoComponent.prototype.updateEvent = function () {
        this._eventService.updateEvent(this.evento).subscribe(function (ok) {
            if (ok["response"] !== "false") {
                FeedBack_1.FeedBack.feedBackSucces("Evento actualizado");
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    DailyInfoComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
        }
    };
    DailyInfoComponent.prototype.goBack = function () {
        this.routerExtensions.navigateByUrl(this.ruta, { clearHistory: true });
    };
    DailyInfoComponent = __decorate([
        core_1.Component({
            selector: 'ns-daily-info',
            templateUrl: './daily-info.component.html',
            styleUrls: ['./daily-info.component.css'],
            moduleId: module.id,
            providers: [EventService_1.EventService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, EventService_1.EventService, router_2.RouterExtensions])
    ], DailyInfoComponent);
    return DailyInfoComponent;
}());
exports.DailyInfoComponent = DailyInfoComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFpbHktaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYWlseS1pbmZvLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwQ0FBaUQ7QUFDakQsd0NBQXVDO0FBQ3ZDLHlEQUF3RDtBQUN4RCxxREFBb0Q7QUFDcEQsOENBQTZDO0FBRTdDLHNEQUErRDtBQVMvRDtJQUlFLDRCQUFvQixLQUFxQixFQUFVLGFBQTJCLEVBQVUsZ0JBQWtDO1FBQXRHLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSDFILFdBQU0sR0FBUyxJQUFJLGFBQUssRUFBRSxDQUFDO1FBQzNCLFNBQUksR0FBVyxFQUFFLENBQUM7SUFFMkcsQ0FBQztJQUU5SCxxQ0FBUSxHQUFSO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDOUIsVUFBQyxNQUFNO1lBQ0wsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbkMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUN2RCxVQUFDLEVBQUU7Z0JBQ0gsSUFBRyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssTUFBTSxFQUFDO29CQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLHlCQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3BEO3FCQUFJO29CQUNILG1CQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2lCQUMzQztZQUNELENBQUMsRUFDRCxVQUFDLElBQUk7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELHdDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNuRCxVQUFDLEVBQUU7WUFDRCxJQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxPQUFPLEVBQUM7Z0JBQzVCLG1CQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDL0M7aUJBQUk7Z0JBQ0gsbUJBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDM0M7UUFDRCxDQUFDLEVBQ0QsVUFBQyxJQUFJO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVELG9DQUFPLEdBQVAsVUFBUSxJQUEyQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUU7U0FDdkI7SUFDSCxDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUF2RFUsa0JBQWtCO1FBUDlCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3pDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQywyQkFBWSxDQUFDO1NBQzFCLENBQUM7eUNBSzJCLHVCQUFjLEVBQXlCLDJCQUFZLEVBQTRCLHlCQUFnQjtPQUovRyxrQkFBa0IsQ0F3RDlCO0lBQUQseUJBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRXZlbnQgfSBmcm9tICcuLi9tb2RlbC9FdmVudCc7XG5pbXBvcnQgeyBFdmVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9FdmVudFNlcnZpY2UnO1xuaW1wb3J0IHsgRXZlbnRNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvRXZlbnRNYXBwZXInO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tICcuLi91dGlscy9GZWVkQmFjayc7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1kYWlseS1pbmZvJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RhaWx5LWluZm8uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9kYWlseS1pbmZvLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbRXZlbnRTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBEYWlseUluZm9Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBldmVudG86RXZlbnQgPSBuZXcgRXZlbnQoKTtcbiAgcnV0YTogc3RyaW5nID0gXCJcIjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShcbiAgICAgIChwYXJhbXMpID0+IHtcbiAgICAgICAgdGhpcy5ydXRhID0gcGFyYW1zWydydXRhQW50ZXJpb3InXTtcbiAgICAgICAgdGhpcy5fZXZlbnRTZXJ2aWNlLmdldEV2ZW50KHBhcmFtc1snaWRFdmVudG8nXSkuc3Vic2NyaWJlKFxuICAgICAgICAgIChvaykgPT4ge1xuICAgICAgICAgIGlmKG9rW1wiZXZlbnRvXCJdICE9PSBcIm51bGxcIil7XG4gICAgICAgICAgICB0aGlzLmV2ZW50byA9IEV2ZW50TWFwcGVyLmluZm9FdmVudEpTT050b0V2ZW50KG9rKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICB1cGRhdGVFdmVudCgpe1xuICAgIHRoaXMuX2V2ZW50U2VydmljZS51cGRhdGVFdmVudCh0aGlzLmV2ZW50bykuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wicmVzcG9uc2VcIl0gIT09IFwiZmFsc2VcIil7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tTdWNjZXMoXCJFdmVudG8gYWN0dWFsaXphZG9cIik7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgICAgfVxuICAgICk7XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDAuOTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAxO1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDEgO1xuICAgIH1cbiAgfVxuXG4gIGdvQmFjaygpe1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKHRoaXMucnV0YSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gIH1cbn0iXX0=