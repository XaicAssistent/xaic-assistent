"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UserEmpresa_1 = require("../model/UserEmpresa");
var router_1 = require("@angular/router");
var UserService_1 = require("../services/UserService");
var Perido_1 = require("../model/Perido");
var page_1 = require("tns-core-modules/ui/page/page");
var nativescript_local_notifications_1 = require("nativescript-local-notifications");
var router_2 = require("nativescript-angular/router");
var email = require("nativescript-email");
var UserInfoEmpresaComponent = /** @class */ (function () {
    function UserInfoEmpresaComponent(route, _userService, page, routerExtensions) {
        this.route = route;
        this._userService = _userService;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
    }
    UserInfoEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.id = params["id-selected"];
        });
        this.page.actionBarHidden = true;
        this.getInfoUserEmpresa();
    };
    UserInfoEmpresaComponent.prototype.getInfoUserEmpresa = function () {
        var _this = this;
        this._userService.getInfoUserEmpresa(this.id).subscribe(function (ok) {
            console.log(ok);
            var userData = ok["userData"];
            _this.userEmpresa.idUser = userData.IdUser;
            _this.userEmpresa.nombre = userData.Nombre;
            _this.userEmpresa.apellidos = userData.Apellidos;
            _this.userEmpresa.gmail = userData.Gmail;
            _this.userEmpresa.foto = userData.Foto;
            _this.userEmpresa.telefono = userData.Telefono;
            _this.userEmpresa.direccion = userData.Direccion;
            var empresa = ok["userEmpresa"];
            _this.userEmpresa.direccionFija = empresa.DrireccionFija;
            var category = ok["userCategory"];
            _this.userEmpresa.category = category.Nombre;
            ok["userPeriodos"].forEach(function (periodo) {
                var newPeriodo = new Perido_1.Periodo();
                newPeriodo.dia = periodo.Dia;
                newPeriodo.empiezaHora = periodo.Empieza;
                newPeriodo.acabaHora = periodo.Acaba;
                _this.userEmpresa.periodos.push(newPeriodo);
            });
            console.log(_this.userEmpresa);
        }, function (err) {
            console.log("ERROR PMV");
            console.log(err);
        });
    };
    UserInfoEmpresaComponent.prototype.pedirCita = function () {
        nativescript_local_notifications_1.LocalNotifications.schedule([{
                id: 1,
                title: 'The title',
                body: 'Recurs every minute until cancelled',
                ticker: 'The ticker',
                color: new page_1.Color("red"),
                badge: 1,
                //groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
                //groupSummary:"Summary of the grouped messages above", //android only
                ongoing: false,
                //icon: 'res://heart',
                image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
                thumbnail: true,
                //interval: 'minute',
                //channel: 'My Channel', // default: 'Channel'
                //sound: "customsound-ios.wav", // falls back to the default sound on Android
                at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
            }]).then(function () {
            console.log("Notification scheduled");
        }, function (error) {
            console.log("scheduling error: " + error);
        });
    };
    UserInfoEmpresaComponent.prototype.openEmail = function () {
        email.compose({
            //falta coger la dirección del usuario
            to: ['movip88@gmail.com'],
        });
    };
    UserInfoEmpresaComponent.prototype.openMap = function () {
        this.routerExtensions.navigateByUrl("/route");
    };
    UserInfoEmpresaComponent = __decorate([
        core_1.Component({
            selector: 'user-info-empresa',
            templateUrl: './user-info-empresa.component.html',
            styleUrls: ['./user-info-empresa.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, UserService_1.UserService, page_1.Page, router_2.RouterExtensions])
    ], UserInfoEmpresaComponent);
    return UserInfoEmpresaComponent;
}());
exports.UserInfoEmpresaComponent = UserInfoEmpresaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pbmZvLWVtcHJlc2EuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1pbmZvLWVtcHJlc2EuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG9EQUFtRDtBQUNuRCwwQ0FBaUQ7QUFDakQsdURBQXNEO0FBQ3RELDBDQUEwQztBQUMxQyxzREFBNEQ7QUFDNUQscUZBQXNFO0FBQ3RFLHNEQUErRDtBQUMvRCwwQ0FBNEM7QUFTNUM7SUFNRSxrQ0FBb0IsS0FBcUIsRUFBVSxZQUF5QixFQUFTLElBQVUsRUFBUyxnQkFBa0M7UUFBdEgsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSDFJLGdCQUFXLEdBQWdCLElBQUkseUJBQVcsRUFBRSxDQUFDO0lBR2lHLENBQUM7SUFFL0ksMkNBQVEsR0FBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN0QyxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUVqQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQscURBQWtCLEdBQWxCO1FBQUEsaUJBbUNDO1FBbENDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FDckQsVUFBQyxFQUFFO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVoQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMs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QUNaLHNDQUFzQztZQUN0QyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztTQUMxQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsMENBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQTlGWSx3QkFBd0I7UUFQcEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMseUJBQVcsQ0FBQztTQUN6QixDQUFDO3lDQU8yQix1QkFBYyxFQUF3Qix5QkFBVyxFQUFlLFdBQUksRUFBMkIseUJBQWdCO09BTi9ILHdCQUF3QixDQWdHcEM7SUFBRCwrQkFBQztDQUFBLEFBaEdELElBZ0dDO0FBaEdZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyRW1wcmVzYSB9IGZyb20gJy4uL21vZGVsL1VzZXJFbXByZXNhJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gJy4uL21vZGVsL1Blcmlkbyc7XG5pbXBvcnQgeyBQYWdlLCBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IExvY2FsTm90aWZpY2F0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBlbWFpbCBmcm9tIFwibmF0aXZlc2NyaXB0LWVtYWlsXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VzZXItaW5mby1lbXByZXNhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItaW5mby1lbXByZXNhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNlci1pbmZvLWVtcHJlc2EuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVXNlckluZm9FbXByZXNhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBpZDtcbiAgdXNlckVtcHJlc2E6IFVzZXJFbXByZXNhID0gbmV3IFVzZXJFbXByZXNhKCk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLHByaXZhdGUgcGFnZTogUGFnZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKChwYXJhbXMpID0+IHtcbiAgICAgIHRoaXMuaWQgPSBwYXJhbXNbXCJpZC1zZWxlY3RlZFwiXTtcbiAgICB9KTtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblxuICAgIHRoaXMuZ2V0SW5mb1VzZXJFbXByZXNhKCk7XG4gIH1cblxuICBnZXRJbmZvVXNlckVtcHJlc2EoKSB7XG4gICAgdGhpcy5fdXNlclNlcnZpY2UuZ2V0SW5mb1VzZXJFbXByZXNhKHRoaXMuaWQpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhvayk7XG5cbiAgICAgICAgdmFyIHVzZXJEYXRhID0gb2tbXCJ1c2VyRGF0YVwiXTtcblxuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmlkVXNlciA9IHVzZXJEYXRhLklkVXNlcjtcbiAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5ub21icmUgPSB1c2VyRGF0YS5Ob21icmU7XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EuYXBlbGxpZG9zID0gdXNlckRhdGEuQXBlbGxpZG9zO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmdtYWlsID0gdXNlckRhdGEuR21haWw7XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EuZm90byA9IHVzZXJEYXRhLkZvdG87XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EudGVsZWZvbm8gPSB1c2VyRGF0YS5UZWxlZm9ubztcbiAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5kaXJlY2Npb24gPSB1c2VyRGF0YS5EaXJlY2Npb247XG5cbiAgICAgICAgdmFyIGVtcHJlc2EgPSBva1tcInVzZXJFbXByZXNhXCJdO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmRpcmVjY2lvbkZpamEgPSBlbXByZXNhLkRyaXJlY2Npb25GaWphO1xuXG4gICAgICAgIHZhciBjYXRlZ29yeSA9IG9rW1widXNlckNhdGVnb3J5XCJdO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmNhdGVnb3J5ID0gY2F0ZWdvcnkuTm9tYnJlO1xuXG4gICAgICAgIG9rW1widXNlclBlcmlvZG9zXCJdLmZvckVhY2goKHBlcmlvZG8pPT57XG4gICAgICAgICAgdmFyIG5ld1BlcmlvZG86IFBlcmlvZG8gPSBuZXcgUGVyaW9kbygpO1xuICAgICAgICAgIG5ld1BlcmlvZG8uZGlhID0gcGVyaW9kby5EaWE7XG4gICAgICAgICAgbmV3UGVyaW9kby5lbXBpZXphSG9yYSA9IHBlcmlvZG8uRW1waWV6YTtcbiAgICAgICAgICBuZXdQZXJpb2RvLmFjYWJhSG9yYSA9IHBlcmlvZG8uQWNhYmE7XG4gICAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5wZXJpb2Rvcy5wdXNoKG5ld1BlcmlvZG8pO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlckVtcHJlc2EpO1xuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG5wZWRpckNpdGEoKXtcblxuICBMb2NhbE5vdGlmaWNhdGlvbnMuc2NoZWR1bGUoW3tcbiAgICBpZDogMSxcbiAgICB0aXRsZTogJ1RoZSB0aXRsZScsXG4gICAgYm9keTogJ1JlY3VycyBldmVyeSBtaW51dGUgdW50aWwgY2FuY2VsbGVkJyxcbiAgICB0aWNrZXI6ICdUaGUgdGlja2VyJyxcbiAgICBjb2xvcjogbmV3IENvbG9yKFwicmVkXCIpLFxuICAgIGJhZGdlOiAxLFxuICAgIC8vZ3JvdXBlZE1lc3NhZ2VzOltcIlRoZSBmaXJzdFwiLCBcIlNlY29uZFwiLCBcIktlZXAgZ29pbmdcIiwgXCJvbmUgbW9yZS4uXCIsIFwiT0sgU3RvcFwiXSwgLy9hbmRyb2lkIG9ubHlcbiAgICAvL2dyb3VwU3VtbWFyeTpcIlN1bW1hcnkgb2YgdGhlIGdyb3VwZWQgbWVzc2FnZXMgYWJvdmVcIiwgLy9hbmRyb2lkIG9ubHlcbiAgICBvbmdvaW5nOiBmYWxzZSwgLy8gbWFrZXMgdGhlIG5vdGlmaWNhdGlvbiBvbmdvaW5nIChBbmRyb2lkIG9ubHkpXG4gICAgLy9pY29uOiAncmVzOi8vaGVhcnQnLFxuICAgIGltYWdlOiBcImh0dHBzOi8vY2RuLWltYWdlcy0xLm1lZGl1bS5jb20vbWF4LzEyMDAvMSpjM2NRdllKclZlenZfQXowQ29EY2JBLmpwZWdcIixcbiAgICB0aHVtYm5haWw6IHRydWUsXG4gICAgLy9pbnRlcnZhbDogJ21pbnV0ZScsXG4gICAgLy9jaGFubmVsOiAnTXkgQ2hhbm5lbCcsIC8vIGRlZmF1bHQ6ICdDaGFubmVsJ1xuICAgIC8vc291bmQ6IFwiY3VzdG9tc291bmQtaW9zLndhdlwiLCAvLyBmYWxscyBiYWNrIHRvIHRoZSBkZWZhdWx0IHNvdW5kIG9uIEFuZHJvaWRcbiAgICBhdDogbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoMTAgKiAxMDAwKSkgLy8gMTAgc2Vjb25kcyBmcm9tIG5vd1xuICB9XSkudGhlbihcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiBzY2hlZHVsZWRcIik7XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY2hlZHVsaW5nIGVycm9yOiBcIiArIGVycm9yKTtcbiAgICAgIH1cbiAgKVxuXG59XG5cbm9wZW5FbWFpbCgpe1xuICBlbWFpbC5jb21wb3NlKHtcbiAgICAvL2ZhbHRhIGNvZ2VyIGxhIGRpcmVjY2nDs24gZGVsIHVzdWFyaW9cbiAgICB0bzogWydtb3ZpcDg4QGdtYWlsLmNvbSddLFxuICB9KTtcbn1cblxuXG5vcGVuTWFwKCl7XG4gIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKFwiL3JvdXRlXCIpO1xufVxuXG59XG5cbiJdfQ==