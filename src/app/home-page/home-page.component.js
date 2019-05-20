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
var modal_1 = require("../modal");
var CategoryService_1 = require("../services/CategoryService");
var Category_1 = require("../model/Category");
var CategoryMapper_1 = require("../mapper/CategoryMapper");
var DaysEnum_1 = require("../utils/DaysEnum");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, _userService, _categoryService, routerExtensions, renderer) {
        this._page = _page;
        this._userService = _userService;
        this._categoryService = _categoryService;
        this.routerExtensions = routerExtensions;
        this.renderer = renderer;
        this.isLogin = true;
        this.formSubmitted = false;
        this.navigating = false;
        this.loginTxt = "L o g i n";
        this.userData = new UserData_1.UserData();
        this.enumTipoUsuario = TypeUser_1.TypeUser;
        this.enumDias = Object.keys(DaysEnum_1.DaysEnum);
        this.selectedIndex = 0;
        this.selectedDay = 0;
        this.selectedCategory = 0;
        this.items = ["Si", "No"];
        this.categorysNames = [];
        this.categorys = [];
        this.email = "";
        this.pass = "";
        this.newCategory = new Category_1.Category();
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
        var _this = this;
        this._categoryService.getCategorys().subscribe(function (ok) {
            _this.categorys = CategoryMapper_1.CategoryMapper.categoryJSONToCategory(ok);
            _this.updateCategorysNames();
            _this.modalChoseCategory.show();
        }, function (error) {
            FeedBack_1.FeedBack.feedBackError("Error de conexión...");
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    HomePageComponent.prototype.updateCategorysNames = function () {
        var _this = this;
        this.categorysNames = [];
        this.categorysNames.push("Categoria sin definir");
        this.categorys.forEach(function (cat) { _this.categorysNames.push(cat.nombre); });
    };
    HomePageComponent.prototype.selectedNewCategory = function () {
        console.log(this.categorys[this.selectedCategory - 1]);
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
    HomePageComponent.prototype.addCategory = function () {
        var _this = this;
        this._categoryService.addCategory(this.newCategory).subscribe(function (ok) {
            if (ok["categorys"] !== "null") {
                _this.categorys = CategoryMapper_1.CategoryMapper.categoryJSONToCategory(ok);
                _this.updateCategorysNames();
                _this.modalNewCategory.hide();
                _this.modalChoseCategory.show();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                _this.modalNewCategory.show();
            }
        }, function (error) {
            FeedBack_1.FeedBack.feedBackError("Error de conexión...");
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    HomePageComponent.prototype.onFocus = function (args) {
        if (args.action == "down") {
            args.view.scaleX = 0.9;
            args.view.scaleY = 0.9;
        }
        else if (args.action == "up") {
            args.view.scaleX = 1;
            args.view.scaleY = 1;
        }
    };
    HomePageComponent.prototype.setToLogin = function () {
        var _this = this;
        this.content.animate({
            translate: { x: 0, y: 0 },
            duration: 150
        }).then(function () {
            _this.isLogin = true;
            _this.loginTxt = "L o g i n";
            _this.logoItem.animate({
                scale: { x: 1, y: 1 },
                duration: 150
            }).then(function () {
                _this.regsiterLayout.animate({
                    scale: { x: 0, y: 0 },
                    duration: 300
                }).then(function () {
                    _this.btnItem.animate({
                        translate: { x: 0, y: 0 },
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
        this.logoItem.animate({
            scale: { x: 0, y: 0 },
            duration: 150
        }).then(function () {
            _this.regsiterLayout.animate({
                scale: { x: 1, y: 1 },
                duration: 150
            }).then(function () {
                _this.content.animate({
                    translate: { x: 0, y: -35 },
                    duration: 200
                });
                _this.isLogin = false;
                _this.loginTxt = "R e g i s t r a r";
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
    __decorate([
        core_1.ViewChild("modalNewCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalNewCategory", void 0);
    __decorate([
        core_1.ViewChild("modalChoseCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalChoseCategory", void 0);
    __decorate([
        core_1.ViewChild("modalAddHorario"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalAddHorario", void 0);
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'ns-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService, CategoryService_1.CategoryService]
        }),
        __metadata("design:paramtypes", [page_1.Page, UserService_1.UserService, CategoryService_1.CategoryService, router_1.RouterExtensions, core_1.Renderer2])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Y7QUFDcEYsc0RBQXNFO0FBQ3RFLHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBQzdDLHFEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsOENBQTZDO0FBQzdDLGtDQUEwQztBQUMxQywrREFBOEQ7QUFDOUQsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCw4Q0FBNkM7QUFTN0M7SUEwQ0UsMkJBQW9CLEtBQVcsRUFBVSxZQUF5QixFQUFVLGdCQUFpQyxFQUFTLGdCQUFrQyxFQUFVLFFBQW1CO1FBQWpLLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXhCckwsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUl2QixhQUFRLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFFcEMsb0JBQWUsR0FBRyxtQkFBUSxDQUFDO1FBQzNCLGFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUMsQ0FBQztRQUVqQyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsVUFBSyxHQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsY0FBUyxHQUFlLEVBQUUs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RUFBb0IsZ0JBQVM7T0ExQzFLLGlCQUFpQixDQXdON0I7SUFBRCx3QkFBQztDQUFBLEFBeE5ELElBd05DO0FBeE5ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlldywgUGFnZSwgRXZlbnREYXRhIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBUb3VjaEdlc3R1cmVFdmVudERhdGEgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzL2dlc3R1cmVzJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvVXNlclNlcnZpY2UnO1xuaW1wb3J0IHsgRmVlZEJhY2sgfSBmcm9tICcuLi91dGlscy9GZWVkQmFjayc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IFR5cGVVc2VyIH0gZnJvbSAnLi4vdXRpbHMvVHlwZVVzZXInO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tICcuLi9tb2RlbC9Vc2VyRGF0YSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL21vZGFsJztcbmltcG9ydCB7IENhdGVnb3J5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL0NhdGVnb3J5U2VydmljZSc7XG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gJy4uL21vZGVsL0NhdGVnb3J5JztcbmltcG9ydCB7IENhdGVnb3J5TWFwcGVyIH0gZnJvbSAnLi4vbWFwcGVyL0NhdGVnb3J5TWFwcGVyJztcbmltcG9ydCB7IERheXNFbnVtIH0gZnJvbSAnLi4vdXRpbHMvRGF5c0VudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1ob21lLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIENhdGVnb3J5U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwicmVnaXN0ZXJcIikgYW5ndWxhclJlZ2lzdGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiYnRuXCIpIGJ0blJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNpcmNsZVwiKSBjaXJjbGVSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsb2dvXCIpIGxvZ29SZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsb2dpblwiKSBhbmd1bGFyTG9naW46IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjb250ZW50XCIpIGFuZ3VsYXJDb250ZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibW9kYWxOZXdDYXRlZ29yeVwiKSBtb2RhbE5ld0NhdGVnb3J5OiBNb2RhbENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChcIm1vZGFsQ2hvc2VDYXRlZ29yeVwiKSBtb2RhbENob3NlQ2F0ZWdvcnk6IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxBZGRIb3JhcmlvXCIpIG1vZGFsQWRkSG9yYXJpbzogTW9kYWxDb21wb25lbnQ7XG5cbiAgbG9naW5MYXlvdXQ6IFZpZXc7XG4gIHJlZ3NpdGVyTGF5b3V0OiBWaWV3O1xuICBidG5JdGVtOiBWaWV3O1xuICBjaXJjbGVJdGVtOiBWaWV3O1xuICBsb2dvSXRlbTogVmlldztcbiAgY29udGVudDogVmlldztcblxuICBpc0xvZ2luID0gdHJ1ZTtcbiAgZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICBuYXZpZ2F0aW5nID0gZmFsc2U7XG4gIGxvZ2luVHh0ID0gXCJMIG8gZyBpIG5cIjtcblxuICB0aXBvVXN1YXJpbzogVHlwZVVzZXI7XG5cbiAgdXNlckRhdGE6IFVzZXJEYXRhID0gbmV3IFVzZXJEYXRhKCk7XG5cbiAgZW51bVRpcG9Vc3VhcmlvID0gVHlwZVVzZXI7XG4gIGVudW1EaWFzID0gT2JqZWN0LmtleXMoRGF5c0VudW0pO1xuXG4gIHNlbGVjdGVkSW5kZXggPSAwO1xuICBzZWxlY3RlZERheSA9IDA7XG4gIHNlbGVjdGVkQ2F0ZWdvcnkgPSAwO1xuICBpdGVtczogQXJyYXk8c3RyaW5nPiA9IFtcIlNpXCIsIFwiTm9cIl07XG4gIGNhdGVnb3J5c05hbWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNhdGVnb3J5czogQ2F0ZWdvcnlbXSA9IFtdO1xuXG4gIGVtYWlsID0gXCJcIjtcbiAgcGFzcyA9IFwiXCI7XG5cbiAgbmV3Q2F0ZWdvcnk6IENhdGVnb3J5ID0gbmV3IENhdGVnb3J5KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfcGFnZTogUGFnZSwgcHJpdmF0ZSBfdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLCBwcml2YXRlIF9jYXRlZ29yeVNlcnZpY2U6IENhdGVnb3J5U2VydmljZSxwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZS5vbignbmF2aWdhdGluZ1RvJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuICAgICAgICB0aGlzLm5hdmlnYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2dvSXRlbS50cmFuc2xhdGVZID0gMDtcbiAgICB9KVxuICAgIHRoaXMuYnRuSXRlbSA9IHRoaXMuYnRuUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dpbkxheW91dCA9IHRoaXMuYW5ndWxhckxvZ2luLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dCA9IHRoaXMuYW5ndWxhclJlZ2lzdGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jaXJjbGVJdGVtID0gdGhpcy5jaXJjbGVSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvZ29JdGVtID0gdGhpcy5sb2dvUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5hbmd1bGFyQ29udGVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5yZWdzaXRlckxheW91dC5zY2FsZVkgPSAwO1xuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVYID0gMDtcbiAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVYID0gMDtcbiAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVZID0gMDtcbiAgfVxuICBcbiAgY2hvc2VUeXBlVXNlcigpe1xuICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgIG1lc3NhZ2U6IFwiVGlwbyBkZSB1c3VhcmlvXCIsXG4gICAgICBhY3Rpb25zOiBPYmplY3Qua2V5cyhUeXBlVXNlcilcbiAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnRpcG9Vc3VhcmlvID0gVHlwZVVzZXJbcmVzdWx0XTtcbiAgICAgfSk7XG4gIH1cblxuICBjaG9zZUNhdGVnb3J5KCl7XG4gICAgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmdldENhdGVnb3J5cygpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICB0aGlzLmNhdGVnb3J5cyA9IENhdGVnb3J5TWFwcGVyLmNhdGVnb3J5SlNPTlRvQ2F0ZWdvcnkob2spO1xuICAgICAgICB0aGlzLnVwZGF0ZUNhdGVnb3J5c05hbWVzKCk7XG4gICAgICAgIHRoaXMubW9kYWxDaG9zZUNhdGVnb3J5LnNob3coKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIkVycm9yIGRlIGNvbmV4acOzbi4uLlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHVwZGF0ZUNhdGVnb3J5c05hbWVzKCl7XG4gICAgdGhpcy5jYXRlZ29yeXNOYW1lcyA9IFtdO1xuICAgIHRoaXMuY2F0ZWdvcnlzTmFtZXMucHVzaChcIkNhdGVnb3JpYSBzaW4gZGVmaW5pclwiKTtcbiAgICB0aGlzLmNhdGVnb3J5cy5mb3JFYWNoKCBjYXQgPT4ge3RoaXMuY2F0ZWdvcnlzTmFtZXMucHVzaChjYXQubm9tYnJlKX0pO1xuICB9XG5cblxuXG4gIHNlbGVjdGVkTmV3Q2F0ZWdvcnkoKXtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNhdGVnb3J5c1t0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgLSAxXSk7XG4gIH1cblxuICBvbkJ1dHRvblRhcCgpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XG4gICAgXG4gICAgaWYodGhpcy5pc0xvZ2luKXtcbiAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmxvZ1VzZXIodGhpcy5lbWFpbCwgdGhpcy5wYXNzKS5zdWJzY3JpYmUoXG4gICAgICAgIChvaykgPT4ge1xuICAgICAgICAgIGlmKG9rW1widG9rZW5cIl0gIT09IFwibnVsbFwiKXtcbiAgICAgICAgICAgIC8vYWZlZ2lyIGFsIGFwcCBzZXR0aW5nc1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW5nID0gdHJ1ZTtcbiAgXG4gICAgICAgICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMzAwIH0sXG4gICAgICAgICAgICAgIHNjYWxlOiB7IHg6IDEuOCwgeTogMS44fSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS50cmFuc2xhdGVZID0gMjAwO1xuICAgICAgICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMTUsIHk6IDE1IH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMCxcbiAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlQnlVcmwoXCJyZWdpc3RlclwiLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDs24uLi5cIik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9ZWxzZXtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJcIik7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2F0ZWdvcnkoKXtcbiAgICB0aGlzLl9jYXRlZ29yeVNlcnZpY2UuYWRkQ2F0ZWdvcnkodGhpcy5uZXdDYXRlZ29yeSkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKG9rW1wiY2F0ZWdvcnlzXCJdICE9PSBcIm51bGxcIil7XG4gICAgICAgICAgdGhpcy5jYXRlZ29yeXMgPSBDYXRlZ29yeU1hcHBlci5jYXRlZ29yeUpTT05Ub0NhdGVnb3J5KG9rKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNhdGVnb3J5c05hbWVzKCk7XG4gICAgICAgICAgdGhpcy5tb2RhbE5ld0NhdGVnb3J5LmhpZGUoKTtcbiAgICAgICAgICB0aGlzLm1vZGFsQ2hvc2VDYXRlZ29yeS5zaG93KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgdGhpcy5tb2RhbE5ld0NhdGVnb3J5LnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgb25Gb2N1cyhhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5hY3Rpb24gPT0gXCJkb3duXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAwLjk7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMC45O1xuICAgIH0gZWxzZSBpZiAoYXJncy5hY3Rpb24gPT0gXCJ1cFwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAxIDtcbiAgICB9XG4gIH1cblxuICBzZXRUb0xvZ2luKCkge1xuICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9naW5UeHQgPSBcIkwgbyBnIGkgblwiO1xuICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICBkdXJhdGlvbjogMTUwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnRuSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2luTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgIHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcbiAgICAgICAgZHVyYXRpb246IDE1MFxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IHt4OiAwLCB5OiAtMzV9LFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ2luVHh0ID0gXCJSIGUgZyBpIHMgdCByIGEgclwiO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==