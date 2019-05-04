"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var UserService_1 = require("../services/UserService");
var FeedBack_1 = require("../utils/FeedBack");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBUzdDO0lBdUJFLDJCQUFvQixLQUFXLEVBQVUsWUFBeUIsRUFBUyxnQkFBa0M7UUFBekYsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVI3RyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsV0FBVyxDQUFDO1FBRXZCLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxTQUFJLEdBQUcsRUFBRSxDQUFDO0lBR1YsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFtQkM7UUFsQkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsSUFBSTtZQUMvQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLElB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LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXcsIFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgeyBGZWVkQmFjayB9IGZyb20gJy4uL3V0aWxzL0ZlZWRCYWNrJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtaG9tZS1wYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2hvbWUtcGFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2hvbWUtcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHByb3ZpZGVyczogW1VzZXJTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJyZWdpc3RlclwiKSBhbmd1bGFyUmVnaXN0ZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiY2lyY2xlXCIpIGNpcmNsZVJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ29cIikgbG9nb1JlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ2luXCIpIGFuZ3VsYXJMb2dpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNvbnRlbnRcIikgYW5ndWxhckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG4gIFxuICBsb2dpbkxheW91dDogVmlldztcbiAgcmVnc2l0ZXJMYXlvdXQ6IFZpZXc7XG4gIGJ0bkl0ZW06IFZpZXc7XG4gIGNpcmNsZUl0ZW06IFZpZXc7XG4gIGxvZ29JdGVtOiBWaWV3O1xuICBjb250ZW50OiBWaWV3O1xuXG4gIGlzTG9naW4gPSB0cnVlO1xuICBmb3JtU3VibWl0dGVkID0gZmFsc2U7XG4gIG5hdmlnYXRpbmcgPSBmYWxzZTtcbiAgbG9naW5UeHQgPSBcIkwgbyBnIGkgblwiO1xuXG4gIGVtYWlsID0gXCJcIjtcbiAgcGFzcyA9IFwiXCI7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZS5vbignbmF2aWdhdGluZ1RvJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuICAgICAgICB0aGlzLm5hdmlnYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2dvSXRlbS50cmFuc2xhdGVZID0gMDtcbiAgICB9KVxuICAgIHRoaXMuYnRuSXRlbSA9IHRoaXMuYnRuUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dpbkxheW91dCA9IHRoaXMuYW5ndWxhckxvZ2luLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dCA9IHRoaXMuYW5ndWxhclJlZ2lzdGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jaXJjbGVJdGVtID0gdGhpcy5jaXJjbGVSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvZ29JdGVtID0gdGhpcy5sb2dvUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5hbmd1bGFyQ29udGVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5yZWdzaXRlckxheW91dC5zY2FsZVkgPSAwO1xuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVYID0gMDtcbiAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVYID0gMDtcbiAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVZID0gMDtcbiAgICB0aGlzLmJ0bkl0ZW0udHJhbnNsYXRlWSA9IC0yODA7XG4gIH1cbiAgXG4gIG9uQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XG4gICAgXG4gICAgaWYodGhpcy5pc0xvZ2luKXtcbiAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmxvZ1VzZXIodGhpcy5lbWFpbCwgdGhpcy5wYXNzKS5zdWJzY3JpYmUoXG4gICAgICAgIChvaykgPT4ge1xuXG4gICAgICAgICAgaWYob2tbXCJ0b2tlblwiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgICAgLy9hZmVnaXIgYWwgYXBwIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpbmcgPSB0cnVlO1xuICBcbiAgICAgICAgICAgIHRoaXMubG9nb0l0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAzMDAgfSxcbiAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMS44LCB5OiAxLjh9LFxuICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnRyYW5zbGF0ZVkgPSAyMDA7XG4gICAgICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxNSwgeTogMTUgfSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcInJlZ2lzdGVyXCIsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG4gICAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIkVycm9yIGRlIGNvbmV4acOzbi4uLlwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlclwiKTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVYID0gMC45O1xuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVZID0gMC45O1xuICAgIH0gZWxzZSBpZiAoYXJncy5hY3Rpb24gPT0gXCJ1cFwiKSB7XG4gICAgICAgIHRoaXMuYnRuSXRlbS5zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVZID0gMTtcbiAgICB9XG4gIH1cblxuICBzZXRUb0xvZ2luKCkge1xuICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2dpbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvZ2luVHh0ID0gXCJMIG8gZyBpIG5cIjtcbiAgICAgICAgICAgIHRoaXMuYnRuSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTI4MCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2luTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgdGhpcy5sb2dpblR4dCA9IFwiUiBlIGcgaSBzIHQgciBhIHJcIjtcblxuICAgIHRoaXMubG9nb0l0ZW0uYW5pbWF0ZSh7XG4gICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRlbnQuYW5pbWF0ZSh7XG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMTYwIH0sIFxuICAgICAgICBkdXJhdGlvbjogMTAwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuMywgeTogMS4zIH0sXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMTAwIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=