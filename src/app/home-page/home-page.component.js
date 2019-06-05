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
var Camera_service_1 = require("../services/Camera.service");
var appSettings = require("tns-core-modules/application-settings");
var UserMapper_1 = require("../mapper/UserMapper");
var UserLoged_1 = require("../utils/UserLoged");
var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(_page, _cameraService, _userService, _categoryService, routerExtensions, renderer) {
        this._page = _page;
        this._cameraService = _cameraService;
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
        this.codigo = "";
        this.newCategory = new Category_1.Category();
        this.imageSlider = ["https://lorempixel.com/800/600/city/2/", "https://lorempixel.com/800/600/nightlife/6/", "https://lorempixel.com/800/600/nightlife/5/"];
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
        this.cabecera = this.angularCabecera.nativeElement;
        this.horaInicio = this.angularhoraInicio.nativeElement;
        this.horaFin = this.angularhoraFin.nativeElement;
        this.regsiterLayout.scaleY = 0;
        this.regsiterLayout.scaleX = 0;
        this.circleItem.scaleX = 0;
        this.circleItem.scaleY = 0;
        if (appSettings.getString("tokenUser", "") != "") {
            this.irACalendar();
        }
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
    HomePageComponent.prototype.addPhotoEmpresaCamera = function () {
        var _this = this;
        var options = {
            width: 200,
            height: 200,
            keepAspectRatio: true,
            saveToGallery: false,
            cameraFacing: "front"
        };
        this._cameraService.pickPhoto(options).then(function (resp) {
            _this.addPhotoEmpresaToUser(resp);
        }, function (err) {
            console.log(err);
        });
    };
    HomePageComponent.prototype.choseMapDirection = function () {
        this.routerExtensions.navigateByUrl("route");
    };
    HomePageComponent.prototype.addPhotoEmpresaGallery = function () {
        var _this = this;
        this._cameraService.selectGaleryPhoto().then(function (resp) {
            _this.addPhotoEmpresaToUser(resp);
        });
    };
    HomePageComponent.prototype.addPhotoEmpresaToUser = function (resp) {
        console.log("foto añadida a array: " + resp["base64"]);
        this.userEmpresa.fotosEmpresa.push(resp["base64"]);
        this.imageSlider.push(resp["image"]);
        this.modalAddPhotoEmpresa.hide();
    };
    HomePageComponent.prototype.selectPhoto = function () {
        var _this = this;
        dialogs.action({
            message: "Escoge una opcion",
            cancelButtonText: "Cancelar",
            actions: ["Camara", "Galeria"]
        }).then(function (result) {
            result == "Camara" ? _this.pickPhoto() : _this.selectGaleryPhoto();
        });
    };
    HomePageComponent.prototype.pickPhoto = function () {
        var _this = this;
        var options = {
            width: 200,
            height: 200,
            keepAspectRatio: true,
            saveToGallery: false,
            cameraFacing: "front"
        };
        this._cameraService.pickPhoto(options).then(function (resp) {
            _this.ponerFoto(resp);
        }, function (err) {
            console.log(err);
        });
    };
    HomePageComponent.prototype.selectGaleryPhoto = function () {
        var _this = this;
        this._cameraService.selectGaleryPhoto().then(function (resp) {
            _this.ponerFoto(resp);
        });
    };
    HomePageComponent.prototype.ponerFoto = function (resp) {
        if (this.tipoUsuario == undefined) {
            this.userData.foto = resp["base64"];
        }
        else {
            if (this.tipoUsuario == "empresa") {
                this.userEmpresa.foto = resp["base64"];
            }
            else {
                this.userNormal.foto = resp["base64"];
            }
        }
        this.imagen = resp["image"];
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
    HomePageComponent.prototype.irACalendar = function () {
        var _this = this;
        this._userService.getUser().subscribe(function (ok) {
            if (ok["user"] !== "null") {
                UserLoged_1.UserLoged.getInstance().setUserLoged(UserMapper_1.UserMapper.userJSONToUserData(ok['user'], ok['userTipoData']));
                _this.content.height = 0;
                _this.cabecera.height = 1000;
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
                        _this.routerExtensions.navigateByUrl("calendar", { clearHistory: true });
                        _this.formSubmitted = false;
                    });
                });
            }
            else {
                _this.formSubmitted = false;
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    HomePageComponent.prototype.onButtonTap = function () {
        var _this = this;
        this.formSubmitted = true;
        if (this.isLogin) {
            this._userService.logUser(this.email, this.pass).subscribe(function (ok) {
                if (ok["token"] !== "null") {
                    appSettings.setString("tokenUser", ok["token"]);
                    _this.navigating = true;
                    _this.irACalendar();
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
            if (this.tipoUsuario == TypeUser_1.TypeUser.Empresa) {
                this.userEmpresa.passData(this.userData);
                this.userEmpresa.direccionFija = this.selectedIndex == 0;
            }
            else if (this.tipoUsuario == TypeUser_1.TypeUser.Normal) {
                this.userNormal.passData(this.userData);
            }
            this._userService.registerUser(this.tipoUsuario == TypeUser_1.TypeUser.Empresa ? this.userEmpresa : this.userNormal).subscribe(function (ok) {
                if (ok["idUser"] !== "null") {
                    _this.formSubmitted = false;
                    _this.modalVerificarCodigo.show();
                }
                else {
                    _this.formSubmitted = false;
                    FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
                }
            }, function (erro) {
                console.log("ERROR PMV");
                console.log(erro);
            });
        }
    };
    HomePageComponent.prototype.verificarCodigo = function () {
        var _this = this;
        this._userService.verificarCodigo(this.email, this.codigo).subscribe(function (ok) {
            if (ok["code"] == true) {
                _this.modalVerificarCodigo.hide();
                FeedBack_1.FeedBack.feedBackSucces("Cuenta verificada Corectamente");
                _this.setToLogin();
            }
            else {
                FeedBack_1.FeedBack.feedBackError(ok["errorMesage"]);
            }
        }, function (erro) {
            console.log("ERROR PMV");
            console.log(erro);
        });
    };
    HomePageComponent.prototype.categorySelected = function () {
        this.userEmpresa.category = this.categorys[this.selectedCategory - 1];
        this.modalChoseCategory.hide();
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
    HomePageComponent.prototype.onDateChanged = function (args) {
        this.userNormal.fechaNacimiento = args.value;
        this.userNormal.fechaNacimiento.setHours(2);
    };
    HomePageComponent.prototype.onPickerLoaded = function (args) {
        var datePicker = args.object;
        var now = new Date();
        datePicker.year = now.getFullYear() - 31;
        datePicker.month = 8;
        datePicker.day = 8;
        datePicker.minDate = new Date(now.getFullYear() - 100, 0, 0);
        datePicker.maxDate = new Date(now.getFullYear() - 6, 12, 31);
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
        core_1.ViewChild("cabecera"),
        __metadata("design:type", core_1.ElementRef)
    ], HomePageComponent.prototype, "angularCabecera", void 0);
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
    __decorate([
        core_1.ViewChild("modalVerificarCodigo"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalVerificarCodigo", void 0);
    __decorate([
        core_1.ViewChild("modalAddPhotoEmpresa"),
        __metadata("design:type", modal_1.ModalComponent)
    ], HomePageComponent.prototype, "modalAddPhotoEmpresa", void 0);
    HomePageComponent = __decorate([
        core_1.Component({
            selector: 'ns-home-page',
            templateUrl: './home-page.component.html',
            styleUrls: ['./home-page.component.css'],
            moduleId: module.id,
            providers: [UserService_1.UserService, CategoryService_1.CategoryService, Camera_service_1.CameraService]
        }),
        __metadata("design:paramtypes", [page_1.Page, Camera_service_1.CameraService, UserService_1.UserService, CategoryService_1.CategoryService, router_1.RouterExtensions, core_1.Renderer2])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUtcGFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEY7QUFDNUYsc0RBQTJEO0FBQzNELHNEQUErRDtBQUUvRCx1REFBc0Q7QUFDdEQsOENBQTZDO0FBQzdDLHFEQUF1RDtBQUN2RCw4Q0FBNkM7QUFDN0MsOENBQTZDO0FBQzdDLGtDQUEwQztBQUMxQywrREFBOEQ7QUFDOUQsOENBQTZDO0FBQzdDLDJEQUEwRDtBQUMxRCw4Q0FBNkM7QUFDN0Msa0RBQWlEO0FBRWpELG9EQUFtRDtBQUNuRCwwQ0FBMEM7QUFJMUMsNkRBQTJEO0FBQzNELG1FQUFxRTtBQUNyRSxtREFBa0Q7QUFDbEQsZ0RBQStDO0FBUy9DO0lBNkRFLDJCQUFvQixLQUFXLEVBQVUsY0FBOEIsRUFBVSxZQUF5QixFQUFVLGdCQUFpQyxFQUFVLGdCQUFrQyxFQUFVLFFBQW1CO1FBQTFNLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQWxDOU4sWUFBTyxHQUFHLElBQUksQ0FBQztRQUNmLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsYUFBUSxHQUFHLFdBQVcsQ0FBQztRQUd2QixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUU1QixhQUFRLEdBQWEsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDcEMsZUFBVSxHQUFlLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQzFDLGdCQUFXLEdBQWdCLElBQUkseUJBQVcsRUFBRSxDQUFDO1FBRTdDLG9CQUFlLEdBQUcsbUJBQVEsQ0FB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LENBK2M3QjtJQUFELHdCQUFDO0NBQUEsQUEvY0QsSUErY0M7QUEvY1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgUmVuZGVyZXIyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZpZXcsIFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXMvZ2VzdHVyZXMnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9Vc2VyU2VydmljZSc7XG5pbXBvcnQgeyBGZWVkQmFjayB9IGZyb20gJy4uL3V0aWxzL0ZlZWRCYWNrJztcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgVHlwZVVzZXIgfSBmcm9tICcuLi91dGlscy9UeXBlVXNlcic7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gJy4uL21vZGVsL1VzZXJEYXRhJztcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kYWwnO1xuaW1wb3J0IHsgQ2F0ZWdvcnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvQ2F0ZWdvcnlTZXJ2aWNlJztcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSAnLi4vbW9kZWwvQ2F0ZWdvcnknO1xuaW1wb3J0IHsgQ2F0ZWdvcnlNYXBwZXIgfSBmcm9tICcuLi9tYXBwZXIvQ2F0ZWdvcnlNYXBwZXInO1xuaW1wb3J0IHsgRGF5c0VudW0gfSBmcm9tICcuLi91dGlscy9EYXlzRW51bSc7XG5pbXBvcnQgeyBVc2VyTm9ybWFsIH0gZnJvbSAnLi4vbW9kZWwvVXNlck5vcm1hbCc7XG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIjtcbmltcG9ydCB7IFVzZXJFbXByZXNhIH0gZnJvbSAnLi4vbW9kZWwvVXNlckVtcHJlc2EnO1xuaW1wb3J0IHsgUGVyaW9kbyB9IGZyb20gJy4uL21vZGVsL1Blcmlkbyc7XG5pbXBvcnQgeyBUaW1lUGlja2VyIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS90aW1lLXBpY2tlci90aW1lLXBpY2tlcic7XG5pbXBvcnQgeyBEYXRlUGlja2VyIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9kYXRlLXBpY2tlci9kYXRlLXBpY2tlcic7XG5pbXBvcnQgKiBhcyBjYW1lcmEgZnJvbSBcIm5hdGl2ZXNjcmlwdC1jYW1lcmFcIjtcbmltcG9ydCB7IENhbWVyYVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9DYW1lcmEuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgVXNlck1hcHBlciB9IGZyb20gJy4uL21hcHBlci9Vc2VyTWFwcGVyJztcbmltcG9ydCB7IFVzZXJMb2dlZCB9IGZyb20gJy4uL3V0aWxzL1VzZXJMb2dlZCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWhvbWUtcGFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9ob21lLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ob21lLXBhZ2UuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBwcm92aWRlcnM6IFtVc2VyU2VydmljZSwgQ2F0ZWdvcnlTZXJ2aWNlLCBDYW1lcmFTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lUGFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoXCJyZWdpc3RlclwiKSBhbmd1bGFyUmVnaXN0ZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJidG5cIikgYnRuUmVmOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiY2lyY2xlXCIpIGNpcmNsZVJlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ29cIikgbG9nb1JlZjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImxvZ2luXCIpIGFuZ3VsYXJMb2dpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcImNvbnRlbnRcIikgYW5ndWxhckNvbnRlbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJjYWJlY2VyYVwiKSBhbmd1bGFyQ2FiZWNlcmE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoXCJob3JhSW5pY2lvXCIpIGFuZ3VsYXJob3JhSW5pY2lvOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKFwiaG9yYUZpblwiKSBhbmd1bGFyaG9yYUZpbjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZChcIm1vZGFsTmV3Q2F0ZWdvcnlcIikgbW9kYWxOZXdDYXRlZ29yeTogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbENob3NlQ2F0ZWdvcnlcIikgbW9kYWxDaG9zZUNhdGVnb3J5OiBNb2RhbENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZChcIm1vZGFsTmV3UGVyaW9kb1wiKSBtb2RhbE5ld1BlcmlvZG86IE1vZGFsQ29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibW9kYWxBZGRIb3JhcmlvXCIpIG1vZGFsQWRkSG9yYXJpbzogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbFZlcmlmaWNhckNvZGlnb1wiKSBtb2RhbFZlcmlmaWNhckNvZGlnbzogTW9kYWxDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtb2RhbEFkZFBob3RvRW1wcmVzYVwiKSBtb2RhbEFkZFBob3RvRW1wcmVzYTogTW9kYWxDb21wb25lbnQ7XG5cbiAgbG9naW5MYXlvdXQ6IFZpZXc7XG4gIHJlZ3NpdGVyTGF5b3V0OiBWaWV3O1xuICBidG5JdGVtOiBWaWV3O1xuICBjaXJjbGVJdGVtOiBWaWV3O1xuICBsb2dvSXRlbTogVmlldztcbiAgY29udGVudDogVmlldztcbiAgY2FiZWNlcmE6IFZpZXc7XG4gIGhvcmFJbmljaW86IFRpbWVQaWNrZXI7XG4gIGhvcmFGaW46IFRpbWVQaWNrZXI7XG5cbiAgaXNMb2dpbiA9IHRydWU7XG4gIGZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgbmF2aWdhdGluZyA9IGZhbHNlO1xuICBsb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG5cbiAgdGlwb1VzdWFyaW86IFR5cGVVc2VyO1xuICB2ZXJIb3JhcmlvczogYm9vbGVhbiA9IHRydWU7XG5cbiAgdXNlckRhdGE6IFVzZXJEYXRhID0gbmV3IFVzZXJEYXRhKCk7XG4gIHVzZXJOb3JtYWw6IFVzZXJOb3JtYWwgPSBuZXcgVXNlck5vcm1hbCgpO1xuICB1c2VyRW1wcmVzYTogVXNlckVtcHJlc2EgPSBuZXcgVXNlckVtcHJlc2EoKTtcblxuICBlbnVtVGlwb1VzdWFyaW8gPSBUeXBlVXNlcjtcbiAgZW51bURpYXMgPSBPYmplY3Qua2V5cyhEYXlzRW51bSk7XG5cbiAgc2VsZWN0ZWRJbmRleCA9IDA7XG4gIHNlbGVjdGVkRGF5ID0gMDtcbiAgc2VsZWN0ZWRDYXRlZ29yeSA9IDA7XG4gIGl0ZW1zOiBBcnJheTxzdHJpbmc+ID0gW1wiU2lcIiwgXCJOb1wiXTtcbiAgY2F0ZWdvcnlzTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY2F0ZWdvcnlzOiBDYXRlZ29yeVtdID0gW107XG5cbiAgcGVyaW9kb3M6IFBlcmlvZG9bXSA9IFtdO1xuXG4gIGltYWdlbjphbnk7XG5cbiAgZW1haWwgPSBcIlwiO1xuICBwYXNzID0gXCJcIjtcbiAgY29kaWdvID0gXCJcIjtcblxuICBuZXdDYXRlZ29yeTogQ2F0ZWdvcnkgPSBuZXcgQ2F0ZWdvcnkoKTtcblxuICBpbWFnZVNsaWRlcjogU3RyaW5nW10gPSBbXCJodHRwczovL2xvcmVtcGl4ZWwuY29tLzgwMC82MDAvY2l0eS8yL1wiLCBcImh0dHBzOi8vbG9yZW1waXhlbC5jb20vODAwLzYwMC9uaWdodGxpZmUvNi9cIiwgXCJodHRwczovL2xvcmVtcGl4ZWwuY29tLzgwMC82MDAvbmlnaHRsaWZlLzUvXCJdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX2NhbWVyYVNlcnZpY2UgOiBDYW1lcmFTZXJ2aWNlLCBwcml2YXRlIF91c2VyU2VydmljZTogVXNlclNlcnZpY2UsIHByaXZhdGUgX2NhdGVnb3J5U2VydmljZTogQ2F0ZWdvcnlTZXJ2aWNlLCBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZS5vbignbmF2aWdhdGluZ1RvJywgKGRhdGEpID0+IHtcbiAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnNjYWxlWCA9IDA7XG4gICAgICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuICAgICAgICB0aGlzLm5hdmlnYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sb2dvSXRlbS50cmFuc2xhdGVZID0gMDtcbiAgICB9KVxuICAgIHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLmJ0bkl0ZW0gPSB0aGlzLmJ0blJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMubG9naW5MYXlvdXQgPSB0aGlzLmFuZ3VsYXJMb2dpbi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMucmVnc2l0ZXJMYXlvdXQgPSB0aGlzLmFuZ3VsYXJSZWdpc3Rlci5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY2lyY2xlSXRlbSA9IHRoaXMuY2lyY2xlUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5sb2dvSXRlbSA9IHRoaXMubG9nb1JlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29udGVudCA9IHRoaXMuYW5ndWxhckNvbnRlbnQubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmNhYmVjZXJhID0gdGhpcy5hbmd1bGFyQ2FiZWNlcmEubmF0aXZlRWxlbWVudDtcblxuICAgIHRoaXMuaG9yYUluaWNpbyA9IHRoaXMuYW5ndWxhcmhvcmFJbmljaW8ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmhvcmFGaW4gPSB0aGlzLmFuZ3VsYXJob3JhRmluLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LnNjYWxlWSA9IDA7XG4gICAgdGhpcy5yZWdzaXRlckxheW91dC5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVggPSAwO1xuICAgIHRoaXMuY2lyY2xlSXRlbS5zY2FsZVkgPSAwO1xuXG4gICAgaWYoYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIFwiXCIpICE9IFwiXCIpe1xuICAgICAgdGhpcy5pckFDYWxlbmRhcigpO1xuICAgIH1cbiAgfVxuICBcbiAgY2hvc2VUeXBlVXNlcigpe1xuICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgIG1lc3NhZ2U6IFwiVGlwbyBkZSB1c3VhcmlvXCIsXG4gICAgICBhY3Rpb25zOiBPYmplY3Qua2V5cyhUeXBlVXNlcilcbiAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICB0aGlzLnRpcG9Vc3VhcmlvID0gVHlwZVVzZXJbcmVzdWx0XTtcbiAgICAgfSk7XG4gIH1cblxuICBlbGltaW5hclBlcmlvZG8oaSA6IG51bWJlcil7XG4gICAgbGV0IHBlcmlkbyA9IHRoaXMucGVyaW9kb3NbaV07XG4gICAgdGhpcy51c2VyRW1wcmVzYS5wZXJpb2RvcyA9IHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKG9iaiA9PiAhb2JqLmVxdWFscyhwZXJpZG8pKTtcbiAgICB0aGlzLnNlYXJjaFBlcmlvZHMoKTtcbiAgfVxuXG4gIGFkZE5ld0hvcmFyaW8oKXtcbiAgICBsZXQgcGVyaWRvOiBQZXJpb2RvID0gbmV3IFBlcmlvZG8oKTtcbiAgICBwZXJpZG8uZGlhID0gRGF5c0VudW1bdGhpcy5lbnVtRGlhc1t0aGlzLnNlbGVjdGVkRGF5XV07XG4gICAgcGVyaWRvLmVtcGllemFIb3JhID0gdGhpcy5ob3JhSW5pY2lvLmhvdXI7XG4gICAgcGVyaWRvLmVtcGllemFNaW51dG8gPSB0aGlzLmhvcmFJbmljaW8ubWludXRlO1xuICAgIHBlcmlkby5hY2FiYUhvcmEgPSB0aGlzLmhvcmFGaW4uaG91cjtcbiAgICBwZXJpZG8uYWNhYmFNaW51dG8gPSB0aGlzLmhvcmFGaW4ubWludXRlO1xuICAgIFxuICAgIGlmKHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKHBlciA9PiBwZXIuZXN0YURlbnRybyhwZXJpZG8pKS5sZW5ndGggPT0gMCl7XG4gICAgICB0aGlzLnVzZXJFbXByZXNhLnBlcmlvZG9zLnB1c2gocGVyaWRvKTtcblxuICAgICAgdGhpcy5zZWFyY2hQZXJpb2RzKCk7XG4gICAgICB0aGlzLm1vZGFsTmV3UGVyaW9kby5oaWRlKCk7IFxuICAgICAgdGhpcy5tb2RhbEFkZEhvcmFyaW8uc2hvdygpO1xuICAgIH1lbHNle1xuICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIk5vIHB1ZGVzIHBvbmVyIHVuIHBlcmlkbyBkZW50cm8gZGUgb3Ryby4uLlwiKTtcbiAgICB9XG4gIH1cblxuICBhZGRQaG90b0VtcHJlc2FDYW1lcmEoKSB7XG4gICAgbGV0IG9wdGlvbnM6IGNhbWVyYS5DYW1lcmFPcHRpb25zID0ge1xuICAgICAgd2lkdGg6IDIwMCxcbiAgICAgIGhlaWdodDogMjAwLFxuICAgICAga2VlcEFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgc2F2ZVRvR2FsbGVyeTogZmFsc2UsXG4gICAgICBjYW1lcmFGYWNpbmc6IFwiZnJvbnRcIlxuICAgIH07XG5cbiAgICB0aGlzLl9jYW1lcmFTZXJ2aWNlLnBpY2tQaG90byhvcHRpb25zKS50aGVuKFxuICAgICAgKHJlc3ApID0+IHtcbiAgICAgICAgdGhpcy5hZGRQaG90b0VtcHJlc2FUb1VzZXIocmVzcCk7XG4gICAgICB9LFxuICAgICAgKGVycikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjaG9zZU1hcERpcmVjdGlvbigpe1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKFwicm91dGVcIik7XG4gIH1cblxuICBhZGRQaG90b0VtcHJlc2FHYWxsZXJ5KCkge1xuICAgIHRoaXMuX2NhbWVyYVNlcnZpY2Uuc2VsZWN0R2FsZXJ5UGhvdG8oKS50aGVuKFxuICAgICAgKHJlc3ApID0+IHtcbiAgICAgICAgdGhpcy5hZGRQaG90b0VtcHJlc2FUb1VzZXIocmVzcCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGFkZFBob3RvRW1wcmVzYVRvVXNlcihyZXNwKSB7XG4gICAgY29uc29sZS5sb2coXCJmb3RvIGHDsWFkaWRhIGEgYXJyYXk6IFwiK3Jlc3BbXCJiYXNlNjRcIl0pO1xuICAgIHRoaXMudXNlckVtcHJlc2EuZm90b3NFbXByZXNhLnB1c2gocmVzcFtcImJhc2U2NFwiXSk7XG4gICAgdGhpcy5pbWFnZVNsaWRlci5wdXNoKHJlc3BbXCJpbWFnZVwiXSk7XG4gICAgdGhpcy5tb2RhbEFkZFBob3RvRW1wcmVzYS5oaWRlKCk7XG4gIH1cblxuICBzZWxlY3RQaG90bygpe1xuICAgIGRpYWxvZ3MuYWN0aW9uKHtcbiAgICAgIG1lc3NhZ2U6IFwiRXNjb2dlIHVuYSBvcGNpb25cIixcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgIGFjdGlvbnM6IFtcIkNhbWFyYVwiLCBcIkdhbGVyaWFcIl1cbiAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICByZXN1bHQgPT0gXCJDYW1hcmFcIiA/IHRoaXMucGlja1Bob3RvKCkgOiB0aGlzLnNlbGVjdEdhbGVyeVBob3RvKCk7XG4gICAgfSk7XG4gIH1cblxuICBwaWNrUGhvdG8oKXtcbiAgICBsZXQgb3B0aW9uczpjYW1lcmEuQ2FtZXJhT3B0aW9ucyA9IHtcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgIGtlZXBBc3BlY3RSYXRpbzogdHJ1ZSxcbiAgICAgIHNhdmVUb0dhbGxlcnk6IGZhbHNlLFxuICAgICAgY2FtZXJhRmFjaW5nOiBcImZyb250XCJcbiAgICB9O1xuXG4gICAgdGhpcy5fY2FtZXJhU2VydmljZS5waWNrUGhvdG8ob3B0aW9ucykudGhlbihcbiAgICAgIChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMucG9uZXJGb3RvKHJlc3ApO1xuICAgICAgfSxcbiAgICAgIChlcnIpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgc2VsZWN0R2FsZXJ5UGhvdG8oKXtcbiAgICB0aGlzLl9jYW1lcmFTZXJ2aWNlLnNlbGVjdEdhbGVyeVBob3RvKCkudGhlbihcbiAgICAgIChyZXNwKSA9PiB7XG4gICAgICAgIHRoaXMucG9uZXJGb3RvKHJlc3ApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwb25lckZvdG8ocmVzcCl7XG4gICAgaWYodGhpcy50aXBvVXN1YXJpbyA9PSB1bmRlZmluZWQpe1xuICAgICAgdGhpcy51c2VyRGF0YS5mb3RvID0gcmVzcFtcImJhc2U2NFwiXTtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKHRoaXMudGlwb1VzdWFyaW8gPT0gXCJlbXByZXNhXCIpIHsgXG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EuZm90byA9IHJlc3BbXCJiYXNlNjRcIl07XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdGhpcy51c2VyTm9ybWFsLmZvdG8gPSByZXNwW1wiYmFzZTY0XCJdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmltYWdlbiA9IHJlc3BbXCJpbWFnZVwiXTtcbiAgfVxuXG4gIHNlYXJjaFBlcmlvZHMoKXtcbiAgICB0aGlzLnBlcmlvZG9zID0gdGhpcy51c2VyRW1wcmVzYS5wZXJpb2Rvcy5maWx0ZXIoIHBlcmlkbyA9PiBwZXJpZG8uZGlhID09IERheXNFbnVtW3RoaXMuZW51bURpYXNbdGhpcy5zZWxlY3RlZERheV1dKTtcbiAgfVxuXG4gIHNlYXJjaFBlcmlvZHNCeURheShkaWE6IGFueSkgOiBQZXJpb2RvW117XG4gICAgcmV0dXJuIHRoaXMudXNlckVtcHJlc2EucGVyaW9kb3MuZmlsdGVyKCBwZXJpZG8gPT4gcGVyaWRvLmRpYSA9PSBEYXlzRW51bVtkaWFdKTtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZWRJbmljaW8oYXJncykge1xuICAgIGxldCB0aW1lUGlja2VyID0gPFRpbWVQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICB0aGlzLmhvcmFGaW4uaG91ciA9IHRpbWVQaWNrZXIuaG91ciA9PSAyMyA/IDAgOiB0aW1lUGlja2VyLmhvdXIgKyAxO1xuICAgIHRoaXMuaG9yYUZpbi5taW51dGUgPSB0aW1lUGlja2VyLm1pbnV0ZTtcbiAgfVxuXG4gIG9uVGltZUNoYW5nZWRGaW4oYXJncykge1xuICAgIGxldCB0aW1lUGlja2VyID0gPFRpbWVQaWNrZXI+YXJncy5vYmplY3Q7XG5cbiAgICBpZih0aW1lUGlja2VyLmhvdXIgPCB0aGlzLmhvcmFJbmljaW8uaG91ciAmJiB0aW1lUGlja2VyLmhvdXIgIT0gMCl7XG4gICAgICB0aW1lUGlja2VyLmhvdXIgPSB0aGlzLmhvcmFJbmljaW8uaG91cjtcbiAgICB9XG5cbiAgICBpZih0aW1lUGlja2VyLmhvdXIgPT0gdGhpcy5ob3JhSW5pY2lvLmhvdXIgJiYgKHRpbWVQaWNrZXIubWludXRlIC0gNSkgPCB0aGlzLmhvcmFJbmljaW8ubWludXRlKXtcbiAgICAgIHRpbWVQaWNrZXIubWludXRlID0gdGhpcy5ob3JhSW5pY2lvLm1pbnV0ZSArIDU7XG4gICAgfVxuICB9XG5cbiAgY2hvc2VDYXRlZ29yeSgpe1xuICAgIHRoaXMuX2NhdGVnb3J5U2VydmljZS5nZXRDYXRlZ29yeXMoKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgdGhpcy5jYXRlZ29yeXMgPSBDYXRlZ29yeU1hcHBlci5jYXRlZ29yeUpTT05Ub0NhdGVnb3J5KG9rKTtcbiAgICAgICAgdGhpcy51cGRhdGVDYXRlZ29yeXNOYW1lcygpO1xuICAgICAgICB0aGlzLm1vZGFsQ2hvc2VDYXRlZ29yeS5zaG93KCk7XG4gICAgICB9LFxuICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDs24uLi5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WIC0+IFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICB1cGRhdGVDYXRlZ29yeXNOYW1lcygpe1xuICAgIHRoaXMuY2F0ZWdvcnlzTmFtZXMgPSBbXTtcbiAgICB0aGlzLmNhdGVnb3J5c05hbWVzLnB1c2goXCJDYXRlZ29yaWEgc2luIGRlZmluaXJcIik7XG4gICAgdGhpcy5jYXRlZ29yeXMuZm9yRWFjaCggY2F0ID0+IHt0aGlzLmNhdGVnb3J5c05hbWVzLnB1c2goY2F0Lm5vbWJyZSl9KTtcbiAgfVxuXG4gIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3Mpe1xuICAgIGxldCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICB0aGlzLnNlbGVjdGVkRGF5ID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XG4gICAgdGhpcy5zZWFyY2hQZXJpb2RzKCk7XG4gIH1cblxuICBpckFDYWxlbmRhcigpe1xuICAgIHRoaXMuX3VzZXJTZXJ2aWNlLmdldFVzZXIoKS5zdWJzY3JpYmUoXG4gICAgICAob2spID0+IHtcbiAgICAgICAgaWYob2tbXCJ1c2VyXCJdICE9PSBcIm51bGxcIil7XG4gICAgICAgICAgVXNlckxvZ2VkLmdldEluc3RhbmNlKCkuc2V0VXNlckxvZ2VkKFVzZXJNYXBwZXIudXNlckpTT05Ub1VzZXJEYXRhKG9rWyd1c2VyJ10sIG9rWyd1c2VyVGlwb0RhdGEnXSkpO1xuICAgICAgICAgIHRoaXMuY29udGVudC5oZWlnaHQgPSAwO1xuICAgICAgICAgIHRoaXMuY2FiZWNlcmEuaGVpZ2h0ID0gMTAwMDtcbiAgICAgICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDMwMCB9LFxuICAgICAgICAgICAgc2NhbGU6IHsgeDogMS44LCB5OiAxLjh9LFxuICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaXJjbGVJdGVtLnRyYW5zbGF0ZVkgPSAyMDA7XG4gICAgICAgICAgICB0aGlzLmNpcmNsZUl0ZW0uYW5pbWF0ZSh7XG4gICAgICAgICAgICAgIHNjYWxlOiB7IHg6IDE1LCB5OiAxNSB9LFxuICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZUJ5VXJsKFwiY2FsZW5kYXJcIiwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XG4gICAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJybykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SIFBNVlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZXJybyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uQnV0dG9uVGFwKCl7XG4gICAgdGhpcy5mb3JtU3VibWl0dGVkID0gdHJ1ZTtcbiAgICBcbiAgICBpZih0aGlzLmlzTG9naW4pe1xuICAgICAgdGhpcy5fdXNlclNlcnZpY2UubG9nVXNlcih0aGlzLmVtYWlsLCB0aGlzLnBhc3MpLnN1YnNjcmliZShcbiAgICAgICAgKG9rKSA9PiB7XG4gICAgICAgICAgaWYob2tbXCJ0b2tlblwiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidG9rZW5Vc2VyXCIsIG9rW1widG9rZW5cIl0pO1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaXJBQ2FsZW5kYXIoKTtcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3IoXCJFcnJvciBkZSBjb25leGnDs24uLi5cIik7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9ZWxzZXtcbiAgICAgIGlmKHRoaXMudGlwb1VzdWFyaW8gPT0gVHlwZVVzZXIuRW1wcmVzYSl7XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EucGFzc0RhdGEodGhpcy51c2VyRGF0YSk7XG4gICAgICAgIHRoaXMudXNlckVtcHJlc2EuZGlyZWNjaW9uRmlqYSA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSAwO1xuICAgICAgfWVsc2UgaWYodGhpcy50aXBvVXN1YXJpbyA9PSBUeXBlVXNlci5Ob3JtYWwpe1xuICAgICAgICB0aGlzLnVzZXJOb3JtYWwucGFzc0RhdGEodGhpcy51c2VyRGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnJlZ2lzdGVyVXNlcih0aGlzLnRpcG9Vc3VhcmlvID09IFR5cGVVc2VyLkVtcHJlc2EgPyB0aGlzLnVzZXJFbXByZXNhIDogdGhpcy51c2VyTm9ybWFsKS5zdWJzY3JpYmUoXG4gICAgICAgIChvaykgPT57XG4gICAgICAgICAgaWYob2tbXCJpZFVzZXJcIl0gIT09IFwibnVsbFwiKXtcbiAgICAgICAgICAgIHRoaXMuZm9ybVN1Ym1pdHRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tb2RhbFZlcmlmaWNhckNvZGlnby5zaG93KCk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLmZvcm1TdWJtaXR0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIEZlZWRCYWNrLmZlZWRCYWNrRXJyb3Iob2tbXCJlcnJvck1lc2FnZVwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoZXJybykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm8pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHZlcmlmaWNhckNvZGlnbygpe1xuICAgIHRoaXMuX3VzZXJTZXJ2aWNlLnZlcmlmaWNhckNvZGlnbyh0aGlzLmVtYWlsLCB0aGlzLmNvZGlnbykuc3Vic2NyaWJlKFxuICAgICAgKG9rKSA9PiB7XG4gICAgICAgIGlmKDxib29sZWFuPm9rW1wiY29kZVwiXSA9PSB0cnVlKXtcbiAgICAgICAgICB0aGlzLm1vZGFsVmVyaWZpY2FyQ29kaWdvLmhpZGUoKTtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja1N1Y2NlcyhcIkN1ZW50YSB2ZXJpZmljYWRhIENvcmVjdGFtZW50ZVwiKTtcbiAgICAgICAgICB0aGlzLnNldFRvTG9naW4oKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihva1tcImVycm9yTWVzYWdlXCJdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIChlcnJvKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1IgUE1WXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY2F0ZWdvcnlTZWxlY3RlZCgpe1xuICAgIHRoaXMudXNlckVtcHJlc2EuY2F0ZWdvcnkgPSB0aGlzLmNhdGVnb3J5c1t0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgLSAxXTtcbiAgICB0aGlzLm1vZGFsQ2hvc2VDYXRlZ29yeS5oaWRlKClcbiAgfVxuXG4gIGFkZENhdGVnb3J5KCl7XG4gICAgdGhpcy5fY2F0ZWdvcnlTZXJ2aWNlLmFkZENhdGVnb3J5KHRoaXMubmV3Q2F0ZWdvcnkpLnN1YnNjcmliZShcbiAgICAgIChvaykgPT4ge1xuICAgICAgICBpZihva1tcImNhdGVnb3J5c1wiXSAhPT0gXCJudWxsXCIpe1xuICAgICAgICAgIHRoaXMuY2F0ZWdvcnlzID0gQ2F0ZWdvcnlNYXBwZXIuY2F0ZWdvcnlKU09OVG9DYXRlZ29yeShvayk7XG4gICAgICAgICAgdGhpcy51cGRhdGVDYXRlZ29yeXNOYW1lcygpO1xuICAgICAgICAgIHRoaXMubW9kYWxOZXdDYXRlZ29yeS5oaWRlKCk7XG4gICAgICAgICAgdGhpcy5tb2RhbENob3NlQ2F0ZWdvcnkuc2hvdygpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICBGZWVkQmFjay5mZWVkQmFja0Vycm9yKG9rW1wiZXJyb3JNZXNhZ2VcIl0pO1xuICAgICAgICAgIHRoaXMubW9kYWxOZXdDYXRlZ29yeS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgRmVlZEJhY2suZmVlZEJhY2tFcnJvcihcIkVycm9yIGRlIGNvbmV4acOzbi4uLlwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUiBQTVYgLT4gXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG9uRGF0ZUNoYW5nZWQoYXJncykge1xuICAgIHRoaXMudXNlck5vcm1hbC5mZWNoYU5hY2ltaWVudG8gPSBhcmdzLnZhbHVlO1xuICAgIHRoaXMudXNlck5vcm1hbC5mZWNoYU5hY2ltaWVudG8uc2V0SG91cnMoMik7XG4gIH1cblxuICBvblBpY2tlckxvYWRlZChhcmdzKSB7XG4gICAgbGV0IGRhdGVQaWNrZXIgPSA8RGF0ZVBpY2tlcj5hcmdzLm9iamVjdDtcbiAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGRhdGVQaWNrZXIueWVhciA9IG5vdy5nZXRGdWxsWWVhcigpIC0gMzE7XG4gICAgZGF0ZVBpY2tlci5tb250aCA9IDg7XG4gICAgZGF0ZVBpY2tlci5kYXkgPSA4O1xuICAgIGRhdGVQaWNrZXIubWluRGF0ZSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpIC0gMTAwLCAwLCAwKTtcbiAgICBkYXRlUGlja2VyLm1heERhdGUgPSBuZXcgRGF0ZShub3cuZ2V0RnVsbFllYXIoKSAtIDYsIDEyLCAzMSk7XG4gIH1cblxuICBvbkZvY3VzKGFyZ3M6IFRvdWNoR2VzdHVyZUV2ZW50RGF0YSkge1xuICAgIGlmIChhcmdzLmFjdGlvbiA9PSBcImRvd25cIikge1xuICAgICAgYXJncy52aWV3LnNjYWxlWCA9IDAuOTtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVkgPSAwLjk7XG4gICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PSBcInVwXCIpIHtcbiAgICAgIGFyZ3Mudmlldy5zY2FsZVggPSAxO1xuICAgICAgYXJncy52aWV3LnNjYWxlWSA9IDEgO1xuICAgIH1cbiAgfVxuXG4gIHNldFRvTG9naW4oKSB7XG4gICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xuICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSwgXG4gICAgICBkdXJhdGlvbjogMTUwXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmlzTG9naW4gPSB0cnVlO1xuICAgICAgdGhpcy5sb2dpblR4dCA9IFwiTCBvIGcgaSBuXCI7XG4gICAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgICBzY2FsZTogeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgIGR1cmF0aW9uOiAxNTBcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnJlZ3NpdGVyTGF5b3V0LmFuaW1hdGUoe1xuICAgICAgICAgIHNjYWxlOiB7IHg6IDAsIHk6IDAgfSxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5idG5JdGVtLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9naW5MYXlvdXQuYW5pbWF0ZSh7IHNjYWxlOiB7IHg6IDEsIHk6IDEgfSwgZHVyYXRpb246IDIwMCB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9SZWdpc3RlcigpIHtcbiAgICB0aGlzLmxvZ29JdGVtLmFuaW1hdGUoe1xuICAgICAgc2NhbGU6IHsgeDogMCwgeTogMCB9LFxuICAgICAgZHVyYXRpb246IDE1MFxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZWdzaXRlckxheW91dC5hbmltYXRlKHtcbiAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxuICAgICAgICBkdXJhdGlvbjogMTUwXG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb250ZW50LmFuaW1hdGUoe1xuICAgICAgICAgIHRyYW5zbGF0ZToge3g6IDAsIHk6IC0zNX0sXG4gICAgICAgICAgZHVyYXRpb246IDIwMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0xvZ2luID0gZmFsc2U7XG4gICAgICAgIHRoaXMubG9naW5UeHQgPSBcIlIgZSBnIGkgcyB0IHIgYSByXCI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19