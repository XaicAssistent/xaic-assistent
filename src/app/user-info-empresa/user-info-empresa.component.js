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
var app = require("tns-core-modules/application");
var UserInfoEmpresaComponent = /** @class */ (function () {
    function UserInfoEmpresaComponent(route, _userService, routerExtensions) {
        this.route = route;
        this._userService = _userService;
        this.routerExtensions = routerExtensions;
        this.sideDrawer = app.getRootView();
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
    }
    UserInfoEmpresaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sideDrawer.gesturesEnabled = false;
        this.route.queryParams.subscribe(function (params) {
            _this.id = params["id-selected"];
        });
        this.getInfoUserEmpresa();
    };
    UserInfoEmpresaComponent.prototype.getInfoUserEmpresa = function () {
        var _this = this;
        this._userService.getInfoUserEmpresa(this.id).subscribe(function (ok) {
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
        }, function (err) {
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
            to: ['movip88@gmail.com'],
        }).then(function () {
            console.log("Email composer closed");
        }, function (err) {
            console.log("Error: " + err);
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
        __metadata("design:paramtypes", [router_1.ActivatedRoute, UserService_1.UserService, router_2.RouterExtensions])
    ], UserInfoEmpresaComponent);
    return UserInfoEmpresaComponent;
}());
exports.UserInfoEmpresaComponent = UserInfoEmpresaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pbmZvLWVtcHJlc2EuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1pbmZvLWVtcHJlc2EuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG9EQUFtRDtBQUNuRCwwQ0FBaUQ7QUFDakQsdURBQXNEO0FBRXRELDBDQUEwQztBQUMxQyxzREFBNEQ7QUFDNUQscUZBQXNFO0FBQ3RFLHNEQUErRDtBQUMvRCwwQ0FBNEM7QUFDNUMsa0RBQW9EO0FBVXBEO0lBUUUsa0NBQW9CLEtBQXFCLEVBQVUsWUFBeUIsRUFBUyxnQkFBa0M7UUFBbkcsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFOdkgsZUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFHOUMsZ0JBQVcsR0FBZ0IsSUFBSSx5QkFBVyxFQUFFLENBQUM7SUFHOEUsQ0FBQztJQUU1SCwyQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN0QyxLQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUdILElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBRTVCLENBQUM7SUFFRCxxREFBa0IsR0FBbEI7UUFBQSxpQkFnQ0M7UUEvQkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUNyRCxVQUFDLEVBQUU7WUFFRCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUIs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RSxVQUFTLEdBQUc7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHRCwwQ0FBTyxHQUFQO1FBQ0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBakdZLHdCQUF3QjtRQVBwQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3QixXQUFXLEVBQUUsb0NBQW9DO1lBQ2pELFNBQVMsRUFBRSxDQUFDLG1DQUFtQyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyx5QkFBVyxDQUFDO1NBQ3pCLENBQUM7eUNBUzJCLHVCQUFjLEVBQXdCLHlCQUFXLEVBQTJCLHlCQUFnQjtPQVI1Ryx3QkFBd0IsQ0FtR3BDO0lBQUQsK0JBQUM7Q0FBQSxBQW5HRCxJQW1HQztBQW5HWSw0REFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlckVtcHJlc2EgfSBmcm9tICcuLi9tb2RlbC9Vc2VyRW1wcmVzYSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckRhdGEnO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gJy4uL21vZGVsL1Blcmlkbyc7XG5pbXBvcnQgeyBQYWdlLCBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IExvY2FsTm90aWZpY2F0aW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbG9jYWwtbm90aWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgKiBhcyBlbWFpbCBmcm9tIFwibmF0aXZlc2NyaXB0LWVtYWlsXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3VzZXItaW5mby1lbXByZXNhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXItaW5mby1lbXByZXNhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNlci1pbmZvLWVtcHJlc2EuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVXNlckluZm9FbXByZXNhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG5cbiAgaWQ7XG4gIHVzZXJFbXByZXNhOiBVc2VyRW1wcmVzYSA9IG5ldyBVc2VyRW1wcmVzYSgpO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2lkZURyYXdlci5nZXN0dXJlc0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZSgocGFyYW1zKSA9PiB7XG4gICAgICB0aGlzLmlkID0gcGFyYW1zW1wiaWQtc2VsZWN0ZWRcIl07XG4gICAgfSk7XG4gICAgXG5cbiAgICB0aGlzLmdldEluZm9Vc2VyRW1wcmVzYSgpO1xuXG4gIH1cblxuICBnZXRJbmZvVXNlckVtcHJlc2EoKSB7XG4gICAgdGhpcy5fdXNlclNlcnZpY2UuZ2V0SW5mb1VzZXJFbXByZXNhKHRoaXMuaWQpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuXG4gICAgICAgIHZhciB1c2VyRGF0YSA9IG9rW1widXNlckRhdGFcIl07XG5cbiAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5pZFVzZXIgPSB1c2VyRGF0YS5JZFVzZXI7XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2Eubm9tYnJlID0gdXNlckRhdGEuTm9tYnJlO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmFwZWxsaWRvcyA9IHVzZXJEYXRhLkFwZWxsaWRvcztcbiAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5nbWFpbCA9IHVzZXJEYXRhLkdtYWlsO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLmZvdG8gPSB1c2VyRGF0YS5Gb3RvO1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhLnRlbGVmb25vID0gdXNlckRhdGEuVGVsZWZvbm87XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EuZGlyZWNjaW9uID0gdXNlckRhdGEuRGlyZWNjaW9uO1xuXG4gICAgICAgIHZhciBlbXByZXNhID0gb2tbXCJ1c2VyRW1wcmVzYVwiXTtcbiAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5kaXJlY2Npb25GaWphID0gZW1wcmVzYS5EcmlyZWNjaW9uRmlqYTtcblxuICAgICAgICB2YXIgY2F0ZWdvcnkgPSBva1tcInVzZXJDYXRlZ29yeVwiXTtcbiAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5jYXRlZ29yeSA9IGNhdGVnb3J5Lk5vbWJyZTtcblxuICAgICAgICBva1tcInVzZXJQZXJpb2Rvc1wiXS5mb3JFYWNoKChwZXJpb2RvKT0+e1xuICAgICAgICAgICB2YXIgbmV3UGVyaW9kbzogUGVyaW9kbyA9IG5ldyBQZXJpb2RvKCk7XG4gICAgICAgICAgIG5ld1BlcmlvZG8uZGlhID0gcGVyaW9kby5EaWE7XG4gICAgICAgICAgbmV3UGVyaW9kby5lbXBpZXphSG9yYSA9IHBlcmlvZG8uRW1waWV6YTtcbiAgICAgICAgICBuZXdQZXJpb2RvLmFjYWJhSG9yYSA9IHBlcmlvZG8uQWNhYmE7XG4gICAgICAgICAgdGhpcy51c2VyRW1wcmVzYS5wZXJpb2Rvcy5wdXNoKG5ld1BlcmlvZG8pO1xuICAgICAgICAgfSk7XG4gICAgICAgICBcbiAgICAgIH0sXG4gICAgICAoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgfVxuXG5wZWRpckNpdGEoKXtcbiAgTG9jYWxOb3RpZmljYXRpb25zLnNjaGVkdWxlKFt7XG4gICAgaWQ6IDEsXG4gICAgdGl0bGU6ICdUaGUgdGl0bGUnLFxuICAgIGJvZHk6ICdSZWN1cnMgZXZlcnkgbWludXRlIHVudGlsIGNhbmNlbGxlZCcsXG4gICAgdGlja2VyOiAnVGhlIHRpY2tlcicsXG4gICAgY29sb3I6IG5ldyBDb2xvcihcInJlZFwiKSxcbiAgICBiYWRnZTogMSxcbiAgICAvL2dyb3VwZWRNZXNzYWdlczpbXCJUaGUgZmlyc3RcIiwgXCJTZWNvbmRcIiwgXCJLZWVwIGdvaW5nXCIsIFwib25lIG1vcmUuLlwiLCBcIk9LIFN0b3BcIl0sIC8vYW5kcm9pZCBvbmx5XG4gICAgLy9ncm91cFN1bW1hcnk6XCJTdW1tYXJ5IG9mIHRoZSBncm91cGVkIG1lc3NhZ2VzIGFib3ZlXCIsIC8vYW5kcm9pZCBvbmx5XG4gICAgb25nb2luZzogZmFsc2UsIC8vIG1ha2VzIHRoZSBub3RpZmljYXRpb24gb25nb2luZyAoQW5kcm9pZCBvbmx5KVxuICAgIC8vaWNvbjogJ3JlczovL2hlYXJ0JyxcbiAgICBpbWFnZTogXCJodHRwczovL2Nkbi1pbWFnZXMtMS5tZWRpdW0uY29tL21heC8xMjAwLzEqYzNjUXZZSnJWZXp2X0F6MENvRGNiQS5qcGVnXCIsXG4gICAgdGh1bWJuYWlsOiB0cnVlLFxuICAgIC8vaW50ZXJ2YWw6ICdtaW51dGUnLFxuICAgIC8vY2hhbm5lbDogJ015IENoYW5uZWwnLCAvLyBkZWZhdWx0OiAnQ2hhbm5lbCdcbiAgICAvL3NvdW5kOiBcImN1c3RvbXNvdW5kLWlvcy53YXZcIiwgLy8gZmFsbHMgYmFjayB0byB0aGUgZGVmYXVsdCBzb3VuZCBvbiBBbmRyb2lkXG4gICAgYXQ6IG5ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgKDEwICogMTAwMCkpIC8vIDEwIHNlY29uZHMgZnJvbSBub3dcbiAgfV0pLnRoZW4oXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RpZmljYXRpb24gc2NoZWR1bGVkXCIpO1xuICAgICAgfSxcbiAgICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2NoZWR1bGluZyBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgICB9XG4gIClcbn1cblxub3BlbkVtYWlsKCl7XG4gIGVtYWlsLmNvbXBvc2Uoe1xuICAgIHRvOiBbJ21vdmlwODhAZ21haWwuY29tJ10sXG59KS50aGVuKFxuICBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVtYWlsIGNvbXBvc2VyIGNsb3NlZFwiKTtcbiAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnIpO1xuICB9KTtcbn1cblxuXG5vcGVuTWFwKCl7XG50aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcIi9yb3V0ZVwiKTtcbn1cblxufVxuXG4iXX0=