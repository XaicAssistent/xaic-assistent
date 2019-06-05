"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserService_1 = require("./UserService");
var FeedBack_1 = require("../utils/FeedBack");
var UserMapper_1 = require("../mapper/UserMapper");
var DataService = /** @class */ (function () {
    function DataService(_userService) {
        this._userService = _userService;
        this.allUsersEmpresa = [];
    }
    DataService.prototype.buscarTodosLosUsuariosEmpresa = function () {
        var _this = this;
        this._userService.getAllUserEmpresa().subscribe(function (ok) {
            if (ok["users"] !== "null") {
                _this.allUsersEmpresa = UserMapper_1.UserMapper.userEmpresaJSONToUserEmpresaBusqueda(ok);
                console.log(_this.allUsersEmpresa);
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    DataService = __decorate([
        core_1.Injectable({ providedIn: "root" }),
        __metadata("design:paramtypes", [UserService_1.UserService])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRhU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUUzQyw2Q0FBNEM7QUFDNUMsOENBQTZDO0FBQzdDLG1EQUFrRDtBQUdsRDtJQUlJLHFCQUFvQixZQUF5QjtRQUF6QixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUY3QyxvQkFBZSxHQUFrQixFQUFFLENBQUM7SUFFVyxDQUFDO0lBRXpDLG1EQUE2QixHQUFwQztRQUFBLGlCQWVDO1FBZEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLFNBQVMsQ0FDM0MsVUFBQyxFQUFFO1lBQ0MsSUFBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssTUFBTSxFQUFDO2dCQUN0QixLQUFJLENBQUMsZUFBZSxHQUFHLHVCQUFVLENBQUMsb0NBQW9DLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDO2lCQUFJO2dCQUNELG1CQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQzdDO1FBQ0wsQ0FBQyxFQUNELFVBQUMsSUFBSTtZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFyQlEsV0FBVztRQUR2QixpQkFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lDQUtLLHlCQUFXO09BSnBDLFdBQVcsQ0F1QnZCO0lBQUQsa0JBQUM7Q0FBQSxBQXZCRCxJQXVCQztBQXZCWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVXNlckVtcHJlc2EgfSBmcm9tIFwiLi4vbW9kZWwvVXNlckVtcHJlc2FcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4vVXNlclNlcnZpY2VcIjtcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSBcIi4uL3V0aWxzL0ZlZWRCYWNrXCI7XG5pbXBvcnQgeyBVc2VyTWFwcGVyIH0gZnJvbSBcIi4uL21hcHBlci9Vc2VyTWFwcGVyXCI7XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiBcInJvb3RcIn0pXG5leHBvcnQgY2xhc3MgRGF0YVNlcnZpY2Uge1xuXG4gICAgYWxsVXNlcnNFbXByZXNhOiBVc2VyRW1wcmVzYVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2Upe31cblxuICAgIHB1YmxpYyBidXNjYXJUb2Rvc0xvc1VzdWFyaW9zRW1wcmVzYSgpe1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZS5nZXRBbGxVc2VyRW1wcmVzYSgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChvaykgPT4ge1xuICAgICAgICAgICAgICAgIGlmKG9rW1widXNlcnNcIl0gIT09IFwibnVsbFwiKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGxVc2Vyc0VtcHJlc2EgPSBVc2VyTWFwcGVyLnVzZXJFbXByZXNhSlNPTlRvVXNlckVtcHJlc2FCdXNxdWVkYShvayk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYWxsVXNlcnNFbXByZXNhKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKGVycm8pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG4gICAgXG59Il19