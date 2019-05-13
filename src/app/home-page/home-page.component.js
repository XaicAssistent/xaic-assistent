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
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, _userService, _categoryService, routerExtensions) {
        this._page = _page;
        this._userService = _userService;
        this._categoryService = _categoryService;
        this.routerExtensions = routerExtensions;
        this.isLogin = true;
        this.formSubmitted = false;
        this.navigating = false;
        this.loginTxt = "L o g i n";
        this.userData = new UserData_1.UserData();
        this.enumTipoUsuario = TypeUser_1.TypeUser;
        this.selectedIndex = 0;
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
    HomePageComponent.prototype.choseCategory = function (modal) {
        var _this = this;
        this._categoryService.getCategorys().subscribe(function (ok) {
            _this.categorysNames = [];
            _this.categorys = [];
            _this.categorysNames.push("Categoria sin definir");
            ok["categorys"].forEach(function (cat) {
                var category = new Category_1.Category();
                category.idCategory = cat.IdCategory;
                category.nombre = cat.Nombre;
                _this.categorys.push(category);
                _this.categorysNames.push(category.nombre);
            });
            _this.modalChoseCategory.show();
        }, function (error) {
            FeedBack_1.FeedBack.feedBackError("Error de conexión...");
            console.log("ERROR PMV -> ");
            console.log(error);
        });
    };
    HomePageComponent.prototype.selectedNewCategory = function () {
        console.log(this.categorys[this.selectedCategory - 1]);
    };
    HomePageComponent.prototype.closeModal = function (modal) {
        modal.hide;
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
        this._categoryService.addCategory(this.newCategory).subscribe(function (ok) {
            console.log(ok);
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
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'ns-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService, CategoryService_1.CategoryService]
        }),
        __metadata("design:paramtypes", [page_1.Page, UserService_1.UserService, CategoryService_1.CategoryService, router_1.RouterExtensions])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBQzdDLHFEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsOENBQTZDO0FBQzdDLGtDQUEwQztBQUMxQywrREFBOEQ7QUFDOUQsOENBQTZDO0FBUzdDO0lBdUNFLDJCQUFvQixLQUFXLEVBQVUsWUFBeUIsRUFBVSxnQkFBaUMsRUFBUyxnQkFBa0M7UUFBcEksVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUF0QnhKLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDZixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGFBQVEsR0FBRyxXQUFXLENBQUM7UUFJdkIsYUFBUSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBRXBDLG9CQUFlLEdBQUcsbUJBQVEsQ0FBQztRQUUzQixrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsVUFBSyxHQUFrQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQyxtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQUUzQixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWLGdCQUFXLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7SUFHdkMsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFrQkM7UUFqQkMsSUFB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O0lBQ2hCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFZLGlCQUFVO3dEQUFDO0lBQ3hCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFVLGlCQUFVO3NEQUFDO0lBQ25CO1FBQW5CLGdCQUFTLENBQUMsT0FBTyxDQUFDO2tDQUFlLGlCQUFVOzJEQUFDO0lBQ3ZCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFpQixpQkFBVTs2REFBQztJQUNsQjtRQUE5QixnQkFBUyxDQUFDLGtCQUFrQixDQUFDO2tDQUFtQixzQkFBYzsrREFBQztJQUMvQjtRQUFoQyxnQkFBUyxDQUFDLG9CQUFvQixDQUFDO2tDQUFxQixzQkFBYztpRUFBQztJQVJ6RCxpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7WUFDeEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFNBQVMsRUFBRSxDQUFDLHlCQUFXLEVBQUUsaUNBQWUsQ0FBQztTQUMxQyxDQUFDO3lDQXdDMkIsV0FBSSxFQUF3Qix5QkFBVyxFQUE0QixpQ0FBZSxFQUEyQix5QkFBZ0I7T0F2QzdJLGlCQUFpQixDQWtON0I7SUFBRCx3QkFBQztDQUFBLEFBbE5ELElBa05DO0FBbE5ZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXcsIFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgeyBGZWVkQmFjayB9IGZyb20gJy4uL3V0aWxzL0ZlZWRCYWNrJztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgVHlwZVVzZXIgfSBmcm9tICcuLi91dGlscy9UeXBlVXNlcic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJy4uL21vZGVsL1VzZXJEYXRhJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQ2F0ZWdvcnlTZXJ2aWNlJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvQ2F0ZWdvcnknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1ob21lLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaG9tZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2UsIENhdGVnb3J5U2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgSG9tZVBhZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKFwicmVnaXN0ZXJcIikgYW5ndWxhclJlZ2lzdGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiYnRuXCIpIGJ0blJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNpcmNsZVwiKSBjaXJjbGVSZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsb2dvXCIpIGxvZ29SZWY6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJsb2dpblwiKSBhbmd1bGFyTG9naW46IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjb250ZW50XCIpIGFuZ3VsYXJDb250ZW50OiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwibW9kYWxOZXdDYXRlZ29yeVwiKSBtb2RhbE5ld0NhdGVnb3J5OiBNb2RhbENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChcIm1vZGFsQ2hvc2VDYXRlZ29yeVwiKSBtb2RhbENob3NlQ2F0ZWdvcnk6IE1vZGFsQ29tcG9uZW50O1xuXG4gIGxvZ2luTGF5b3V0OiBWaWV3O1xuICByZWdzaXRlckxheW91dDogVmlldztcbiAgYnRuSXRlbTogVmlldztcbiAgY2lyY2xlSXRlbTogVmlldztcbiAgbG9nb0l0ZW06IFZpZXc7XG4gIGNvbnRlbnQ6IFZpZXc7XG5cbiAgaXNMb2dpbiA9IHRydWU7XG4gIGZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgbmF2aWdhdGluZyA9IGZhbHNlO1xuICBsb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG5cbiAgdGlwb1VzdWFyaW86IFR5cGVVc2VyO1xuXG4gIHVzZXJEYXRhOiBVc2VyRGF0YSA9IG5ldyBVc2VyRGF0YSgpO1xuXG4gIGVudW1UaXBvVXN1YXJpbyA9IFR5cGVVc2VyO1xuXG4gIHNlbGVjdGVkSW5kZXggPSAwO1xuICBzZWxlY3RlZENhdGVnb3J5ID0gMDtcbiAgaXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXCJTaVwiLCBcIk5vXCJdO1xuICBjYXRlZ29yeXNOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjYXRlZ29yeXM6IENhdGVnb3J5W10gPSBbXTtcblxuICBlbWFpbCA9IFwiXCI7XG4gIHBhc3MgPSBcIlwiO1xuXG4gIG5ld0NhdGVnb3J5OiBDYXRlZ29yeSA9IG5ldyBDYXRlZ29yeSgpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX3VzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSwgcHJpdmF0ZSBfY2F0ZWdvcnlTZXJ2aWNlOiBDYXRlZ29yeVNlcnZpY2UscHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlLm9uKCduYXZpZ2F0aW5nVG8nLCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVYID0gMDtcbiAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XG4gICAgICAgIHRoaXMubmF2aWdhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ29JdGVtLnRyYW5zbGF0ZVkgPSAwO1xuICAgIH0pXG4gICAgdGhpcy5idG5JdGVtID0gdGhpcy5idG5SZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvZ2luTGF5b3V0ID0gdGhpcy5hbmd1bGFyTG9naW4ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0ID0gdGhpcy5hbmd1bGFyUmVnaXN0ZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNpcmNsZUl0ZW0gPSB0aGlzLmNpcmNsZVJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubG9nb0l0ZW0gPSB0aGlzLmxvZ29SZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLmFuZ3VsYXJDb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWSA9IDA7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dC5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuICB9XG4gIFxuICBjaG9zZVR5cGVVc2VyKCl7XG4gICAgZGlhbG9ncy5hY3Rpb24oe1xuICAgICAgbWVzc2FnZTogXCJUaXBvIGRlIHVzdWFyaW9cIixcbiAgICAgIGFjdGlvbnM6IE9iamVjdC5rZXlzKFR5cGVVc2VyKVxuICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMudGlwb1VzdWFyaW8gPSBUeXBlVXNlcltyZXN1bHRdO1xuICAgICB9KTtcbiAgfVxuXG4gIGNob3NlQ2F0ZWdvcnkobW9kYWwgOiBNb2RhbENvbXBvbmVudCl7XG4gICAgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmdldENhdGVnb3J5cygpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICB0aGlzLmNhdGVnb3J5c05hbWVzID0gW107XG4gICAgICAgIHRoaXMuY2F0ZWdvcnlzID0gW107XG4gICAgICAgIHRoaXMuY2F0ZWdvcnlzTmFtZXMucHVzaChcIkNhdGVnb3JpYSBzaW4gZGVmaW5pclwiKTtcbiAgICAgICAgb2tbXCJjYXRlZ29yeXNcIl0uZm9yRWFjaCgoY2F0KSA9PiB7XG4gICAgICAgICAgbGV0IGNhdGVnb3J5OiBDYXRlZ29yeSA9IG5ldyBDYXRlZ29yeSgpO1xuICAgICAgICAgIGNhdGVnb3J5LmlkQ2F0ZWdvcnkgPSBjYXQuSWRDYXRlZ29yeTtcbiAgICAgICAgICBjYXRlZ29yeS5ub21icmUgPSBjYXQuTm9tYnJlO1xuICAgICAgICAgIHRoaXMuY2F0ZWdvcnlzLnB1c2goY2F0ZWdvcnkpO1xuICAgICAgICAgIHRoaXMuY2F0ZWdvcnlzTmFtZXMucHVzaChjYXRlZ29yeS5ub21icmUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5tb2RhbENob3NlQ2F0ZWdvcnkuc2hvdygpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2VsZWN0ZWROZXdDYXRlZ29yeSgpe1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY2F0ZWdvcnlzW3RoaXMuc2VsZWN0ZWRDYXRlZ29yeSAtIDFdKTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwobW9kYWwgOiBNb2RhbENvbXBvbmVudCkge1xuICAgIG1vZGFsLmhpZGU7XG4gIH1cblxuICBvbkJ1dHRvblRhcCgpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IHRydWU7XG4gICAgXG4gICAgaWYodGhpcy5pc0xvZ2luKXtcbiAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmxvZ1VzZXIodGhpcy5lbWFpbCwgdGhpcy5wYXNzKS5zdWJzY3JpYmUoXG4gICAgICAgIChvaykgPT4ge1xuXG4gICAgICAgICAgaWYob2tbXCJ0b2tlblwiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgICAgLy9hZmVnaXIgYWwgYXBwIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpbmcgPSB0cnVlO1xuICBcbiAgICAgICAgICAgIHRoaXMubG9nb0l0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAzMDAgfSxcbiAgICAgICAgICAgICAgc2NhbGU6IHsgeDogMS44LCB5OiAxLjh9LFxuICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnRyYW5zbGF0ZVkgPSAyMDA7XG4gICAgICAgICAgICAgIHRoaXMuY2lyY2xlSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxNSwgeTogMTUgfSxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGVCeVVybChcInJlZ2lzdGVyXCIsIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG4gICAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIkVycm9yIGRlIGNvbmV4acOzbi4uLlwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1lbHNle1xuICAgICAgY29uc29sZS5sb2coXCJyZWdpc3RlclwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRDYXRlZ29yeSgpe1xuICAgIHRoaXMuX2NhdGVnb3J5U2VydmljZS5hZGRDYXRlZ29yeSh0aGlzLm5ld0NhdGVnb3J5KS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cob2spO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgb25Gb2N1cyhhcmdzOiBUb3VjaEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICBpZiAoYXJncy5hY3Rpb24gPT0gXCJkb3duXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAwLjk7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVZID0gMC45O1xuICAgIH0gZWxzZSBpZiAoYXJncy5hY3Rpb24gPT0gXCJ1cFwiKSB7XG4gICAgICBhcmdzLnZpZXcuc2NhbGVYID0gMTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAxIDtcbiAgICB9XG4gIH1cblxuICBzZXRUb0xvZ2luKCkge1xuICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5pc0xvZ2luID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9naW5UeHQgPSBcIkwgbyBnIGkgblwiO1xuICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICBkdXJhdGlvbjogMTUwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgICBzY2FsZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYnRuSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2luTGF5b3V0LmFuaW1hdGUoeyBzY2FsZTogeyB4OiAxLCB5OiAxIH0sIGR1cmF0aW9uOiAyMDAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvUmVnaXN0ZXIoKSB7XG4gICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuYW5pbWF0ZSh7XG4gICAgICAgIHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcbiAgICAgICAgZHVyYXRpb246IDE1MFxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGVudC5hbmltYXRlKHtcbiAgICAgICAgICB0cmFuc2xhdGU6IHt4OiAwLCB5OiAtMzV9LFxuICAgICAgICAgIGR1cmF0aW9uOiAyMDBcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNMb2dpbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ2luVHh0ID0gXCJSIGUgZyBpIHMgdCByIGEgclwiO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==