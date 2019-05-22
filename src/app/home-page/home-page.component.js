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
var UserNormal_1 = require("../model/UserNormal");
var UserEmpresa_1 = require("../model/UserEmpresa");
var Perido_1 = require("../model/Perido");
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
        this.verHorarios = true;
        this.userData = new UserData_1.UserData();
        this.userNormal = new UserNormal_1.UserNormal();
        this.userEmpresa = new UserEmpresa_1.UserEmpresa();
        this.enumTipoUsuario = TypeUser_1.TypeUser;
        this.enumDias = Object.keys(DaysEnum_1.DaysEnum);
        this.selectedIndex = 0;
        this.selectedDay = 0;
        this.selectedCategory = 0;
        this.items = ["Si", "No"];
        this.categorysNames = [];
        this.categorys = [];
        this.periodos = [];
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
        this._page.actionBarHidden = true;
        this.btnItem = this.btnRef.nativeElement;
        this.loginLayout = this.angularLogin.nativeElement;
        this.regsiterLayout = this.angularRegister.nativeElement;
        this.circleItem = this.circleRef.nativeElement;
        this.logoItem = this.logoRef.nativeElement;
        this.content = this.angularContent.nativeElement;
        this.horaInicio = this.angularhoraInicio.nativeElement;
        this.horaFin = this.angularhoraFin.nativeElement;
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
            if (_this.tipoUsuario == TypeUser_1.TypeUser.Empresa) {
                _this.userEmpresa = new UserEmpresa_1.UserEmpresa(_this.userData);
            }
            else if (_this.tipoUsuario == TypeUser_1.TypeUser.Normal) {
                _this.userNormal = new UserNormal_1.UserNormal(_this.userData);
            }
        });
    };
    HomePageComponent.prototype.eliminarPeriodo = function (i) {
        var perido = this.periodos[i];
        this.userEmpresa.periodos = this.userEmpresa.periodos.filter(function (obj) { return !obj.equals(perido); });
        this.searchPeriods();
    };
    HomePageComponent.prototype.addNewHorario = function () {
        var perido = new Perido_1.Periodo();
        perido.dia = DaysEnum_1.DaysEnum[this.enumDias[this.selectedDay]];
        perido.empiezaHora = this.horaInicio.hour;
        perido.empiezaMinuto = this.horaInicio.minute;
        perido.acabaHora = this.horaFin.hour;
        perido.acabaMinuto = this.horaFin.minute;
        if (this.userEmpresa.periodos.filter(function (per) { return per.estaDentro(perido); }).length == 0) {
            this.userEmpresa.periodos.push(perido);
            this.searchPeriods();
            this.modalNewPeriodo.hide();
            this.modalAddHorario.show();
        }
        else {
            FeedBack_1.FeedBack.feedBackError("No pudes poner un perido dentro de otro...");
        }
    };
    HomePageComponent.prototype.searchPeriods = function () {
        var _this = this;
        this.periodos = this.userEmpresa.periodos.filter(function (perido) { return perido.dia == DaysEnum_1.DaysEnum[_this.enumDias[_this.selectedDay]]; });
    };
    HomePageComponent.prototype.searchPeriodsByDay = function (dia) {
        return this.userEmpresa.periodos.filter(function (perido) { return perido.dia == DaysEnum_1.DaysEnum[dia]; });
    };
    HomePageComponent.prototype.onTimeChangedInicio = function (args) {
        var timePicker = args.object;
        this.horaFin.hour = timePicker.hour == 23 ? 0 : timePicker.hour + 1;
        this.horaFin.minute = timePicker.minute;
    };
    HomePageComponent.prototype.onTimeChangedFin = function (args) {
        var timePicker = args.object;
        if (timePicker.hour < this.horaInicio.hour && timePicker.hour != 0) {
            timePicker.hour = this.horaInicio.hour;
        }
        if (timePicker.hour == this.horaInicio.hour && (timePicker.minute - 5) < this.horaInicio.minute) {
            timePicker.minute = this.horaInicio.minute + 5;
        }
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
    HomePageComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        this.selectedDay = picker.selectedIndex;
        this.searchPeriods();
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
            console.log(this.tipoUsuario == TypeUser_1.TypeUser.Empresa ? this.userEmpresa : this.userNormal);
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
        core_1.ViewChild("horaInicio"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularhoraInicio", void 0);
    __decorate([
        core_1.ViewChild("horaFin"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularhoraFin", void 0);
    __decorate([
        core_1.ViewChild("modalNewCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalNewCategory", void 0);
    __decorate([
        core_1.ViewChild("modalChoseCategory"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalChoseCategory", void 0);
    __decorate([
        core_1.ViewChild("modalNewPeriodo"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalNewPeriodo", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEY7QUFDNUYsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBQzdDLHFEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsOENBQTZDO0FBQzdDLGtDQUEwQztBQUMxQywrREFBOEQ7QUFDOUQsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCw4Q0FBNkM7QUFDN0Msa0RBQWlEO0FBRWpELG9EQUFtRDtBQUNuRCwwQ0FBMEM7QUFVMUM7SUFvREUsMkJBQW9CLEtBQVcsRUFBVSxZQUF5QixFQUFVLGdCQUFpQyxFQUFTLGdCQUFrQyxFQUFVLFFBQW1CO1FBQWpLLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQTdCckwsWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUd2QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixhQUFRLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDcEMsZUFBVSxHQUFlLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQzFDLGdCQUFXLEdBQWdCLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRTdDLG9CQUFlLEdBQUcsbUJBQVEsQ0FBQztRQUMzQixhQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBUSxDQUFDLENBQUM7UUFFakMsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLFVBQUssR0FBa0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBQ25DLGNBQVMsR0FBZSxFQUFFLENBQUM7UUFFM0IsYUFBUSxHQUFjLEVBQUUsQ0FBQztRQUV6QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUVWLGdCQUFXLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7SUFHdkMsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFBQSxpQkFzQkM7UUFyQkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsSUFBSTtZQUMvQixLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7UUFDbkQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQztRQUN6RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUVqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQztRQUVqRCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFBQSxpQkFZQztRQVhDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDYixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFRLENBQUM7U0FDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDWixLQUFJLENBQUMsV0FBVyxHQUFHLG1CQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsSUFBRyxLQUFJLENBQUMsV0FBVyxJQUFJLG1CQUFRLENBQUMsT0FBTyxFQUFDO2dCQUN0QyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkQ7aUJBQUssSUFBRyxLQUFJLENBQUMsV0FBVyxJQUFJLG1CQUFRLENBQUMsTUFBTSxFQUFDO2dCQUMzQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCwyQ0FBZSxHQUFmLFVBQWdCLENBQVU7UUFDeEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFDRSxJQUFJLE1BQU0sR0FBWSxJQUFJLGdCQUFPLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsR0FBRyxHQUFHLG1CQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN2RCxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDOUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNyQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXpDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDN0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXZDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDN0I7YUFBSTtZQUNILG1CQUFRLENBQUMsYUFBYSxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUFBLGlCQUVDO1FBREMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUUsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxJQUFJLG1CQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBdkQsQ0FBdUQsQ0FBQyxDQUFDO0lBQ3ZILENBQUM7SUFFRCw4Q0FBa0IsR0FBbEIsVUFBbUIsR0FBUTtRQUN6QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBRSxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxHQUFHLElBQUksbUJBQVEsQ0FBQyxHQUFHLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCwrQ0FBbUIsR0FBbkIsVUFBb0IsSUFBSTtRQUN0QixJQUFJLFVBQVUsR0FBZSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7SUFDMUMsQ0FBQztJQUVELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ25CLElBQUksVUFBVSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFekMsSUFBRyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFDO1lBQ2hFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7U0FDeEM7UUFFRCxJQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDO1lBQzdGLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQzVDLFVBQUMsRUFBRTtZQUNELEtBQUksQ0FBQyxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxLQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixLQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLG1CQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGdEQUFvQixHQUFwQjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRSxVQUFBLEdBQUcsSUFBSyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCLFVBQXFCLElBQUk7UUFDdkIsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQUEsaUJBc0NDO1FBckNDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCLElBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQztZQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDeEQsVUFBQyxFQUFFO2dCQUNELElBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLE1BQU0sRUFBQztvQkFDeEIsd0JBQXdCO29CQUN4QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFFdkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7d0JBQ3BCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTt3QkFDM0IsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDO3dCQUN4QixRQUFRLEVBQUUsR0FBRztxQkFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzt3QkFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7NEJBQ3RCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTs0QkFDdkIsUUFBUSxFQUFFLEdBQUc7eUJBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFDTixLQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzRCQUN4RSxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzt3QkFDN0IsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQUk7b0JBQ0gsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7b0JBQzNCLG1CQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2lCQUMzQztZQUNILENBQUMsRUFDRCxVQUFDLEtBQUs7Z0JBQ0osbUJBQVEsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQ0YsQ0FBQztTQUNIO2FBQUk7WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksbUJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN4RjtJQUNILENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FDM0QsVUFBQyxFQUFFO1lBQ0QsSUFBRyxFQUFFLENBQUMsV0FBVyxDQUFDLEtBQUssTUFBTSxFQUFDO2dCQUM1QixLQUFJLENBQUMsU0FBUyxHQUFHLCtCQUFjLENBQUMsc0JBQXNCLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzNELEtBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUM1QixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzdCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNoQztpQkFBSTtnQkFDSCxtQkFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUMsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNKLG1CQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELG1DQUFPLEdBQVAsVUFBUSxJQUEyQjtRQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7U0FDeEI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUU7U0FDdkI7SUFDSCxDQUFDO0lBRUQsc0NBQVUsR0FBVjtRQUFBLGlCQXdCQztRQXZCQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUNuQixTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDekIsUUFBUSxFQUFFLEdBQUc7U0FDZCxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDNUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7Z0JBQ3BCLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDckIsUUFBUSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO29CQUMxQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3JCLFFBQVEsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ0osS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7d0JBQ2pCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTt3QkFDekIsUUFBUSxFQUFFLEdBQUc7cUJBQ2hCLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ04sS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtvQkFDdEUsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFBQSxpQkFpQkM7UUFoQkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFDcEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3JCLFFBQVEsRUFBRSxHQUFHO1NBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO2dCQUMxQixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3JCLFFBQVEsRUFBRSxHQUFHO2FBQ2QsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDTixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDbkIsU0FBUyxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7b0JBQ3pCLFFBQVEsRUFBRSxHQUFHO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsS0FBSSxDQUFDLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTdSc0I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQWtCLGlCQUFVOzhEQUFDO0lBQ2pDO1FBQWpCLGdCQUFTLENBQUMsS0FBSyxDQUFDO2tDQUFTLGlCQUFVO3FEQUFDO0lBQ2hCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFZLGlCQUFVO3dEQUFDO0lBQ3hCO1FBQWxCLGdCQUFTLENBQUMsTUFBTSxDQUFDO2tDQUFVLGlCQUFVO3NEQUFDO0lBQ25CO1FBQW5CLGdCQUFTLENBQUMsT0FBTyxDQUFDO2tDQUFlLGlCQUFVOzJEQUFDO0lBQ3ZCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFpQixpQkFBVTs2REFBQztJQUN4QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBb0IsaUJBQVU7Z0VBQUM7SUFDakM7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQWlCLGlCQUFVOzZEQUFDO0lBQ2xCO1FBQTlCLGdCQUFTLENBQUMsa0JBQWtCLENBQUM7a0NBQW1CLHNCQUFjOytEQUFDO0lBQy9CO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQXFCLHNCQUFjO2lFQUFDO0lBQ3RDO1FBQTdCLGdCQUFTLENBQUMsaUJBQWlCLENBQUM7a0NBQWtCLHNCQUFjOzhEQUFDO0lBQ2hDO1FBQTdCLGdCQUFTLENBQUMsaUJBQWlCLENBQUM7a0NBQWtCLHNCQUFjOzhEQUFDO0lBWm5ELGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztZQUN4QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMseUJBQVcsRUFBRSxpQ0FBZSxDQUFDO1NBQzFDLENBQUM7eUNBcUQyQixXQUFJLEVBQXdCLHlCQUFXLEVBQTRCLGlDQUFlLEVBQTJCLHlCQUFnQixFQUFvQixnQkFBUztPQXBEMUssaUJBQWlCLENBK1I3QjtJQUFELHdCQUFDO0NBQUEsQUEvUkQsSUErUkM7QUEvUlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgUmVuZGVyZXIyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXcsIFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgeyBGZWVkQmFjayB9IGZyb20gJy4uL3V0aWxzL0ZlZWRCYWNrJztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgVHlwZVVzZXIgfSBmcm9tICcuLi91dGlscy9UeXBlVXNlcic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJy4uL21vZGVsL1VzZXJEYXRhJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQ2F0ZWdvcnlTZXJ2aWNlJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvQ2F0ZWdvcnknO1xuaW1wb3J0IHsgQ2F0ZWdvcnlNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvQ2F0ZWdvcnlNYXBwZXInO1xuaW1wb3J0IHsgRGF5c0VudW0gfSBmcm9tICcuLi91dGlscy9EYXlzRW51bSc7XG5pbXBvcnQgeyBVc2VyTm9ybWFsIH0gZnJvbSAnLi4vbW9kZWwvVXNlck5vcm1hbCc7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFVzZXJFbXByZXNhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckVtcHJlc2EnO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gJy4uL21vZGVsL1Blcmlkbyc7XG5pbXBvcnQgeyBUaW1lUGlja2VyIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90aW1lLXBpY2tlci90aW1lLXBpY2tlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWhvbWUtcGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob21lLXBhZ2UuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZSwgQ2F0ZWdvcnlTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJyZWdpc3RlclwiKSBhbmd1bGFyUmVnaXN0ZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiY2lyY2xlXCIpIGNpcmNsZVJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ29cIikgbG9nb1JlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ2luXCIpIGFuZ3VsYXJMb2dpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNvbnRlbnRcIikgYW5ndWxhckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJob3JhSW5pY2lvXCIpIGFuZ3VsYXJob3JhSW5pY2lvOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiaG9yYUZpblwiKSBhbmd1bGFyaG9yYUZpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm1vZGFsTmV3Q2F0ZWdvcnlcIikgbW9kYWxOZXdDYXRlZ29yeTogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbENob3NlQ2F0ZWdvcnlcIikgbW9kYWxDaG9zZUNhdGVnb3J5OiBNb2RhbENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChcIm1vZGFsTmV3UGVyaW9kb1wiKSBtb2RhbE5ld1BlcmlvZG86IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxBZGRIb3JhcmlvXCIpIG1vZGFsQWRkSG9yYXJpbzogTW9kYWxDb21wb25lbnQ7XG5cbiAgbG9naW5MYXlvdXQ6IFZpZXc7XG4gIHJlZ3NpdGVyTGF5b3V0OiBWaWV3O1xuICBidG5JdGVtOiBWaWV3O1xuICBjaXJjbGVJdGVtOiBWaWV3O1xuICBsb2dvSXRlbTogVmlldztcbiAgY29udGVudDogVmlldztcbiAgaG9yYUluaWNpbzogVGltZVBpY2tlcjtcbiAgaG9yYUZpbjogVGltZVBpY2tlcjtcblxuICBpc0xvZ2luID0gdHJ1ZTtcbiAgZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICBuYXZpZ2F0aW5nID0gZmFsc2U7XG4gIGxvZ2luVHh0ID0gXCJMIG8gZyBpIG5cIjtcblxuICB0aXBvVXN1YXJpbzogVHlwZVVzZXI7XG4gIHZlckhvcmFyaW9zOiBib29sZWFuID0gdHJ1ZTtcblxuICB1c2VyRGF0YTogVXNlckRhdGEgPSBuZXcgVXNlckRhdGEoKTtcbiAgdXNlck5vcm1hbDogVXNlck5vcm1hbCA9IG5ldyBVc2VyTm9ybWFsKCk7XG4gIHVzZXJFbXByZXNhOiBVc2VyRW1wcmVzYSA9IG5ldyBVc2VyRW1wcmVzYSgpO1xuXG4gIGVudW1UaXBvVXN1YXJpbyA9IFR5cGVVc2VyO1xuICBlbnVtRGlhcyA9IE9iamVjdC5rZXlzKERheXNFbnVtKTtcblxuICBzZWxlY3RlZEluZGV4ID0gMDtcbiAgc2VsZWN0ZWREYXkgPSAwO1xuICBzZWxlY3RlZENhdGVnb3J5ID0gMDtcbiAgaXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXCJTaVwiLCBcIk5vXCJdO1xuICBjYXRlZ29yeXNOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjYXRlZ29yeXM6IENhdGVnb3J5W10gPSBbXTtcblxuICBwZXJpb2RvczogUGVyaW9kb1tdID0gW107XG5cbiAgZW1haWwgPSBcIlwiO1xuICBwYXNzID0gXCJcIjtcblxuICBuZXdDYXRlZ29yeTogQ2F0ZWdvcnkgPSBuZXcgQ2F0ZWdvcnkoKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgX2NhdGVnb3J5U2VydmljZTogQ2F0ZWdvcnlTZXJ2aWNlLHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlLm9uKCduYXZpZ2F0aW5nVG8nLCAoZGF0YSkgPT4ge1xuICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uc2NhbGVYID0gMDtcbiAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XG4gICAgICAgIHRoaXMubmF2aWdhdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxvZ29JdGVtLnRyYW5zbGF0ZVkgPSAwO1xuICAgIH0pXG4gICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMuYnRuSXRlbSA9IHRoaXMuYnRuUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dpbkxheW91dCA9IHRoaXMuYW5ndWxhckxvZ2luLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dCA9IHRoaXMuYW5ndWxhclJlZ2lzdGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jaXJjbGVJdGVtID0gdGhpcy5jaXJjbGVSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmxvZ29JdGVtID0gdGhpcy5sb2dvUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5hbmd1bGFyQ29udGVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgdGhpcy5ob3JhSW5pY2lvID0gdGhpcy5hbmd1bGFyaG9yYUluaWNpby5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuaG9yYUZpbiA9IHRoaXMuYW5ndWxhcmhvcmFGaW4ubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQuc2NhbGVZID0gMDtcbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWCA9IDA7XG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWSA9IDA7XG4gIH1cbiAgXG4gIGNob3NlVHlwZVVzZXIoKXtcbiAgICBkaWFsb2dzLmFjdGlvbih7XG4gICAgICBtZXNzYWdlOiBcIlRpcG8gZGUgdXN1YXJpb1wiLFxuICAgICAgYWN0aW9uczogT2JqZWN0LmtleXMoVHlwZVVzZXIpXG4gICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgdGhpcy50aXBvVXN1YXJpbyA9IFR5cGVVc2VyW3Jlc3VsdF07XG4gICAgICBpZih0aGlzLnRpcG9Vc3VhcmlvID09IFR5cGVVc2VyLkVtcHJlc2Epe1xuICAgICAgICB0aGlzLnVzZXJFbXByZXNhID0gbmV3IFVzZXJFbXByZXNhKHRoaXMudXNlckRhdGEpO1xuICAgICAgfWVsc2UgaWYodGhpcy50aXBvVXN1YXJpbyA9PSBUeXBlVXNlci5Ob3JtYWwpe1xuICAgICAgICB0aGlzLnVzZXJOb3JtYWwgPSBuZXcgVXNlck5vcm1hbCh0aGlzLnVzZXJEYXRhKTtcbiAgICAgIH1cbiAgICAgfSk7XG4gIH1cblxuICBlbGltaW5hclBlcmlvZG8oaSA6IG51bWJlcil7XG4gICAgbGV0IHBlcmlkbyA9IHRoaXMucGVyaW9kb3NbaV07XG4gICAgdGhpcy51c2VyRW1wcmVzYS5wZXJpb2RvcyA9IHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKG9iaiA9PiAhb2JqLmVxdWFscyhwZXJpZG8pKTtcbiAgICB0aGlzLnNlYXJjaFBlcmlvZHMoKTtcbiAgfVxuXG4gIGFkZE5ld0hvcmFyaW8oKXtcbiAgICBsZXQgcGVyaWRvOiBQZXJpb2RvID0gbmV3IFBlcmlvZG8oKTtcbiAgICBwZXJpZG8uZGlhID0gRGF5c0VudW1bdGhpcy5lbnVtRGlhc1t0aGlzLnNlbGVjdGVkRGF5XV07XG4gICAgcGVyaWRvLmVtcGllemFIb3JhID0gdGhpcy5ob3JhSW5pY2lvLmhvdXI7XG4gICAgcGVyaWRvLmVtcGllemFNaW51dG8gPSB0aGlzLmhvcmFJbmljaW8ubWludXRlO1xuICAgIHBlcmlkby5hY2FiYUhvcmEgPSB0aGlzLmhvcmFGaW4uaG91cjtcbiAgICBwZXJpZG8uYWNhYmFNaW51dG8gPSB0aGlzLmhvcmFGaW4ubWludXRlO1xuICAgIFxuICAgIGlmKHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKHBlciA9PiBwZXIuZXN0YURlbnRybyhwZXJpZG8pKS5sZW5ndGggPT0gMCl7XG4gICAgICB0aGlzLnVzZXJFbXByZXNhLnBlcmlvZG9zLnB1c2gocGVyaWRvKTtcblxuICAgICAgdGhpcy5zZWFyY2hQZXJpb2RzKCk7XG4gICAgICB0aGlzLm1vZGFsTmV3UGVyaW9kby5oaWRlKCk7IFxuICAgICAgdGhpcy5tb2RhbEFkZEhvcmFyaW8uc2hvdygpO1xuICAgIH1lbHNle1xuICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIk5vIHB1ZGVzIHBvbmVyIHVuIHBlcmlkbyBkZW50cm8gZGUgb3Ryby4uLlwiKTtcbiAgICB9XG4gIH1cblxuICBzZWFyY2hQZXJpb2RzKCl7XG4gICAgdGhpcy5wZXJpb2RvcyA9IHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKCBwZXJpZG8gPT4gcGVyaWRvLmRpYSA9PSBEYXlzRW51bVt0aGlzLmVudW1EaWFzW3RoaXMuc2VsZWN0ZWREYXldXSk7XG4gIH1cblxuICBzZWFyY2hQZXJpb2RzQnlEYXkoZGlhOiBhbnkpIDogUGVyaW9kb1tde1xuICAgIHJldHVybiB0aGlzLnVzZXJFbXByZXNhLnBlcmlvZG9zLmZpbHRlciggcGVyaWRvID0+IHBlcmlkby5kaWEgPT0gRGF5c0VudW1bZGlhXSk7XG4gIH1cblxuICBvblRpbWVDaGFuZ2VkSW5pY2lvKGFyZ3MpIHtcbiAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgdGhpcy5ob3JhRmluLmhvdXIgPSB0aW1lUGlja2VyLmhvdXIgPT0gMjMgPyAwIDogdGltZVBpY2tlci5ob3VyICsgMTtcbiAgICB0aGlzLmhvcmFGaW4ubWludXRlID0gdGltZVBpY2tlci5taW51dGU7XG4gIH1cblxuICBvblRpbWVDaGFuZ2VkRmluKGFyZ3MpIHtcbiAgICBsZXQgdGltZVBpY2tlciA9IDxUaW1lUGlja2VyPmFyZ3Mub2JqZWN0O1xuXG4gICAgaWYodGltZVBpY2tlci5ob3VyIDwgdGhpcy5ob3JhSW5pY2lvLmhvdXIgJiYgdGltZVBpY2tlci5ob3VyICE9IDApe1xuICAgICAgdGltZVBpY2tlci5ob3VyID0gdGhpcy5ob3JhSW5pY2lvLmhvdXI7XG4gICAgfVxuXG4gICAgaWYodGltZVBpY2tlci5ob3VyID09IHRoaXMuaG9yYUluaWNpby5ob3VyICYmICh0aW1lUGlja2VyLm1pbnV0ZSAtIDUpIDwgdGhpcy5ob3JhSW5pY2lvLm1pbnV0ZSl7XG4gICAgICB0aW1lUGlja2VyLm1pbnV0ZSA9IHRoaXMuaG9yYUluaWNpby5taW51dGUgKyA1O1xuICAgIH1cbiAgfVxuXG4gIGNob3NlQ2F0ZWdvcnkoKXtcbiAgICB0aGlzLl9jYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlzKCkuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIHRoaXMuY2F0ZWdvcnlzID0gQ2F0ZWdvcnlNYXBwZXIuY2F0ZWdvcnlKU09OVG9DYXRlZ29yeShvayk7XG4gICAgICAgIHRoaXMudXBkYXRlQ2F0ZWdvcnlzTmFtZXMoKTtcbiAgICAgICAgdGhpcy5tb2RhbENob3NlQ2F0ZWdvcnkuc2hvdygpO1xuICAgICAgfSxcbiAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNViAtPiBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgdXBkYXRlQ2F0ZWdvcnlzTmFtZXMoKXtcbiAgICB0aGlzLmNhdGVnb3J5c05hbWVzID0gW107XG4gICAgdGhpcy5jYXRlZ29yeXNOYW1lcy5wdXNoKFwiQ2F0ZWdvcmlhIHNpbiBkZWZpbmlyXCIpO1xuICAgIHRoaXMuY2F0ZWdvcnlzLmZvckVhY2goIGNhdCA9PiB7dGhpcy5jYXRlZ29yeXNOYW1lcy5wdXNoKGNhdC5ub21icmUpfSk7XG4gIH1cblxuICBzZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzKXtcbiAgICBsZXQgcGlja2VyID0gPExpc3RQaWNrZXI+YXJncy5vYmplY3Q7XG4gICAgdGhpcy5zZWxlY3RlZERheSA9IHBpY2tlci5zZWxlY3RlZEluZGV4O1xuICAgIHRoaXMuc2VhcmNoUGVyaW9kcygpO1xuICB9XG5cbiAgb25CdXR0b25UYXAoKXtcbiAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSB0cnVlO1xuICAgIFxuICAgIGlmKHRoaXMuaXNMb2dpbil7XG4gICAgICB0aGlzLl91c2VyU2VydmljZS5sb2dVc2VyKHRoaXMuZW1haWwsIHRoaXMucGFzcykuc3Vic2NyaWJlKFxuICAgICAgICAob2spID0+IHtcbiAgICAgICAgICBpZihva1tcInRva2VuXCJdICE9PSBcIm51bGxcIil7XG4gICAgICAgICAgICAvL2FmZWdpciBhbCBhcHAgc2V0dGluZ3NcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGluZyA9IHRydWU7XG4gIFxuICAgICAgICAgICAgdGhpcy5sb2dvSXRlbS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDMwMCB9LFxuICAgICAgICAgICAgICBzY2FsZTogeyB4OiAxLjgsIHk6IDEuOH0sXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDBcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmNpcmNsZUl0ZW0udHJhbnNsYXRlWSA9IDIwMDtcbiAgICAgICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjYWxlOiB7IHg6IDE1LCB5OiAxNSB9LFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKFwicmVnaXN0ZXJcIiwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtU3VibWl0dGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKFwiRXJyb3IgZGUgY29uZXhpw7NuLi4uXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WIC0+IFwiKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfWVsc2V7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnRpcG9Vc3VhcmlvID09IFR5cGVVc2VyLkVtcHJlc2EgPyB0aGlzLnVzZXJFbXByZXNhIDogdGhpcy51c2VyTm9ybWFsKTtcbiAgICB9XG4gIH1cblxuICBhZGRDYXRlZ29yeSgpe1xuICAgIHRoaXMuX2NhdGVnb3J5U2VydmljZS5hZGRDYXRlZ29yeSh0aGlzLm5ld0NhdGVnb3J5KS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYob2tbXCJjYXRlZ29yeXNcIl0gIT09IFwibnVsbFwiKXtcbiAgICAgICAgICB0aGlzLmNhdGVnb3J5cyA9IENhdGVnb3J5TWFwcGVyLmNhdGVnb3J5SlNPTlRvQ2F0ZWdvcnkob2spO1xuICAgICAgICAgIHRoaXMudXBkYXRlQ2F0ZWdvcnlzTmFtZXMoKTtcbiAgICAgICAgICB0aGlzLm1vZGFsTmV3Q2F0ZWdvcnkuaGlkZSgpO1xuICAgICAgICAgIHRoaXMubW9kYWxDaG9zZUNhdGVnb3J5LnNob3coKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgICB0aGlzLm1vZGFsTmV3Q2F0ZWdvcnkuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDs24uLi5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WIC0+IFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDAuOTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAxO1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDEgO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvTG9naW4oKSB7XG4gICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xuICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSwgXG4gICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgdGhpcy5sb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG4gICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoe1xuICAgICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9naW5MYXlvdXQuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9SZWdpc3RlcigpIHtcbiAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICBkdXJhdGlvbjogMTUwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xuICAgICAgICAgIHRyYW5zbGF0ZToge3g6IDAsIHk6IC0zNX0sXG4gICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5UeHQgPSBcIlIgZSBnIGkgcyB0IHIgYSByXCI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19