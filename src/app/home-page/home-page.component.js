"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, routerExtensions) {
        this._page = _page;
        this.routerExtensions = routerExtensions;
        this.textFieldValue = "";
        this.isLogin = true;
        this.formSubmitted = false;
        this.navigating = false;
        this.loginTxt = "L o g i n";
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
        setTimeout(function () {
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
                    _this.routerExtensions.navigate(["/register"]);
                    _this.formSubmitted = false;
                });
            });
        }, 2500);
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
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUErRDtBQVMvRDtJQXNCRSwyQkFBb0IsS0FBVyxFQUFVLGdCQUFrQztRQUF2RCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVAzRSxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2Ysa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQUcsV0FBVyxDQUFDO0lBSXZCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFDLElBQUk7WUFDL0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUMzQixLQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FB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QUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1lBQ3hDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQXVCMkIsV0FBSSxFQUE0Qix5QkFBZ0I7T0F0QmhFLGlCQUFpQixDQW1JN0I7SUFBRCx3QkFBQztDQUFBLEFBbklELElBbUlDO0FBbklZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXcsIFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1ob21lLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwicmVnaXN0ZXJcIikgYW5ndWxhclJlZ2lzdGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiYnRuXCIpIGJ0blJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNpcmNsZVwiKSBjaXJjbGVSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsb2dvXCIpIGxvZ29SZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsb2dpblwiKSBhbmd1bGFyTG9naW46IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjb250ZW50XCIpIGFuZ3VsYXJDb250ZW50OiBFbGVtZW50UmVmO1xuICBcbiAgbG9naW5MYXlvdXQ6IFZpZXc7XG4gIHJlZ3NpdGVyTGF5b3V0OiBWaWV3O1xuICBidG5JdGVtOiBWaWV3O1xuICBjaXJjbGVJdGVtOiBWaWV3O1xuICBsb2dvSXRlbTogVmlldztcbiAgY29udGVudDogVmlldztcblxuICB0ZXh0RmllbGRWYWx1ZTogc3RyaW5nID0gXCJcIjtcbiAgaXNMb2dpbiA9IHRydWU7XG4gIGZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgbmF2aWdhdGluZyA9IGZhbHNlO1xuICBsb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3BhZ2Uub24oJ25hdmlnYXRpbmdUbycsIChkYXRhKSA9PiB7XG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xuICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVZID0gMDtcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9nb0l0ZW0udHJhbnNsYXRlWSA9IDA7XG4gICAgfSlcbiAgICB0aGlzLmJ0bkl0ZW0gPSB0aGlzLmJ0blJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubG9naW5MYXlvdXQgPSB0aGlzLmFuZ3VsYXJMb2dpbi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQgPSB0aGlzLmFuZ3VsYXJSZWdpc3Rlci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY2lyY2xlSXRlbSA9IHRoaXMuY2lyY2xlUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dvSXRlbSA9IHRoaXMubG9nb1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuYW5ndWxhckNvbnRlbnQubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVZID0gMDtcbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWCA9IDA7XG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XG4gICAgdGhpcy5idG5JdGVtLnRyYW5zbGF0ZVkgPSAtMjgwO1xuICB9XG4gIFxuICBvbkJ1dHRvblRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSB0cnVlO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5uYXZpZ2F0aW5nID0gdHJ1ZTtcblxuICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMzAwIH0sXG4gICAgICAgICAgc2NhbGU6IHsgeDogMS44LCB5OiAxLjh9LFxuICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS50cmFuc2xhdGVZID0gMjAwO1xuICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMTUsIHk6IDE1IH0sXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvcmVnaXN0ZXJcIl0pO1xuICAgICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgXG4gIH0sIDI1MDApO1xuICB9XG5cbiAgb25Gb2N1cyhhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5hY3Rpb24gPT0gXCJkb3duXCIpIHtcbiAgICAgICAgdGhpcy5idG5JdGVtLnNjYWxlWCA9IDAuOTtcbiAgICAgICAgdGhpcy5idG5JdGVtLnNjYWxlWSA9IDAuOTtcbiAgICB9IGVsc2UgaWYgKGFyZ3MuYWN0aW9uID09IFwidXBcIikge1xuICAgICAgICB0aGlzLmJ0bkl0ZW0uc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5idG5JdGVtLnNjYWxlWSA9IDE7XG4gICAgfVxuICB9XG5cbiAgc2V0VG9Mb2dpbigpIHtcbiAgICB0aGlzLmNvbnRlbnQuYW5pbWF0ZSh7XG4gICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LCBcbiAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMubG9nb0l0ZW0uYW5pbWF0ZSh7XG4gICAgICAgIHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcbiAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgICAgc2NhbGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG4gICAgICAgICAgICB0aGlzLmJ0bkl0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IC0yODAgfSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dpbkxheW91dC5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCBkdXJhdGlvbjogMjAwIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb1JlZ2lzdGVyKCkge1xuICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlO1xuICAgIHRoaXMubG9naW5UeHQgPSBcIlIgZSBnIGkgcyB0IHIgYSByXCI7XG5cbiAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xuICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTE2MCB9LCBcbiAgICAgICAgZHVyYXRpb246IDEwMFxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuYnRuSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoe1xuICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxLjMsIHk6IDEuMyB9LFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHsgc2NhbGU6IHsgeDogMSwgeTogMSB9LCB0cmFuc2xhdGU6IHsgeDogMCwgeTogLTEwMCB9LCBkdXJhdGlvbjogMjAwIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19