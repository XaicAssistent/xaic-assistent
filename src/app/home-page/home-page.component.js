"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var UserService_1 = require("../services/UserService");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, _userService, routerExtensions) {
        this._page = _page;
        this._userService = _userService;
        this.routerExtensions = routerExtensions;
        this.isLogin = true;
        this.formSubmitted = false;
        this.navigating = false;
        this.loginTxt = "L o g i n";
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
    HomePageComponent.prototype.onButtonTap = function () {
        var _this = this;
        this.formSubmitted = true;
        this._userService.logUser(this.email, this.pass).subscribe(function (ok) {
            console.log("OK PMV -> ");
            console.log(ok);
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
        }, function (error) {
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    HomePageComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            this.btnItem.scaleX = 0.9;
            this.btnItem.scaleY = 0.9;
        }
        else if (args.action == "up") {
            this.btnItem.scaleX = 1;
            this.btnItem.scaleY = 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFTdEQ7SUF1QkUsMkJBQW9CLEtBQVcsRUFBVSxZQUF5QixFQUFTLGdCQUFrQztRQUF6RixVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUjdHLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFFdkIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFNBQUksR0FBRyxFQUFFLENBQUM7SUFHVixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxJQUFJO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDekQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ2pDLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQUEsaUJBOEJDO1FBN0JDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDeEQsVUFBQyxFQUFFO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWhCLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXZCLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUNwQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQzNCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBQztnQkFDeEIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztnQkFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7b0JBQ3RCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtvQkFDdkIsUUFBUSxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDTixLQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUN4RSxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDN0IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRCxVQUFDLEtBQUs7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsbUNBQU8sR0FBUCxVQUFRLElBQTJCO1FBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztTQUM3QjthQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7SUFFRCxzQ0FBVSxHQUFWO1FBQUEsaUJBd0JDO1FBdkJDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ25CLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN6QixRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTixLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDcEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUNyQixRQUFRLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUM7b0JBQzFCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDckIsUUFBUSxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDSixLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDcEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7b0JBQzVCLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO3dCQUNqQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTt3QkFDNUIsUUFBUSxFQUFFLEdBQUc7cUJBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ04sS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtvQkFDdEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFBQSxpQkF5QkM7UUF4QkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQztRQUVwQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUNwQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsUUFBUSxFQUFFLEdBQUc7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO2dCQUM1QixRQUFRLEVBQUUsR0FBRzthQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ25CLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDekIsUUFBUSxFQUFFLEdBQUc7aUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDSixLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQzt3QkFDMUIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFO3dCQUN6QixRQUFRLEVBQUUsR0FBRztxQkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtvQkFDckcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTNJc0I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQWtCLGlCQUFVOzhEQUFDO0lBQ2pDO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFTLGlCQUFVO3FEQUFDO0lBQ2hCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFZLGlCQUFVO3dEQUFDO0lBQ3hCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFVLGlCQUFVO3NEQUFDO0lBQ25CO1FBQW5CLGdCQUFTLENBQUMsT0FBTyxDQUFDO2tDQUFlLGlCQUFVOzJEQUFDO0lBQ3ZCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFpQixpQkFBVTs2REFBQztJQU50QyxpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7WUFDeEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLHlCQUFXLENBQUM7U0FDekIsQ0FBQzt5Q0F3QjJCLFdBQUksRUFBd0IseUJBQVcsRUFBMkIseUJBQWdCO09BdkJsRyxpQkFBaUIsQ0E2STdCO0lBQUQsd0JBQUM7Q0FBQSxBQTdJRCxJQTZJQztBQTdJWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgRWxlbWVudFJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWaWV3LCBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1ob21lLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZChcInJlZ2lzdGVyXCIpIGFuZ3VsYXJSZWdpc3RlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImJ0blwiKSBidG5SZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjaXJjbGVcIikgY2lyY2xlUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibG9nb1wiKSBsb2dvUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibG9naW5cIikgYW5ndWxhckxvZ2luOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiY29udGVudFwiKSBhbmd1bGFyQ29udGVudDogRWxlbWVudFJlZjtcbiAgXG4gIGxvZ2luTGF5b3V0OiBWaWV3O1xuICByZWdzaXRlckxheW91dDogVmlldztcbiAgYnRuSXRlbTogVmlldztcbiAgY2lyY2xlSXRlbTogVmlldztcbiAgbG9nb0l0ZW06IFZpZXc7XG4gIGNvbnRlbnQ6IFZpZXc7XG5cbiAgaXNMb2dpbiA9IHRydWU7XG4gIGZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgbmF2aWdhdGluZyA9IGZhbHNlO1xuICBsb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG5cbiAgZW1haWwgPSBcIlwiO1xuICBwYXNzID0gXCJcIjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlLm9uKCduYXZpZ2F0aW5nVG8nLCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVYID0gMDtcbiAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XG4gICAgICAgIHRoaXMubmF2aWdhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ29JdGVtLnRyYW5zbGF0ZVkgPSAwO1xuICAgIH0pXG4gICAgdGhpcy5idG5JdGVtID0gdGhpcy5idG5SZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvZ2luTGF5b3V0ID0gdGhpcy5hbmd1bGFyTG9naW4ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0ID0gdGhpcy5hbmd1bGFyUmVnaXN0ZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNpcmNsZUl0ZW0gPSB0aGlzLmNpcmNsZVJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubG9nb0l0ZW0gPSB0aGlzLmxvZ29SZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmFuZ3VsYXJDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWSA9IDA7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dC5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuICAgIHRoaXMuYnRuSXRlbS50cmFuc2xhdGVZID0gLTI4MDtcbiAgfVxuICBcbiAgb25CdXR0b25UYXAoKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcbiAgICBcbiAgICB0aGlzLl91c2VyU2VydmljZS5sb2dVc2VyKHRoaXMuZW1haWwsIHRoaXMucGFzcykuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT0sgUE1WIC0+IFwiKTtcbiAgICAgICAgY29uc29sZS5sb2cob2spO1xuXG4gICAgICAgIHRoaXMubmF2aWdhdGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMzAwIH0sXG4gICAgICAgICAgc2NhbGU6IHsgeDogMS44LCB5OiAxLjh9LFxuICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnRyYW5zbGF0ZVkgPSAyMDA7XG4gICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2NhbGU6IHsgeDogMTUsIHk6IDE1IH0sXG4gICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlQnlVcmwoXCJyZWdpc3RlclwiLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uRm9jdXMoYXJnczogVG91Y2hHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XG4gICAgICAgIHRoaXMuYnRuSXRlbS5zY2FsZVggPSAwLjk7XG4gICAgICAgIHRoaXMuYnRuSXRlbS5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgICAgdGhpcy5idG5JdGVtLnNjYWxlWCA9IDE7XG4gICAgICAgIHRoaXMuYnRuSXRlbS5zY2FsZVkgPSAxO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvTG9naW4oKSB7XG4gICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xuICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSwgXG4gICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoe1xuICAgICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubG9naW5UeHQgPSBcIkwgbyBnIGkgblwiO1xuICAgICAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMjgwIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9naW5MYXlvdXQuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9SZWdpc3RlcigpIHtcbiAgICB0aGlzLmlzTG9naW4gPSBmYWxzZTtcbiAgICB0aGlzLmxvZ2luVHh0ID0gXCJSIGUgZyBpIHMgdCByIGEgclwiO1xuXG4gICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0xNjAgfSwgXG4gICAgICAgIGR1cmF0aW9uOiAxMDBcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmJ0bkl0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMjAwXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMS4zLCB5OiAxLjMgfSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0xMDAgfSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==