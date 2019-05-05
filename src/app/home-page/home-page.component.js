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
        if (this.isLogin) {
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
                        _this.routerExtensions.navigateByUrl("menu", { clearHistory: true });
                        _this.formSubmitted = false;
                    });
                });
            }, function (error) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFTdEQ7SUF1QkUsMkJBQW9CLEtBQVcsRUFBVSxZQUF5QixFQUFTLGdCQUFrQztRQUF6RixVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBUjdHLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFFdkIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFNBQUksR0FBRyxFQUFFLENBQUM7SUFHVixDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUFBLGlCQW1CQztRQWxCQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxJQUFJO1lBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUs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RSxDQUFDLENBQUE7b0JBQ3JHLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUEvSXNCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFrQixpQkFBVTs4REFBQztJQUNqQztRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBUyxpQkFBVTtxREFBQztJQUNoQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBWSxpQkFBVTt3REFBQztJQUN4QjtRQUFsQixnQkFBUyxDQUFDLE1BQU0sQ0FBQztrQ0FBVSxpQkFBVTtzREFBQztJQUNuQjtRQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQztrQ0FBZSxpQkFBVTsyREFBQztJQUN2QjtRQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQztrQ0FBaUIsaUJBQVU7NkRBQUM7SUFOdEMsaUJBQWlCO1FBUDdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixTQUFTLEVBQUUsQ0FBQyx5QkFBVyxDQUFDO1NBQ3pCLENBQUM7eUNBd0IyQixXQUFJLEVBQXdCLHlCQUFXLEVBQTJCLHlCQUFnQjtPQXZCbEcsaUJBQWlCLENBaUo3QjtJQUFELHdCQUFDO0NBQUEsQUFqSkQsSUFpSkM7QUFqSlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBWaWV3LCBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgVG91Y2hHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlcy9nZXN0dXJlcyc7XHJcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1ob21lLXBhZ2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2hvbWUtcGFnZS5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEhvbWVQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBAVmlld0NoaWxkKFwicmVnaXN0ZXJcIikgYW5ndWxhclJlZ2lzdGVyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJjaXJjbGVcIikgY2lyY2xlUmVmOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoXCJsb2dvXCIpIGxvZ29SZWY6IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZChcImxvZ2luXCIpIGFuZ3VsYXJMb2dpbjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKFwiY29udGVudFwiKSBhbmd1bGFyQ29udGVudDogRWxlbWVudFJlZjtcclxuICBcclxuICBsb2dpbkxheW91dDogVmlldztcclxuICByZWdzaXRlckxheW91dDogVmlldztcclxuICBidG5JdGVtOiBWaWV3O1xyXG4gIGNpcmNsZUl0ZW06IFZpZXc7XHJcbiAgbG9nb0l0ZW06IFZpZXc7XHJcbiAgY29udGVudDogVmlldztcclxuXHJcbiAgaXNMb2dpbiA9IHRydWU7XHJcbiAgZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xyXG4gIG5hdmlnYXRpbmcgPSBmYWxzZTtcclxuICBsb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XHJcblxyXG4gIGVtYWlsID0gXCJcIjtcclxuICBwYXNzID0gXCJcIjtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9wYWdlLm9uKCduYXZpZ2F0aW5nVG8nLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xyXG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xyXG4gICAgICAgIHRoaXMubmF2aWdhdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubG9nb0l0ZW0udHJhbnNsYXRlWSA9IDA7XHJcbiAgICB9KVxyXG4gICAgdGhpcy5idG5JdGVtID0gdGhpcy5idG5SZWYubmF0aXZlRWxlbWVudDtcclxuICAgIHRoaXMubG9naW5MYXlvdXQgPSB0aGlzLmFuZ3VsYXJMb2dpbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5yZWdzaXRlckxheW91dCA9IHRoaXMuYW5ndWxhclJlZ2lzdGVyLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmNpcmNsZUl0ZW0gPSB0aGlzLmNpcmNsZVJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5sb2dvSXRlbSA9IHRoaXMubG9nb1JlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5hbmd1bGFyQ29udGVudC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVZID0gMDtcclxuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVYID0gMDtcclxuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xyXG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XHJcbiAgICB0aGlzLmJ0bkl0ZW0udHJhbnNsYXRlWSA9IC0yODA7XHJcbiAgfVxyXG4gIFxyXG4gIG9uQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgdGhpcy5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgaWYodGhpcy5pc0xvZ2luKXtcclxuICAgICAgdGhpcy5fdXNlclNlcnZpY2UubG9nVXNlcih0aGlzLmVtYWlsLCB0aGlzLnBhc3MpLnN1YnNjcmliZShcclxuICAgICAgICAob2spID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiT0sgUE1WIC0+IFwiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKG9rKTtcclxuICBcclxuICAgICAgICAgIHRoaXMubmF2aWdhdGluZyA9IHRydWU7XHJcbiAgXHJcbiAgICAgICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMzAwIH0sXHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuOCwgeTogMS44fSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQwMFxyXG4gICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS50cmFuc2xhdGVZID0gMjAwO1xyXG4gICAgICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMTUsIHk6IDE1IH0sXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDQwMCxcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlQnlVcmwoXCJtZW51XCIsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJcIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xyXG4gICAgaWYgKGFyZ3MuYWN0aW9uID09IFwiZG93blwiKSB7XHJcbiAgICAgICAgdGhpcy5idG5JdGVtLnNjYWxlWCA9IDAuOTtcclxuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVZID0gMC45O1xyXG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcclxuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVYID0gMTtcclxuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVZID0gMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFRvTG9naW4oKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQuYW5pbWF0ZSh7XHJcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIFxyXG4gICAgICBkdXJhdGlvbjogMTUwXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcclxuICAgICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXHJcbiAgICAgICAgZHVyYXRpb246IDEwMFxyXG4gICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoe1xyXG4gICAgICAgICAgc2NhbGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ2luVHh0ID0gXCJMIG8gZyBpIG5cIjtcclxuICAgICAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yODAgfSxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2dpbkxheW91dC5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMjAwIH0pXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldFRvUmVnaXN0ZXIoKSB7XHJcbiAgICB0aGlzLmlzTG9naW4gPSBmYWxzZTtcclxuICAgIHRoaXMubG9naW5UeHQgPSBcIlIgZSBnIGkgcyB0IHIgYSByXCI7XHJcblxyXG4gICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcclxuICAgICAgc2NhbGU6IHsgeDogMCwgeTogMCB9LFxyXG4gICAgICBkdXJhdGlvbjogMTUwXHJcbiAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xyXG4gICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAtMTYwIH0sIFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDBcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xyXG4gICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgIGR1cmF0aW9uOiAyMDBcclxuICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcclxuICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxLjMsIHk6IDEuMyB9LFxyXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTEwMCB9LCBkdXJhdGlvbjogMjAwIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=