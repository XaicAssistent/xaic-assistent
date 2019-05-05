"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var UserService_1 = require("../services/UserService");
var FeedBack_1 = require("../utils/FeedBack");
var dialogs = require("tns-core-modules/ui/dialogs");
var TypeUser_1 = require("../utils/TypeUser");
var UserData_1 = require("../model/UserData");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, _userService, routerExtensions) {
        this._page = _page;
        this._userService = _userService;
        this.routerExtensions = routerExtensions;
        this.isLogin = true;
        this.formSubmitted = false;
        this.navigating = false;
        this.loginTxt = "L o g i n";
        this.userData = new UserData_1.UserData();
        this.enumTipoUsuario = TypeUser_1.TypeUser;
        this.selectedIndex = 1;
        this.items = ["Si", "No"];
        this.email = "";
        this.pass = "";
    }
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.on('navigatingTo', function (data) {
            _this.circleItem.scaleX = 0;
            _this.circleItem.scaleY = 0;
            _this.navigating = false;
            _this.logoItem.translateY = 0;
        });
        this.btnItem = this.btnRef.nativeElement;
        this.loginLayout = this.angularLogin.nativeElement;
        this.regsiterLayout = this.angularRegister.nativeElement;
        this.circleItem = this.circleRef.nativeElement;
        this.logoItem = this.logoRef.nativeElement;
        this.content = this.angularContent.nativeElement;
        this.regsiterLayout.scaleY = 0;
        this.regsiterLayout.scaleX = 0;
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        this.btnItem.translateY = -280;
    };
    HomePageComponent.prototype.choseTypeUser = function () {
        var _this = this;
        dialogs.action({
            message: "Tipo de usuario",
            actions: Object.keys(TypeUser_1.TypeUser)
        }).then(function (result) {
            _this.tipoUsuario = TypeUser_1.TypeUser[result];
        });
    };
    HomePageComponent.prototype.choseCategory = function () {
    };
    HomePageComponent.prototype.onButtonTap = function () {
        var _this = this;
        this.formSubmitted = true;
        if (this.isLogin) {
            this._userService.logUser(this.email, this.pass).subscribe(function (ok) {
                if (ok["token"] !== "null") {
                    //afegir al app settings
                    _this.navigating = true;
                    _this.logoItem.animate({
                        translate: { x: 0, y: 300 },
                        scale: { x: 1.8, y: 1.8 },
                        duration: 400
                    }).then(function () {
                        _this.circleItem.translateY = 200;
                        _this.circleItem.animate({
                            scale: { x: 15, y: 15 },
                            duration: 400,
                        }).then(function () {
                            _this.routerExtensions.navigateByUrl("register", { clearHistory: true });
                            _this.formSubmitted = false;
                        });
                    });
                }
                else {
                    _this.formSubmitted = false;
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (error) {
                FeedBack_1.FeedBack.feedBackError("Error de conexión...");
                console.log("ERROR PMV -> ");
                console.log(error);
            });
        }
        else {
            console.log("register");
        }
    };
    HomePageComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
            /*this.btnItem.scaleX = 0.9;
            this.btnItem.scaleY = 0.9;*/
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
            /*this.btnItem.scaleX = 1;
            this.btnItem.scaleY = 1;*/
        }
    };
    HomePageComponent.prototype.setToLogin = function () {
        var _this = this;
        this.content.animate({
            translate: { x: 0, y: 0 },
            duration: 150
        }).then(function () {
            _this.logoItem.animate({
                scale: { x: 1, y: 1 },
                duration: 100
            }).then(function () {
                _this.regsiterLayout.animate({
                    scale: { x: 0, y: 0 },
                    duration: 300
                }).then(function () {
                    _this.isLogin = true;
                    _this.loginTxt = "L o g i n";
                    _this.btnItem.animate({
                        translate: { x: 0, y: -280 },
                        duration: 200
                    }).then(function () {
                        _this.loginLayout.animate({ scale: { x: 1, y: 1 }, duration: 200 });
                    });
                });
            });
        });
    };
    HomePageComponent.prototype.setToRegister = function () {
        var _this = this;
        this.isLogin = false;
        this.loginTxt = "R e g i s t r a r";
        this.logoItem.animate({
            scale: { x: 0, y: 0 },
            duration: 150
        }).then(function () {
            _this.content.animate({
                translate: { x: 0, y: -160 },
                duration: 100
            }).then(function () {
                _this.btnItem.animate({
                    translate: { x: 0, y: 0 },
                    duration: 200
                }).then(function () {
                    _this.regsiterLayout.animate({
                        scale: { x: 1.3, y: 1.3 },
                        duration: 200
                    }).then(function () {
                        _this.regsiterLayout.animate({ scale: { x: 1, y: 1 }, translate: { x: 0, y: -100 }, duration: 200 });
                    });
                });
            });
        });
    };
    __decorate([
        core_1.ViewChild("register"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularRegister", void 0);
    __decorate([
        core_1.ViewChild("btn"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "btnRef", void 0);
    __decorate([
        core_1.ViewChild("circle"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "circleRef", void 0);
    __decorate([
        core_1.ViewChild("logo"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "logoRef", void 0);
    __decorate([
        core_1.ViewChild("login"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularLogin", void 0);
    __decorate([
        core_1.ViewChild("content"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularContent", void 0);
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'ns-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService]
        }),
        __metadata("design:paramtypes", [page_1.Page, UserService_1.UserService, router_1.RouterExtensions])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBQzdDLHFEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsOENBQTZDO0FBUzdDO0lBZ0NFLDJCQUFvQixLQUFXLEVBQVUsWUFBeUIsRUFBUyxnQkFBa0M7UUFBekYsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQWpCN0csWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUl2QixhQUFRLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFFcEMsb0JBQWUsR0FBRyxtQkFBUSxDQUFDO1FBRXBCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLFVBQUssR0FBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0MsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFNBQUksR0FBRyxFQUFFLENBQUM7SUFHVixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxJQUFJO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx5Q0FBYSxHQUFiO1FBQUEsaUJBT0M7UUFOQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2IsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDO1NBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1osS0FBSSxDQUFDLFdBQVcsR0FBRyxtQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELHlDQUFhLEdBQWI7SUFDQSxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUFBLGlCQXVDQztRQXRDQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUUxQixJQUFHLElBQUksQ0FBQyxPQUFPLEVBQUM7WUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3hELFVBQUMsRUFBRTtnQkFFRCxJQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxNQUFNLEVBQUM7b0JBQ3hCLHdCQUF3QjtvQkFDeEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7b0JBRXZCLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO3dCQUNwQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7d0JBQzNCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQzt3QkFDeEIsUUFBUSxFQUFFLEdBQUc7cUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDTixLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7d0JBQ2pDLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDOzRCQUN0QixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUU7NEJBQ3ZCLFFBQVEsRUFBRSxHQUFHO3lCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7NEJBQ04sS0FBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDeEUsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7d0JBQzdCLENBQUMsQ0FBQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFJO29CQUNILEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO29CQUMzQixtQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztpQkFDM0M7WUFDSCxDQUFDLEVBQ0QsVUFBQyxLQUFLO2dCQUNKLG1CQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUNGLENBQUM7U0FDSDthQUFJO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7SUFFRCxtQ0FBTyxHQUFQLFVBQVEsSUFBMkI7UUFDakMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCO3dDQUM0QjtTQUM3QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRTtZQUN0QjtzQ0FDMEI7U0FDM0I7SUFDSCxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUFBLGlCQXdCQztRQXZCQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUNuQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDekIsUUFBUSxFQUFFLEdBQUc7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDckIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO29CQUMxQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3JCLFFBQVEsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ0osS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDO29CQUM1QixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDakIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7d0JBQzVCLFFBQVEsRUFBRSxHQUFHO3FCQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7b0JBQ3RFLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx5Q0FBYSxHQUFiO1FBQUEsaUJBeUJDO1FBeEJDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLENBQUM7UUFFcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3JCLFFBQVEsRUFBRSxHQUFHO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2dCQUNuQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtnQkFDNUIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO29CQUNuQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3pCLFFBQVEsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ0osS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7d0JBQzFCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTt3QkFDekIsUUFBUSxFQUFFLEdBQUc7cUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDTixLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUE7b0JBQ3JHLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE3S3NCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFrQixpQkFBVTs4REFBQztJQUNqQztRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBUyxpQkFBVTtxREFBQztJQUNoQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBWSxpQkFBVTt3REFBQztJQUN4QjtRQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQztrQ0FBVSxpQkFBVTtzREFBQztJQUNuQjtRQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQztrQ0FBZSxpQkFBVTsyREFBQztJQUN2QjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBaUIsaUJBQVU7NkRBQUM7SUFOdEMsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyx5QkFBVyxDQUFDO1NBQ3pCLENBQUM7eUNBaUMyQixXQUFJLEVBQXdCLHlCQUFXLEVBQTJCLHlCQUFnQjtPQWhDbEcsaUJBQWlCLENBK0s3QjtJQUFELHdCQUFDO0NBQUEsQUEvS0QsSUErS0M7QUEvS1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlldywgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlcy9nZXN0dXJlcyc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL1VzZXJTZXJ2aWNlJztcbmltcG9ydCB7IEZlZWRCYWNrIH0gZnJvbSAnLi4vdXRpbHMvRmVlZEJhY2snO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBUeXBlVXNlciB9IGZyb20gJy4uL3V0aWxzL1R5cGVVc2VyJztcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckRhdGEnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1ob21lLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcInJlZ2lzdGVyXCIpIGFuZ3VsYXJSZWdpc3RlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImJ0blwiKSBidG5SZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjaXJjbGVcIikgY2lyY2xlUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibG9nb1wiKSBsb2dvUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibG9naW5cIikgYW5ndWxhckxvZ2luOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiY29udGVudFwiKSBhbmd1bGFyQ29udGVudDogRWxlbWVudFJlZjtcbiAgXG4gIGxvZ2luTGF5b3V0OiBWaWV3O1xuICByZWdzaXRlckxheW91dDogVmlldztcbiAgYnRuSXRlbTogVmlldztcbiAgY2lyY2xlSXRlbTogVmlldztcbiAgbG9nb0l0ZW06IFZpZXc7XG4gIGNvbnRlbnQ6IFZpZXc7XG5cbiAgaXNMb2dpbiA9IHRydWU7XG4gIGZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgbmF2aWdhdGluZyA9IGZhbHNlO1xuICBsb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG5cbiAgdGlwb1VzdWFyaW86IFR5cGVVc2VyO1xuXG4gIHVzZXJEYXRhOiBVc2VyRGF0YSA9IG5ldyBVc2VyRGF0YSgpO1xuXG4gIGVudW1UaXBvVXN1YXJpbyA9IFR5cGVVc2VyO1xuXG4gIHB1YmxpYyBzZWxlY3RlZEluZGV4ID0gMTtcbiAgcHVibGljIGl0ZW1zOiBBcnJheTxzdHJpbmc+ID0gW1wiU2lcIiwgXCJOb1wiXTtcblxuICBlbWFpbCA9IFwiXCI7XG4gIHBhc3MgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3BhZ2Uub24oJ25hdmlnYXRpbmdUbycsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xuICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVZID0gMDtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9nb0l0ZW0udHJhbnNsYXRlWSA9IDA7XG4gICAgfSlcbiAgICB0aGlzLmJ0bkl0ZW0gPSB0aGlzLmJ0blJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubG9naW5MYXlvdXQgPSB0aGlzLmFuZ3VsYXJMb2dpbi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQgPSB0aGlzLmFuZ3VsYXJSZWdpc3Rlci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY2lyY2xlSXRlbSA9IHRoaXMuY2lyY2xlUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dvSXRlbSA9IHRoaXMubG9nb1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuYW5ndWxhckNvbnRlbnQubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVZID0gMDtcbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWCA9IDA7XG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XG4gICAgdGhpcy5idG5JdGVtLnRyYW5zbGF0ZVkgPSAtMjgwO1xuICB9XG4gIFxuICBjaG9zZVR5cGVVc2VyKCl7XG4gICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgbWVzc2FnZTogXCJUaXBvIGRlIHVzdWFyaW9cIixcbiAgICAgIGFjdGlvbnM6IE9iamVjdC5rZXlzKFR5cGVVc2VyKVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMudGlwb1VzdWFyaW8gPSBUeXBlVXNlcltyZXN1bHRdO1xuICAgICB9KTtcbiAgfVxuXG4gIGNob3NlQ2F0ZWdvcnkoKXtcbiAgfVxuXG4gIG9uQnV0dG9uVGFwKCl7XG4gICAgdGhpcy5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcbiAgICBcbiAgICBpZih0aGlzLmlzTG9naW4pe1xuICAgICAgdGhpcy5fdXNlclNlcnZpY2UubG9nVXNlcih0aGlzLmVtYWlsLCB0aGlzLnBhc3MpLnN1YnNjcmliZShcbiAgICAgICAgKG9rKSA9PiB7XG5cbiAgICAgICAgICBpZihva1tcInRva2VuXCJdICE9PSBcIm51bGxcIil7XG4gICAgICAgICAgICAvL2FmZWdpciBhbCBhcHAgc2V0dGluZ3NcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGluZyA9IHRydWU7XG4gIFxuICAgICAgICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDMwMCB9LFxuICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxLjgsIHk6IDEuOH0sXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNpcmNsZUl0ZW0udHJhbnNsYXRlWSA9IDIwMDtcbiAgICAgICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjYWxlOiB7IHg6IDE1LCB5OiAxNSB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKFwicmVnaXN0ZXJcIiwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WIC0+IFwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmxvZyhcInJlZ2lzdGVyXCIpO1xuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMC45O1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDAuOTtcbiAgICAgIC8qdGhpcy5idG5JdGVtLnNjYWxlWCA9IDAuOTtcbiAgICAgIHRoaXMuYnRuSXRlbS5zY2FsZVkgPSAwLjk7Ki9cbiAgICB9IGVsc2UgaWYgKGFyZ3MuYWN0aW9uID09IFwidXBcIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDE7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMSA7XG4gICAgICAvKnRoaXMuYnRuSXRlbS5zY2FsZVggPSAxO1xuICAgICAgdGhpcy5idG5JdGVtLnNjYWxlWSA9IDE7Ki9cbiAgICB9XG4gIH1cblxuICBzZXRUb0xvZ2luKCkge1xuICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZ2luVHh0ID0gXCJMIG8gZyBpIG5cIjtcbiAgICAgICAgICAgIHRoaXMuYnRuSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTI4MCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2luTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgdGhpcy5sb2dpblR4dCA9IFwiUiBlIGcgaSBzIHQgciBhIHJcIjtcblxuICAgIHRoaXMubG9nb0l0ZW0uYW5pbWF0ZSh7XG4gICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnQuYW5pbWF0ZSh7XG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMTYwIH0sIFxuICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMywgeTogMS4zIH0sXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMTAwIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=